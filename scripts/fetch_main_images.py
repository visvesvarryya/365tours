"""Fetch each destination's real hero image (main_image.jpg) from 365tours.in.

The original destination pages use tour_images/<id>/main_image.jpg as the big hero image
— a distinct shot from the gallery photos. Our scraper missed it (it's a CSS background),
so heroes fell back to gallery[0]. This downloads + optimises main_image.jpg for every
destination and records it in lib/catalog-images.json as `mainImage`.

Run:  python scripts/fetch_main_images.py
"""
from __future__ import annotations

import json
import time
from io import BytesIO
from pathlib import Path
from urllib.request import Request, urlopen

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "public" / "destinations" / "catalog.json"
IMG_DATA = ROOT / "lib" / "catalog-images.json"
WEB = ROOT / "public" / "destinations-web"
SRC = "https://365tours.in/tour_images/{id}/main_image.jpg"
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0 Safari/537.36"
MAX_EDGE = 1600
QUALITY = 74


def fetch(url: str) -> bytes | None:
    try:
        with urlopen(Request(url, headers={"User-Agent": UA}), timeout=45) as r:
            if r.status != 200:
                return None
            return r.read()
    except Exception:
        return None


def main() -> None:
    catalog = json.loads(CATALOG.read_text(encoding="utf-8"))
    data = json.loads(IMG_DATA.read_text(encoding="utf-8"))
    id_to_slug = {e["id"]: slug for slug, e in data.items()}

    got = missing = 0
    for i, d in enumerate(catalog, 1):
        did = d["id"]
        slug = id_to_slug.get(did)
        if not slug:
            continue
        base = d["folder"].split("/")[-1]  # e.g. kenya-365T_00007
        raw = fetch(SRC.format(id=did))
        time.sleep(0.3)
        if not raw:
            missing += 1
            print(f"[{i}/{len(catalog)}] {did} {d['name']:16s} — no main_image")
            continue
        try:
            img = ImageOps.exif_transpose(Image.open(BytesIO(raw))).convert("RGB")
            if max(img.size) > MAX_EDGE:
                img.thumbnail((MAX_EDGE, MAX_EDGE), Image.LANCZOS)
            out = WEB / base / "main_image.jpg"
            out.parent.mkdir(parents=True, exist_ok=True)
            img.save(out, "JPEG", quality=QUALITY, optimize=True, progressive=True)
            data[slug]["mainImage"] = f"/destinations-web/{base}/main_image.jpg"
            got += 1
            print(f"[{i}/{len(catalog)}] {did} {d['name']:16s} ok  {out.stat().st_size//1024}KB  {img.size}")
        except Exception as e:  # noqa: BLE001
            missing += 1
            print(f"[{i}/{len(catalog)}] {did} {d['name']:16s} — bad image ({e})")

    IMG_DATA.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"\nDone. {got} main images downloaded, {missing} missing -> lib/catalog-images.json")


if __name__ == "__main__":
    main()
