import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import LeadForm from "@/components/LeadForm";
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

        {/* ── CONTENT ── */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid gap-16 lg:grid-cols-[1fr_380px]">
              {/* Left: main content */}
              <div>
                {/* About */}
                <div className="mb-14">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-500">About</p>
                  <h2 className="mt-3 font-serif text-3xl font-bold text-stone-900">
                    Why Travel to {dest.name}?
                  </h2>
                  <p className="mt-5 text-lg leading-relaxed text-stone-600">{dest.description}</p>
                </div>

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
                      { label: "Private Vehicle", icon: "🚗" },
                      { label: "Expert Local Guide", icon: "🧭" },
                      { label: "24/7 Support", icon: "📞" },
                    ].map((item) => (
                      <div key={item.label} className="rounded-2xl bg-white p-4 text-center shadow-sm">
                        <span className="text-2xl">{item.icon}</span>
                        <p className="mt-2 text-sm font-semibold text-stone-800">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: sticky enquiry card */}
              <div>
                <div className="sticky top-24">
                  <div className="rounded-3xl bg-stone-950 p-8 text-white shadow-2xl">
                    <p className="text-xs font-semibold uppercase tracking-widest text-brand-400">
                      Plan Your Trip
                    </p>
                    <h3 className="mt-3 font-serif text-2xl font-bold">
                      Enquire about {dest.name}
                    </h3>
                    <p className="mt-2 text-sm text-stone-400">
                      Free consultation · Custom itinerary · Reply within 24 hrs
                    </p>

                    <div className="mt-7">
                      <LeadForm variant="compact" destination={dest.name} source="destination-page" />
                    </div>

                    <div className="mt-6 border-t border-white/10 pt-6 space-y-3">
                      <a
                        href="tel:+919840148869"
                        className="flex items-center gap-3 text-sm text-stone-300 hover:text-white transition-colors"
                      >
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                        +91 98401 48869
                      </a>
                      <a
                        href="mailto:tours@365tours.in"
                        className="flex items-center gap-3 text-sm text-stone-300 hover:text-white transition-colors"
                      >
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                        tours@365tours.in
                      </a>
                      <a
                        href="https://wa.me/919840148869"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-sm text-green-400 hover:text-green-300 transition-colors"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Chat on WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PHOTO GALLERY ── */}
        {dest.gallery && dest.gallery.length > 0 && (
          <section className="bg-white pb-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-500">
                Gallery
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-stone-900">
                Glimpses of {dest.name}
              </h2>
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {dest.gallery.map((src, i) => (
                  <div
                    key={src}
                    className={`group relative overflow-hidden rounded-2xl ${
                      i === 0 ? "col-span-2 row-span-2 aspect-square sm:col-span-2" : "aspect-square"
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`${dest.name} photo ${i + 1}`}
                      fill
                      loading="lazy"
                      sizes={i === 0 ? "(max-width: 640px) 100vw, 50vw" : "(max-width: 640px) 50vw, 25vw"}
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

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
