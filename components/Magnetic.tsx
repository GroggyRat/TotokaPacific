"use client";

import { useEffect, useRef } from "react";
import { gsap, isCoarsePointer, prefersReducedMotion } from "@/lib/motion";

// Pulls its child toward the pointer while hovered, then settles back.
export function Magnetic({ children, strength = 0.35, className = "" }: { children: React.ReactNode; strength?: number; className?: string }) {
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = el.current;
    if (!node || isCoarsePointer() || prefersReducedMotion()) return;
    const x = gsap.quickTo(node, "x", { duration: 0.8, ease: "expo.out" });
    const y = gsap.quickTo(node, "y", { duration: 0.8, ease: "expo.out" });
    const move = (e: PointerEvent) => {
      const r = node.getBoundingClientRect();
      x((e.clientX - (r.left + r.width / 2)) * strength);
      y((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const reset = () => {
      x(0);
      y(0);
    };
    node.addEventListener("pointermove", move);
    node.addEventListener("pointerleave", reset);
    return () => {
      node.removeEventListener("pointermove", move);
      node.removeEventListener("pointerleave", reset);
    };
  }, [strength]);

  return (
    <span ref={el} className={`inline-block will-change-transform ${className}`}>
      {children}
    </span>
  );
}
