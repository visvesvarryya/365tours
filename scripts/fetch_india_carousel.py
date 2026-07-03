"""Fetch iconic India photos (openly-licensed, Wikimedia Commons) for the India-page
carousel. Saves to public/india/carousel/ with attribution in carousel-credits.json.

Run:  python scripts/fetch_india_carousel.py
"""
from __future__ import annotations

import json
import re
import ssl
import sys
import urllib.parse
import urllib.request
from io import BytesIO
from pathlib import Path

from PIL import Image

try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "india" / "carousel"
API = "https://commons.wikimedia.org/w/api.php"
UA = "365ToursSiteBuilder/1.0 (https://365tours.in; tours@365tours.in)"
CTX = ssl.create_default_context()

# slug -> (caption, search terms)
SHOTS = [
    ("taj-mahal", "Taj Mahal, Agra", ["Taj Mahal Agra morning", "Taj Mahal reflection", "Taj Mahal"]),
    ("golden-temple", "Golden Temple, Amritsar", ["Golden Temple Amritsar night", "Harmandir Sahib Amritsar", "Golden Temple Amritsar"]),
    ("varanasi", "Ghats of Varanasi", ["Varanasi ghats Ganges", "Dashashwamedh Ghat Varanasi", "Varanasi river front"]),
    ("kerala-munnar", "Tea Hills of Munnar", ["Munnar tea plantation Kerala", "Munnar tea gardens", "Munnar hills"]),
    ("jaipur-amber", "Amber Fort, Jaipur", ["Amber Fort Jaipur", "Amer Fort Jaipur", "Amber Palace Jaipur"]),
    ("mysore-palace", "Mysore Palace", ["Mysore Palace illuminated", "Mysore Palace", "Amba Vilas Palace Mysore"]),
    ("ladakh-thiksey", "Himalayan Monasteries, Ladakh", ["Thiksey Monastery Ladakh", "Ladakh monastery", "Diskit Monastery Ladakh"]),
    ("goa-beach", "Beaches of Goa", ["Palolem beach Goa", "Goa beach palm", "Goa coastline beach"]),
]


def api_get(params: dict) -> dict:
    url = API + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=45, context=CTX) as r:
        return json.loads(r.read().decode("utf-8", "ignore"))


def clean(html: str) -> str:
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", html or "")).strip()


def search_image(term: str):
    data = api_get({
        "action": "query", "format": "json", "generator": "search",
        "gsrsearch": term, "gsrnamespace": "6", "gsrlimit": "8",
        "prop": "imageinfo", "iiprop": "url|size|extmetadata", "iiurlwidth": "1600",
    })
    pages = (data.get("query") or {}).get("pages") or {}
    best = None
    for p in pages.values():
        info = (p.get("imageinfo") or [{}])[0]
        w, h = info.get("width", 0), info.get("height", 0)
        thumb = info.get("thumburl", "")
        url = info.get("url", "")
        if not thumb or not url.lower().endswith((".jpg", ".jpeg", ".png")):
            continue
        if w < 1200 or w <= h:  # want wide, high-res for a full-bleed carousel
            continue
        meta = info.get("extmetadata", {})
        author = clean(meta.get("Artist", {}).get("value", "")) or "Wikimedia Commons"
        lic = clean(meta.get("LicenseShortName", {}).get("value", "")) or "CC"
        cand = {"thumb": thumb, "desc": info.get("descriptionurl", url),
                "author": author[:80], "license": lic, "rank": p.get("index", 99)}
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
    for slug, caption, terms in SHOTS:
        pick = None
        for t in terms:
            try:
                pick = search_image(t)
            except Exception as e:  # noqa: BLE001
                print(f"  ! {slug} '{t}': {e}")
            if pick:
                break
        if not pick:
            print(f"  !! {slug}: not found")
            continue
        try:
            img = download(pick["thumb"])
        except Exception as e:  # noqa: BLE001
            print(f"  !! {slug}: download failed {e}")
            continue
        img.thumbnail((1600, 1600), Image.LANCZOS)
        path = OUT / f"{slug}.jpg"
        img.save(path, "JPEG", quality=76, optimize=True, progressive=True)
        credits.append({
            "slug": slug, "caption": caption,
            "author": pick["author"], "license": pick["license"], "source": pick["desc"],
        })
        print(f"  ok {slug:16s} {caption:28s} by {pick['author'][:34]} ({pick['license']}) {path.stat().st_size//1024}KB")
    (OUT / "carousel-credits.json").write_text(json.dumps(credits, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"\nDone. {len(credits)}/{len(SHOTS)} carousel photos -> {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
