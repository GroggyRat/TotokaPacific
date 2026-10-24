"use client";

import { gsap } from "./motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const live = new WeakMap<Element, gsap.core.Timeline>();

// Split-flap: each character cell rattles through a few letters, then lands.
export function flipTo(cells: HTMLElement[], text: string, { stagger = 0.045, spins = 4 } = {}) {
  const target = text.padEnd(cells.length, " ").slice(0, cells.length);
  cells.forEach((cell, i) => {
    const ch = target[i] === " " ? " " : target[i];
    if (cell.textContent === ch) return;
    live.get(cell)?.kill();
    const tl = gsap.timeline({ delay: i * stagger });
    const n = spins + (i % 3);
    for (let k = 0; k <= n; k++) {
      tl.to(cell, { rotateX: -90, duration: 0.045, ease: "power1.in" })
        .call(() => {
          cell.textContent = k === n ? ch : CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .set(cell, { rotateX: 90 })
        .to(cell, { rotateX: 0, duration: 0.045, ease: "power1.out" });
    }
    live.set(cell, tl);
  });
}
