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
  { id: "about", num: "02", label: "About" },
  { id: "services", num: "03", label: "Services" },
  { id: "routes", num: "04", label: "Routes" },
  { id: "process", num: "05", label: "Process" },
  { id: "founder", num: "06", label: "Founder" },
  { id: "faq", num: "07", label: "FAQ" },
  { id: "contact", num: "08", label: "Contact" },
];

export const hero = {
  eyebrow: "Totoka Pacific · Suva, Fiji",
  heading: "We bring cargo into Fiji and send Fiji cargo out.",
  sentence:
    "Sea freight through Suva and Lautoka, air freight through Nadi. We do the customs entries ourselves.",
  cta: { label: "Get in touch", href: "#contact" },
  // TODO: replace with a real photo, e.g. /photos/hero-wharf.jpg (2400×1000 or wider)
  photo: {
    src: "",
    alt: "Container stacks on the wharf at Lautoka, with the hills of Viti Levu behind",
    note: "Photo: Lautoka wharf, container yard",
  },
  map: {
    title: "Where our cargo goes",
    note: "Sea lanes from Suva and Lautoka. Air cargo leaves from Nadi.",
    offChart: "off map",
  },
};

// Lanes drawn on the hero map. lon is degrees east (0–360), so the
// Americas use values above 180. Lanes that leave the map use `exit`.
export type MapLane = {
  name: string;
  place: string;
  lon: number;
  lat: number;
  bend: number; // curve amount, sign sets side
  label: "l" | "r";
  dy?: number;
  minor?: boolean; // label hidden on small screens
  exit?: { lon: number; lat: number; via?: [number, number] };
};

export const mapLanes: MapLane[] = [
  { name: "Australia", place: "Brisbane, Sydney", lon: 153.03, lat: -27.47, bend: 0.14, label: "r", dy: 30 },
  { name: "New Zealand", place: "Auckland", lon: 174.76, lat: -36.85, bend: -0.2, label: "r" },
  { name: "USA", place: "Los Angeles", lon: 241.76, lat: 33.74, bend: 0.16, label: "r", dy: 8 },
  { name: "Samoa", place: "Apia", lon: 188.23, lat: -13.83, bend: 0.3, label: "r", minor: true },
  { name: "Tonga", place: "Nuku‘alofa", lon: 184.8, lat: -21.14, bend: -0.3, label: "r", dy: 8, minor: true },
  { name: "China", place: "Shanghai, Ningbo", lon: 121.47, lat: 31.23, bend: 0.08, label: "r", dy: -28, exit: { lon: 138, lat: 22 } },
  {
    name: "India",
    place: "via Singapore",
    lon: 72.95,
    lat: 18.95,
    bend: 0,
    label: "r",
    dy: 30,
    exit: { lon: 138, lat: -10.1, via: [158, -13.5] },
  },
];

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
