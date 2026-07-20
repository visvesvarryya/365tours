import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "CSR | 365 Tours",
  description:
    "365 Tours' corporate social responsibility initiatives — a part of the profit from every booking goes toward giving back.",
  alternates: { canonical: "/csr" },
  robots: { index: true, follow: true },
};

const csrInitiatives = [
  "Empowering the girl child",
  "Planting a sapling for a better environment",
  "Vaccinations for the new born",
  "Vocational training & employment assistance",
];

export default function CsrPage() {
  return (
    <>
      <main className="bg-white pt-28">
        <div className="mx-auto max-w-3xl px-6 pb-20 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-500">
            Our Social Responsibility
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold text-stone-900 sm:text-5xl">
            Giving back, one journey at a time
          </h1>
          <p className="mt-6 text-stone-600 leading-relaxed">
            As part of our social responsibility, a part of the profit from your booking is
            allocated towards:
          </p>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {csrInitiatives.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-stone-100 bg-stone-50 p-5"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white">
                  ✓
                </span>
                <p className="font-medium text-stone-800">{item}</p>
              </li>
            ))}
          </ul>

          {/* Proof of impact — a sapling planted on 365 Tours' behalf */}
          <div className="mt-10 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-100">
            <div className="relative aspect-[16/10] w-full">
              <Image
                src="/about/pavithra-tree.jpg"
                alt="Pavithra's tree — a sapling planted by 365 Tours for a better environment"
                fill
                sizes="(max-width: 640px) 100vw, 700px"
                className="object-contain"
              />
            </div>
            <p className="px-5 py-3 text-xs text-stone-500">
              Pavithra&apos;s tree — a sapling planted on our behalf, tracked via SankalpTaru.
            </p>
          </div>

          <div className="pt-10">
            <Link href="/" className="text-sm font-semibold text-brand-600 hover:underline">
              ← Back to homepage
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
