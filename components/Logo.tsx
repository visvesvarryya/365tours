import Image from "next/image";
import Link from "next/link";

/**
 * The official 365 Tours brand mark (from 365tours.in). It's a full-colour logo on a
 * white ground, so it sits on a white chip to stay legible on both the transparent
 * hero navbar and the white scrolled navbar / dark footer.
 */
export default function Logo({
  className = "",
  height = 68,
  priority = false,
}: {
  className?: string;
  height?: number;
  priority?: boolean;
}) {
  // Render at 2x the display height so the fine tagline text stays crisp/legible.
  const displayW = Math.round((416 / 263) * height);
  // Scale gracefully down to a comfortable minimum on small screens, capping at
  // the requested height on larger ones — avoids the header overwhelming mobile.
  const minHeight = Math.min(64, height);
  return (
    <Link href="/" aria-label="365 Tours — home" className={`inline-flex ${className}`}>
      <span className="rounded-xl bg-white px-3 py-2 shadow-md ring-1 ring-black/5 transition-colors">
        <Image
          src="/brand/365logo1.png"
          alt="365 Tours — Explore, Experience, Evolve"
          width={416}
          height={263}
          quality={90}
          priority={priority}
          sizes="220px"
          style={{
            height: `clamp(${minHeight}px, 14vw, ${height}px)`,
            width: `clamp(${Math.round((416 / 263) * minHeight)}px, ${(14 * 416) / 263}vw, ${displayW}px)`,
          }}
        />
      </span>
    </Link>
  );
}
