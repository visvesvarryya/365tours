"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { LiveReview } from "@/lib/reviews";

export type CuratedReview = {
  name: string;
  trip: string;
  text: string;
  avatar: string;
  photo: string | null;
};

export function GoogleG({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

export function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="#f59e0b">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ReviewsGrid({
  live,
  curated,
  show = 6,
}: {
  live: LiveReview[] | null;
  curated: CuratedReview[];
  show?: number;
}) {
  // Deterministic on the server (first N), then reshuffle on the client each load.
  const [shown, setShown] = useState<CuratedReview[]>(() => curated.slice(0, show));

  useEffect(() => {
    if (!live || live.length === 0) setShown(shuffle(curated).slice(0, show));
  }, [live, curated, show]);

  if (live && live.length > 0) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {live.slice(0, show).map((r, i) => (
          <LiveReviewCard key={`${r.author}-${i}`} review={r} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {shown.map((review) => (
        <div
          key={review.name}
          className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-stone-100 transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="relative h-40">
            {review.photo ? (
              <Image
                src={review.photo}
                alt={`${review.trip} — 365 Tours`}
                fill
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-brand-400 to-teal-600" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/75 via-stone-900/10 to-transparent" />
            <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow">
              <GoogleG size={16} />
            </span>
            {review.trip && (
              <span className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-stone-800 shadow">
                📍 {review.trip}
              </span>
            )}
          </div>
          <div className="flex flex-1 flex-col p-6">
            <Stars count={5} />
            <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-600">
              &ldquo;{review.text}&rdquo;
            </p>
            <div className="mt-5 flex items-center gap-3 border-t border-stone-100 pt-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                {review.avatar}
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-900">{review.name}</p>
                <p className="flex items-center gap-1 text-xs text-stone-400">
                  <GoogleG size={11} /> Verified Google review
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function LiveReviewCard({ review }: { review: LiveReview }) {
  const initials = review.author
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="flex flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-stone-100 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {review.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={review.photo}
              alt={review.author}
              width={44}
              height={44}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="h-11 w-11 rounded-full object-cover ring-1 ring-stone-200"
            />
          ) : (
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
              {initials}
            </div>
          )}
          <div>
            <p className="text-sm font-semibold text-stone-900">{review.author}</p>
            <p className="text-xs text-stone-400">{review.time}</p>
          </div>
        </div>
        <GoogleG size={18} />
      </div>
      <div className="mt-4">
        <Stars count={5} />
      </div>
      <p className="mt-3 line-clamp-5 text-sm leading-relaxed text-stone-600">
        &ldquo;{review.text}&rdquo;
      </p>
    </div>
  );
}
