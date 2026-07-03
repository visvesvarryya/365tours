import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Destinations from "@/components/Destinations";
import DestinationDirectory from "@/components/DestinationDirectory";
import AccommodationTypes from "@/components/AccommodationTypes";
import TwelveReasons from "@/components/TwelveReasons";
import WhyUs from "@/components/WhyUs";
import MakeNewMemories from "@/components/MakeNewMemories";
import TrustBar from "@/components/TrustBar";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { SITE_URL, absoluteUrl } from "@/lib/site";

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "365 Tours",
  description:
    "Private & customised tours across 7 continents, 100 countries and 1500+ destinations.",
  url: SITE_URL,
  logo: absoluteUrl("/brand/365logo1.png"),
  image: absoluteUrl("/brand/365logo1.png"),
  telephone: "+91-98401-48869",
  email: "tours@365tours.in",
  address: {
    "@type": "PostalAddress",
    streetAddress: "37 1st Street, Singaravelan Nagar, Maduravoyal",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    postalCode: "600095",
    addressCountry: "IN",
  },
  areaServed: "Worldwide",
  sameAs: [
    "https://www.facebook.com/365tours",
    "https://www.instagram.com/365tours",
    "https://365tours.blogspot.com",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <Hero />
      <Stats />
      <Destinations />
      <DestinationDirectory />
      <AccommodationTypes />
      <TwelveReasons />
      <WhyUs />
      <MakeNewMemories />
      <TrustBar />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
