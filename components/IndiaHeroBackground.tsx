"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Real photos from the live 365tours.in/India hero carousel.
const slides = [
  { name: "Jaipur", image: "/india/hero/jaipur-hawa-mahal.jpg" },
  { name: "Agra", image: "/india/hero/taj-mahal.jpg" },
  { name: "Amritsar", image: "/india/hero/golden-temple.jpg" },
  { name: "Kerala", image: "/india/hero/kerala-backwaters.jpg" },
  { name: "Mysuru", image: "/india/hero/mysore-palace.jpg" },
  { name: "Udaipur", image: "/india/hero/udaipur-palace.jpg" },
];

export default function IndiaHeroBackground() {
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState<number[]>([0]);
  const [decoded, setDecoded] = useState<number[]>([]);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => {
        const next = (i + 1) % slides.length;
        setLoaded((l) => (l.includes(next) ? l : [...l, next]));
        return next;
      });
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {slides.map((slide, i) =>
        loaded.includes(i) ? (
          <Image
            key={slide.image}
            src={slide.image}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover object-top transition-opacity duration-[1500ms] ease-in-out"
            style={{ opacity: i === active && decoded.includes(i) ? 1 : 0 }}
            aria-hidden={i !== active ? true : undefined}
            onLoad={() => setDecoded((d) => (d.includes(i) ? d : [...d, i]))}
          />
        ) : null
      )}
    </>
  );
}
