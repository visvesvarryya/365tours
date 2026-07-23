// Bakes country display names into lib/country-names.json at build/dev time
// instead of calling Intl.DisplayNames in the app itself. Node's ICU data and
// a browser's ICU data can disagree on a country's name (e.g. Node says
// "Falkland Islands", Chrome says "Falkland Islands (Islas Malvinas)"), which
// breaks SSR/hydration the moment server and client render different text for
// the same node. A static file read by both sides sidesteps that entirely.
//
// Run with: node scripts/generate-country-names.mjs

import { writeFileSync } from "node:fs";
import path from "node:path";
import { getCountries } from "libphonenumber-js/min";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_FILE = path.join(ROOT, "lib", "country-names.json");

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
const names = {};
for (const iso2 of getCountries()) {
  names[iso2] = regionNames.of(iso2) || iso2;
}

writeFileSync(OUT_FILE, JSON.stringify(names, null, 2) + "\n");
console.log(`Wrote ${Object.keys(names).length} country names to ${path.relative(ROOT, OUT_FILE)}`);
