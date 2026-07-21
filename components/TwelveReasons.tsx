// Matches 365tours.in's own "12 Reasons" presentation: white background, pastel
// rounded cards (3-colour cycle), Heebo Bold uppercase heading, Lato body copy.
const reasons = [
  { title: "1000+ Hours of Research & Planning", body: "Dedicated research team, prior visits, pre-tested to ensure you a hassle-free experience." },
  { title: "Signature Itineraries", body: "Well-crafted itineraries, 4–30 days: catering to your interest, time & budget." },
  { title: "More Regions", body: "9–50+ regions with interests ranging from wildlife, culture, history, nature, geography & adventure." },
  { title: "Choice of Accommodation", body: "9 categories: 3 Star, 4 Star, 5 Star, Luxury, Heritage, Boutique, Eco, Unusual & 365 Pick." },
  { title: "Top Rated Hotels & Restaurants", body: "As per TripAdvisor.com & Saveur. Pre-tested for quality, location, amenities, facilities & service." },
  { title: "Quality Vehicles", body: "Exclusive private vehicle — equipped with umbrellas, magazines, cooler, first aid kit, iPad etc." },
  { title: "Gourmet Cuisine", body: "Veg & Non-Veg — Indian, Local & International." },
  { title: "Menu Design & Planning", body: "Exclusively designed based on your dietary preference." },
  { title: "Unique Dining Experiences", body: "Vintage, award-winning, unique restaurants to ensure that unforgettable experience." },
  { title: "Expert Guides", body: "Exclusively for you right from arrival to departure. Knowledgeable, courteous, punctual & experienced." },
  { title: "Positive Reviews & Tour Orientation", body: "Exclusive & custom-designed travel kit, personal orientation. 24×7 contact while on tour." },
  { title: "And Lots More", body: "Things to see, do, experience & places 'off the beaten path' covered. No hidden cost." },
];

const bgTints = ["bg-[#CCDDED]", "bg-[#FDE9D1]", "bg-[#E9F3DA]"];

export default function TwelveReasons() {
  return (
    <section id="twelve-reasons" className="bg-white py-10">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        {/* Header */}
        <div className="mx-auto mb-[10.125px] text-center">
          <h2 className="font-heebo text-[28px] font-bold uppercase tracking-[-0.5px] text-stone-900 sm:text-[36px]">
            12 Reasons to Travel with 365 Tours
          </h2>
        </div>

        {/* Reason cards */}
        <div className="grid gap-3 sm:grid-cols-2">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className={`rounded-[25px] border border-stone-200 p-6 text-center ${bgTints[Math.floor(i / 2) % 3]}`}
            >
              <h3 className="text-xl font-bold text-black sm:text-2xl">{r.title}</h3>
              <p className="mx-auto mt-1.5 w-[70%] font-lato text-[#222222]">{r.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
