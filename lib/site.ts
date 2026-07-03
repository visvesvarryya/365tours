/** Canonical production origin, used for absolute URLs in metadata, sitemap & JSON-LD. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://365tours.in"
).replace(/\/$/, "");

/** Turn a site-relative path (e.g. /destinations/x.jpg) into an absolute URL. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}
