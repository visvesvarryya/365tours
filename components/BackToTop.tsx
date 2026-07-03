"use client";

import { useState, useEffect } from "react";

/** Appears after scrolling down; smooth-scrolls back to the top. Sits above the
 *  floating WhatsApp button so the two never overlap. */
export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-24 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-600 shadow-lg ring-1 ring-black/5 transition-all duration-300 hover:bg-amber-50 hover:text-orange-500 active:scale-95 sm:bottom-[6.5rem] sm:right-6 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    </button>
  );
}
