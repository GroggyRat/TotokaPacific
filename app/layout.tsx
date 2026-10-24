import type { Metadata, Viewport } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import { company } from "@/content/site";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
  variable: "--font-fraunces",
});
// Stand-in for Satoshi, which isn't on Google Fonts. To use Satoshi, add the
// woff2 files to /public/fonts and switch this to next/font/local.
const body = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-hanken",
});

export const metadata: Metadata = {
  title: `${company.name} — Import, export & customs, Suva, Fiji`,
  description:
    "Sea and air freight in and out of Fiji, customs clearance and freight forwarding from Suva.",
};

export const viewport: Viewport = {
  themeColor: "#060b14",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-FJ" className={`${display.variable} ${body.variable}`}>
      <body>
        <a
          href="#main"
          className="label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-bone focus:px-3 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <SmoothScroll>{children}</SmoothScroll>
        <Cursor />
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
