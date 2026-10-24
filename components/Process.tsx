"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { howItWorks } from "@/content/site";
import { Photo } from "./Photo";
import { Section, SectionHeading } from "./SectionLabel";

export function Process() {
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  const n = howItWorks.steps.length;
  const [reached, setReached] = useState(0);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setReached(v <= 0 ? 0 : Math.min(n, Math.floor(v * (n - 1) + 0.05) + 1));
  });

  const shown = reduce ? n : reached;

  return (
    <Section id="process" num={howItWorks.num} label={howItWorks.label} className="mt-24 lg:mt-36">
      <div className="mt-8 grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-4">
          <SectionHeading id="process">{howItWorks.heading}</SectionHeading>
          {/* TODO: replace with a real photo, e.g. /photos/warehouse-pallets.jpg */}
          <Photo
            scene="warehouse"
            alt="Wrapped pallets on racking in a Suva warehouse"
            note="Photo: pallets, Suva warehouse"
            sizes="(min-width: 1024px) 30vw, 100vw"
            className="mt-10 hidden aspect-[4/5] lg:block"
          />
        </div>

        <ol ref={listRef} className="relative lg:col-span-7 lg:col-start-6">
          {/* Track and progress line, from first marker to last */}
          <span aria-hidden="true" className="absolute bottom-10 left-[7px] top-2 w-px bg-rule" />
          <motion.span
            aria-hidden="true"
            className="absolute bottom-10 left-[7px] top-2 w-px origin-top bg-navy"
            style={{ scaleY: reduce ? 1 : scrollYProgress }}
          />
          {howItWorks.steps.map((s, i) => {
            const on = i < shown;
            return (
              <li key={s.name} className="relative pb-12 pl-12 last:pb-0">
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-1.5 h-[15px] w-[15px] border-2 border-navy transition-colors duration-300 motion-reduce:transition-none ${
                    on ? "bg-navy" : "bg-paper"
                  }`}
                />
                <p className={`font-mono text-xs tabular-nums transition-colors duration-300 ${on ? "text-navy" : "text-mute"}`}>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3
                  className={`mt-1 font-display text-2xl font-semibold leading-tight [font-stretch:92%] transition-colors duration-300 ${
                    on ? "text-navy" : "text-mute"
                  }`}
                >
                  {s.name}
                </h3>
                <p className="mt-2 max-w-[34rem] leading-relaxed">{s.text}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
