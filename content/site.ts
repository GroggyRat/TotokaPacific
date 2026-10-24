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
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

export const header = {
  clockLabel: "Suva",
  clockZone: "Pacific/Fiji",
  clockSuffix: "FJT",
  cta: "Get in touch",
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

// ── 02 About ────────────────────────────────────────────────────────────────
// TODO: confirm the company story with the founder.
export const about = {
  num: "02",
  label: "About",
  heading: "Fijian-owned, based in Suva.",
  body: [
    "Totoka Pacific is an import and export company in Suva. We move and clear cargo for shops, builders, farmers and manufacturers across Viti Levu, Vanua Levu and the outer islands.",
    "We started because local businesses kept losing time at the wharf. A container would sit at Suva for a week over one missing form.",
    "So we do the paperwork before the cargo lands, and we stay on the phone until it's out. Totoka is the iTaukei word for beautiful. We think a shipment that arrives on time and clears without trouble deserves the name.",
  ],
  facts: [
    { k: "Office", v: "Suva, Viti Levu" },
    { k: "Ports", v: "Suva (Kings Wharf), Lautoka" },
    { k: "Air", v: "Nadi International cargo terminal" },
  ],
  // TODO: replace with a real photo, e.g. /photos/about-suva-harbour.jpg (portrait, 1200×1500)
  photo: {
    src: "",
    alt: "Suva harbour seen from the shore, with ships at anchor",
    note: "Photo: Suva harbour, from the shore",
  },
};

// ── 03 Services ─────────────────────────────────────────────────────────────
export const services = {
  num: "03",
  label: "Services",
  heading: "Import, export, customs, freight.",
  intro: "Most customers use all four. You can also hire us for one part.",
  columns: { service: "Service", what: "What we do", docs: "Typical documents" },
  rows: [
    {
      name: "Import",
      what: "We bring your goods into Fiji by sea or air, from the supplier to your door. We book the freight, track it and call you when it lands.",
      docs: ["Commercial invoice", "Packing list", "Bill of lading or air waybill", "Import permit, if required"],
    },
    {
      name: "Export",
      what: "We send Fiji products overseas: kava, timber, garments, bottled water, fresh produce. We book the container or air space and prepare the export papers.",
      docs: ["Commercial invoice", "Packing list", "Certificate of origin", "Phytosanitary certificate for plants and food"],
    },
    {
      name: "Customs clearance",
      what: "We classify your goods, lodge the customs entry with FRCS and pay duty and VAT on your behalf. If Biosecurity needs to inspect, we book it.",
      docs: ["Customs entry", "HS code for each line", "Invoice and packing list", "BAF permit or certificate"],
    },
    {
      name: "Freight forwarding",
      what: "Full containers, shared containers, pallets or a single carton. We combine small loads so you only pay for the space you use.",
      docs: ["Booking confirmation", "Bill of lading or air waybill", "Delivery order", "Cargo insurance, optional"],
    },
  ],
};

// ── 04 Trade routes ─────────────────────────────────────────────────────────
// Transit times are typical door-to-port ranges. TODO: confirm with current schedules.
export const routes = {
  num: "04",
  label: "Routes",
  heading: "Where we ship to and from.",
  intro: "These are the lanes on the map above. Times are typical; we confirm them when we quote.",
  columns: { country: "Country", lane: "Lane", modes: "Mode", time: "Typical transit" },
  rows: [
    { country: "Australia", lane: "SUV → BNE · SYD", sea: true, air: true, time: "Sea 7–12 days · Air 1–2 days" },
    { country: "New Zealand", lane: "SUV → AKL", sea: true, air: true, time: "Sea 5–8 days · Air 1–2 days" },
    { country: "USA", lane: "SUV → LAX", sea: true, air: true, time: "Sea 18–25 days · Air 2–4 days" },
    { country: "China", lane: "SUV → SHA · NGB", sea: true, air: true, time: "Sea 20–30 days · Air 3–5 days" },
    { country: "India", lane: "SUV → NSA via SIN", sea: true, air: true, time: "Sea 30–40 days · Air 4–6 days" },
    { country: "Samoa", lane: "SUV → APW", sea: true, air: true, time: "Sea 4–7 days · Air 1–2 days" },
    { country: "Tonga", lane: "SUV → NUK", sea: true, air: true, time: "Sea 3–6 days · Air 1–2 days" },
    { country: "Vanuatu", lane: "SUV → VLI", sea: true, air: true, time: "Sea 5–8 days · Air 1–2 days" },
    { country: "Solomon Islands", lane: "SUV → HIR", sea: true, air: false, time: "Sea 7–10 days" },
    { country: "Tuvalu, Kiribati", lane: "SUV → FUN · TRW", sea: true, air: false, time: "Sea, sailings about monthly" },
  ],
  legend: { sea: "Sea", air: "Air", on: "Served", off: "Not served" },
};

// ── 05 How it works ─────────────────────────────────────────────────────────
export const howItWorks = {
  num: "05",
  label: "Process",
  heading: "How a shipment runs.",
  steps: [
    { name: "Enquiry", text: "Tell us what you're moving, where from and when you need it. A phone call or WhatsApp message is fine." },
    { name: "Quote", text: "We send a written quote with freight, a duty estimate and our fee. You decide before anything is booked." },
    { name: "Documents & customs", text: "We check your invoice and packing list, set the HS codes and lodge the entry with FRCS. If Biosecurity wants an inspection, we book it." },
    { name: "Shipping", text: "We book the space and send you the vessel or flight details. You hear from us when it leaves and when it lands." },
    { name: "Delivery", text: "We collect from the wharf or the Nadi cargo terminal and truck it to you. Or you collect it yourself, with the release in hand." },
  ],
};

// ── 06 Founder ──────────────────────────────────────────────────────────────
// TODO: real name, role and note from the founder.
export const founder = {
  num: "06",
  label: "Founder",
  heading: "Who you'll deal with.",
  name: "[Founder name]",
  role: "Founder and Managing Director",
  note: [
    "I grew up in Suva, close enough to Kings Wharf to hear the ships. I started Totoka Pacific because I watched good local businesses lose money waiting on paperwork.",
    "When you call us, you get me or someone sitting next to me. If your cargo is held up, we'll tell you why and what we're doing about it.",
  ],
  // TODO: replace with a real portrait, e.g. /photos/founder.jpg (portrait, 1000×1250)
  photo: { src: "", alt: "Portrait of the founder of Totoka Pacific", note: "Photo: founder portrait" },
};

// ── 07 FAQ ──────────────────────────────────────────────────────────────────
export const faq = {
  num: "07",
  label: "FAQ",
  heading: "Common questions.",
  items: [
    {
      q: "What documents do I need to import into Fiji?",
      a: "A commercial invoice, a packing list, and the bill of lading or air waybill. Food, plants, timber and animal products also need a Biosecurity permit, and some goods need an import permit. Send us what you have and we'll tell you what's missing.",
    },
    {
      q: "How long does sea freight take compared to air?",
      a: "By sea, about one to two weeks from Australia and New Zealand, and three to five weeks from Asia or the USA. By air, usually one to five days. Air costs more per kilo, so for heavy or bulky cargo sea is cheaper.",
    },
    {
      q: "How much duty and VAT will I pay?",
      a: "Duty depends on the HS code of your goods and their value. VAT is charged on the value plus freight and duty. We work out an estimate when we quote, and FRCS sets the final figure on the entry.",
    },
    {
      q: "Is there a minimum shipment size?",
      a: "No. Small loads go in a shared container (LCL) or by air, and you pay for the space you use. For full loads we book 20-foot or 40-foot containers.",
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

// ── 08 Contact ──────────────────────────────────────────────────────────────
export const contact = {
  num: "08",
  label: "Contact",
  heading: "Tell us what you're moving.",
  intro: "We reply the same working day. For anything urgent, WhatsApp or call.",
  hours: "Monday to Friday, 8am to 5pm", // TODO: confirm hours
  form: {
    name: "Name",
    email: "Email",
    phone: "Phone",
    phoneHint: "Optional",
    type: "Import or export?",
    types: ["Import", "Export", "Both", "Not sure yet"],
    message: "What are you moving?",
    messageHint: "Goods, rough size or weight, where from or to, and when.",
    submit: "Send enquiry",
    sending: "Opening your email app…",
    sent: "Your email app should have opened with the enquiry filled in. If it didn't, email us directly.",
    errors: {
      name: "Please add your name.",
      email: "Please add an email address we can reply to.",
      message: "Please tell us a little about the cargo.",
    },
  },
  whatsapp: "Message us on WhatsApp",
  labels: { email: "Email", phone: "Phone", office: "Office", hours: "Hours" },
};

export const footer = {
  line: "Import, export and customs clearance from Suva, Fiji.",
  copyright: `© ${new Date().getFullYear()} ${company.legalName}`,
};
