"""Generate Google Ads retargeting creatives from the scraped destination photos.

Produces branded banner ads in every standard Google Ads uploaded-display size, plus
responsive-display assets (landscape + square + logo), for a handful of hero
destinations. Output goes to  public/retargeting-creatives/  organised by size, ready
to upload to Google Ads (Display > Uploaded ads / Responsive display ads).

Run:  python scripts/generate_creatives.py
"""
from __future__ import annotations

import json
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
IMG_DATA = ROOT / "lib" / "catalog-images.json"
OUT = PUBLIC / "retargeting-creatives"

# Brand palette
TEAL = (35, 104, 111)        # brand-500 #23686f
TEAL_DARK = (19, 47, 51)
AMBER = (245, 158, 11)       # CTA #F59E0B
WHITE = (255, 255, 255)
INK = (23, 23, 23)

# Hero destinations to build creatives for (slug -> headline)
HEROES = {
    "maldives": "Overwater Escapes in the Maldives",
    "egypt": "Pharaohs, Pyramids & the Nile",
    "kenya": "Safari Across the Masai Mara",
    "japan": "Temples, Blossoms & Bullet Trains",
    "greece": "Island Sunsets in Greece",
    "iceland": "Northern Lights & Glaciers",
    "jordan": "Petra & the Wadi Rum Desert",
    "vietnam": "Lantern-lit Hoi An & Ha Long Bay",
}

# Standard Google Ads uploaded-display sizes (w, h)
SIZES = [
    (300, 250), (336, 280), (728, 90), (300, 600), (160, 600),
    (320, 50), (320, 100), (250, 250), (200, 200), (970, 250),
    (468, 60), (250, 360), (580, 400),
]
# Responsive display asset sizes (landscape 1.91:1, square 1:1)
RESPONSIVE = [(1200, 628), (1200, 1200)]

TAGLINE = "365 TOURS"
SUB = "Explore · Experience · Evolve"
STATS = "100 Countries · 1500+ Destinations"
CTA = "Plan Your Trip"

FONT_DIR = Path("C:/Windows/Fonts")


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    for candidate in (name, "arialbd.ttf", "arial.ttf"):
        p = FONT_DIR / candidate
        if p.exists():
            try:
                return ImageFont.truetype(str(p), size)
            except Exception:
                continue
    return ImageFont.load_default()


def bold(size: int):
    return font("georgiab.ttf", size)


def sans(size: int):
    return font("arialbd.ttf", size)


def sans_reg(size: int):
    return font("arial.ttf", size)


def cover(img: Image.Image, w: int, h: int) -> Image.Image:
    """Resize + centre-crop the photo to exactly fill w x h."""
    src_ratio = img.width / img.height
    dst_ratio = w / h
    if src_ratio > dst_ratio:
        new_h = h
        new_w = int(h * src_ratio)
    else:
        new_w = w
        new_h = int(w / src_ratio)
    img = img.resize((new_w, new_h), Image.LANCZOS)
    left = (new_w - w) // 2
    top = (new_h - h) // 2
    return img.crop((left, top, left + w, top + h))


def gradient_overlay(w: int, h: int, vertical: bool = True) -> Image.Image:
    """Dark gradient for text legibility (stronger toward one edge)."""
    grad = Image.new("L", (1, h) if vertical else (w, 1))
    n = h if vertical else w
    for i in range(n):
        t = i / max(1, n - 1)
        # darker at bottom / right
        grad.putpixel((0, i) if vertical else (i, 0), int(60 + 150 * t))
    grad = grad.resize((w, h))
    black = Image.new("RGBA", (w, h), (10, 20, 22, 255))
    black.putalpha(grad)
    return black


def fit_text(draw, text, fnt_factory, max_w, start_size, min_size=10):
    size = start_size
    while size > min_size:
        f = fnt_factory(size)
        if draw.textlength(text, font=f) <= max_w:
            return f
        size -= 2
    return fnt_factory(min_size)


def wrap(draw, text, f, max_w):
    words = text.split()
    lines, cur = [], ""
    for wd in words:
        test = (cur + " " + wd).strip()
        if draw.textlength(test, font=f) <= max_w or not cur:
            cur = test
        else:
            lines.append(cur)
            cur = wd
    if cur:
        lines.append(cur)
    return lines


def rounded_button(draw, xy, text, f, pad_x, pad_y):
    x, y = xy
    tw = draw.textlength(text, font=f)
    ascent, descent = f.getmetrics()
    th = ascent + descent
    w = tw + pad_x * 2
    h = th + pad_y * 2
    r = h // 2
    draw.rounded_rectangle([x, y, x + w, y + h], radius=r, fill=AMBER)
    draw.text((x + pad_x, y + pad_y - 1), text, font=f, fill=INK)
    return w, h


