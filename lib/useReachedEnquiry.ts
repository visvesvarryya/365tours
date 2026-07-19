"use client";

import { useState, useEffect } from "react";

/** True once the visitor has scrolled to the page's enquiry/contact section
 *  (id="enquire" on destination detail pages, id="contact" elsewhere) — used to
 *  keep the floating WhatsApp / back-to-top buttons out of the way until then.
 *  Pages with neither section (legal/info pages) default to true. */
export function useReachedEnquiry() {
  const [reached, setReached] = useState(false);

  useEffect(() => {
    const target = document.getElementById("enquire") || document.getElementById("contact");
    if (!target) {
      setReached(true);
      return;
    }
    // No negative rootMargin here — a tall section pinned near the bottom of a
    // short page (e.g. the homepage's #contact) may never be scrollable fully to
    // the top of the viewport, so shrinking the trigger region caused false
    // negatives. Any visible overlap is enough to count as "reached".
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setReached(true);
        observer.disconnect();
      }
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return reached;
}
