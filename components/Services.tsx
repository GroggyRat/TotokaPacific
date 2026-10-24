"use client";

import { useRef } from "react";
import { services } from "@/content/site";
import { gsap, useGSAP } from "@/lib/motion";
import { Frame } from "./Frame";
import { SectionLabel } from "./SectionLabel";

// Pinned horizontal run through four full-height panels. Each photo unclips
// and settles as its panel slides in.
export function Services() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Colour wipe in from the previous section.
        gsap.fromTo(
          root.current,
          { clipPath: "inset(0% 8% 0% 8%)" },
          { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.out", scrollTrigger: { trigger: root.current, start: "top bottom", end: "top 15%", scrub: 0.6 } },
        );

        const distance = () => track.current!.scrollWidth - window.innerWidth;
        const run = gsap.to(track.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => "+=" + distance(),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(".svc-progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: () => "+=" + distance(), scrub: true },
        });

        gsap.utils.toArray<HTMLElement>(".svc-panel", root.current).forEach((panel) => {
          const frame = panel.querySelector(".frame");
          const inner = panel.querySelector(".frame-inner");
          const st = { trigger: panel, containerAnimation: run, start: "left 90%", end: "left 25%", scrub: true };
          gsap.fromTo(frame, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.out", scrollTrigger: st });
          gsap.fromTo(inner, { scale: 1.35 }, { scale: 1, ease: "none", scrollTrigger: st });
          gsap.fromTo(panel.querySelector(".svc-num"), { xPercent: 40 }, { xPercent: -10, ease: "none", scrollTrigger: { ...st, start: "left right", end: "right left" } });
          gsap.from(panel.querySelectorAll(".svc-reveal"), {
            y: 40,
            autoAlpha: 0,
            stagger: 0.08,
            ease: "expo.out",
            duration: 1.2,
            scrollTrigger: { trigger: panel, containerAnimation: run, start: "left 65%", toggleActions: "play none none reverse" },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="services" ref={root} aria-labelledby="services-title" className="tone-flip relative overflow-hidden bg-ground">
      <div ref={track} className="h-track flex h-[100svh] w-max">
        {/* Intro panel */}
        <div className="h-panel flex w-screen shrink-0 flex-col justify-between px-5 pb-10 pt-28 sm:px-10 md:w-[52vw]">
          <SectionLabel num={services.num} label={services.label} />
          <h2 id="services-title" className="display max-w-[12ch] text-[clamp(3rem,7.5vw,8rem)] leading-[0.95]">
            {services.heading}
          </h2>
          <p className="label flex items-center gap-3 text-mist">
            {services.hint} <span aria-hidden="true">→</span>
          </p>
        </div>

        {services.items.map((item, i) => (
          <article
            key={item.name}
            className="svc-panel relative grid w-screen shrink-0 grid-rows-[auto_1fr] gap-6 overflow-hidden border-l border-fg/10 px-5 pb-10 pt-24 sm:px-10 md:w-[86vw] md:grid-cols-[1fr_1fr] md:grid-rows-1 md:gap-12 md:pt-28 lg:w-[74vw]"
          >
            <div className="relative flex flex-col justify-between">
              <span
                aria-hidden="true"
                className="svc-num display pointer-events-none absolute -top-6 right-0 text-[clamp(7rem,22vw,20rem)] leading-none text-fg/[0.06] md:-top-10"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="svc-reveal label text-accent tabular-nums">
                {String(i + 1).padStart(2, "0")} / {String(services.items.length).padStart(2, "0")}
              </p>
              <div className="relative">
                <h3 className="svc-reveal display text-[clamp(2.4rem,5.2vw,5.6rem)] leading-[0.98]">{item.name}</h3>
                <p className="svc-reveal mt-5 max-w-[34ch] text-[1.02rem] leading-relaxed text-fg/80">{item.text}</p>
                <div className="svc-reveal mt-7">
                  <p className="label text-mist">{services.docsLabel}</p>
                  <ul className="mt-3 space-y-1.5 text-[0.95rem]">
                    {item.docs.map((d) => (
                      <li key={d} className="flex gap-3">
                        <span aria-hidden="true" className="text-accent">
                          —
                        </span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <Frame shot={item.photo} className="h-full min-h-[26svh] w-full md:min-h-0" sizes="(min-width: 768px) 40vw, 100vw" />
          </article>
        ))}
      </div>
      <div aria-hidden="true" className="absolute inset-x-5 bottom-5 h-px bg-fg/10 sm:inset-x-10">
        <div className="svc-progress h-full origin-left scale-x-0 bg-accent" />
      </div>
    </section>
  );
}
