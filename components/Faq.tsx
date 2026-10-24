"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { faq } from "@/content/site";
import { Section, SectionHeading } from "./SectionLabel";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <Section id="faq" num={faq.num} label={faq.label} className="mt-24 lg:mt-36">
      <div className="mt-8 grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-10">
        <SectionHeading id="faq" className="lg:col-span-4">
          {faq.heading}
        </SectionHeading>

        <ul className="border-t border-charcoal lg:col-span-8">
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            const btn = `faq-q-${i}`;
            const panel = `faq-a-${i}`;
            return (
              <li key={item.q} className="border-b border-rule">
                <h3>
                  <button
                    id={btn}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panel}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-baseline justify-between gap-6 py-5 text-left text-lg font-medium transition-colors duration-200 hover:text-navy"
                  >
                    <span>{item.q}</span>
                    <span aria-hidden="true" className="font-mono text-xl leading-none text-navy">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panel}
                      role="region"
                      aria-labelledby={btn}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.25, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[44rem] pb-6 leading-relaxed text-charcoal/85">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
