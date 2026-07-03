"""Bridge the scraped catalog into the site's data layer.

Reads public/destinations/catalog.json (91 real destinations with real images) and
the editorial copy in lib/destinations.ts (name -> slug), then emits
lib/catalog-images.json mapping each editorial slug to its real local image paths,
flag, catalog id and regions offered. destinations.ts merges this at load time.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "public" / "destinations" / "catalog.json"
LIB = ROOT / "lib" / "destinations.ts"
OUT = ROOT / "lib" / "catalog-images.json"


def norm(s: str) -> str:
    return re.sub(r"[^a-z0-9]", "", s.lower())


def public_path(folder: str, file: str) -> str:
    # folder is like "public/destinations/vietnam-365T_00002".
    # The site serves the web-optimised copies from public/destinations-web/.
    base = folder.split("/")[-1]
    return f"/destinations-web/{base}/{file}"


def main() -> None:
    catalog = json.loads(CATALOG.read_text(encoding="utf-8"))
    lib_txt = LIB.read_text(encoding="utf-8")

    # editorial name -> slug (pair appears on consecutive lines)
    pairs = re.findall(r'name:\s*"([^"]+)",\s*\n\s*slug:\s*"([^"]+)"', lib_txt)
    name_to_slug = {norm(n): s for n, s in pairs}

    data: dict[str, dict] = {}
    unmatched = []
    for d in catalog:
        slug = name_to_slug.get(norm(d["name"]))
        if not slug:
            unmatched.append(d["name"])
            continue
        files = [img["file"] for img in d["images"]]
        gallery = [
            public_path(d["folder"], f)
            for f in files
            if f.lower().endswith((".jpg", ".jpeg")) and "recipebook" not in f.lower()
        ]
        recipe = [public_path(d["folder"], f) for f in files if "recipebook" in f.lower()]
        flag = next(
            (public_path(d["folder"], f) for f in files if "flag" in f.lower()), ""
        )
        data[slug] = {
            "id": d["id"],
            "gallery": gallery,
            "recipeImage": recipe[0] if recipe else "",
            "flag": flag,
            "regions": d.get("destinations_offered", []),
        }

    OUT.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
    total_imgs = sum(len(v["gallery"]) for v in data.values())
    print(f"Wrote {OUT.relative_to(ROOT)}")
    print(f"  {len(data)} destinations matched, {total_imgs} gallery images")
    print(f"  destinations with 0 gallery images: "
          f"{[s for s, v in data.items() if not v['gallery']]}")
    if unmatched:
        print(f"  UNMATCHED catalog names: {unmatched}")


if __name__ == "__main__":
    main()
