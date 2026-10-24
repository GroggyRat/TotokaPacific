"use client";

import { useEffect, useState } from "react";
import { nav } from "@/content/site";
import { Wordmark } from "./Wordmark";

export function Nav() {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const els = nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const onTop = () => window.scrollY < 200 && setActive(null);
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper">
      <div className="mx-auto flex h-14 max-w-[88rem] items-center justify-between px-4 sm:px-6 lg:px-10">
        <a href="#top" className="text-navy text-xl" aria-label="Totoka Pacific, back to top">
          <Wordmark />
        </a>

        <nav aria-label="Sections" className="hidden lg:block">
          <ul className="flex gap-6 font-mono text-[0.78rem] uppercase tracking-wider">
            {nav.map((n) => {
              const isActive = active === n.id;
              return (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={`relative inline-flex gap-1.5 py-4 transition-colors duration-200 hover:text-navy ${
                      isActive ? "text-navy" : "text-mute"
                    }`}
                  >
                    <span className="opacity-60">{n.num}</span>
                    <span>{n.label}</span>
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 bottom-0 h-[2px] bg-accent transition-opacity duration-200 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          className="font-mono text-[0.78rem] uppercase tracking-wider text-navy lg:hidden border border-rule px-3 py-1.5 rounded-sq"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Sections" className="border-t border-rule lg:hidden">
          <ul className="mx-auto max-w-[88rem] px-4 sm:px-6 font-mono text-sm uppercase tracking-wider">
            {nav.map((n) => (
              <li key={n.id} className="border-b border-rule last:border-0">
                <a
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === n.id ? "location" : undefined}
                  className={`flex gap-4 py-3 ${active === n.id ? "text-navy" : "text-mute"}`}
                >
                  <span className="w-6 opacity-60">{n.num}</span>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
