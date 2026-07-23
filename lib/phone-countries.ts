import { getCountries, getCountryCallingCode, type CountryCode } from "libphonenumber-js/min";
import countryNames from "./country-names.json";

export type CountryOption = { iso2: CountryCode; name: string; dialCode: string };

// Baked in at build time (see scripts/generate-country-names.mjs) rather than
// calling Intl.DisplayNames at runtime: Node's ICU data and a browser's ICU
// data can disagree on a country's display name (e.g. Node says "Falkland
// Islands", Chrome says "Falkland Islands (Islas Malvinas)"), which breaks
// SSR/hydration the moment they differ. A static file is byte-identical on
// both sides no matter which engine renders it.
const names: Record<string, string> = countryNames;

export function countryName(iso2: string): string {
  return names[iso2] || iso2;
}

export const COUNTRY_OPTIONS: CountryOption[] = getCountries()
  .map((iso2) => ({
    iso2,
    name: countryName(iso2),
    dialCode: getCountryCallingCode(iso2),
  }))
  // Plain codepoint comparison, not .localeCompare() — locale-aware sorting
  // is ICU-backed and can order accented names (Åland, Côte d'Ivoire)
  // differently between Node and a browser, which is the same class of
  // server/client mismatch as the names themselves (see above).
  .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));

export function isKnownCountry(iso2: string): iso2 is CountryCode {
  return COUNTRY_OPTIONS.some((c) => c.iso2 === iso2);
}
