"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { Itinerary } from "@/lib/destinations";

export default function ItineraryCarousel({
  items,
  name,
}: {
  items: Itinerary[];
  name: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Wraps around at either end — mirrors the lightbox's circular prev/next,
  // instead of just stopping dead at the first/last card.
  const scroll = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const atStart = el.scrollLeft <= 1;
    const atEnd = el.scrollLeft >= max - 1;
    if (dir < 0 && atStart) {
      el.scrollTo({ left: max, behavior: "smooth" });
    } else if (dir > 0 && atEnd) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
    }
  };

  // Tracks scroll position for the mobile-only dot indicators + edge fade —
  // there's no scrollbar and the arrow buttons are desktop-only, so on a
  // phone nothing else hints that this row is horizontally scrollable.
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el || items.length < 2) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max = el.scrollWidth - el.clientWidth;
        const ratio = max > 0 ? el.scrollLeft / max : 0;
        setActiveIndex(Math.round(ratio * (items.length - 1)));
        ticking = false;
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [items.length]);

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i - 1 + items.length) % items.length)),
    [items.length]
  );
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    // Let the floating WhatsApp / back-to-top buttons know to hide themselves
    // while the lightbox is open, without locking page scroll.
    window.dispatchEvent(new CustomEvent("lightbox-toggle", { detail: { open: true } }));
    return () => {
      document.removeEventListener("keydown", onKey);
      window.dispatchEvent(new CustomEvent("lightbox-toggle", { detail: { open: false } }));
    };
  }, [openIndex, close, prev, next]);

  return (
    <div className="relative">
      <div
        ref={ref}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((it, i) => (
          <div
            key={it.src}
            className="w-[96%] shrink-0 snap-start sm:w-[75%] lg:w-[50%] xl:w-[40%]"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`Enlarge photo ${i + 1}`}
              className="block w-full overflow-hidden rounded-2xl bg-white text-left shadow-sm ring-1 ring-stone-100 transition hover:shadow-md"
            >
              <div className="relative aspect-[3/2]">
                <Image
                  src={it.src}
                  alt={`${name} itinerary ${i + 1}${it.places.length ? " — " + it.places.join(", ") : ""}`}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 96vw, (max-width: 1024px) 75vw, 40vw"
                  className="object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="px-4 pb-4 pt-3">
                {it.days && (
                  <p className="font-oswald text-lg font-semibold capitalize text-stone-900">
                    {it.days}
                  </p>
                )}
                {it.places.length > 0 && (
                  <p className="mt-0.5 font-oswald leading-snug text-stone-600">
                    {it.places.join(", ")}
                  </p>
                )}
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* Mobile-only "there's more" cue: a fading edge over the peeking next
          card, gone once you've actually scrolled to the last one. */}
      {items.length > 1 && activeIndex < items.length - 1 && (
        <div className="pointer-events-none absolute right-0 top-0 h-[calc(100%-0.5rem)] w-14 bg-gradient-to-l from-stone-50 to-transparent sm:hidden" />
      )}

      {items.length > 1 && (
        <>
          <button
            onClick={() => scroll(-1)}
            aria-label="Previous itineraries"
            className="absolute -left-2 top-[34%] hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/60 text-stone-500 backdrop-blur-sm transition hover:bg-white/90 hover:text-brand-600 active:scale-90 sm:flex lg:-left-4"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label="Next itineraries"
            className="absolute -right-2 top-[34%] hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/60 text-stone-500 backdrop-blur-sm transition hover:bg-white/90 hover:text-brand-600 active:scale-90 sm:flex lg:-right-4"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </>
      )}

      {/* Mobile-only dot indicators — shows position/count since there's no
          visible scrollbar and the arrow buttons are desktop-only. */}
      {items.length > 1 && (
        <div className="mt-3 flex justify-center gap-1.5 sm:hidden">
          {items.map((it, i) => (
            <span
              key={it.src}
              className={`h-1.5 rounded-full transition-all ${
                i === activeIndex ? "w-5 bg-brand-500" : "w-1.5 bg-stone-300"
              }`}
            />
          ))}
        </div>
      )}

      {/* ── LIGHTBOX — portaled to <body> so it can never inherit a stray ancestor's
           layout/stacking context; click backdrop or Escape to close, arrow keys or
           the prev/next buttons to browse the rest of the carousel. ── */}
      {openIndex !== null &&
        createPortal(
          <div
            className="fixed left-0 top-0 z-[100] h-screen w-screen bg-stone-950/80"
            onClick={close}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex h-full items-center justify-center p-4">
              <div
                className="relative flex -translate-y-5 flex-col items-center sm:translate-y-1.5"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Sized to the photo's own 3:2 ratio (all itinerary photos share it),
                    so object-contain shows the complete photo — nothing cropped —
                    while still maximising size and never needing to scroll. */}
                <div className="relative aspect-[3/2] w-[min(98vw,calc(94vh*1.5))]">
                  <Image
                    src={items[openIndex].src}
                    alt={`${name} itinerary ${openIndex + 1}`}
                    fill
                    priority
                    sizes="94vw"
                    className="rounded-2xl object-contain"
                  />
                </div>
                {/* Preload the adjacent photos so prev/next feel instant instead of
                    fetching on demand. */}
                {items.length > 1 && (
                  <div className="hidden" aria-hidden="true">
                    <Image
                      src={items[(openIndex + 1) % items.length].src}
                      alt=""
                      width={800}
                      height={533}
                      loading="eager"
                    />
                    <Image
                      src={items[(openIndex - 1 + items.length) % items.length].src}
                      alt=""
                      width={800}
                      height={533}
                      loading="eager"
                    />
                  </div>
                )}
                {(items[openIndex].days || items[openIndex].places.length > 0) && (
                  <div className="mt-3 text-center text-white">
                    {items[openIndex].days && (
                      <p className="font-oswald text-lg font-semibold">{items[openIndex].days}</p>
                    )}
                    {items[openIndex].places.length > 0 && (
                      <p className="mt-0.5 font-oswald text-white/70">
                        {items[openIndex].places.join(", ")}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {items.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prev();
                    }}
                    aria-label="Previous photo"
                    className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white/60 backdrop-blur-sm transition hover:bg-white/20 hover:text-white active:scale-90 sm:left-5"
                  >
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      next();
                    }}
                    aria-label="Next photo"
                    className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white/60 backdrop-blur-sm transition hover:bg-white/20 hover:text-white active:scale-90 sm:right-5"
                  >
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
