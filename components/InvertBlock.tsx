"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/motion";

// Wraps sections in the opposite palette. It wipes open as it arrives and
// closes again as it leaves, so the change of colour reads as a cut.
export function InvertBlock({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          root.current,
          { clipPath: "inset(0% 8% 0% 8%)" },
          { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.out", scrollTrigger: { trigger: root.current, start: "top bottom", end: "top 15%", scrub: 0.6 } },
        );
        gsap.fromTo(
          root.current,
          { "--wipe-out": "0%" },
          {
            "--wipe-out": "8%",
            ease: "power2.in",
            immediateRender: false,
            scrollTrigger: { trigger: root.current, start: "bottom 85%", end: "bottom top", scrub: 0.6 },
            onUpdate() {
              const v = gsap.getProperty(root.current, "--wipe-out") as string;
              root.current!.style.clipPath = `inset(0% ${v} 0% ${v})`;
            },
          },
        );
      });
    },
    { scope: root },
  );
  return (
    <div ref={root} className={`tone-flip relative bg-ground ${className}`}>
      {children}
    </div>
  );
}
