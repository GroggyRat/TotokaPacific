"use client";

import { useRef, useState } from "react";
import { preloader } from "@/content/site";
import { gsap, SplitText, useGSAP, fireIntro, prefersReducedMotion } from "@/lib/motion";
import { lenisRef } from "@/lib/lenis";
import { Mark } from "./Wordmark";

// Under 2s: letters assemble, counter runs 0→100, panel wipes up.
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLHeadingElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const [gone, setGone] = useState(false);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        fireIntro();
        setGone(true);
        return;
      }
      lenisRef.current?.stop();
      window.scrollTo(0, 0);

      const split = SplitText.create(word.current, { type: "chars" });
      const counter = { v: 0 };
      const rand = gsap.utils.random;

      const tl = gsap.timeline({
        onComplete: () => {
          split.revert();
          setGone(true);
        },
      });
      tl.set(word.current, { autoAlpha: 1 })
        .from(
          split.chars,
          {
            x: () => rand(-140, 140) * (window.innerWidth < 640 ? 0.5 : 1),
            y: () => rand(-90, 90),
            rotate: () => rand(-50, 50),
            autoAlpha: 0,
            filter: "blur(6px)",
            duration: 0.95,
            ease: "expo.out",
            stagger: { each: 0.035, from: "random" },
          },
          0,
        )
        .from(".pl-mark", { scale: 0.4, rotate: -90, autoAlpha: 0, duration: 0.9, ease: "expo.out" }, 0.1)
        .to(
          counter,
          {
            v: 100,
            duration: 1.3,
            ease: "power2.inOut",
            onUpdate: () => {
              if (count.current) count.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
            },
          },
          0,
        )
        .to(".pl-bar", { scaleX: 1, duration: 1.3, ease: "power2.inOut" }, 0)
        .addLabel("wipe", 1.3)
        .to(".pl-inner", { yPercent: -30, autoAlpha: 0, duration: 0.6, ease: "expo.in" }, "wipe-=0.05")
        .to(
          root.current,
          {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 0.75,
            ease: "expo.inOut",
            onStart: () => {
              fireIntro();
              lenisRef.current?.start();
            },
          },
          "wipe",
        );
    },
    { scope: root },
  );

  if (gone) return null;

  return (
    <>
    <noscript>
      <style>{`.preloader{display:none}`}</style>
    </noscript>
    <div
      ref={root}
      className="preloader fixed inset-0 z-[120] bg-ground-2 text-fg"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      aria-hidden="true"
    >
      <div className="pl-inner absolute inset-0">
        <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 flex-col items-start gap-[0.4em] px-6 text-[clamp(2.4rem,14vw,5.5rem)] sm:flex-row sm:items-center sm:justify-center sm:gap-[0.5em] sm:px-4 sm:text-[clamp(1.6rem,6vw,5.5rem)]">
          <Mark className="pl-mark h-[0.7em] w-[0.7em] shrink-0 text-accent sm:h-[0.85em] sm:w-[0.85em]" />
          <h2 ref={word} className="invisible font-display font-light leading-[0.95] tracking-[0.06em] sm:whitespace-nowrap">
            {preloader.word.split(" ").map((w, i) => (
              <span key={i} className="block sm:inline">
                {w}
                {i === 0 && <span className="hidden sm:inline"> </span>}
              </span>
            ))}
          </h2>
        </div>
        <div className="absolute inset-x-4 bottom-6 flex items-end justify-between gap-6 sm:inset-x-8 sm:bottom-8">
          <span className="label text-mist">{preloader.caption}</span>
          <span ref={count} className="font-display text-[clamp(2.5rem,7vw,6rem)] font-light leading-none tabular-nums">
            000
          </span>
        </div>
        <div className="pl-bar absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-fg/40" />
      </div>
    </div>
    </>
  );
}
