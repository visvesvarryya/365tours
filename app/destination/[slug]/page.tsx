import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import ItineraryCarousel from "@/components/ItineraryCarousel";
import QuickEnquiryCTA from "@/components/QuickEnquiryCTA";
import DestinationsOffered from "@/components/DestinationsOffered";
import TwelveReasons from "@/components/TwelveReasons";
import TrustBar from "@/components/TrustBar";
import Footer from "@/components/Footer";
import SocialLinks from "@/components/SocialLinks";
import DestinationViewTracker from "@/components/DestinationViewTracker";
import { SITE_URL, absoluteUrl } from "@/lib/site";
import { destinations, getDestinationBySlug, getAllSlugs } from "@/lib/destinations";

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
      <DestinationViewTracker id={dest.slug} name={dest.name} category={dest.continent} />
      <main>
        {/* ── HERO ── */}
        <section className="relative h-[560px] overflow-hidden bg-stone-950 sm:h-[580px] lg:h-[650px]">
          {dest.heroImage && (
            <Image
              src={dest.heroImage}
              alt=""
              fill
              priority
              quality={90}
              sizes="100vw"
              className="object-cover object-center"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/30 from-0% via-transparent via-35% to-transparent" />

          <div className="relative flex h-[560px] flex-col justify-end pb-10 pt-28 sm:h-[580px] sm:pb-14 sm:pt-32 lg:h-[650px]">
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

              <SocialLinks className="mt-8" />
            </div>
          </div>
        </section>

        {/* ── BRIEF DESCRIPTION (itineraries come right after this) ── */}
        <section className="bg-white pb-6 pt-12">
          <div className="mx-auto max-w-4xl px-6 lg:px-10">
            <p className="font-merri text-xl italic leading-relaxed text-stone-700 sm:text-2xl">
              {dest.description}
            </p>
          </div>
        </section>

        {/* ── SIGNATURE ITINERARIES (come first, right after the intro) ── */}
        {dest.itineraries && dest.itineraries.length > 0 && (
          <section className="bg-stone-50 py-10">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
              {/* Same brush treatment as the landing page's "100 Countries" */}
              <h2 className="font-brush leading-none text-stone-900">
                <span className="text-6xl sm:text-8xl">{dest.itineraries.length}</span>{" "}
                <span className="text-3xl sm:text-5xl">Signature Itineraries</span>
              </h2>
              <p className="mt-2 font-merri text-lg italic text-stone-600 sm:text-xl">
                Well crafted based on your interest, time &amp; budget
              </p>
              <div className="mt-8">
                <ItineraryCarousel items={dest.itineraries} name={dest.name} />
              </div>
              <QuickEnquiryCTA name={dest.name} source="itinerary-enquiry" />
            </div>
          </section>
        )}

        {/* ── DESTINATIONS OFFERED ── */}
        <DestinationsOffered name={dest.name} items={dest.regions ?? []} />

        {/* ── 12 REASONS (carried over to every destination page, as on the original site) ── */}
        <TwelveReasons />

        {/* ── INDUSTRY PROVENANCE (As Seen / Top Rated / Heritage partners) ── */}
        <TrustBar />

        {/* ── RELATED DESTINATIONS (last section before the footer) ── */}
        {related.length > 0 && (
          <section className="bg-stone-50 py-10">
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
                        className="object-contain transition-transform duration-500 group-hover:scale-105"
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

              <div className="mt-8 text-center">
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

      <Footer />
    </>
  );
}
