"""Build a per-destination catalog of every place on 365tours.in.

The live site exposes each destination at destination-detail.php?id=365T_000XX and
stores that destination's assets under tour_images/365T_000XX/. This script:

  1. Reads the homepage A-Z directory to enumerate every destination (id -> name, flag).
  2. Visits each destination-detail page to extract metadata + the exact image set
     the page uses.
  3. Downloads every asset into  public/destinations/<name-slug>-<id>/
  4. Writes a per-destination  metadata.json  and a master  catalog.json .

Re-runnable: already-downloaded files are skipped.
"""
from __future__ import annotations

import json
import re
import time
from html import unescape
from pathlib import Path
from urllib.parse import urljoin, urlparse, unquote, quote
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "destinations"
CATALOG_PATH = OUT_DIR / "catalog.json"
MANIFEST_PATH = OUT_DIR / "manifest.json"
BASE = "https://365tours.in/"
HOME_URL = BASE
DETAIL_URL = BASE + "destination-detail.php?id={id}"
USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
REQUEST_DELAY = 0.4  # be polite to the origin server


def encode_url(url: str) -> str:
    """Percent-encode the path so spaces etc. in filenames are valid in a request."""
    p = urlparse(url)
    return p._replace(path=quote(p.path)).geturl()


def fetch_text(url: str, retries: int = 3) -> str:
    for attempt in range(retries):
        try:
            req = Request(encode_url(url), headers={"User-Agent": USER_AGENT})
            with urlopen(req, timeout=45) as resp:
                return resp.read().decode("utf-8", errors="ignore")
        except Exception:
            if attempt == retries - 1:
                raise
            time.sleep(2 * (attempt + 1))
    return ""


def fetch_bytes(url: str, retries: int = 3) -> bytes:
    for attempt in range(retries):
        try:
            req = Request(encode_url(url), headers={"User-Agent": USER_AGENT})
            with urlopen(req, timeout=60) as resp:
                return resp.read()
        except Exception:
            if attempt == retries - 1:
                raise
            time.sleep(2 * (attempt + 1))
    return b""


def clean_text(raw: str) -> str:
    txt = re.sub(r"<[^>]+>", "", raw)
    return re.sub(r"\s+", " ", unescape(txt)).strip()


