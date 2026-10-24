"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { hero } from "@/content/site";
import { gsap, ScrollTrigger, SplitText, useGSAP, onIntro, prefersReducedMotion, prefersLowData, isCoarsePointer } from "@/lib/motion";
import { heroState } from "@/lib/heroState";
import { StaticGlobe } from "./StaticGlobe";

// three.js + R3F load only after first paint, in their own chunk.
const Globe = dynamic(() => import("./Globe"), { ssr: false });

type Mode = "pending" | "static" | "3d";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const [mode, setMode] = useState<Mode>("pending");
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(true);
  const [low, setLow] = useState(false);

  // Decide static vs 3D, and wait for idle time before pulling in WebGL.
  useEffect(() => {
    if (prefersReducedMotion() || prefersLowData()) {
      setMode("static");
      return;
    }
    setLow(isCoarsePointer() || window.innerWidth < 768);
    const start = () => setMode("3d");
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(start, { timeout: 1200 });
    else setTimeout(start, 300);
  }, []);

  // Stop rendering the globe once the hero has scrolled away.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { rootMargin: "10% 0px" });
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(title.current, { type: "lines", mask: "lines", linesClass: "split-line" });
        const fades = gsap.utils.toArray<HTMLElement>(".h-fade", root.current);
        gsap.set(split.lines, { yPercent: 110 });
        gsap.set(fades, { autoAlpha: 0, y: 18 });

        const off = onIntro(() => {
          heroState.introAt = performance.now() / 1000;
          const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
          tl.to(split.lines, { yPercent: 0, duration: 1.5, stagger: 0.12 }, 0.15).to(
            fades,
            { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.08 },
            0.55,
          );
        });

        // Pin and scrub: the camera dives to Fiji, the type lifts away,
        // and the frame dissolves into the next section's colour.
        const st = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=130%",
            pin: true,
            scrub: 0.8,
            onUpdate: (self) => {
              heroState.scroll = self.progress;
            },
          },
        });
        st.fromTo(".h-copy", { yPercent: 0, autoAlpha: 1 }, { yPercent: -35, autoAlpha: 0, ease: "power2.in", duration: 0.45 }, 0)
          .fromTo(".h-top", { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.25 }, 0)
          .to(".h-poster", { scale: 2.6, autoAlpha: 0, ease: "power2.in", duration: 0.9 }, 0)
          .to(".h-dissolve", { autoAlpha: 1, ease: "power1.inOut", duration: 0.3 }, 0.7);

        return () => {
          off();
          split.revert();
          heroState.scroll = 0;
        };
      });
    },
    { scope: root },
  );

  // Pointer tilt and drag for the globe.
  useEffect(() => {
    if (isCoarsePointer()) return;
    const el = root.current!;
    let lastX = 0;
    const move = (e: PointerEvent) => {
      heroState.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      heroState.pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
      if (heroState.dragging) {
        heroState.drag = Math.max(-1.6, Math.min(1.6, heroState.drag + (e.clientX - lastX) * 0.006));
        lastX = e.clientX;
      }
    };
    const down = (e: PointerEvent) => {
      if (!(e.target as HTMLElement).closest("[data-globe]")) return;
      heroState.dragging = true;
      lastX = e.clientX;
    };
    const up = () => (heroState.dragging = false);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  useEffect(() => {
    if (ready) ScrollTrigger.refresh();
  }, [ready]);

  return (
    <section id="top" ref={root} aria-labelledby="hero-title" className="relative h-[100svh] overflow-hidden bg-ink">
      {/* Globe layer */}
      <div data-globe data-cursor={hero.drag} className="absolute inset-0 select-none" aria-hidden="true">
        {hero.video.src && (
          // TODO: hero video slot — set hero.video.src / poster in content/site.ts
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-30"
            src={hero.video.src}
            poster={hero.video.poster || undefined}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
          />
        )}
        <StaticGlobe
          showArcs={mode === "static"}
          className={`h-poster globe-frame absolute transition-opacity duration-1000 ${ready ? "opacity-0" : "opacity-100"}`}
        />
        {mode === "3d" && <Globe active={active} low={low} onReady={() => setReady(true)} />}
      </div>

      {/* Legibility shade on the type side */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-full bg-[linear-gradient(90deg,rgba(6,11,20,0.85)_0%,rgba(6,11,20,0.35)_45%,rgba(6,11,20,0)_70%)] max-[1000px]:bg-[linear-gradient(0deg,rgba(6,11,20,0.9)_0%,rgba(6,11,20,0.2)_55%,rgba(6,11,20,0)_75%)]" />

      <div className="pointer-events-none relative z-10 flex h-full flex-col justify-between px-5 pb-8 pt-24 sm:px-10 sm:pb-10 sm:pt-32">
        <div className="h-top flex flex-wrap gap-x-8 gap-y-1 text-mist">
          <span className="h-fade label">{hero.label}</span>
          <span className="h-fade label tabular-nums">{hero.coords}</span>
        </div>

        <div className="h-copy grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <h1
            id="hero-title"
            ref={title}
            className="font-display text-[clamp(3.6rem,12vw,13rem)] font-light leading-[0.88] tracking-[-0.035em] lg:col-span-8"
            style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50' }}
          >
            <span className="block">{hero.lines[0]}</span>
            <span className="block italic text-bone-2">{hero.lines[1]}</span>
          </h1>
          <div className="lg:col-span-4 lg:pb-4">
            <p className="h-fade max-w-[30ch] text-[0.98rem] leading-relaxed text-bone/80">{hero.sentence}</p>
            <div className="h-fade mt-8 flex items-center gap-4 text-mist">
              <span className="relative block h-10 w-px overflow-hidden bg-bone/15">
                <span className="scroll-tick absolute inset-x-0 top-0 h-1/2 bg-bone" />
              </span>
              <span className="label">{hero.scroll}</span>
            </div>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="h-dissolve pointer-events-none invisible absolute inset-0 z-20 bg-ink-2 opacity-0" />
    </section>
  );
}
