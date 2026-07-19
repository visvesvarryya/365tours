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
  const scroll = (dir: number) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

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
                  className="object-cover transition-transform duration-300 hover:scale-105"
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
                className="relative flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Fixed, non-scrolling box that prioritises width — the photo fills it
                    edge-to-edge (object-cover), cropping a sliver off top/bottom rather
                    than letterboxing or ever needing scroll. */}
                <div className="relative h-[80vh] w-[94vw]">
                  <Image
                    src={items[openIndex].src}
                    alt={`${name} itinerary ${openIndex + 1}`}
                    fill
                    priority
                    sizes="94vw"
                    className="rounded-2xl object-cover"
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
