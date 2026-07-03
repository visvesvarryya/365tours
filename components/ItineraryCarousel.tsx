"use client";

import { useRef } from "react";
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

  return (
    <div className="relative">
      <div
        ref={ref}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((it, i) => (
          <div
            key={it.src}
            className="w-[80%] shrink-0 snap-start sm:w-[46%] lg:w-[31%] xl:w-[23.5%]"
          >
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-100 transition hover:shadow-md">
              <div className="relative aspect-[3/2]">
                <Image
                  src={it.src}
                  alt={`${name} itinerary ${i + 1}${it.places.length ? " — " + it.places.join(", ") : ""}`}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 46vw, 24vw"
                  className="object-cover"
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
            </div>
          </div>
        ))}
      </div>

      {items.length > 1 && (
        <>
          <button
            onClick={() => scroll(-1)}
            aria-label="Previous itineraries"
            className="absolute -left-2 top-[34%] hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 shadow-md transition hover:bg-brand-50 hover:text-brand-600 active:scale-90 sm:flex lg:-left-4"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label="Next itineraries"
            className="absolute -right-2 top-[34%] hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 shadow-md transition hover:bg-brand-50 hover:text-brand-600 active:scale-90 sm:flex lg:-right-4"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
