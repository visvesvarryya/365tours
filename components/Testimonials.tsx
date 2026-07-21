import { getDestinationBySlug } from "@/lib/destinations";
import ReviewsGrid, { GoogleG, Stars, type CuratedReview } from "@/components/ReviewsGrid";

// Curated testimonials (docs/TestimonialsGeneral.docx) — shown on all pages except the
// 6 destination pages named in that document (Bhutan, Cambodia, Egypt, Indonesia, Kenya,
// Vietnam). Rating badge + "read all reviews" link still point to the public Google listing.
const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=365+tours+chennai#lrd=0x3a526645a176a84d:0xa79d678833fd18ff,1";
const RATING = "4.9";
const RATING_TOTAL = "250";

const reviews = [
  { name: "Parvathi Sathasivam", trip: "Sri Lanka", slug: "sri-lanka", avatar: "PS",
    text: "We as a group of 12 people went to Sri Lanka in 2015 with 365 Tours and the trip far exceeded our expectations on every level. The actual planning process and the final execution was perfect. The agency's concern and care for our group was commendable — starting with our travel itinerary, wonderful travel arrangements and last but not the least excellent hotels. We had a wonderful trip with 365 Tours and will surely travel again with them." },
  { name: "Mahek Soni", trip: "Nepal", slug: "nepal", avatar: "MS",
    text: "Recently, 365 Tours organized a Nepal trip for my parents, and they had a really wonderful experience. Everything was very well coordinated and taken care of end-to-end, which made the trip smooth and stress-free for them. The team was supportive throughout the journey and ensured all arrangements were handled properly." },
  { name: "Viral Lalith", trip: "", slug: "", avatar: "VL",
    text: "Had a really wonderful experience with 365 Tours while arranging a trip for my parents. Everything — from flights and hotel bookings to airport transfers and local travel — was handled smoothly and professionally. The drivers were always on time, the cars were clean and comfortable, and the hotels chosen were excellent. I would personally recommend Mr. Jaishankar to anyone planning a trip." },
  { name: "Bhavani Thiruvenkatachari", trip: "Bhutan", slug: "bhutan", avatar: "BT",
    text: "Bhutan is beautiful and clean. People are lovely. We had a great time as a family. We have employed 365 Tours to plan our overseas as well as domestic tours many times now. They have always surpassed our expectations in their customised tour planning and listening to our feedback after every tour. Thanks Jai." },
  { name: "Narayanan", trip: "Morocco", slug: "morocco", avatar: "N",
    text: "We travelled to Morocco for a vacation, 6N/7D — beautifully organised by Jai and his team. Excellent stay and food, seamless travel, transfers and great coordination at all places with the local guides who were extremely courteous. Jai took personal care to ensure our trip was memorable." },
  { name: "Teja Prakash", trip: "Maldives", slug: "maldives", avatar: "TP",
    text: "Well handled my Maldives trip. Jayashankar communicates really well throughout the journey and stands as a confident person for my trip." },
];

export default function Testimonials() {
  const ratingLabel = RATING;
  const totalLabel = RATING_TOTAL;

  // Resolve each review's destination photo server-side; the grid shuffles them.
  const curated: CuratedReview[] = reviews.map((r) => ({
    name: r.name,
    trip: r.trip,
    text: r.text,
    avatar: r.avatar,
    photo: r.slug ? getDestinationBySlug(r.slug)?.gallery?.[0] ?? null : null,
  }));

  return (
    <section id="reviews" className="bg-gradient-to-b from-rose-50 via-orange-50 to-white py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-500">
            Traveller Stories
          </p>
          <h2 className="mt-3 font-serif text-4xl font-bold text-stone-900 sm:text-5xl">
            Memories to Cherish forever
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

        <ReviewsGrid curated={curated} show={6} />

        {/* Read all reviews on Google */}
        <div className="mt-6 text-center">
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
