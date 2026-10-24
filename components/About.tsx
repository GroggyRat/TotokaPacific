"use client";

import { useRef } from "react";
import { about } from "@/content/site";
import { gsap, SplitText, useGSAP } from "@/lib/motion";
import { Frame } from "./Frame";
import { SectionLabel } from "./SectionLabel";

// Pinned. Words light from dim to full as you scroll; photos drift behind
// at different speeds.
const PHOTO_POS = [
  "left-[4%] top-[12%] w-[34vw] aspect-[4/5] md:left-[5%] md:top-[14%] md:w-[17vw]",
  "right-[4%] top-[9%] w-[40vw] aspect-[4/3] md:right-[6%] md:top-[10%] md:w-[24vw]",
  "right-[10%] bottom-[6%] w-[44vw] aspect-[4/3] md:right-[auto] md:left-[56%] md:bottom-[4%] md:w-[22vw]",
];
const SPEEDS = [-28, -60, -42]; // vh travelled across the pin

export function About() {
  const root = useRef<HTMLElement>(null);
  const text = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(text.current, { type: "words" });
        // Highlight the first run of words matching `about.highlight`.
        const words = split.words as HTMLElement[];
        const txt = words.map((w) => w.textContent ?? "");
        const at = txt.findIndex((_, i) => about.highlight.every((h, k) => txt[i + k] === h));
        if (at >= 0) about.highlight.forEach((_, k) => words[at + k].classList.add("text-accent"));
        gsap.set(split.words, { opacity: 0.14 });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: "+=160%", pin: true, scrub: 0.9 },
        });
        tl.to(split.words, { opacity: 1, stagger: 0.12, ease: "power1.out", duration: 0.6 }, 0);
        const photos = gsap.utils.toArray<HTMLElement>(".about-photo", root.current);
        photos.forEach((p, i) => {
          tl.fromTo(p, { yPercent: 0, y: "18vh" }, { y: `${SPEEDS[i]}vh`, ease: "none", duration: tl.duration() || 6 }, 0);
          tl.fromTo(p.querySelector(".frame-inner"), { scale: 1.25 }, { scale: 1, ease: "none", duration: tl.duration() || 6 }, 0);
        });
        tl.from(".about-facts > *", { autoAlpha: 0, y: 16, stagger: 0.15, duration: 0.8, ease: "expo.out" }, ">-1.2");
        return () => split.revert();
      });
    },
    { scope: root },
  );

  return (
    <section id="about" ref={root} aria-labelledby="about-label" className="relative h-[100svh] overflow-hidden bg-ground">
      <div aria-hidden="true" className="absolute inset-0">
        {about.photos.map((p, i) => (
          <div key={i} className={`about-photo absolute opacity-60 ${PHOTO_POS[i]}`}>
            <Frame shot={p} zoom={false} className="h-full w-full" sizes="30vw" />
          </div>
        ))}
      </div>

      <div className="relative z-10 flex h-full flex-col justify-center px-5 sm:px-10">
        <SectionLabel num={about.num} label={about.label} className="mb-8" />
        <span id="about-label" className="sr-only">
          {about.label}
        </span>
        <p
          ref={text}
          className="display max-w-[22ch] text-[clamp(1.85rem,4.4vw,4.6rem)] leading-[1.08] md:max-w-[26ch]"
        >
          {about.statement}
        </p>
        <dl className="about-facts mt-10 flex flex-wrap gap-x-12 gap-y-4">
          {about.facts.map((f) => (
            <div key={f.k}>
              <dt className="label text-mist">{f.k}</dt>
              <dd className="mt-1.5 text-[0.95rem]">{f.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
