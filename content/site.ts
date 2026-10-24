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
