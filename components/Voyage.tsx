"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { voyage } from "@/content/site";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/motion";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { SectionLabel } from "./SectionLabel";

gsap.registerPlugin(MotionPathPlugin);

// Geometry drawn on a 1600×900 chart (north up, west left). On tall screens
// the chart is turned 90° anticlockwise into 400×900 so the ship sails down.
const ROUTE =
  "M1462 566 C1440 615 1330 620 1290 575 C1265 548 1270 520 1282 512 C1150 480 980 400 820 430 C640 465 420 600 250 565 C215 558 195 552 178 548";
const ISLAND = "M1290 500 C1300 450 1370 430 1420 445 C1470 460 1500 500 1480 545 C1460 590 1390 600 1340 585 C1300 572 1282 540 1290 500 Z";
const VANUA = "M1400 400 C1430 380 1500 372 1540 386 C1520 404 1470 412 1420 414 Z";
const COAST = "M0 90 C60 150 92 230 122 300 C150 360 140 420 168 480 C190 540 182 620 200 700 C210 760 190 830 170 900";
const POINTS: [number, number][] = [
  [1462, 566],
  [1282, 512],
  [820, 430],
  [250, 565],
  [178, 548],
];
// Where each waypoint's label sits relative to its dot.
const ABOVE = "translate(-50%, calc(-100% - 22px))";
const BELOW = "translate(-50%, 22px)";
const LEFT = "translate(calc(-100% - 20px), -50%)";
const RIGHT = "translate(20px, -50%)";
const WIDE_LABEL = [
  "translate(-80%, 24px)",
  ABOVE,
  ABOVE,
  BELOW,
  "translate(-12%, calc(-100% - 22px))",
];
const TALL_LABEL = [LEFT, LEFT, LEFT, RIGHT, LEFT];

const rot = (x: number, y: number): [number, number] => [y * (400 / 900), (1600 - x) * (900 / 1600)];
function rotPath(d: string) {
  return d.replace(/(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)/g, (_, x, y) => rot(+x, +y).map((n) => n.toFixed(1)).join(" "));
}

const DAY_BG = "#dfe5e1";
const GOLD_BG = "#e2b48c";
const DUSK_BG = "#121a2c";
const DAY_FG = "#0b1220";
const DUSK_FG = "#eee8dd";

