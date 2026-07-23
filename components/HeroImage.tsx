"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

// Fades a hero photo in once it's actually decoded, instead of popping in over
// the .hero-shimmer placeholder on the section behind it.
export default function HeroImage({ className, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Image
      {...props}
      className={`hero-img ${className ?? ""}`}
      data-loaded={loaded}
      onLoad={() => setLoaded(true)}
    />
  );
}
