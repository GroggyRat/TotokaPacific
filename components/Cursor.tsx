"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, isCoarsePointer, prefersReducedMotion } from "@/lib/motion";

// Dot + trailing ring. Over [data-cursor] elements the ring grows and shows
// the attribute's text ("View", "Drag"). Off on touch and reduced motion.
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (isCoarsePointer() || prefersReducedMotion() || !dot.current || !ring.current) return;
    setOn(true);
    document.documentElement.classList.add("has-cursor");

    const dx = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3.out" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3.out" });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.55, ease: "expo.out" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.55, ease: "expo.out" });
    let current = "";
    let seen = false;
    gsap.set([dot.current, ring.current], { opacity: 0 });

    const move = (e: PointerEvent) => {
      if (!seen) {
        seen = true;
        gsap.set([dot.current, ring.current], { x: e.clientX, y: e.clientY });
        gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.4 });
      }
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor], a, button, input, textarea, label");
      const next = t ? t.dataset.cursor ?? "" : "";
      const hover = !!t;
      if (next !== current || ring.current!.dataset.hover !== String(hover)) {
        current = next;
        ring.current!.dataset.hover = String(hover);
        setLabel(next);
        gsap.to(ring.current, {
          scale: next ? 2.6 : hover ? 1.6 : 1,
          duration: 0.6,
          ease: "expo.out",
        });
        gsap.to(dot.current, { scale: next ? 0 : 1, duration: 0.3, ease: "power3.out" });
      }
    };
    const leave = () => gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.3 });
    const enter = () => gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.3 });

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    document.addEventListener("pointerenter", enter);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.removeEventListener("pointerenter", enter);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div aria-hidden="true" className={`pointer-events-none fixed inset-0 z-[150] mix-blend-difference ${on ? "" : "hidden"}`}>
      <div ref={dot} className="absolute -left-[3px] -top-[3px] h-1.5 w-1.5 rounded-full bg-bone" />
      <div
        ref={ring}
        className="absolute -left-[18px] -top-[18px] flex h-9 w-9 items-center justify-center rounded-full border border-bone/80"
      >
        <span className="label text-[0.32rem] tracking-[0.18em] text-bone">{label}</span>
      </div>
    </div>
  );
}
