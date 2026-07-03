"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getDestinationBySlug } from "@/lib/destinations";

// Curated set of iconic destinations for the rotating hero backdrop —
// each uses a real photo scraped from 365tours.in.
const heroSlugs = ["maldives", "egypt", "kenya", "japan", "iceland", "greece", "jordan", "vietnam"];
const heroSlides = heroSlugs
  .map((slug) => {
    const d = getDestinationBySlug(slug);
    return d?.gallery?.[0] ? { name: d.name, image: d.gallery[0] } : null;
  })
  .filter(Boolean) as { name: string; image: string }[];

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
  const prev = () => go((active - 1 + heroSlides.length) % heroSlides.length);

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
        <div className="h-24" />

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
            <h1 className="font-serif text-5xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
              Explore.
              <br />
              <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                Experience.
              </span>
              <br />
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

            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="#contact"
                className="rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-8 py-4 text-base font-bold text-stone-900 shadow-lg shadow-orange-900/40 transition hover:from-amber-300 hover:to-orange-400 active:scale-95"
              >
                ☀ Plan Your Tour
              </Link>
              <Link
                href="#destinations"
                className="rounded-full border border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white transition hover:bg-white/20"
              >
                Explore Destinations
              </Link>
            </div>

            {/* Now-showing caption + slide dots */}
            {heroSlides.length > 0 && (
              <div className="mt-7 flex items-center gap-4">
                <span className="text-sm text-white/70">
                  Now showing:{" "}
                  <span className="font-semibold text-white">{heroSlides[active].name}</span>
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
          </div>
        </div>

        {/* Carousel arrows (step through destinations manually) */}
        {heroSlides.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous destination"
              className="absolute left-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition hover:bg-white/25 active:scale-90 sm:left-4 sm:h-12 sm:w-12"
            >
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Next destination"
              className="absolute right-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition hover:bg-white/25 active:scale-90 sm:right-4 sm:h-12 sm:w-12"
            >
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </>
        )}

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="h-8 w-px animate-pulse bg-white/30" />
        </div>
      </div>
    </section>
  );
}
