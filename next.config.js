/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Serve modern formats; next/image negotiates AVIF/WebP per browser.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400, // cache optimised images 31 days
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
