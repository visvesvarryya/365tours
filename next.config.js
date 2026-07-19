/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Serve modern formats; next/image negotiates AVIF/WebP per browser.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400, // cache optimised images 31 days
    // Capped at 1920 — our real source photos (hero banners, itinerary shots) top
    // out around 1600-1920px, so the default 2048/3840 tiers only made the dev-mode
    // image optimizer (sharp) do pointless extra work re-encoding oversized upscales
    // for every `sizes="100vw"` hero on first load.
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  webpack: (config, { dev }) => {
    // On Windows the webpack persistent (on-disk) cache intermittently fails to
    // atomically rename its *.pack.gz files (ENOENT), which can hang `next dev`.
    // Use an in-memory cache in dev to avoid the file-lock race entirely.
    if (dev) config.cache = { type: "memory" };
    return config;
  },
};

module.exports = nextConfig;
