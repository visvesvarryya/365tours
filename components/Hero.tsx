"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// The 5 homepage hero photos + nicknames, supplied directly (docs/Home-page-Main Section/).
const heroSlides: { name: string; tagline: string; image: string }[] = [
  { name: "Bhutan", tagline: "The Land of the Thunder Dragon", image: "/hero/bhutan.jpg" },
  { name: "Cambodia", tagline: "The Land of the Khmer", image: "/hero/cambodia.jpg" },
  { name: "Egypt", tagline: "Gift of the Nile", image: "/hero/egypt.jpg" },
  { name: "Indonesia", tagline: "The Emerald of the Equator", image: "/hero/indonesia.jpg" },
  { name: "Kenya", tagline: "The Pride of Africa", image: "/hero/kenya.jpg" },
];

const socials = [
  {
    label: "Facebook",
    href: "http://facebook.com/365tours",
    color: "#1877F2",
    icon: (
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    ),
  },
  {
    label: "Twitter",
    href: "http://twitter.com/365tours",
    color: "#1DA1F2",
    icon: (
      <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.897-.959-2.178-1.559-3.594-1.559-2.723 0-4.928 2.205-4.928 4.928 0 .39.045.765.127 1.124-4.094-.205-7.725-2.166-10.157-5.144-.424.729-.666 1.577-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.062c0 2.386 1.696 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.317 0-.626-.03-.928-.086.627 1.956 2.444 3.379 4.6 3.419-1.685 1.319-3.809 2.106-6.115 2.106-.398 0-.79-.023-1.175-.069 2.179 1.397 4.768 2.212 7.548 2.212 9.057 0 14.009-7.503 14.009-14.009 0-.213-.005-.425-.014-.636.962-.695 1.797-1.562 2.457-2.549z" />
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/365__tours/",
    color: "#E1306C",
    icon: (
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/user/365tours",
    color: "#FF0000",
    icon: (
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/67078492/",
    color: "#0A66C2",
    icon: (
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    ),
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  // Only images that have been shown are mounted, so the homepage loads ONE hero
  // image (the LCP) up front; the rest stream in as the carousel advances.
  const [loaded, setLoaded] = useState<number[]>([0]);

  const go = (i: number) => {
    setActive(i);
    setLoaded((l) => (l.includes(i) ? l : [...l, i]));
  };
  const next = () => go((active + 1) % heroSlides.length);

  useEffect(() => {
    if (heroSlides.length < 2) return;
    const id = setInterval(() => {
      setActive((i) => {
        const next = (i + 1) % heroSlides.length;
        setLoaded((l) => (l.includes(next) ? l : [...l, next]));
        return next;
      });
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-stone-950">
      {/* Rotating real-photo background layers (progressively mounted) */}
      {heroSlides.map((slide, i) =>
        loaded.includes(i) ? (
          <Image
            key={slide.image}
            src={slide.image}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover transition-opacity duration-[1500ms] ease-in-out"
            style={{ opacity: i === active ? 1 : 0 }}
            aria-hidden={i !== active ? true : undefined}
          />
        ) : null
      )}
      {/* Warm "golden hour" overlay — dark at bottom-left for text legibility,
          sunny amber glow toward the top-right. */}
      <div className="absolute inset-0 bg-gradient-to-tr from-stone-950/85 via-stone-900/55 to-orange-900/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-amber-400/15" />

      {/* Content */}
      <div className="relative flex min-h-screen flex-col">
        {/* Spacer for navbar */}
        <div className="h-40 sm:h-44" />

        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pb-14 pt-4 lg:px-10">
          <div className="max-w-4xl">
            {/* Prominent tagline */}
            <div className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-amber-300/40 bg-amber-400/15 px-5 py-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
              <span className="text-sm font-bold uppercase tracking-[0.22em] text-amber-200 sm:text-base">
                Private &amp; Customised Tours
              </span>
            </div>

            {/* Main heading */}
            <h1 className="font-serif text-[36px] font-bold leading-[1.05] text-white sm:text-[45px] lg:text-[54px]">
              Explore.
              <br />
              <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                Experience.
              </span>{" "}
              Evolve.
            </h1>

            {/* Prominent reach line */}
            <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-serif text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
              <span><span className="text-amber-300">7</span> Continents</span>
              <span className="text-white/30">·</span>
              <span><span className="text-amber-300">100</span> Countries</span>
              <span className="text-white/30">·</span>
              <span><span className="text-amber-300">1,500+</span> Destinations</span>
            </div>

            <p className="mt-3 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              Bespoke private journeys crafted around your time, taste, and travel style.
            </p>

            {/* Destination caption + slide dots */}
            {heroSlides.length > 0 && (
              <div className="mt-7 flex items-center gap-4">
                <span className="text-sm text-white/70">
                  <span className="font-semibold text-white">{heroSlides[active].name}</span>
                  {" — "}
                  {heroSlides[active].tagline}
                </span>
                <div className="flex gap-1.5">
                  {heroSlides.map((s, i) => (
                    <button
                      key={s.image}
                      onClick={() => go(i)}
                      aria-label={`Show ${s.name}`}
                      className="flex h-6 w-6 items-center justify-center"
                    >
                      <span
                        className={`block h-1.5 rounded-full transition-all ${
                          i === active ? "w-6 bg-amber-400" : "w-1.5 bg-white/50 hover:bg-white/80"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Social media — each icon in its own brand colour */}
            <div className="mt-6 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <svg width="18" height="18" fill={s.color} viewBox="0 0 24 24">
                    {s.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Carousel arrow (step forward through destinations manually) */}
        {heroSlides.length > 1 && (
          <button
            onClick={next}
            aria-label="Next destination"
            className="absolute right-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition hover:bg-white/25 active:scale-90 sm:right-4 sm:h-12 sm:w-12"
          >
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        )}
      </div>
    </section>
  );
}
