"use client";

import { useRef } from "react";
import { numbers } from "@/content/site";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/motion";
import { SectionLabel } from "./SectionLabel";

// Counters run up on entry. Below, destinations drift past in huge outlined
// type; scrolling speeds the marquee up for a moment.
export function Numbers() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".num-value", root.current).forEach((el) => {
          const end = Number(el.dataset.value);
          const o = { v: 0 };
          el.textContent = "0";
          gsap.to(o, {
            v: end,
            duration: 2.2,
            ease: "expo.out",
            onUpdate: () => (el.textContent = String(Math.round(o.v))),
            scrollTrigger: { trigger: el, start: "top 85%" },
          });
        });
        gsap.from(".num-item", {
          y: 40,
          autoAlpha: 0,
          stagger: 0.12,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: ".num-grid", start: "top 85%" },
        });

        const rows = gsap.utils.toArray<HTMLElement>(".mq-row", root.current);
        const loops = rows.map((row, i) =>
          gsap.fromTo(row, { xPercent: i % 2 ? -50 : 0 }, { xPercent: i % 2 ? 0 : -50, duration: 60, ease: "none", repeat: -1 }),
        );
        let settle: gsap.core.Tween | null = null;
        ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 400, 5);
            loops.forEach((l) => gsap.to(l, { timeScale: boost, duration: 0.2, overwrite: true }));
            settle?.kill();
            settle = gsap.delayedCall(0.25, () => loops.forEach((l) => gsap.to(l, { timeScale: 1, duration: 1.2, ease: "power3.out", overwrite: true })));
          },
          onToggle: (self) => loops.forEach((l) => (self.isActive ? l.play() : l.pause())),
        });
      });
    },
    { scope: root },
  );

  const names = numbers.marquee;
  return (
    <section id="numbers" ref={root} aria-labelledby="numbers-title" className="relative overflow-hidden pb-24 pt-28 sm:pb-32 sm:pt-36">
      <div className="px-5 sm:px-10">
        <SectionLabel num={numbers.num} label={numbers.label} />
        <h2 id="numbers-title" className="sr-only">
          {numbers.label}
        </h2>
        <p className="label mt-4 inline-block border border-accent/60 px-2 py-1 text-accent">{numbers.placeholderNote}</p>
        <dl className="num-grid mt-14 grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8">
          {numbers.items.map((it) => (
            <div key={it.label} className="num-item border-t border-fg/15 pt-6">
              <dt className="label flex items-center gap-3 text-mist">
                {it.label}
                {it.placeholder && <span className="border border-accent/60 px-1.5 py-0.5 text-[0.55rem] text-accent">{numbers.placeholderTag}</span>}
              </dt>
              <dd className="display mt-4 text-[clamp(4.5rem,11vw,10rem)] leading-none tabular-nums">
                <span className="num-value" data-value={it.value}>
                  {it.value}
                </span>
                {it.suffix}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div aria-hidden="true" className="mt-24 space-y-2 sm:mt-32">
        {[0, 1].map((r) => (
          <div key={r} className="overflow-hidden whitespace-nowrap">
            <div className="mq-row inline-flex w-max">
              {[0, 1].map((dup) => (
                <span key={dup} className="display outline-type inline-flex shrink-0 items-center text-[clamp(4rem,12vw,11rem)] leading-[1.05]">
                  {(r ? [...names].reverse() : names).map((n) => (
                    <span key={n} className="inline-flex items-center">
                      <span className="px-[0.25em]">{n}</span>
                      <span className="h-[0.12em] w-[0.12em] rotate-45 bg-accent" />
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="sr-only">{names.join(", ")}</p>
    </section>
  );
}
