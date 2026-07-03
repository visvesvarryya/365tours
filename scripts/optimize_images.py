"""Create web-optimised copies of the scraped destination photos.

Originals in  public/destinations/  are left UNTOUCHED. Optimised copies are written
to  public/destinations-web/  (same folder structure). The site serves the -web copies;
the originals are kept as an archive.

The scraped JPEGs are a sensible 800x533 but very heavily weighted (avg ~470 KB, some
1 MB) due to poor source compression. This re-encodes them (progressive, optimise,
quality 72, max edge 1280) — typically 5-8x smaller with no visible loss. Flags and any
non-JPEG assets are copied across unchanged so every referenced path still resolves.

Run:  python scripts/optimize_images.py
"""
from __future__ import annotations

import shutil
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "destinations"
OUT = ROOT / "public" / "destinations-web"
MAX_EDGE = 1280
QUALITY = 72


def main() -> None:
    total_before = total_after = 0
    jpg_count = copy_count = 0

    for p in sorted(SRC.rglob("*")):
        if p.is_dir():
            continue
        rel = p.relative_to(SRC)
        dst = OUT / rel
        dst.parent.mkdir(parents=True, exist_ok=True)

        if p.suffix.lower() in (".jpg", ".jpeg"):
            before = p.stat().st_size
            try:
                img = ImageOps.exif_transpose(Image.open(p))
                if max(img.size) > MAX_EDGE:
                    img.thumbnail((MAX_EDGE, MAX_EDGE), Image.LANCZOS)
                img.convert("RGB").save(
                    dst, "JPEG", quality=QUALITY, optimize=True, progressive=True
                )
            except Exception as exc:  # noqa: BLE001
                print(f"  ! {rel}: {exc}")
                shutil.copy2(p, dst)
            total_before += before
            total_after += dst.stat().st_size
            jpg_count += 1
        else:
            # flags (.png) and anything else: copy unchanged
            shutil.copy2(p, dst)
            copy_count += 1

    print(f"Optimised {jpg_count} JPEGs, copied {copy_count} other files")
    print(f"  originals: {total_before/1e6:.1f} MB  ->  web: {total_after/1e6:.1f} MB")
    if total_before:
        print(f"  saved:     {(1 - total_after/total_before)*100:.0f}%")
        print(f"  new avg:   {total_after/max(1,jpg_count)/1024:.0f} KB/image")
    print(f"  originals preserved in: {SRC.relative_to(ROOT)}")
    print(f"  web copies written to:  {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
