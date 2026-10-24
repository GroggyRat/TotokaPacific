"use client";

import { useMemo, useRef } from "react";
import { gsap, useGSAP } from "@/lib/motion";

// Tapa/masi-style band: two sawtooth rows that meet in diamonds, with a
// centre stitch. Draws itself in as it scrolls into view.
export function MasiLine({ className = "", repeats = 30, start = "top 90%", end = "top 35%" }: { className?: string; repeats?: number; start?: string; end?: string }) {
  const root = useRef<SVGSVGElement>(null);
  const W = repeats * 40;
  const d = useMemo(() => {
    let top = "M0 4",
      bot = "M0 36",
      mid = "";
    for (let i = 0; i < repeats; i++) {
      const x = i * 40;
      top += ` L${x + 20} 18 L${x + 40} 4`;
      bot += ` L${x + 20} 22 L${x + 40} 36`;
      mid += ` M${x + 20} 14 L${x + 24} 20 L${x + 20} 26 L${x + 16} 20 Z`;
    }
    return [top, bot, mid, `M0 0.5 H${W}`, `M0 39.5 H${W}`];
  }, [repeats, W]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const paths = gsap.utils.toArray<SVGPathElement>("path", root.current);
        paths.forEach((p) => {
          const len = p.getTotalLength();
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        });
        gsap.to(paths, {
          strokeDashoffset: 0,
          ease: "none",
          stagger: 0.05,
          scrollTrigger: { trigger: root.current, start, end, scrub: 1 },
        });
      });
    },
    { scope: root },
  );

  return (
    <svg ref={root} viewBox={`0 0 ${W} 40`} preserveAspectRatio="none" className={`block h-6 w-full ${className}`} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1">
        {d.map((p, i) => (
          <path key={i} d={p} />
        ))}
      </g>
    </svg>
  );
}
