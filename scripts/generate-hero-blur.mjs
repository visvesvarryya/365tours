// One-off/regenerable script: builds tiny base64 blur placeholders for every
// hero image (homepage carousel, India hero carousel, destination pages,
// India state pages) so next/image can show a blurred preview instantly
// instead of a flat placeholder while the full photo loads.
//
// Run with: node scripts/generate-hero-blur.mjs
// Output: lib/hero-blur.json — { "<src or url>": "data:image/webp;base64,..." }

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { globSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const OUT_FILE = path.join(ROOT, "lib", "hero-blur.json");

function collectLocalSources() {
  const patterns = [
    "hero/*.jpg",
    "india/hero/*.jpg",
    "india/states/*/hero.jpg",
  ];
  const sources = [];
  for (const pattern of patterns) {
    for (const abs of globSync(path.join(PUBLIC, pattern))) {
      const rel = "/" + path.relative(PUBLIC, abs).split(path.sep).join("/");
      sources.push({ src: rel, abs });
    }
  }
  return sources;
}

function collectRemoteSources() {
  const content = readFileSync(path.join(ROOT, "lib", "destinations.ts"), "utf8");
  const urls = [...content.matchAll(/heroImage:\s*"([^"]+)"/g)].map((m) => m[1]);
  return [...new Set(urls)].filter((u) => u.startsWith("http"));
}

async function toBlurDataURL(buffer) {
  const resized = await sharp(buffer)
    .resize(16, null, { fit: "inside" })
    .webp({ quality: 40 })
    .toBuffer();
  return `data:image/webp;base64,${resized.toString("base64")}`;
}

async function main() {
  /** @type {Record<string, string>} */
  const out = existsSync(OUT_FILE) ? JSON.parse(readFileSync(OUT_FILE, "utf8")) : {};

  const local = collectLocalSources();
  for (const { src, abs } of local) {
    process.stdout.write(`local  ${src} ... `);
    const buffer = readFileSync(abs);
    out[src] = await toBlurDataURL(buffer);
    console.log("done");
  }

  const remote = collectRemoteSources();
  let i = 0;
  for (const url of remote) {
    i += 1;
    process.stdout.write(`remote [${i}/${remote.length}] ${url.slice(0, 70)} ... `);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buffer = Buffer.from(await res.arrayBuffer());
      out[url] = await toBlurDataURL(buffer);
      console.log("done");
    } catch (err) {
      console.log(`SKIPPED (${err.message})`);
    }
  }

  writeFileSync(OUT_FILE, JSON.stringify(out, null, 2) + "\n");
  console.log(`\nWrote ${Object.keys(out).length} blur placeholders to ${path.relative(ROOT, OUT_FILE)}`);
}

main();
