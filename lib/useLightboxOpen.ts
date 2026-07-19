"use client";

import { useState, useEffect } from "react";

/** Tracks whether an ItineraryCarousel lightbox is currently open, via the
 *  "lightbox-toggle" window event — so global floating UI (WhatsApp button,
 *  back-to-top) can hide itself while a photo is enlarged. */
export function useLightboxOpen() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onToggle = (e: Event) => {
      const detail = (e as CustomEvent<{ open: boolean }>).detail;
      setOpen(detail.open);
    };
    window.addEventListener("lightbox-toggle", onToggle);
    return () => window.removeEventListener("lightbox-toggle", onToggle);
  }, []);

  return open;
}
