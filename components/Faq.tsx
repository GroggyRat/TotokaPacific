"use client";

import { useRef, useState } from "react";
import { faq } from "@/content/site";
import { gsap, useGSAP, SplitText, prefersReducedMotion } from "@/lib/motion";
import { SectionLabel } from "./SectionLabel";

export function Faq() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(".faq-title", { type: "lines", mask: "lines" });
        gsap.from(split.lines, { yPercent: 110, duration: 1.3, stagger: 0.1, ease: "expo.out", scrollTrigger: { trigger: root.current, start: "top 70%" } });
        gsap.from(".faq-item", { y: 30, autoAlpha: 0, stagger: 0.07, duration: 1, ease: "expo.out", scrollTrigger: { trigger: ".faq-list", start: "top 80%" } });
        return () => split.revert();
      });
    },
    { scope: root },
  );

  const toggle = (i: number) => {
    const q = gsap.utils.selector(root);
    const next = open === i ? null : i;
    const d = prefersReducedMotion() ? 0 : 0.7;
    if (open !== null) gsap.to(q(`#faq-a-${open}`), { height: 0, duration: d, ease: "expo.inOut" });
    if (next !== null) gsap.fromTo(q(`#faq-a-${next}`), { height: 0 }, { height: "auto", duration: d, ease: "expo.inOut" });
    setOpen(next);
  };

  return (
    <section id="faq" ref={root} aria-labelledby="faq-title" className="relative px-5 py-28 sm:px-10 sm:py-36">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <SectionLabel num={faq.num} label={faq.label} />
          <h2 id="faq-title" className="faq-title display mt-6 max-w-[12ch] text-[clamp(2.2rem,4.4vw,4.4rem)] leading-[1]">
            {faq.heading}
          </h2>
        </div>
        <ul className="faq-list border-t border-fg/15 lg:col-span-8">
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className="faq-item border-b border-fg/15">
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => toggle(i)}
                    className="group flex w-full items-center justify-between gap-8 py-6 text-left"
                  >
                    <span className="display text-[clamp(1.15rem,1.8vw,1.6rem)] leading-snug transition-colors duration-500 group-hover:text-accent">{item.q}</span>
                    <span
                      aria-hidden="true"
                      className={`relative h-9 w-9 shrink-0 rounded-full border border-fg/25 transition-[transform,border-color] duration-700 ease-[var(--ease-expo)] group-hover:border-fg/60 ${isOpen ? "rotate-180" : ""}`}
                    >
                      <span className="absolute left-1/2 top-1/2 h-px w-3.5 -translate-x-1/2 -translate-y-1/2 bg-fg" />
                      <span
                        className={`absolute left-1/2 top-1/2 h-3.5 w-px -translate-x-1/2 -translate-y-1/2 bg-fg transition-transform duration-700 ease-[var(--ease-expo)] ${isOpen ? "scale-y-0" : ""}`}
                      />
                    </span>
                  </button>
                </h3>
                <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="h-0 overflow-hidden" hidden={false} inert={!isOpen}>
                  <p className="max-w-[60ch] pb-7 pr-12 leading-relaxed text-fg/80">{item.a}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
