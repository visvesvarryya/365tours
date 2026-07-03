import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, Merriweather } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Analytics from "@/components/Analytics";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import BackToTop from "@/components/BackToTop";
import Navbar from "@/components/Navbar";
import { SITE_URL } from "@/lib/site";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// "Above The Sky Script" — the exact brush font the original 365tours.in uses
// (self-hosted, subset to Latin ~128 KB woff2).
const brush = localFont({
  src: "./fonts/ats-script.woff2",
  variable: "--font-brush",
  display: "swap",
});

// Merriweather italic — the original's subtitle serif.
const merri = Merriweather({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-merri",
  display: "swap",
});

const description =
  "Explore. Experience. Evolve. Private & customised tours across 7 continents, 100 countries, and 1500+ destinations. Based in Chennai, India.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "365 Tours | Private & Customised Travel",
  description,
  keywords: "private tours, customised travel, India tours, luxury travel, 365 tours, Chennai",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "365 Tours",
    title: "365 Tours | Private & Customised Travel",
    description,
    url: "/",
    images: [{ url: "/brand/365logo1.png", width: 416, height: 263, alt: "365 Tours" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "365 Tours | Private & Customised Travel",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#23686f",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${brush.variable} ${merri.variable}`}>
      <body>
        <Navbar />
        {children}
        <BackToTop />
        <FloatingWhatsApp />
      </body>
      <Analytics />
    </html>
  );
}
