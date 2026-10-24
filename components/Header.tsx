"use client";

import { useEffect, useRef, useState } from "react";
import { header, nav } from "@/content/site";
import { gsap, onIntro, prefersReducedMotion } from "@/lib/motion";
import { Wordmark } from "./Wordmark";
import { Magnetic } from "./Magnetic";
import { ThemeToggle } from "./ThemeToggle";

function SuvaClock() {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: header.clockZone });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="label tabular-nums">
      {header.clockLabel} <span className="text-white">{time}</span> {header.clockSuffix}
    </span>
  );
}

export function Header() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    gsap.set(root.current, { autoAlpha: 0, y: -12 });
    return onIntro(() => gsap.to(root.current, { autoAlpha: 1, y: 0, duration: 1.2, delay: 0.6, ease: "expo.out" }));
  }, []);

  return (
    <header ref={root} className="fixed inset-x-0 top-0 z-50 text-white mix-blend-difference">
      <div className="flex items-center justify-between gap-6 px-5 py-5 sm:px-10 sm:py-7">
        <a href="#top" aria-label="Totoka Pacific, back to top" className="whitespace-nowrap text-[0.8rem] sm:text-base">
          <Wordmark />
        </a>
        <div className="hidden items-center gap-8 text-white/55 md:flex">
          <SuvaClock />
          <ThemeToggle />
        </div>
        <nav aria-label="Sections" className="flex items-center gap-4 sm:gap-7">
          <div className="md:hidden">
            <ThemeToggle />
          </div>
          <ul className="hidden items-center gap-7 xl:flex">
            {nav.slice(0, 4).map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="label text-white/70 transition-colors duration-300 hover:text-white">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <Magnetic>
            <a
              href="#contact"
              className="label inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/40 px-3.5 py-2 transition-colors duration-500 hover:border-white hover:bg-white hover:text-black sm:px-4 sm:py-2.5"
            >
              <span className="sm:hidden">{header.ctaShort}</span>
              <span className="hidden sm:inline">{header.cta}</span> <span aria-hidden="true">→</span>
            </a>
          </Magnetic>
        </nav>
      </div>
    </header>
  );
}
