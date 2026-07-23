import LeadForm from "@/components/LeadForm";

export default function QuickEnquiryCTA({ name, source }: { name: string; source: string }) {
  return (
    <div id="enquire" className="mt-12 scroll-mt-24 overflow-hidden rounded-3xl bg-brand-900 shadow-xl">
      {/* Block stripe in the 365 Tours logo's own colours (public/brand/365logo1.png) —
          a deliberate, unmissable brand signature rather than a subtle tint. */}
      <div className="h-2 w-full bg-[linear-gradient(to_right,#00b4b4_0%,#00b4b4_20%,#603090_20%,#603090_40%,#fc9018_40%,#fc9018_60%,#90cc3c_60%,#90cc3c_80%,#fcf000_80%,#fcf000_100%)]" />
      <div className="p-8 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00b4b4]">
              Quick Enquiry
            </p>
            <h3 className="mt-3 font-serif text-2xl font-bold text-white sm:text-3xl">
              Get the full {name} itinerary
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-stone-400">
              For a detailed day-wise itinerary, price, inclusions &amp; exclusions, please send us
              an enquiry. Every tour is fully private and customisable to your dates, pace and
              style.
            </p>
          </div>
          <LeadForm variant="full" destination={name} source={source} />
        </div>
      </div>
    </div>
  );
}