def slugify(value: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return slug or "place"


def enumerate_destinations(home_html: str) -> list[dict]:
    """Return [{id, name, flag_url}] for every destination in the A-Z directory."""
    seen: dict[str, dict] = {}
    pattern = re.compile(
        r'destination-detail\.php\?id=(365T_\d+)"[^>]*>'
        r'(?:\s*<img[^>]*src="([^"]+)"[^>]*>)?'
        r'\s*<span>([^<]*)</span>',
        re.I,
    )
    for m in pattern.finditer(home_html):
        did, flag, name = m.group(1), m.group(2) or "", clean_text(m.group(3))
        if did in seen:
            continue
        seen[did] = {
            "id": did,
            "name": name,
            "flag_url": urljoin(BASE, flag) if flag else "",
        }
    return list(seen.values())


def parse_detail(did: str, html: str) -> dict:
    """Extract metadata + asset urls for one destination detail page."""
    # Display name: first <h2> is the destination name (e.g. VIETNAM)
    h2s = [clean_text(x) for x in re.findall(r"<h2[^>]*>(.*?)</h2>", html, re.S | re.I)]
    display_name = h2s[0] if h2s else ""

    # "<n> Signature Itineraries" (the number and label are split across tags,
    # so read it from the cleaned heading text)
    signature_count = None
    for h in h2s:
        sig = re.search(r"(\d+)\s*Signature Itineraries", h, re.I)
        if sig:
            signature_count = int(sig.group(1))
            break

    # DESTINATIONS OFFERED: list of regions/cities between the heading and the next icon
    offered: list[str] = []
    idx = html.find("DESTINATIONS OFFERED")
    if idx >= 0:
        block = html[idx: idx + 4000]
        # region names live inside the <ul> that follows the heading
        ul = re.search(r"DESTINATIONS OFFERED.*?(<ul.*?</ul>)", block, re.S | re.I)
        if ul:
            for a in re.findall(r"<(?:li|span|a)[^>]*>(.*?)</(?:li|span|a)>", ul.group(1), re.S | re.I):
                t = clean_text(a)
                if t and 1 < len(t) < 60:
                    offered.append(t)

    # All image assets that belong to this destination's own folder + generic gallery imgs
    assets: list[str] = []
    for m in re.findall(r'(?:src|data-src|data-lazy-src)="([^"]+)"', html, re.I):
        url = urljoin(BASE, m.strip())
        path = urlparse(url).path.lower()
        if f"tour_images/{did.lower()}/" in path and re.search(r"\.(jpg|jpeg|png|webp|gif)$", path):
            assets.append(url)
    # de-dup, preserve order
    assets = list(dict.fromkeys(assets))

    return {
        "display_name": display_name,
        "signature_itineraries": signature_count,
        "destinations_offered": list(dict.fromkeys(offered)),
        "asset_urls": assets,
    }


def download_assets(dest_dir: Path, urls: list[str]) -> list[dict]:
    dest_dir.mkdir(parents=True, exist_ok=True)
    saved: list[dict] = []
    for url in urls:
        name = Path(unquote(urlparse(url).path)).name
        name = re.sub(r"[^A-Za-z0-9._-]+", "_", name)
        target = dest_dir / name
        if not target.exists():
            try:
                target.write_bytes(fetch_bytes(url))
                time.sleep(REQUEST_DELAY)
            except Exception as exc:  # noqa: BLE001
                print(f"    ! failed {url}: {exc}")
                continue
        saved.append({
            "file": name,
            "path": str(target.relative_to(ROOT)).replace("\\", "/"),
            "source_url": url,
        })
    return saved


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    print("Fetching homepage directory ...")
    home_html = fetch_text(HOME_URL)
    destinations = enumerate_destinations(home_html)
    print(f"Found {len(destinations)} destinations.")

    catalog: list[dict] = []
    flat_manifest: list[dict] = []

    for i, base in enumerate(destinations, 1):
        did = base["id"]
        name = base["name"]
        print(f"[{i}/{len(destinations)}] {did}  {name}")
        try:
            detail_html = fetch_text(DETAIL_URL.format(id=did))
            time.sleep(REQUEST_DELAY)
        except Exception as exc:  # noqa: BLE001
            print(f"    ! detail page failed: {exc}")
            detail_html = ""

        meta = parse_detail(did, detail_html) if detail_html else {
            "display_name": name, "signature_itineraries": None,
            "destinations_offered": [], "asset_urls": [],
        }

        display = meta["display_name"] or name
        slug = f"{slugify(name or display)}-{did}"
        dest_dir = OUT_DIR / slug

        asset_urls = list(meta["asset_urls"])
        if base["flag_url"]:
            asset_urls.append(base["flag_url"])
        asset_urls = list(dict.fromkeys(asset_urls))

        images = download_assets(dest_dir, asset_urls)
        flag_file = ""
        if base["flag_url"]:
            fname = re.sub(r"[^A-Za-z0-9._-]+", "_", Path(unquote(urlparse(base["flag_url"]).path)).name)
            if (dest_dir / fname).exists():
                flag_file = fname

        record = {
            "id": did,
            "name": name,
            "display_name": display,
            "slug": slug,
            "detail_url": DETAIL_URL.format(id=did),
            "flag_file": flag_file,
            "signature_itineraries": meta["signature_itineraries"],
            "destinations_offered": meta["destinations_offered"],
            "folder": str(dest_dir.relative_to(ROOT)).replace("\\", "/"),
            "image_count": len(images),
            "images": images,
        }
        catalog.append(record)
        (dest_dir / "metadata.json").write_text(json.dumps(record, indent=2), encoding="utf-8")

        for img in images:
            flat_manifest.append({
                "destination_id": did,
                "destination_name": name,
                "slug": slug,
                "file": img["file"],
                "saved_path": img["path"],
                "source_url": img["source_url"],
            })
        print(f"    -> {len(images)} assets, {len(meta['destinations_offered'])} regions")

    CATALOG_PATH.write_text(json.dumps(catalog, indent=2), encoding="utf-8")
    MANIFEST_PATH.write_text(json.dumps(flat_manifest, indent=2), encoding="utf-8")
    total_imgs = sum(r["image_count"] for r in catalog)
    print(f"\nDone. {len(catalog)} destinations, {total_imgs} assets.")
    print(f"Catalog:  {CATALOG_PATH.relative_to(ROOT)}")
    print(f"Manifest: {MANIFEST_PATH.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
