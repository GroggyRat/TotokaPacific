"use client";

import { useRef, useState } from "react";
import { howItWorks } from "@/content/site";
import { gsap, useGSAP, SplitText, ScrollTrigger } from "@/lib/motion";
import { flipTo } from "@/lib/flap";
import { Flap } from "./Flap";
import { SectionLabel } from "./SectionLabel";

// Departure board. The section pins; each step holds for a stretch of scroll
// while the number and statuses flip and the line draws to the next stop.
export function Process() {
  const root = useRef<HTMLElement>(null);
  const steps = howItWorks.steps;
  const n = steps.length;
  const [idx, setIdx] = useState(0);
  const st = howItWorks.status;
  const statusFor = (row: number, cur: number) => (row < cur ? st.done : row === cur ? st.now : st.next).padEnd(4, " ");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(root);
        const numCells = q(".proc-num .flap-ch") as HTMLElement[];
        const statusCells = steps.map((_, r) => q(`.proc-status-${r} .flap-ch`) as HTMLElement[]);
        let cur = -1;

        const show = (i: number) => {
          if (i === cur) return;
          const dir = i > cur ? 1 : -1;
          cur = i;
          setIdx(i);
          flipTo(numCells, String(i + 1).padStart(2, "0"), { stagger: 0.08, spins: 5 });
          statusCells.forEach((cells, r) => flipTo(cells, statusFor(r, i)));
          gsap.fromTo(".proc-copy", { yPercent: 30 * dir, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.9, ease: "expo.out" });
          gsap.to(".proc-row", { opacity: (r: number) => (r === i ? 1 : r < i ? 0.55 : 0.35), duration: 0.5 });
        };

        gsap.set(".proc-line", { scaleY: 0, transformOrigin: "top" });
        ScrollTriggerProxy(root.current!, n, show);

        const split = SplitText.create(".proc-title", { type: "lines", mask: "lines" });
        gsap.from(split.lines, {
          yPercent: 110,
          duration: 1.3,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        });
        show(0);
        return () => split.revert();
      });
    },
    { scope: root },
  );

  const cur = steps[idx];
  return (
    <section id="process" ref={root} aria-labelledby="process-title" className="relative min-h-[100svh] overflow-hidden bg-ground">
      <div className="flex min-h-[100svh] flex-col px-5 pb-6 pt-20 sm:px-10 sm:pb-10 sm:pt-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel num={howItWorks.num} label={howItWorks.label} />
            <h2 id="process-title" className="proc-title display mt-5 max-w-[16ch] text-[clamp(2rem,4.4vw,4.4rem)] leading-[1]">
              {howItWorks.heading}
            </h2>
          </div>
        </div>

        <div className="mt-5 grid flex-1 grid-cols-1 items-center gap-5 md:mt-10 md:gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="flex items-end gap-4">
              <Flap text="01" size="xl" className="proc-num display text-[clamp(3.6rem,15vw,12rem)] leading-none" />
              <span className="label mb-3 text-mist tabular-nums">/ {String(n).padStart(2, "0")}</span>
            </div>
            <div className="proc-copy mt-4 max-w-[38ch] md:mt-6" aria-live="polite">
              <h3 className="display text-[clamp(1.4rem,2.6vw,2.4rem)] leading-tight">{cur.name}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-fg/80 md:mt-3 md:text-[1rem]">{cur.text}</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="label mb-3 text-mist max-md:hidden">{howItWorks.board.title}</p>
            <div className="relative border-t border-fg/15">
              <div aria-hidden="true" className="absolute bottom-6 left-[0.9rem] top-6 w-px bg-fg/10">
                <div className="proc-line h-full w-full origin-top bg-accent" />
              </div>
              <div className="label grid grid-cols-[2.4rem_1fr_auto] gap-4 border-b border-fg/10 py-2.5 pl-1 text-mist">
                <span>{howItWorks.board.step}</span>
                <span>{howItWorks.board.stage}</span>
                <span>{howItWorks.board.status}</span>
              </div>
              <ol>
                {steps.map((s, r) => (
                  <li key={s.code} className="proc-row grid grid-cols-[2.4rem_1fr_auto] items-center gap-4 border-b border-fg/10 py-1.5 pl-1 md:py-2.5">
                    <span className="relative z-10 flex h-[1.6rem] w-[1.6rem] items-center justify-center rounded-full border border-fg/25 bg-ground text-[0.7rem] tabular-nums">
                      {r + 1}
                    </span>
                    <span className="truncate font-sans text-[0.95rem] font-semibold uppercase tracking-[0.14em] sm:text-base">{s.code}</span>
                    <span className={`proc-status-${r}`}>
                      <span className="sr-only">{statusFor(r, idx)}</span>
                      <Flap text={statusFor(r, 0)} className="font-sans text-[0.72rem] font-semibold sm:text-[0.8rem]" />
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Pins the section for three-quarters of a screen per step and reports the step.
function ScrollTriggerProxy(el: HTMLElement, n: number, show: (i: number) => void) {
  ScrollTrigger.create({
    trigger: el,
    start: "top top",
    end: `+=${n * 75}%`,
    pin: true,
    scrub: true,
    onUpdate: (self) => {
      show(Math.min(n - 1, Math.floor(self.progress * n * 0.999)));
      gsap.set(el.querySelector(".proc-line"), { scaleY: self.progress });
    },
  });
}