def make_creative(photo: Image.Image, w: int, h: int, headline: str) -> Image.Image:
    base = cover(photo, w, h).convert("RGBA")
    # global darken for consistent contrast
    base = Image.alpha_composite(base, Image.new("RGBA", (w, h), (8, 16, 18, 90)))
    base = Image.alpha_composite(base, gradient_overlay(w, h, vertical=True))
    draw = ImageDraw.Draw(base)

    scale = min(w, h)
    strip = h < 120                      # thin banners: single-line horizontal
    narrow = w < 200                     # skyscrapers
    pad = max(8, int(scale * 0.06))

    # Brand wordmark (top-left)
    brand_size = max(12, int(scale * (0.16 if strip else 0.11)))
    if narrow:
        brand_size = max(12, int(w * 0.16))
    bf = bold(brand_size)

    if strip:
        # horizontal: brand | headline ....... [CTA]
        draw.text((pad, (h - brand_size) // 2 - 2), TAGLINE, font=bf, fill=WHITE)
        brand_w = draw.textlength(TAGLINE, font=bf)
        cta_f = sans(max(11, int(h * 0.34)))
        cw = draw.textlength(CTA, font=cta_f) + int(h * 0.5)
        ch = int(h * 0.62)
        bx = w - cw - pad
        by = (h - ch) // 2
        draw.rounded_rectangle([bx, by, bx + cw, by + ch], radius=ch // 2, fill=AMBER)
        draw.text((bx + int(h * 0.25), by + (ch - cta_f.getmetrics()[0]) // 2 - 1), CTA, font=cta_f, fill=INK)
        # headline in the middle if room
        hl_x = pad + int(brand_w) + pad
        avail = bx - hl_x - pad
        if avail > 60:
            hf = fit_text(draw, "Private Custom Tours", sans, avail, max(12, int(h * 0.4)))
            draw.text((hl_x, (h - hf.getmetrics()[0]) // 2 - 1), "Private Custom Tours", font=hf, fill=WHITE)
        return base.convert("RGB")

    # Standard / vertical: content stacked at the bottom
    draw.text((pad, pad), TAGLINE, font=bf, fill=WHITE)
    draw.rectangle(
        [pad, pad + brand_size + 4, pad + int(brand_size * 1.6), pad + brand_size + 7],
        fill=AMBER,
    )
    brand_bottom = pad + brand_size + 12

    max_text_w = w - pad * 2
    # Stats line: only if there's vertical room AND it fits the width (shrink to fit).
    show_stats = h >= 300
    sub_f = sans_reg(max(10, int(scale * 0.07)))
    if show_stats:
        s = max(10, int(scale * 0.07))
        while s > 10 and draw.textlength(STATS, font=sans_reg(s)) > max_text_w:
            s -= 1
        sub_f = sans_reg(s)
        if draw.textlength(STATS, font=sub_f) > max_text_w:
            show_stats = False
    stats_h = (sub_f.getmetrics()[0] + 8) if show_stats else 0
    cta_f = sans(max(12, int(scale * 0.10)))
    cta_pad_y = max(4, int(scale * 0.05))
    cta_btn_h = cta_f.getmetrics()[0] + cta_f.getmetrics()[1] + cta_pad_y * 2
    gap = int(scale * 0.06)

    # Shrink the headline until the whole bottom block clears the brand wordmark.
    head_size = max(13, int(scale * (0.13 if not narrow else 0.15)))
    while head_size > 13:
        hf = bold(head_size)
        lines = wrap(draw, headline, hf, max_text_w)
        line_h = int(head_size * 1.16)
        block_h = stats_h + len(lines) * line_h + gap + cta_btn_h
        if h - pad - block_h >= brand_bottom:
            break
        head_size -= 2
    hf = bold(head_size)
    lines = wrap(draw, headline, hf, max_text_w)
    line_h = int(head_size * 1.16)
    block_h = stats_h + len(lines) * line_h + gap + cta_btn_h

    y = h - pad - block_h
    if show_stats:
        draw.text((pad, y), STATS, font=sub_f, fill=WHITE)
        y += sub_f.getmetrics()[0] + 8
    for ln in lines:
        draw.text((pad, y), ln, font=hf, fill=WHITE)
        y += line_h
    y += gap
    rounded_button(draw, (pad, y), CTA + "  →", cta_f, int(scale * 0.09), cta_pad_y)

    return base.convert("RGB")


def save_optimised(img: Image.Image, path: Path, max_kb: int = 150):
    """Save as JPEG under max_kb (Google uploaded-ad limit); PNG for responsive."""
    path.parent.mkdir(parents=True, exist_ok=True)
    q = 88
    while q >= 40:
        img.save(path, "JPEG", quality=q, optimize=True)
        if path.stat().st_size <= max_kb * 1024:
            return
        q -= 6
    # accept best effort at q=40


def main():
    data = json.loads(IMG_DATA.read_text(encoding="utf-8"))
    if OUT.exists():
        for p in OUT.rglob("*"):
            if p.is_file():
                p.unlink()
    OUT.mkdir(parents=True, exist_ok=True)

    made = 0
    for slug, headline in HEROES.items():
        entry = data.get(slug)
        if not entry or not entry["gallery"]:
            print(f"skip {slug}: no image")
            continue
        # pick a mid-gallery photo (often more scenic than the first)
        gal = entry["gallery"]
        rel = gal[min(1, len(gal) - 1)].lstrip("/")
        photo_path = PUBLIC / rel
        if not photo_path.exists():
            print(f"skip {slug}: missing {photo_path}")
            continue
        photo = Image.open(photo_path).convert("RGB")

        for (w, h) in SIZES:
            out = OUT / f"{w}x{h}" / f"{slug}_{w}x{h}.jpg"
            save_optimised(make_creative(photo, w, h, headline), out, max_kb=150)
            made += 1
        for (w, h) in RESPONSIVE:
            out = OUT / "responsive" / f"{slug}_{w}x{h}.jpg"
            save_optimised(make_creative(photo, w, h, headline), out, max_kb=1024)
            made += 1
        print(f"  {slug}: {len(SIZES) + len(RESPONSIVE)} creatives")

    print(f"\nDone. {made} creatives in {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
