"""Fetch real, openly-licensed India destination photos from Wikimedia Commons.

For each India region we query the Commons API, pick the best landscape candidate,
download a ~1200px JPEG into public/india/ (self-hosted, no external calls at runtime)
and record attribution (author + license + source URL) into public/india/credits.json
so the site can credit each photo properly.

Run:  python scripts/fetch_india_images.py
"""
from __future__ import annotations

import json
import re
import ssl
import urllib.parse
import urllib.request
from io import BytesIO
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "india"
API = "https://commons.wikimedia.org/w/api.php"
UA = "365ToursSiteBuilder/1.0 (https://365tours.in; tours@365tours.in)"
CTX = ssl.create_default_context()

# region slug -> (display name, short desc, search terms in priority order)
REGIONS = [
    ("rajasthan", "Rajasthan", "Palaces, forts, deserts & camel safaris",
     ["Hawa Mahal Jaipur", "Amber Fort Jaipur", "Mehrangarh Fort Jodhpur"]),
    ("kerala", "Kerala", "Backwaters, houseboats & spice gardens",
     ["Kerala backwaters houseboat", "Alleppey backwaters", "Kerala backwaters"]),
    ("tamil-nadu", "Tamil Nadu", "Dravidian temples, hill stations & coasts",
     ["Meenakshi Amman Temple Madurai", "Brihadeeswarar Temple Thanjavur", "Airavatesvara Temple"]),
    ("himalayas", "Himalayas & North", "Ladakh, Kashmir, Manali & spiritual trails",
     ["Pangong Tso Ladakh", "Dal Lake Srinagar", "Nubra Valley Ladakh"]),
    ("gujarat", "Gujarat", "Rann of Kutch, lions & heritage crafts",
     ["Rann of Kutch white desert", "Great Rann of Kutch", "Rani ki vav Patan"]),
    ("wildlife", "Wildlife & Tigers", "Ranthambore, Bandhavgarh & Jim Corbett",
     ["Bengal tiger Ranthambore", "Bengal tiger India", "Royal Bengal tiger"]),
    ("northeast", "Northeast India", "Meghalaya, Assam, Arunachal & Sikkim",
     ["Nohkalikai Falls Meghalaya", "Living root bridge Meghalaya", "Kaziranga National Park"]),
    ("andaman", "Andaman & Nicobar", "Crystal waters, coral reefs & island life",
     ["Radhanagar Beach Havelock", "Havelock Island beach", "Andaman Islands beach"]),
]


def api_get(params: dict) -> dict:
    url = API + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=45, context=CTX) as r:
        return json.loads(r.read().decode("utf-8", "ignore"))


def clean(html: str) -> str:
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", html or "")).strip()


def search_image(term: str):
    """Return (thumburl, descurl, author, license) for the best landscape match."""
    data = api_get({
        "action": "query", "format": "json", "generator": "search",
        "gsrsearch": term, "gsrnamespace": "6", "gsrlimit": "8",
        "prop": "imageinfo", "iiprop": "url|size|extmetadata", "iiurlwidth": "1280",
    })
    pages = (data.get("query") or {}).get("pages") or {}
    best = None
    for p in pages.values():
        info = (p.get("imageinfo") or [{}])[0]
        w, h = info.get("width", 0), info.get("height", 0)
        url = info.get("url", "")
        thumb = info.get("thumburl", "")
        if not thumb or not url.lower().endswith((".jpg", ".jpeg", ".png")):
            continue
        if w < 900 or w <= h:  # want decent, landscape
            continue
        meta = info.get("extmetadata", {})
        author = clean(meta.get("Artist", {}).get("value", "")) or "Wikimedia Commons"
        lic = clean(meta.get("LicenseShortName", {}).get("value", "")) or "CC"
        rank = p.get("index", 99)
        cand = {"thumb": thumb, "desc": info.get("descriptionurl", url),
                "author": author[:80], "license": lic, "rank": rank, "w": w}
        if best is None or cand["rank"] < best["rank"]:
            best = cand
    return best


def download(url: str) -> Image.Image:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60, context=CTX) as r:
        return Image.open(BytesIO(r.read())).convert("RGB")


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    credits = []
    for slug, name, desc, terms in REGIONS:
        pick = None
        used_term = ""
        for t in terms:
            try:
                pick = search_image(t)
            except Exception as e:  # noqa: BLE001
                print(f"  ! {slug} '{t}': {e}")
                pick = None
            if pick:
                used_term = t
                break
        if not pick:
            print(f"  !! {slug}: no image found")
            continue
        try:
            img = download(pick["thumb"])
        except Exception as e:  # noqa: BLE001
            print(f"  !! {slug}: download failed {e}")
            continue
        # cover-crop to 4:3 and save optimised
        img.thumbnail((1280, 1280), Image.LANCZOS)
        path = OUT / f"{slug}.jpg"
        img.save(path, "JPEG", quality=74, optimize=True, progressive=True)
        credits.append({
            "slug": slug, "name": name, "desc": desc,
            "author": pick["author"], "license": pick["license"],
            "source": pick["desc"],
        })
        print(f"  ok {slug:12s} <- '{used_term}'  by {pick['author'][:40]} ({pick['license']}) {path.stat().st_size//1024}KB")
    (OUT / "credits.json").write_text(json.dumps(credits, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"\nDone. {len(credits)}/{len(REGIONS)} images -> {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
