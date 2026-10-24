// All site copy lives here. Edit text in this file only.
// Placeholders that need real details are marked with TODO.

export const company = {
  name: "Totoka Pacific",
  legalName: "Totoka Pacific Ltd", // TODO: confirm registered name
  city: "Suva",
  country: "Fiji",
  coords: "18°08′S 178°25′E",
  email: "info@totokapacific.com", // TODO: real email
  phone: "+679 000 0000", // TODO: real phone
  whatsapp: "https://wa.me/6790000000", // TODO: real WhatsApp number (digits only)
  address: ["Level 0, 00 Example Street", "Suva, Fiji"], // TODO: real address
};

export const nav = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "voyage", label: "Voyage" },
  { id: "process", label: "Process" },
  { id: "founder", label: "Founder" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

export const header = {
  clockLabel: "Suva",
  clockZone: "Pacific/Fiji",
  clockSuffix: "FJT",
  cta: "Get in touch",
  ctaShort: "Contact",
  theme: { label: "Colour theme", auto: "Auto", day: "Day", night: "Night" },
};

// ── 00 Preloader ────────────────────────────────────────────────────────────
export const preloader = {
  word: "TOTOKA PACIFIC",
  caption: "Suva · Fiji",
};

// ── 01 Hero ─────────────────────────────────────────────────────────────────
export const hero = {
  label: "Import · Export · Customs",
  coords: "18°08′S 178°25′E",
  lines: ["Suva to", "anywhere."],
  sentence:
    "We move cargo in and out of Fiji. Sea freight through Suva and Lautoka, air through Nadi, customs entries done in-house.",
  scroll: "Scroll",
  drag: "Drag",
  // Optional looping hero video, muted. Leave empty to show the globe only.
  // TODO: e.g. /video/hero-ships.mp4 (H.264, 1920×1080, under 4 MB) and a poster image.
  video: { src: "", poster: "" },
};

// Destinations drawn as arcs on the globe. Keep in sync with scripts/globe-points.mjs.
export const globe = {
  origin: { name: "Suva", lat: -18.14, lon: 178.44 },
  destinations: [
    { name: "Brisbane", lat: -27.47, lon: 153.03 },
    { name: "Sydney", lat: -33.87, lon: 151.21 },
    { name: "Auckland", lat: -36.85, lon: 174.76 },
    { name: "Shanghai", lat: 31.23, lon: 121.47 },
    { name: "Nhava Sheva", lat: 18.95, lon: 72.95 },
    { name: "Los Angeles", lat: 33.74, lon: -118.24 },
    { name: "Apia", lat: -13.83, lon: -171.77 },
    { name: "Nuku‘alofa", lat: -21.14, lon: -175.2 },
    { name: "Port Vila", lat: -17.73, lon: 168.32 },
    { name: "Honiara", lat: -9.43, lon: 159.95 },
    { name: "Tarawa", lat: 1.42, lon: 172.98 },
  ],
};

// Photo slots. Leave `src` empty to show the drawn stand-in.
// TODO: replace each with a real photo in /public/photos (sizes noted).
export type Shot = { src: string; alt: string; note: string; scene: "ship" | "cranes" | "containers" | "coast" | "docs" | "pallets" | "portrait" };

// ── 02 About ────────────────────────────────────────────────────────────────
// TODO: confirm the story with the founder.
export const about = {
  num: "02",
  label: "About",
  statement:
    "Totoka Pacific is a Suva company. We bring containers, pallets and parcels into Fiji and send Fiji’s products out: kava, timber, water, garments. We lodge the customs entry before the ship berths, so your cargo leaves the wharf instead of waiting on it.",
  // Words in the statement to set in the accent colour.
  highlight: ["before", "the", "ship", "berths,"],
  facts: [
    { k: "Office", v: "Suva, Viti Levu" },
    { k: "Sea", v: "Kings Wharf · Lautoka" },
    { k: "Air", v: "Nadi cargo terminal" },
  ],
  photos: [
    { src: "", alt: "Container ship seen from above, deck stacked with boxes", note: "Ship from above · 1600×2000", scene: "ship" },
    { src: "", alt: "Gantry cranes on the wharf at dusk", note: "Cranes at dusk · 1600×1200", scene: "cranes" },
    { src: "", alt: "Fiji coastline with reef and open water", note: "Fiji coastline · 1600×1200", scene: "coast" },
  ] as Shot[],
};

// ── 03 Services ─────────────────────────────────────────────────────────────
export const services = {
  num: "03",
  label: "Services",
  heading: "Four jobs. One desk in Suva.",
  hint: "Scroll",
  docsLabel: "Usually needed",
  items: [
    {
      name: "Import",
      text: "Goods into Fiji by sea or air, supplier to your door. We book the freight, track it and call you when it lands.",
      docs: ["Commercial invoice", "Packing list", "Bill of lading or air waybill"],
      photo: { src: "", alt: "Containers stacked on the wharf", note: "Containers on the wharf · 1600×2000", scene: "containers" } as Shot,
    },
    {
      name: "Export",
      text: "Kava, timber, water, garments, fresh produce. We book the container or air space and prepare the export papers.",
      docs: ["Certificate of origin", "Phytosanitary certificate", "Export permit, if required"],
      photo: { src: "", alt: "Wrapped pallets ready for export", note: "Export pallets · 1600×2000", scene: "pallets" } as Shot,
    },
    {
      name: "Customs clearance",
      text: "We classify your goods, lodge the entry with FRCS and pay duty and VAT for you. If Biosecurity wants an inspection, we book it.",
      docs: ["Customs entry", "HS code for each line", "BAF permit or certificate"],
      photo: { src: "", alt: "Customs paperwork with a stamp", note: "Customs papers · 1600×2000", scene: "docs" } as Shot,
    },
    {
      name: "Freight forwarding",
      text: "Full containers, shared containers, pallets or one carton. We combine small loads so you pay only for the space you use.",
      docs: ["Booking confirmation", "Delivery order", "Cargo insurance, optional"],
      photo: { src: "", alt: "Gantry cranes loading a vessel", note: "Cranes loading · 1600×2000", scene: "cranes" } as Shot,
    },
  ],
};

// ── 04 The Voyage ───────────────────────────────────────────────────────────
// Typical timing for one full container. TODO: confirm with current schedules.
export const voyage = {
  num: "04",
  label: "The Voyage",
  heading: "Suva to Brisbane, eight days.",
  intro: "One full container, start to finish.",
  eta: "ETA 8 DAYS · 1,480 NM",
  footnote: "Typical timing. Schedules vary by carrier and season.",
  waypoints: [
    { day: "Day 0", place: "Kings Wharf, Suva", note: "Export entry lodged. Container sealed and gated in." },
    { day: "Day 1", place: "Lautoka", note: "Vessel loads more Fiji cargo on the west side." },
    { day: "Day 4", place: "Coral Sea", note: "Position update sent to you and the buyer." },
    { day: "Day 7", place: "Moreton Bay", note: "Arrival notice to the buyer’s customs broker." },
    { day: "Day 8", place: "Port of Brisbane", note: "Container discharged and released." },
  ],
};

// ── 05 How it works ─────────────────────────────────────────────────────────
export const howItWorks = {
  num: "05",
  label: "How it works",
  heading: "From first call to your door.",
  board: { title: "Shipment status", step: "Step", stage: "Stage", status: "Status" },
  status: { done: "DONE", now: "NOW", next: "NEXT" },
  steps: [
    { name: "Enquiry", code: "ENQUIRY", text: "Tell us what you’re moving, where from and when you need it. A call or a WhatsApp message is fine." },
    { name: "Quote", code: "QUOTE", text: "A written quote with freight, a duty estimate and our fee. Nothing is booked until you say yes." },
    { name: "Documents & customs", code: "CUSTOMS", text: "We check the invoice and packing list, set the HS codes and lodge the entry with FRCS." },
    { name: "Shipping", code: "SHIPPING", text: "We book the space and send you the vessel or flight. You hear from us when it leaves and when it lands." },
    { name: "Delivery", code: "DELIVERY", text: "We collect from the wharf or the Nadi cargo terminal and truck it to you, released and paid." },
  ],
};

// ── 06 Numbers ──────────────────────────────────────────────────────────────
// PLACEHOLDER values. Replace with real figures before launch.
export const numbers = {
  num: "06",
  label: "In numbers",
  placeholderTag: "Placeholder",
  placeholderNote: "Placeholder figures. Replace with real ones before launch.",
  items: [
    { value: 11, suffix: "", label: "Countries we ship to", placeholder: true },
    { value: 14, suffix: "", label: "Regular sea and air lanes", placeholder: true },
    { value: 8, suffix: "", label: "Years operating", placeholder: true },
  ],
  marquee: ["Brisbane", "Sydney", "Auckland", "Shanghai", "Nhava Sheva", "Los Angeles", "Apia", "Nuku‘alofa", "Port Vila", "Honiara", "Tarawa"],
};

// ── 07 Founder ──────────────────────────────────────────────────────────────
// TODO: real name, role and words from the founder.
export const founder = {
  num: "07",
  label: "Founder",
  name: "[Founder name]",
  role: "Founder and Managing Director",
  quote:
    "I grew up close enough to Kings Wharf to hear the ships. I started Totoka Pacific because I watched good Suva businesses lose money waiting on paperwork. When you call us, you get me or someone sitting next to me.",
  photo: { src: "", alt: "Portrait of the founder of Totoka Pacific", note: "Founder portrait · 1200×1500", scene: "portrait" } as Shot,
};

// ── 08 FAQ ──────────────────────────────────────────────────────────────────
export const faq = {
  num: "08",
  label: "FAQ",
  heading: "Questions we get every week.",
  items: [
    {
      q: "What documents do I need to import into Fiji?",
      a: "A commercial invoice, a packing list, and the bill of lading or air waybill. Food, plants, timber and animal products also need a Biosecurity permit, and some goods need an import permit. Send us what you have and we’ll tell you what’s missing.",
    },
    {
      q: "How long does sea freight take compared to air?",
      a: "By sea, about one to two weeks from Australia and New Zealand, and three to five weeks from Asia or the USA. By air, usually one to five days. Air costs more per kilo, so heavy or bulky cargo goes cheaper by sea.",
    },
    {
      q: "How much duty and VAT will I pay?",
      a: "Duty depends on the HS code and value of your goods. VAT is charged on the value plus freight and duty. We give you an estimate with the quote; FRCS sets the final figure on the entry.",
    },
    {
      q: "Is there a minimum shipment size?",
      a: "No. Small loads go in a shared container (LCL) or by air, and you pay for the space you use. Full loads go in 20-foot or 40-foot containers.",
    },
    {
      q: "Who handles biosecurity?",
      a: "We do. We apply to the Biosecurity Authority of Fiji, book the inspection and arrange fumigation or treatment if they ask for it. Their fees are passed on at cost.",
    },
    {
      q: "Can you clear cargo that another company shipped?",
      a: "Yes. Send us the bill of lading or air waybill and the invoice. We lodge the entry and arrange collection.",
    },
    {
      q: "Do you ship to the outer islands?",
      a: "Yes. We put cargo on inter-island vessels from Suva to Vanua Levu, Taveuni, Kadavu, Lau and Lomaiviti.",
    },
  ],
};

// ── 09 Contact ──────────────────────────────────────────────────────────────
export const contact = {
  num: "09",
  label: "Contact",
  heading: "Let’s move something.",
  intro: "Tell us what you’re moving. We reply the same working day.",
  whatsapp: "WhatsApp us",
  hours: "Mon–Fri, 8am–5pm FJT", // TODO: confirm hours
  labels: { email: "Email", phone: "Phone", office: "Office", hours: "Hours" },
  form: {
    name: "Name",
    email: "Email",
    phone: "Phone (optional)",
    type: "Import or export?",
    types: ["Import", "Export", "Both", "Not sure"],
    message: "What are you moving?",
    messageHint: "Goods, rough size or weight, from where to where, and when.",
    submit: "Send enquiry",
    sent: "Your email app should open with the enquiry filled in. If it doesn’t, email us directly.",
    errors: {
      name: "Add your name.",
      email: "Add an email address we can reply to.",
      message: "Tell us a little about the cargo.",
    },
  },
};

export const footer = {
  line: "Import, export and customs clearance from Suva, Fiji.",
  copyright: `© ${new Date().getFullYear()} ${company.legalName}`,
  top: "Back to top",
};
