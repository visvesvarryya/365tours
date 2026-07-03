/**
 * Live Google reviews via the Google Places API (server-side).
 *
 * Set these in `.env.local` (see `.env.local.example`):
 *   GOOGLE_PLACES_API_KEY=...     ← a Google Maps Platform key with the Places API enabled
 *   GOOGLE_PLACE_ID=ChIJ...       ← the Place ID for 365 Tours (from the Place ID Finder)
 *
 * When both are set, the reviews section shows the latest live reviews + live rating,
 * refreshed hourly. When they're absent (or the call fails), the site falls back to the
 * curated set of real reviews. NOTE: Google's API returns up to 5 reviews and each
 * reviewer's PROFILE photo — it does NOT expose photos customers attach to a review.
 */

export const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY || "";
export const GOOGLE_PLACE_ID = process.env.GOOGLE_PLACE_ID || "";

export interface LiveReview {
  author: string;
  photo: string; // reviewer profile avatar (lh3.googleusercontent.com)
  rating: number;
  text: string;
  time: string; // e.g. "2 weeks ago"
  url?: string;
}

export interface LiveReviews {
  rating: number;
  total: number;
  reviews: LiveReview[];
}

export async function getGoogleReviews(): Promise<LiveReviews | null> {
  if (!GOOGLE_PLACES_API_KEY || !GOOGLE_PLACE_ID) return null;
  try {
    const params = new URLSearchParams({
      place_id: GOOGLE_PLACE_ID,
      fields: "rating,user_ratings_total,reviews",
      reviews_sort: "newest",
      language: "en",
      key: GOOGLE_PLACES_API_KEY,
    });
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?${params}`,
      { next: { revalidate: 3600 } } // refresh at most hourly
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (data.status !== "OK" || !data.result) return null;

    const r = data.result;
    const reviews: LiveReview[] = (r.reviews ?? [])
      .filter((rv: { text?: string }) => rv.text && rv.text.trim().length > 0)
      .map((rv: Record<string, unknown>) => ({
        author: String(rv.author_name ?? "Google user"),
        photo: String(rv.profile_photo_url ?? ""),
        rating: Number(rv.rating ?? 5),
        text: String(rv.text ?? ""),
        time: String(rv.relative_time_description ?? ""),
        url: rv.author_url ? String(rv.author_url) : undefined,
      }));

    return {
      rating: Number(r.rating ?? 0),
      total: Number(r.user_ratings_total ?? 0),
      reviews,
    };
  } catch {
    return null;
  }
}
