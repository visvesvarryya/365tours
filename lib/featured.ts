/**
 * ── Homepage "Popular Destinations" control ──────────────────────────────────
 * This is the single place that decides WHICH destinations appear in the
 * "Popular Destinations" grid on the homepage, and in what order.
 *
 * To change what shows up, just edit this list. Each entry must be a destination
 * `slug` (the URL segment, e.g. /destination/japan → "japan"). See lib/destinations.ts
 * for every available slug. Order here = order on the page. Aim for 6–9 for a tidy grid.
 */
export const featuredDestinationSlugs: string[] = [
  "japan",
  "maldives",
  "egypt",
  "kenya",
  "greece",
  "vietnam",
  "iceland",
  "jordan",
  "morocco",
];
