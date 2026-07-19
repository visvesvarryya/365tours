// State/UT → city directory for the /india page, sourced from the state-by-state
// listing on the live 365tours.in/India page. `slug` matches the keys in
// lib/india-states.ts, used to link each state to its /india/[state] detail page.
export interface IndiaState {
  name: string;
  slug: string;
  cities: string[];
}

export const indiaStates: IndiaState[] = [
  { name: "Andaman", slug: "andaman", cities: ["Port Blair", "Havelock Island", "Neil Island", "Baratang Island", "Barren Island"] },
  { name: "Andhra Pradesh", slug: "andhra-pradesh", cities: ["Hyderabad", "Tirupati", "Araku", "Srikalahasti", "Srisailam"] },
  { name: "Bihar", slug: "bihar", cities: ["Patna", "Bodh Gaya", "Nalanda", "Sarsaram"] },
  { name: "Chhattisgarh", slug: "chhattisgarh", cities: ["Raipur", "Bilaspur", "Sirpur", "Chitrakote Waterfall", "Achanakmar"] },
  { name: "New Delhi", slug: "new-delhi", cities: [] },
  { name: "Goa", slug: "goa", cities: ["Panjim", "Margao", "Old Goa", "Mapusa", "Vasco Da Gama"] },
  { name: "Gujarat", slug: "gujarat", cities: ["Ahmedabad", "Vadodara", "Dwarka", "Rann of Kutch", "Gir"] },
  { name: "Himachal Pradesh", slug: "himachal-pradesh", cities: ["Shimla", "Manali", "Kullu", "Dharamshala", "Spiti Valley", "Kufri"] },
  { name: "Jammu & Kashmir", slug: "jammu-and-kashmir", cities: ["Srinagar", "Gulmarg", "Pahalgam", "Sonamarg", "Vaishno Devi"] },
  { name: "Jharkhand", slug: "jharkhand", cities: ["Ranchi", "Jamshedpur", "Bokaro"] },
  { name: "Kerala", slug: "kerala", cities: ["Kochi", "Munnar", "Alappuzha", "Kumarakom", "Lakshadweep"] },
  { name: "Karnataka", slug: "karnataka", cities: ["Bengaluru", "Mysuru", "Coorg", "Hampi", "Chickmagalur", "Belur-Halebid"] },
  { name: "Maharashtra", slug: "maharashtra", cities: ["Mumbai", "Ajanta-Ellora", "Mahabaleshwar", "Shirdi", "Daman"] },
  { name: "Madhya Pradesh", slug: "madhya-pradesh", cities: ["Bhopal", "Indore", "Gwalior", "Khajuraho", "Ujjain"] },
  { name: "Odisha", slug: "odisha", cities: ["Bhubaneshwar", "Puri", "Konark"] },
  { name: "Punjab", slug: "punjab", cities: ["Amritsar", "Chandigarh", "Haryana"] },
  { name: "Rajasthan", slug: "rajasthan", cities: ["Jaipur", "Udaipur", "Jaisalmer", "Jodhpur", "Bikaner", "Mt Abu", "Ranthambore"] },
  { name: "Sikkim", slug: "sikkim", cities: ["Gangtok", "Pelling", "Geyzing"] },
  { name: "Tamil Nadu", slug: "tamil-nadu", cities: ["Chennai", "Madurai", "Trichy", "Thanjavur", "Kumbakonam", "Puducherry"] },
  // Source lists as "Tamilnadu" (one word); kept as "Tamil Nadu" here for readability.
  { name: "Uttarakhand", slug: "uttarakhand", cities: ["Mussoorie", "Nainital", "Rishikesh", "Haridwar", "Char Dham Yatra", "Jim Corbett NP", "Binsar"] },
  { name: "Uttar Pradesh", slug: "uttar-pradesh", cities: ["Agra", "Lucknow", "Varanasi", "Mathura", "Prayagraj", "Ayodhya", "Jhansi", "Kanpur", "Bareilly", "Dudhwa"] },
  { name: "West Bengal", slug: "west-bengal", cities: ["Kolkata", "Darjeeling", "Digha", "Dooars", "Sundarbans"] },
  { name: "Telangana", slug: "telangana", cities: ["Hyderabad", "Warangal", "Nizamabad"] },
  { name: "Northeast", slug: "northeast", cities: ["Assam", "Meghalaya", "Arunachal Pradesh", "Manipur", "Mizoram", "Nagaland", "Tripura"] },
  { name: "Ladakh", slug: "ladakh", cities: ["Leh", "Nubra Valley", "Pangong Lake", "Sham Valley"] },
];
