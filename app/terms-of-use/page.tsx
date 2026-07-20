import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Use | 365 Tours",
  description: "The terms governing your use of the 365tours.in website, operated by VRJ World Wide Holidays / 365 Tours.",
  alternates: { canonical: "/terms-of-use" },
  robots: { index: true, follow: true },
};

export default function TermsOfUsePage() {
  return (
    <>
      <main>
        <div className="mx-auto max-w-3xl px-6 pb-20 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-500">Legal</p>
          <h1 className="mt-3 font-serif text-4xl font-bold text-stone-900 sm:text-5xl">
            Terms of Use
          </h1>

          <div className="mt-10 space-y-8 text-stone-600 leading-relaxed">
            <section>
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                Agreement Between User and VRJ World Wide Holidays / 365 Tours
              </h2>
              <p className="mt-3">
                This website is offered to you conditioned on your acceptance, without modification,
                of the terms, conditions and notices contained herein. Your use of this website
                constitutes your agreement to all such terms, conditions and notices, which are
                subject to amendment without notice. You agree to familiarise yourself with these
                Terms of Use and any other guidelines found throughout this website, and to abide by
                them if you choose to use the sites, pages or services to which they apply.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                Personal and Non-Commercial Use Limitation
              </h2>
              <p className="mt-3">
                This website is for your personal and non-commercial use. You will not modify, copy,
                distribute, transmit, display, perform, reproduce, publish, license, create derivative
                works from, transfer, or sell any information, software, products or services obtained
                from this website.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                Links to Third-Party Websites
              </h2>
              <p className="mt-3">
                This website may contain links to websites operated by parties other than VRJ World
                Wide Holidays / 365 Tours. Such links are provided for your convenience only — we do
                not control these websites and are not responsible for their contents under any
                circumstances. Inclusion of a link does not imply endorsement of the linked
                material or any association with its operators.
              </p>
              <p className="mt-3">
                Your correspondence or business dealings with, or participation in promotions found
                through, such websites are solely between you and those parties. We are not
                responsible or liable for any loss or damage incurred as a result of such dealings, or
                as a result of the presence of such links on our website.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-stone-900">No Unlawful or Prohibited Use</h2>
              <p className="mt-3">
                As a condition of your use of this website, you warrant to VRJ World Wide Holidays /
                365 Tours that you will not use it for any purpose that is unlawful or prohibited by
                these terms, conditions and notices.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-stone-900">Software Available on This Website</h2>
              <p className="mt-3">
                Any software made available to download from this website (&quot;Software&quot;) is
                the copyrighted work of VRJ World Wide Holidays / 365 Tours and/or its suppliers. Your
                use of the Software is governed by the terms of any accompanying end-user licence
                agreement (&quot;Licence Agreement&quot;); you will not install or use Software
                accompanied by a Licence Agreement unless you first agree to its terms. For any
                Software not accompanied by a licence agreement, we grant you a personal,
                non-transferable licence to use it solely for viewing and otherwise using this
                website, provided you keep intact all copyright and proprietary notices. All Software
                on this website, including source code, is owned by VRJ World Wide Holidays / 365
                Tours and/or its suppliers and protected by copyright law and international treaty. Any
                reproduction or redistribution is expressly prohibited and may result in civil and
                criminal penalties.
              </p>
              <p className="mt-3">
                Copying or reproducing the Software to any other server or location for further
                reproduction or redistribution is expressly prohibited. The Software is warranted, if
                at all, only according to the terms of the Licence Agreement. You acknowledge that the
                Software, and any accompanying documentation or technical information, is subject to
                applicable export control laws and regulations of India, and you agree not to export or
                re-export the Software, directly or indirectly, to any country subject to Indian export
                restrictions.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-stone-900">Contact</h2>
              <p className="mt-3">
                Questions about these terms? Email{" "}
                <a href="mailto:tours@365tours.in" className="font-semibold text-brand-600 hover:underline">
                  tours@365tours.in
                </a>{" "}
                or call{" "}
                <a href="tel:+919840148869" className="font-semibold text-brand-600 hover:underline">
                  +91 98401 48869
                </a>
                .
              </p>
            </section>

            <div className="pt-4">
              <Link href="/" className="text-sm font-semibold text-brand-600 hover:underline">
                ← Back to homepage
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
