"""Scrape each destination's signature-itinerary captions (Number of days + Places
covered) from 365tours.in and merge them into lib/catalog-images.json.

On the original site every itinerary photo has:
    <div class="content">
       <div class="title">4 Days</div>
       <div class="description">Hanoi<br> Ha Long Bay</div>
    </div>
We attach that {days, places} to each gallery image so the destination pages can show
it again.

Run:  python scripts/scrape_itineraries.py
"""
from __future__ import annotations

import json
import re
import time
from html import unescape
from pathlib import Path
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "public" / "destinations" / "catalog.json"
IMG_DATA = ROOT / "lib" / "catalog-images.json"
DETAIL = "https://365tours.in/destination-detail.php?id={id}"
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0 Safari/537.36"

ITEM_RE = re.compile(
    r'<div class="item">.*?<img[^>]+src="([^"]+)".*?'
    r'<div class="title">(.*?)</div>\s*<div class="description">(.*?)</div>',
    re.S | re.I,
)


def fetch(url: str, retries: int = 3) -> str:
    for a in range(retries):
        try:
            with urlopen(Request(url, headers={"User-Agent": UA}), timeout=45) as r:
                return r.read().decode("utf-8", "ignore")
        except Exception:
            if a == retries - 1:
                return ""
            time.sleep(2)
    return ""


def clean(s: str) -> str:
    return re.sub(r"\s+", " ", unescape(re.sub(r"<[^>]+>", "", s))).strip()


def parse_meta(html: str) -> dict:
    """filename -> {days, places[]}"""
    out: dict[str, dict] = {}
    for src, title, desc in ITEM_RE.findall(html):
        fname = src.split("/")[-1].strip()
        days = clean(title)
        places = [clean(p) for p in re.split(r"<br\s*/?>", desc) if clean(p)]
        if fname and fname not in out:
            out[fname] = {"days": days, "places": places}
    return out


def main() -> None:
    catalog = json.loads(CATALOG.read_text(encoding="utf-8"))
    data = json.loads(IMG_DATA.read_text(encoding="utf-8"))

    # id -> {filename: {days, places}}
    id_to_slug = {d["id"]: None for d in catalog}
    for slug, entry in data.items():
        id_to_slug[entry["id"]] = slug

    total_with_meta = 0
    for i, d in enumerate(catalog, 1):
        did = d["id"]
        slug = id_to_slug.get(did)
        if not slug or slug not in data:
            continue
        html = fetch(DETAIL.format(id=did))
        time.sleep(0.3)
        meta = parse_meta(html)
        entry = data[slug]
        itineraries = []
        for path in entry["gallery"]:
            fname = path.split("/")[-1]
            m = meta.get(fname, {})
            itineraries.append({
                "src": path,
                "days": m.get("days", ""),
                "places": m.get("places", []),
            })
        entry["itineraries"] = itineraries
        got = sum(1 for it in itineraries if it["days"] or it["places"])
        total_with_meta += got
        print(f"[{i}/{len(catalog)}] {did} {d['name']:16s} {got}/{len(itineraries)} with days/places")

    IMG_DATA.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"\nDone. {total_with_meta} images tagged with days/places -> {IMG_DATA.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
