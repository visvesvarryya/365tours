import Image from "next/image";

// The real recognition strips from 365tours.in — each JPEG is a montage of the
// actual brand logos, kept under its original heading.
const groups = [
  {
    heading: "As Seen/ Recommended/ Inspired by:",
    img: "/brand/partner1.jpg",
    alt: "National Geographic, Condé Nast Traveler, Wanderlust, Travel+Leisure, Fodor's Travel and Discovery Travel & Living",
  },
  {
    heading: "Top Rated Hotels & Restaurants as per:",
    img: "/brand/partner2.jpg",
    alt: "Tripadvisor and Saveur",
  },
  {
    heading: "Bespoke Tours to Heritage Sites:",
    img: "/brand/partner3.jpg",
    alt: "UNESCO World Heritage Sites",
  },
];

export default function TrustBar() {
  return (
    <section className="border-y border-amber-100 bg-gradient-to-b from-amber-50 to-white py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-6 md:grid-cols-3">
          {groups.map((g) => (
            <div
              key={g.heading}
              className="flex flex-col items-center rounded-3xl border border-stone-100 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <p className="font-serif text-lg font-bold text-stone-900">{g.heading}</p>
              <div className="mt-4 flex flex-1 items-center justify-center">
                <Image
                  src={g.img}
                  alt={g.alt}
                  width={416}
                  height={281}
                  loading="lazy"
                  className="h-auto w-full max-w-[280px] object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-center text-[15px] italic leading-relaxed text-black">
          <b>Disclaimer:</b> The logos &amp; names used are for identification purpose and belong
          to respective owners.
        </p>
      </div>
    </section>
  );
}
