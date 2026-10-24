"use client";

import { useRef } from "react";
import { founder } from "@/content/site";
import { gsap, useGSAP, SplitText } from "@/lib/motion";
import { Frame } from "./Frame";
import { SectionLabel } from "./SectionLabel";

// Portrait wipes open; the quote fills in word by word as you scroll.
export function Founder() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".fd-photo",
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut", scrollTrigger: { trigger: ".fd-photo", start: "top 75%" } },
        );
        gsap.fromTo(".fd-photo .frame-inner", { scale: 1.3 }, { scale: 1, duration: 2.2, ease: "expo.out", scrollTrigger: { trigger: ".fd-photo", start: "top 75%" } });

        const split = SplitText.create(".fd-quote", { type: "words" });
        gsap.fromTo(
          split.words,
          { opacity: 0.12, y: 8 },
          { opacity: 1, y: 0, stagger: 0.06, ease: "power2.out", scrollTrigger: { trigger: ".fd-quote", start: "top 80%", end: "bottom 45%", scrub: 0.8 } },
        );
        gsap.from(".fd-meta > *", { autoAlpha: 0, y: 16, stagger: 0.1, duration: 1, ease: "expo.out", scrollTrigger: { trigger: ".fd-meta", start: "top 90%" } });
        return () => split.revert();
      });
    },
    { scope: root },
  );

  return (
    <section id="founder" ref={root} aria-labelledby="founder-title" className="relative px-5 pb-28 pt-12 sm:px-10 sm:pb-36">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5 lg:col-span-4">
          <SectionLabel num={founder.num} label={founder.label} className="mb-8" />
          <Frame shot={founder.photo} className="fd-photo aspect-[4/5] w-full" sizes="(min-width: 768px) 35vw, 100vw" />
        </div>
        <div className="flex flex-col justify-end md:col-span-7 lg:col-span-7 lg:col-start-6">
          <h2 id="founder-title" className="sr-only">
            {founder.label}: {founder.name}
          </h2>
          <blockquote className="fd-quote display text-[clamp(1.6rem,3.3vw,3.4rem)] leading-[1.15]">
            <span aria-hidden="true" className="text-accent">“</span>
            {founder.quote}
            <span aria-hidden="true" className="text-accent">”</span>
          </blockquote>
          <div className="fd-meta mt-10 flex items-center gap-5">
            <span aria-hidden="true" className="h-px w-12 bg-accent" />
            <div>
              <p className="text-lg font-medium">{founder.name}</p>
              <p className="label mt-1 text-mist">{founder.role}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
