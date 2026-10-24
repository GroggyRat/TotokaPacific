"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

// Weighty, smooth curves. Nothing linear, nothing bouncy.
export const EASE = {
  out: "expo.out",
  inOut: "expo.inOut",
  soft: "power3.out",
};

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isCoarsePointer() {
  return typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
}

// Visitors on Save-Data or 2G get the static globe instead of WebGL.
export function prefersLowData() {
  if (typeof navigator === "undefined") return false;
  const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  return !!c && (c.saveData === true || /(^|-)2g$/.test(c.effectiveType ?? ""));
}

// Fired once the preloader has wiped away (or immediately when skipped).
export const INTRO_EVENT = "totoka:intro";
export function onIntro(cb: () => void) {
  if (typeof document === "undefined") return () => {};
  if (document.documentElement.dataset.intro === "done") {
    cb();
    return () => {};
  }
  window.addEventListener(INTRO_EVENT, cb, { once: true });
  return () => window.removeEventListener(INTRO_EVENT, cb);
}
export function fireIntro() {
  document.documentElement.dataset.intro = "done";
  window.dispatchEvent(new Event(INTRO_EVENT));
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
