import { getDestinationBySlug } from "@/lib/destinations";
import { getGoogleReviews } from "@/lib/reviews";
import ReviewsGrid, { GoogleG, Stars, type CuratedReview } from "@/components/ReviewsGrid";

// Real 5-star Google reviews for 365 Tours (Chennai), copied verbatim from the public
// Google listing. Shown as a shuffled 6-of-8 until the live Places API is configured
// (GOOGLE_PLACES_API_KEY + GOOGLE_PLACE_ID), at which point the latest live 5-star
// reviews are shown instead. No fabricated reviews are ever used.
const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=365+tours+chennai#lrd=0x3a526645a176a84d:0xa79d678833fd18ff,1";

const reviews = [
  { name: "Jayashri Murali", trip: "Vietnam", slug: "vietnam", avatar: "JM",
    text: "365 Tours has always ensured hassle free and very enjoyable vacations, and Vietnam was no different. Meticulous arrangements and 24-hour availability make 365 Tours what it is." },
  { name: "Parvathi Sathasivam", trip: "Sri Lanka", slug: "sri-lanka", avatar: "PS",
    text: "We as a group of 12 people went to Sri Lanka with 365 Tours and the trip far exceeded our expectations on every level. The planning and execution was perfect — wonderful arrangements and excellent hotels." },
  { name: "Shobha Gupta", trip: "Bhutan", slug: "bhutan", avatar: "SG",
    text: "Very good experience during our travel to Bhutan. Everything was taken care of — comfortable vehicle, good guide and constant follow-up. Thank you!" },
  { name: "nv devadsan", trip: "Kenya", slug: "kenya", avatar: "ND",
    text: "The Kenya trip was very well organised. We really enjoyed it." },
  { name: "Venu Parameshwar", trip: "Bhutan", slug: "bhutan", avatar: "VP",
    text: "We travelled to Bhutan with 365 Tours in March. Our overall experience was smooth and local arrangements on the ground were efficiently handled, making it an enjoyable experience." },
  { name: "Mahek Soni", trip: "Nepal", slug: "nepal", avatar: "MS",
    text: "365 Tours organized a Nepal trip for my parents, and they had a really wonderful experience. Everything was very well coordinated and taken care of end-to-end, which made the trip smooth and stress-free." },
  { name: "radha devadasan", trip: "", slug: "", avatar: "RD",
    text: "We had a wonderful time and a hassle free trip. The arrangements done were very satisfactory." },
  { name: "Durga Subramanian", trip: "", slug: "", avatar: "DS",
    text: "Very nice stay and picturesque landscapes. Very friendly guidance." },
];

export default async function Testimonials() {
  // Live Google reviews (latest, already filtered to 5-star) when the Places API is set.
  const live = await getGoogleReviews();
  const liveReviews = live && live.reviews.length > 0 ? live.reviews : null;
  const ratingLabel = live?.rating ? live.rating.toFixed(1) : "4.9";
  const totalLabel = live?.total ? live.total.toLocaleString() : "248";

  // Resolve each review's destination photo server-side; the grid shuffles them.
  const curated: CuratedReview[] = reviews.map((r) => ({
    name: r.name,
    trip: r.trip,
    text: r.text,
    avatar: r.avatar,
    photo: r.slug ? getDestinationBySlug(r.slug)?.gallery?.[0] ?? null : null,
  }));

  return (
    <section id="reviews" className="bg-gradient-to-b from-rose-50 via-orange-50 to-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-500">
            Traveller Stories
          </p>
          <h2 className="mt-3 font-serif text-4xl font-bold text-stone-900 sm:text-5xl">
            Journeys They&apos;ll Never Forget
          </h2>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-3 rounded-full border border-stone-200 bg-white px-5 py-2.5 shadow-sm transition hover:shadow-md"
          >
            <GoogleG />
            <span className="flex items-center gap-1.5">
              <span className="text-lg font-bold text-stone-900">{ratingLabel}</span>
              <Stars count={5} />
            </span>
            <span className="text-sm text-stone-500">· {totalLabel} Google reviews</span>
          </a>
        </div>

        <ReviewsGrid live={liveReviews} curated={curated} show={6} />

        {/* Read all reviews on Google */}
        <div className="mt-12 text-center">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            Read all {totalLabel} reviews on Google
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
