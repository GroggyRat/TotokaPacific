import type { Metadata } from "next";
import { Archivo, Inter_Tight, IBM_Plex_Mono } from "next/font/google";
import { Providers } from "@/components/Providers";
import { company } from "@/content/site";
import "./globals.css";

const display = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
});
const body = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter-tight",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: `${company.name} — Import & export, Suva, Fiji`,
  description:
    "Sea and air freight in and out of Fiji, customs clearance and freight forwarding from Suva.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-FJ" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:px-3 focus:py-2 font-mono text-sm"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