export function Voyage() {
  const root = useRef<HTMLElement>(null);
  const [tall, setTall] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-aspect-ratio: 1/1)");
    const on = () => setTall(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const g = useMemo(() => {
    const W = tall ? 400 : 1600;
    return {
      W,
      H: 900,
      route: tall ? rotPath(ROUTE) : ROUTE,
      island: tall ? rotPath(ISLAND) : ISLAND,
      vanua: tall ? rotPath(VANUA) : VANUA,
      coast: tall ? rotPath(COAST) : COAST,
      points: POINTS.map(([x, y]) => (tall ? rot(x, y) : [x, y])) as [number, number][],
      labels: tall ? TALL_LABEL : WIDE_LABEL,
    };
  }, [tall]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const route = root.current!.querySelector<SVGPathElement>(".vy-route")!;
        const reveal = root.current!.querySelector<SVGPathElement>(".vy-reveal")!;
        const ship = root.current!.querySelector<SVGGElement>(".vy-ship")!;
        const L = route.getTotalLength();

        // Where each waypoint falls along the route (0–1).
        const samples = 400;
        const fr = g.points.map(([px, py]) => {
          let best = 0,
            bd = Infinity;
          for (let i = 0; i <= samples; i++) {
            const p = route.getPointAtLength((i / samples) * L);
            const d = (p.x - px) ** 2 + (p.y - py) ** 2;
            if (d < bd) {
              bd = d;
              best = i / samples;
            }
          }
          return best;
        });

        gsap.set(reveal, { strokeDasharray: L, strokeDashoffset: L });
        gsap.set(".vy-wp", { autoAlpha: 0, y: 14 });
        gsap.set(".vy-dot", { scale: 0, transformOrigin: "50% 50%" });

        // Colour wipe in.
        gsap.fromTo(
          root.current,
          { clipPath: "inset(0% 8% 0% 8%)" },
          { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.out", scrollTrigger: { trigger: root.current, start: "top bottom", end: "top 15%", scrub: 0.6 } },
        );

        const D = 10;
        const dayEl = root.current!.querySelector(".vy-daynum");
        const counter = { d: 0 };
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root.current, start: "top top", end: "+=320%", pin: true, scrub: 1 },
        });
        tl.to(ship, { motionPath: { path: route, align: route, alignOrigin: [0.5, 0.5], autoRotate: true }, duration: D }, 0)
          .to(reveal, { strokeDashoffset: 0, duration: D }, 0)
          .to(counter, {
            d: 8,
            duration: D,
            onUpdate: () => {
              if (dayEl) dayEl.textContent = String(Math.round(counter.d));
            },
          }, 0)
          .fromTo(root.current, { backgroundColor: DAY_BG }, { keyframes: [{ backgroundColor: GOLD_BG, duration: D * 0.5 }, { backgroundColor: DUSK_BG, duration: D * 0.5 }] }, 0)
          // Text flips quickly once the sky is dark enough to need it.
          .fromTo(root.current, { color: DAY_FG }, { color: DUSK_FG, duration: D * 0.08, ease: "power1.inOut" }, D * 0.66)
          .to(".vy-sun", { y: "38vh", scale: 1.25, duration: D }, 0)
          .to(".vy-sun", { opacity: 0.25, duration: D * 0.3 }, D * 0.7);

        fr.forEach((f, i) => {
          const at = Math.max(0, f * D - 0.15);
          tl.to(`.vy-dot-${i}`, { scale: 1, duration: 0.25, ease: "back.out(2)" }, at).to(
            `.vy-wp-${i}`,
            { autoAlpha: 1, y: 0, duration: 0.5, ease: "expo.out" },
            at,
          );
        });

        // Ambient swell lines drift slowly.
        gsap.to(".vy-swell", { x: -80, duration: 14, ease: "sine.inOut", repeat: -1, yoyo: true });

        // This section can rebuild after mount (phone layout), so put its pin
        // back in page order and re-measure everything below it.
        requestAnimationFrame(() => {
          ScrollTrigger.sort();
          ScrollTrigger.refresh();
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        const route = root.current!.querySelector<SVGPathElement>(".vy-route")!;
        gsap.set(".vy-ship", { motionPath: { path: route, align: route, alignOrigin: [0.5, 0.5], autoRotate: true, start: 1, end: 1 } });
      });
    },
    { scope: root, dependencies: [g], revertOnUpdate: true },
  );

  const pct = (x: number, y: number) => ({ left: `${(x / g.W) * 100}%`, top: `${(y / g.H) * 100}%` });

  return (
    <section
      id="voyage"
      ref={root}
      aria-labelledby="voyage-title"
      className="relative h-[100svh] overflow-hidden"
      style={{ backgroundColor: DAY_BG, color: DAY_FG }}
    >
      {/* Sun */}
      <div aria-hidden="true" className="vy-sun absolute right-[12%] top-[8%] h-[22vmin] w-[22vmin] rounded-full border border-[#e0a458]" />

      {/* Swell */}
      <svg aria-hidden="true" className="vy-swell absolute inset-y-0 -left-[10%] w-[120%] opacity-[0.18]" viewBox="0 0 1200 900" preserveAspectRatio="none">
        {Array.from({ length: 16 }, (_, i) => (
          <path key={i} d={`M0 ${40 + i * 56} q 30 -8 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0`} fill="none" stroke="currentColor" strokeWidth="1" />
        ))}
      </svg>

      {/* Chart: full frame on wide screens, below the heading on tall ones */}
      <div className={`absolute inset-x-0 bottom-0 flex items-center justify-center ${tall ? "top-[34%] pb-10" : "top-0"}`}>
        <div className="relative" style={{ aspectRatio: `${g.W} / ${g.H}`, width: tall ? "min(100vw, 26svh)" : "min(100vw, 177.7svh)" }}>
          <svg viewBox={`0 0 ${g.W} ${g.H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
            <defs>
              <mask id="vy-mask" maskUnits="userSpaceOnUse">
                <path className="vy-reveal" d={g.route} fill="none" stroke="#fff" strokeWidth="14" />
              </mask>
            </defs>
            <path d={g.coast} fill="none" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.2" />
            <path d={g.island} fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1.2" />
            <path d={g.vanua} fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1" />
            <path className="vy-route" d={g.route} fill="none" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.5" strokeDasharray="2 8" strokeLinecap="round" />
            <path d={g.route} fill="none" stroke="#e0a458" strokeWidth="2.5" strokeDasharray="10 9" mask="url(#vy-mask)" />
            {g.points.map(([x, y], i) => (
              <g key={i} className={`vy-dot vy-dot-${i}`}>
                <circle cx={x} cy={y} r="6" fill="currentColor" />
                <circle cx={x} cy={y} r="13" fill="none" stroke="currentColor" strokeOpacity="0.4" />
              </g>
            ))}
            <g className="vy-ship">
              <path d="M22 0 L12 -8 L-20 -8 L-20 8 L12 8 Z" fill="currentColor" />
              <path d="M-15 -4 h8 v8 h-8z M-5 -4 h8 v8 h-8z M5 -4 h6 v8 h-6z" fill="#e0a458" />
            </g>
          </svg>

          {voyage.waypoints.map((w, i) => {
            const [x, y] = g.points[i];
            return (
              <div key={w.place} className="absolute" style={{ ...pct(x, y), transform: g.labels[i] }}>
              <div className={`vy-wp vy-wp-${i} w-[min(15rem,38vw)] ${g.labels[i] === LEFT ? "text-right" : ""}`}>
                <p className="label tabular-nums opacity-70">{w.day}</p>
                <p className="display mt-1 text-[clamp(1.05rem,1.6vw,1.5rem)] leading-tight">{w.place}</p>
                <p className="mt-1 text-[0.8rem] leading-snug opacity-75 max-md:hidden">{w.note}</p>
              </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Titles */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-6 px-5 pt-24 sm:px-10 sm:pt-28">
        <div>
          <SectionLabel num={voyage.num} label={voyage.label} className="!text-current opacity-80" />
          <h2 id="voyage-title" className="display mt-5 max-w-[14ch] text-[clamp(2rem,4.4vw,4.4rem)] leading-[1]">
            {voyage.heading}
          </h2>
          <p className="mt-3 text-[0.95rem] opacity-75">{voyage.intro}</p>
        </div>
        <div className="text-right max-md:hidden">
          <p className="label opacity-70">{voyage.eta}</p>
          <p className="display mt-2 text-[clamp(3rem,6vw,6rem)] leading-none tabular-nums">
            <span className="label mr-3 align-middle opacity-70">Day</span>
            <span className="vy-daynum">0</span>
          </p>
        </div>
      </div>
      <p className="label absolute bottom-6 left-5 opacity-60 sm:left-10">{voyage.footnote}</p>
    </section>
  );
}
