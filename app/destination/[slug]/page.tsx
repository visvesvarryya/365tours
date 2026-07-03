import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import LeadForm from "@/components/LeadForm";
import ItineraryCarousel from "@/components/ItineraryCarousel";
import Icon from "@/components/Icon";
import TwelveReasons from "@/components/TwelveReasons";
import { SITE_URL, absoluteUrl } from "@/lib/site";
import {
  destinations,
  getDestinationBySlug,
  getAllSlugs,
  experienceColors,
} from "@/lib/destinations";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const dest = getDestinationBySlug(params.slug);
  if (!dest) return {};
  const title = `${dest.name} Tours | 365 Tours — Private & Customised`;
  const description = dest.description.slice(0, 160);
  const path = `/destination/${dest.slug}`;
  const images = dest.heroImage
    ? [{ url: dest.heroImage, alt: `${dest.name} — 365 Tours` }]
    : undefined;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "article", title, description, url: path, images },
    twitter: { card: "summary_large_image", title, description, images: dest.heroImage ? [dest.heroImage] : undefined },
  };
}

export default function DestinationPage({ params }: { params: { slug: string } }) {
  const dest = getDestinationBySlug(params.slug);
  if (!dest) notFound();

  // Rank other destinations by similarity to this one: shared experience types
  // weighted, plus a bonus for the same continent — most similar first.
  const related = destinations
    .filter((d) => d.slug !== dest.slug)
    .map((d) => {
      const sharedExperiences = d.experiences.filter((e) => dest.experiences.includes(e)).length;
      const sameContinent = d.continent === dest.continent ? 1 : 0;
      return { d, score: sharedExperiences * 2 + sameContinent * 3 };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((x) => x.d);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: `${dest.name} — 365 Tours`,
    description: dest.description,
    url: `${SITE_URL}/destination/${dest.slug}`,
    image: (dest.gallery ?? []).map((g) => absoluteUrl(g)),
    touristType: dest.experiences,
    ...(dest.regions && dest.regions.length
      ? { containsPlace: dest.regions.map((r) => ({ "@type": "Place", name: r })) }
      : {}),
    provider: {
      "@type": "TravelAgency",
      name: "365 Tours",
      url: SITE_URL,
      telephone: "+91-98401-48869",
      address: {
        "@type": "PostalAddress",
        streetAddress: "37 1st Street, Singaravelan Nagar, Maduravoyal",
        addressLocality: "Chennai",
        postalCode: "600095",
        addressCountry: "IN",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        {/* ── HERO ── */}
        <section className="relative min-h-[70vh] overflow-hidden bg-stone-950">
          {dest.heroImage && (
            <Image
              src={dest.heroImage}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/50 via-stone-950/40 to-stone-950/90" />

          <div className="relative flex min-h-[70vh] flex-col justify-end pb-16 pt-32">
            <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
              {/* Breadcrumb */}
              <nav className="mb-6 flex items-center gap-2 text-xs text-white/50">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <Link href="/#all-destinations" className="hover:text-white transition-colors">Destinations</Link>
                <span>/</span>
                <span className="text-white/80">{dest.name}</span>
              </nav>

              {/* Continent badge */}
              <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/70">
                {dest.continent}
              </span>

              <div className="mt-4 flex items-center gap-4">
                {dest.flag && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={dest.flag}
                    alt={`${dest.name} flag`}
                    width={56}
                    height={56}
                    decoding="async"
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-white/70 shadow-lg sm:h-14 sm:w-14"
                  />
                )}
                <h1 className="font-serif text-5xl font-bold text-white sm:text-6xl lg:text-7xl">
                  {dest.name}
                </h1>
              </div>
              <p className="mt-3 text-xl text-white/70 font-light italic">{dest.tagline}</p>

              {/* Quick facts chips */}
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-sm text-white">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  {dest.duration}
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-sm text-white">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>
                  Best time: {dest.bestTime}
                </span>
                {dest.experiences.map((exp) => (
                  <span
                    key={exp}
                    className="rounded-full bg-white/10 px-4 py-2 text-sm text-white"
                  >
                    {exp}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── BRIEF DESCRIPTION (itineraries come right after this) ── */}
        <section className="bg-white pt-14 pb-8">
          <div className="mx-auto max-w-4xl px-6 lg:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-500">About</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-stone-900">
              Why Travel to {dest.name}?
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-stone-600">{dest.description}</p>
          </div>
        </section>

        {/* ── SIGNATURE ITINERARIES (come first, right after the intro) ── */}
        {dest.itineraries && dest.itineraries.length > 0 && (
          <section className="bg-stone-50 py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-500">
                Signature Itineraries
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-stone-900">
                Ready-Made Journeys Through {dest.name}
              </h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-stone-500">
                Well-researched routes to suit your interest, time &amp; budget — every one fully
                private and customisable.
              </p>
              <div className="mt-8">
                <ItineraryCarousel items={dest.itineraries} name={dest.name} />
              </div>
              <div id="enquire" className="mt-12 scroll-mt-24 rounded-3xl bg-stone-950 p-8 shadow-xl sm:p-10">
                <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-brand-400">
                      Quick Enquiry
                    </p>
                    <h3 className="mt-3 font-serif text-2xl font-bold text-white sm:text-3xl">
                      Get the full {dest.name} itinerary
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-stone-400">
                      For a detailed day-wise itinerary, price, inclusions &amp; exclusions, send us
                      an enquiry — response within 24 hours. Every tour is fully private and
                      customisable to your dates, pace and budget.
                    </p>
                  </div>
                  <LeadForm variant="full" destination={dest.name} source="itinerary-enquiry" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── MORE DETAILS (Highlights + Travel Rewards sidebar, then the rest) ── */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[1fr_340px] lg:items-start">
              <div>
                {/* Highlights */}
                <div className="mb-14">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-500">Highlights</p>
                  <h2 className="mt-3 font-serif text-3xl font-bold text-stone-900">
                    What You'll Experience
                  </h2>
                  <ul className="mt-6 space-y-4">
                    {dest.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 font-serif text-sm font-bold text-brand-600">
                          {i + 1}
                        </span>
                        <span className="pt-1 text-stone-700 text-lg">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Destinations / regions offered */}
                {dest.regions && dest.regions.length > 0 && (
                  <div className="mb-14">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-500">
                      Destinations Offered
                    </p>
                    <h2 className="mt-3 font-serif text-3xl font-bold text-stone-900">
                      Regions We Cover in {dest.name}
                    </h2>
                    <div className="mt-6 flex flex-wrap gap-2.5">
                      {dest.regions.map((region) => (
                        <span
                          key={region}
                          className="rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700"
                        >
                          {region}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Experience tags */}
                <div className="mb-14">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-500">
                    Type of Experiences
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {dest.experiences.map((exp) => (
                      <span
                        key={exp}
                        className={`rounded-full px-5 py-2 text-sm font-semibold ${experienceColors[exp]}`}
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 365 Tours promise */}
                <div className="rounded-3xl border border-brand-100 bg-brand-50 p-8">
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-500">
                    The 365 Tours Difference
                  </p>
                  <h3 className="mt-3 font-serif text-2xl font-bold text-stone-900">
                    Your {dest.name} journey, 100% private & customised
                  </h3>
                  <p className="mt-4 text-stone-600 leading-relaxed">
                    Every 365 Tours itinerary to {dest.name} is built from scratch for you — not copied from a template. Our specialists select the best routes, vetted hotels from 9 accommodation categories, expert local guides, and private vehicles with amenities. You simply arrive and we handle everything else.
                  </p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    {[
                      { label: "Private Vehicle", icon: "car" },
                      { label: "Expert Local Guide", icon: "compass" },
                      { label: "24/7 Support", icon: "phone" },
                    ].map((item) => (
                      <div key={item.label} className="flex flex-col items-center rounded-2xl bg-white p-4 text-center shadow-sm">
                        <Icon name={item.icon} className="h-6 w-6 text-brand-600" />
                        <p className="mt-2 text-sm font-semibold text-stone-800">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right: Travel Rewards sidebar — beside "What You'll Experience" */}
              <aside className="lg:sticky lg:top-24">
                  <div className="overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-sm">
                    {/* Generic Travel Rewards & Benefits poster — same for every destination */}
                    <div className="relative aspect-[717/1280]">
                      <Image
                        src="/brand/travel-rewards.jpg"
                        alt="Travel Rewards & Benefits — 365 Tours"
                        fill
                        loading="lazy"
                        sizes="(max-width: 1024px) 100vw, 340px"
                        className="object-cover"
                      />
                    </div>
                    <div className="border-t border-amber-100 p-4">
                      <a
                        href="/benefits-rewards.pdf"
                        download
                        className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-5 py-3 text-sm font-bold text-stone-900 shadow-md transition hover:from-amber-300 hover:to-orange-400"
                      >
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                        Download Rewards (PDF)
                      </a>
                    </div>
                  </div>
                </aside>
            </div>
          </div>
        </section>

        {/* ── 12 REASONS (carried over to every destination page, as on the original site) ── */}
        <TwelveReasons />

        {/* ── RELATED DESTINATIONS ── */}
        {related.length > 0 && (
          <section className="bg-stone-50 py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-500">
                You may also like
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-stone-900">
                Related Destinations
              </h2>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/destination/${r.slug}`}
                    className="group overflow-hidden rounded-3xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={r.image}
                        alt={r.name}
                        fill
                        loading="lazy"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-xs text-stone-400">{r.continent}</p>
                      <h3 className="mt-1 font-serif text-xl font-bold text-stone-900">{r.name}</h3>
                      <p className="mt-1 text-sm text-stone-500">{r.tagline}</p>
                      <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-brand-500 group-hover:gap-3 transition-all">
                        Explore {r.name}
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-12 text-center">
                <Link
                  href="/#all-destinations"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-brand-500 px-8 py-3.5 text-sm font-semibold text-brand-500 transition hover:bg-brand-500 hover:text-white"
                >
                  View all 100 countries →
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* ── SIMPLE FOOTER ── */}
      <footer className="bg-stone-950 py-10 text-center text-sm text-stone-500">
        <p>
          © {new Date().getFullYear()} 365 Tours · Chennai, India ·{" "}
          <a href="tel:+919840148869" className="hover:text-brand-400 transition-colors">
            +91 98401 48869
          </a>{" "}
          ·{" "}
          <a href="mailto:tours@365tours.in" className="hover:text-brand-400 transition-colors">
            tours@365tours.in
          </a>
        </p>
        <Link href="/" className="mt-3 inline-block hover:text-white transition-colors">
          ← Back to homepage
        </Link>
      </footer>
    </>
  );
}
