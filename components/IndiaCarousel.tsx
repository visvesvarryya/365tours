"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import credits from "@/public/india/carousel/carousel-credits.json";

type Slide = { slug: string; caption: string; author: string; license: string; source: string };
const slides = credits as Slide[];

export default function IndiaCarousel() {
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState<number[]>([0]);

  const go = (i: number) => {
    setActive(i);
    setLoaded((l) => (l.includes(i) ? l : [...l, i]));
  };
  const next = () => go((active + 1) % slides.length);
  const prev = () => go((active - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = setInterval(() => {
      setActive((i) => {
        const n = (i + 1) % slides.length;
        setLoaded((l) => (l.includes(n) ? l : [...l, n]));
        return n;
      });
    }, 4500);
    return () => clearInterval(id);
  }, []);

  if (!slides.length) return null;
  const current = slides[active];

  return (
    <section className="bg-amber-50 pb-4 pt-16">
      <div className="mx-auto mb-8 max-w-3xl px-6 text-center lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
          India in Pictures
        </p>
        <h2 className="mt-2 font-brush text-5xl leading-tight text-stone-900 sm:text-6xl">
          A Land of a Thousand Journeys
        </h2>
      </div>

      <div className="relative mx-auto aspect-[16/9] max-h-[70vh] w-full max-w-6xl overflow-hidden bg-stone-900 sm:rounded-3xl">
        {slides.map((s, i) =>
          loaded.includes(i) ? (
            <Image
              key={s.slug}
              src={`/india/carousel/${s.slug}.jpg`}
              alt={s.caption}
              fill
              priority={i === 0}
              sizes="(max-width: 1152px) 100vw, 1152px"
              className="object-cover transition-opacity duration-1000 ease-in-out"
              style={{ opacity: i === active ? 1 : 0 }}
            />
          ) : null
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

        {/* Caption + credit */}
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
          <p className="font-brush text-3xl text-white drop-shadow sm:text-4xl">{current.caption}</p>
          <a
            href={current.source}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block text-[11px] text-white/70 hover:text-white hover:underline"
          >
            Photo: {current.author} ({current.license}) · Wikimedia Commons
          </a>
        </div>

        {/* Arrows */}
        <button
          onClick={prev}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white transition hover:bg-white/30 active:scale-90"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          onClick={next}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white transition hover:bg-white/30 active:scale-90"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 right-4 flex gap-1.5">
          {slides.map((s, i) => (
            <button
              key={s.slug}
              onClick={() => go(i)}
              aria-label={`Show ${s.caption}`}
              className="flex h-5 w-5 items-center justify-center"
            >
              <span
                className={`block h-1.5 rounded-full transition-all ${
                  i === active ? "w-5 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
