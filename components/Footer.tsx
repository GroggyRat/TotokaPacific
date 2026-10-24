"use client";

import { useRef } from "react";
import { company, footer, nav } from "@/content/site";
import { gsap, useGSAP, SplitText } from "@/lib/motion";
import { MasiLine } from "./MasiLine";
import { Mark } from "./Wordmark";

// The wordmark rises into place as you reach the bottom of the page.
export function Footer() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          root.current,
          { clipPath: "inset(0% 8% 0% 8%)" },
          { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.out", scrollTrigger: { trigger: root.current, start: "top bottom", end: "top 40%", scrub: 0.6 } },
        );
        const split = SplitText.create(".ft-word", { type: "chars", mask: "chars" });
        gsap.fromTo(
          split.chars,
          { yPercent: 110 },
          { yPercent: 0, stagger: 0.04, ease: "power3.out", scrollTrigger: { trigger: ".ft-word", start: "top bottom", end: "bottom bottom", scrub: 0.8 } },
        );
        gsap.fromTo(".ft-mark", { rotate: -90, scale: 0.4 }, { rotate: 0, scale: 1, ease: "power3.out", scrollTrigger: { trigger: ".ft-word", start: "top bottom", end: "bottom bottom", scrub: 0.8 } });
        return () => split.revert();
      });
    },
    { scope: root },
  );

  return (
    <footer ref={root} className="tone-flip relative overflow-hidden bg-ground text-fg">
      <MasiLine className="text-accent/70" repeats={36} start="top bottom" end="top 50%" />
      <div className="grid grid-cols-1 gap-12 px-5 pb-10 pt-16 sm:grid-cols-2 sm:px-10 lg:grid-cols-12">
        <p className="max-w-[26ch] text-lg leading-snug text-fg/80 lg:col-span-4">{footer.line}</p>
        <nav aria-label="Footer" className="lg:col-span-3 lg:col-start-6">
          <ul className="grid grid-cols-2 gap-y-2.5">
            {nav.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="label text-fg/70 transition-colors duration-300 hover:text-accent">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-2 text-[0.98rem] lg:col-span-4 lg:col-start-9">
          <a href={`mailto:${company.email}`} className="block w-fit hover:text-accent">
            {company.email}
          </a>
          <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="block w-fit hover:text-accent">
            {company.phone}
          </a>
          <address className="not-italic text-fg/70">{company.address.join(", ")}</address>
        </div>
      </div>

      <div className="flex items-end gap-[2vw] px-5 sm:px-10">
        <Mark className="ft-mark mb-[2.2vw] h-[7vw] w-[7vw] shrink-0 text-accent" />
        <p aria-hidden="true" className="ft-word display whitespace-nowrap text-[10.6vw] leading-[0.85] tracking-[-0.02em]">
          TOTOKA PACIFIC
        </p>
      </div>

      <div className="label mt-8 flex flex-wrap justify-between gap-4 border-t border-fg/10 px-5 py-6 text-mist sm:px-10">
        <span>{footer.copyright}</span>
        <span>{footer.credit}</span>
        <a href="#top" className="hover:text-fg">
          {footer.top} ↑
        </a>
      </div>
    </footer>
  );
}
