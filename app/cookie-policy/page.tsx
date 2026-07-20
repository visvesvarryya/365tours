import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Cookie Policy | 365 Tours",
  description:
    "How VRJ World Wide Holidays / 365 Tours uses cookies and similar technologies on 365tours.in.",
  alternates: { canonical: "/cookie-policy" },
  robots: { index: true, follow: true },
};

const updated = "13 July 2026";

export default function CookiePolicyPage() {
  return (
    <>
      <main>
        <div className="mx-auto max-w-3xl px-6 pb-20 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-500">Legal</p>
          <h1 className="mt-3 font-serif text-4xl font-bold text-stone-900 sm:text-5xl">
            Cookie Policy
          </h1>
          <p className="mt-3 text-sm text-stone-400">Effective: {updated}</p>

          <div className="mt-10 space-y-8 text-stone-600 leading-relaxed">
            <section>
              <p>
                VRJ World Wide Holidays / 365 Tours respects your privacy and is committed to
                safeguarding the security of your personal data. This Cookie Policy explains how
                information is collected, used, disclosed, transferred and stored via cookies on our
                website, so you can understand our practices. Please read it together with our{" "}
                <Link href="/privacy-policy" className="font-semibold text-brand-600 hover:underline">
                  Privacy Policy
                </Link>
                . It applies to all individuals who visit our website and to all information
                collected by means of cookies.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-stone-900">What Is a Cookie?</h2>
              <p className="mt-3">
                Cookies are a feature of web browser software that allow web servers to temporarily
                store information within your browser. They are generally used to make websites work,
                keep track of your movements within a site, remember your login details, and similar
                functions. Cookies are sent to the originating website (or another site that
                recognises the cookie) on subsequent visits. Most browsers automatically accept
                cookies, but you can change your browser settings to control or delete them, or to
                stop receiving them altogether. Cookies cannot access any other information on your
                device.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-stone-900">Types of Cookies</h2>
              <p className="mt-3">
                Cookies can be distinguished by their origin, function and lifespan:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li><span className="font-semibold text-stone-800">First-party</span> cookies are stored by the website you are visiting; <span className="font-semibold text-stone-800">third-party</span> cookies are stored by another website. We do not control the collection or further use of data by third parties.</li>
                <li><span className="font-semibold text-stone-800">Necessary</span> cookies allow the technical operation of a website (e.g. navigation and core features).</li>
                <li><span className="font-semibold text-stone-800">Performance</span> cookies collect data on a website&apos;s performance — visitor counts, time spent, error messages.</li>
                <li><span className="font-semibold text-stone-800">Functionality</span> cookies improve usability by remembering your choices (language, region, login, etc.).</li>
                <li><span className="font-semibold text-stone-800">Targeting/advertising</span> cookies enable personalised advertising.</li>
                <li><span className="font-semibold text-stone-800">Session</span> cookies are erased once you close your browser; <span className="font-semibold text-stone-800">persistent</span> cookies stay on your device until manually deleted or until they expire.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                Information We Collect &amp; Our Purpose for Using Cookies
              </h2>
              <p className="mt-3">
                Our website, online services, applications and advertisements may use cookies to
                collect information related to your use of the site, and to carry out transactions —
                disabling them may affect the site&apos;s functionality. We and our partners may use
                cookies to record anonymous, non-personal information about your visits to this and
                other websites, in order to measure advertising effectiveness.
              </p>
              <p className="mt-3">
                We may also collect non-personal information based on your browsing (clickstream)
                activity, including pages browsed and products/services viewed or booked. This helps
                us manage and develop our offers and tailor products and services to your interests. We
                use this data to measure entry/exit points, page and section visits, search activity,
                and the effectiveness of advertising banners and click-throughs.
              </p>
              <p className="mt-3">
                As with most websites, we automatically gather and log some information — IP address,
                browser type and language, Internet Service Provider, referring/exit pages, operating
                system, date/time stamp, and clickstream data — to understand trends, administer the
                site, learn about user behaviour, and gather aggregate demographic information; we may
                use this in our marketing and advertising.
              </p>
              <p className="mt-3">
                Some of our email messages use a click-through URL linked to content on our website;
                when clicked, you pass through a separate web server before reaching the destination
                page, which helps us gauge interest in particular topics and measure the effectiveness
                of our communications. If you prefer not to be tracked this way, avoid clicking text or
                graphic links within our emails. We also use pixel tags to confirm whether an email has
                been opened, which may help us reduce or eliminate messages sent to you.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-stone-900">Analytics Tools</h2>
              <p className="mt-3">
                We use analytics tools and third-party technologies, including Google Analytics, to
                collect and analyse cookies. We have contractual relationships with these analytics
                companies; they may combine this information with other data they have independently
                collected from other websites, under their own privacy policies.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-stone-900">Controlling Cookies</h2>
              <p className="mt-3">
                Most browsers accept cookies automatically, but you can set yours to warn you before
                accepting them, or to refuse them outright, via your browser&apos;s settings.
                Disabling cookies may impact your experience on our website. If you use multiple
                devices or browsers, you will need to set your preference on each one. To learn more
                about cookies and how to disable them, visit{" "}
                <a
                  href="http://www.allaboutcookies.org/manage-cookies/stop-cookies-installed.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand-600 hover:underline"
                >
                  allaboutcookies.org
                </a>
                .
              </p>
              <p className="mt-3">
                On 365tours.in specifically, a cookie banner lets you Accept or Decline optional
                analytics cookies on your first visit. You can change your choice at any time by
                clearing this site&apos;s data in your browser settings — the banner will then reappear
                on your next visit.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-stone-900">Changes to This Policy</h2>
              <p className="mt-3">
                This policy is effective as of Monday, 13 July 2026. We reserve the right to update or
                change it at any time; substantial updates will be communicated by email or a prominent
                notice on our website. Please check this page periodically — continued use of our
                website after changes are posted constitutes your acknowledgment of, and consent to,
                the modified policy.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-stone-900">Contact</h2>
              <p className="mt-3">
                Questions about this policy? Email{" "}
                <a href="mailto:tours@365tours.in" className="font-semibold text-brand-600 hover:underline">
                  tours@365tours.in
                </a>{" "}
                or call{" "}
                <a href="tel:+919840148869" className="font-semibold text-brand-600 hover:underline">
                  +91 98401 48869
                </a>
                . 37 1st Street, Singaravelan Nagar, Maduravoyal, Chennai – 600 095, India.
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
