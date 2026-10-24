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
  num: "01",
  label: "Overview",
  docRef: "DOC TP-01",
  meta: ["Suva, Fiji", "18°08′S 178°25′E", "Sea · Air · Customs"],
  sentence:
    "We bring cargo into Fiji and send Fiji cargo out. Sea freight through Suva and Lautoka, air freight through Nadi, customs entries done by us.",
  cta: { label: "Get in touch", href: "#contact" },
  fields: [
    { k: "Sea ports", v: "FJSUV Suva · FJLTK Lautoka" },
    { k: "Air cargo", v: "NAN Nadi International" },
    { k: "Loads", v: "FCL · LCL · Pallets · Loose cargo" },
    { k: "Office", v: "Suva, Viti Levu" },
  ],
  map: {
    figure: "Fig. 1",
    caption: "Trade lanes from Fiji",
    legend: { sea: "Sea freight", air: "Air freight", vessel: "Vessel" },
    offChart: "Off chart",
  },
};

// Destinations drawn on the hero map. lon is degrees east (0–360), so the
// Americas use values above 180. Routes leaving the chart use `exit`.
export type Mode = "sea" | "air";

export type MapRoute = {
  code: string;
  city: string;
  lon: number;
  lat: number;
  modes: Mode[];
  bend: number; // curve amount, sign sets side
  minor?: boolean; // hidden on small screens
  labelSide?: "l" | "r";
  labelDy?: number;
  exit?: { lon: number; lat: number; via?: [number, number] };
};

export const mapRoutes: MapRoute[] = [
  { code: "AUBNE", city: "Brisbane", lon: 153.03, lat: -27.47, modes: ["sea", "air"], bend: 0.18, labelSide: "l" },
  { code: "AUSYD", city: "Sydney", lon: 151.21, lat: -33.87, modes: ["sea", "air"], bend: -0.12, labelSide: "l" },
  { code: "NZAKL", city: "Auckland", lon: 174.76, lat: -36.85, modes: ["sea", "air"], bend: -0.2, labelSide: "r" },
  { code: "USLAX", city: "Los Angeles", lon: 241.76, lat: 33.74, modes: ["sea", "air"], bend: 0.16, labelSide: "l", labelDy: 30 },
  { code: "WSAPW", city: "Apia", lon: 188.23, lat: -13.83, modes: ["sea"], bend: 0.25, labelSide: "r" },
  { code: "TONUK", city: "Nuku‘alofa", lon: 184.8, lat: -21.14, modes: ["sea"], bend: -0.25, labelSide: "r", labelDy: 6 },
  { code: "VUVLI", city: "Port Vila", lon: 168.32, lat: -17.73, modes: ["sea"], bend: 0.2, minor: true, labelSide: "l", labelDy: -10 },
  { code: "SBHIR", city: "Honiara", lon: 159.95, lat: -9.43, modes: ["sea"], bend: 0.12, minor: true, labelSide: "l", labelDy: -12 },
  { code: "KITRW", city: "Tarawa", lon: 172.98, lat: 1.42, modes: ["sea"], bend: -0.15, minor: true, labelSide: "l" },
  { code: "TVFUN", city: "Funafuti", lon: 179.2, lat: -8.52, modes: ["sea"], bend: 0.2, minor: true, labelSide: "r" },
  {
    code: "CNSHA",
    city: "Shanghai · Ningbo",
    lon: 121.47,
    lat: 31.23,
    modes: ["sea"],
    bend: 0.1,
    labelSide: "r",
    exit: { lon: 138, lat: 24 },
  },
  {
    code: "INNSA",
    city: "Nhava Sheva",
    lon: 72.95,
    lat: 18.95,
    modes: ["sea"],
    bend: 0,
    labelSide: "r",
    labelDy: 26,
    exit: { lon: 138, lat: -10.1, via: [158, -13.5] },
  },
];
