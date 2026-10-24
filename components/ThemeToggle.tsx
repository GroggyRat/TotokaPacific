"use client";

import { useEffect, useState } from "react";
import { header } from "@/content/site";
import { applyTheme, readPref, setPref, THEME_EVENT, currentTheme, type ThemePref } from "@/lib/theme";

const ORDER: ThemePref[] = ["auto", "light", "dark"];

// Auto (follows Suva daylight) / Day / Night. Desktop shows all three;
// phones get one button that cycles.
export function ThemeToggle() {
  const [pref, setP] = useState<ThemePref>("auto");
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const p = readPref();
    setP(p);
    setTheme(currentTheme());
    const onTheme = () => setTheme(currentTheme());
    window.addEventListener(THEME_EVENT, onTheme);
    // In auto, re-check every minute so the site turns at sunrise and sunset.
    const id = setInterval(() => {
      if (readPref() === "auto") applyTheme("auto");
    }, 60000);
    return () => {
      window.removeEventListener(THEME_EVENT, onTheme);
      clearInterval(id);
    };
  }, []);

  const choose = (p: ThemePref) => {
    setP(p);
    setPref(p);
    setTheme(currentTheme());
  };
  const t = header.theme;
  const name = (p: ThemePref) => (p === "auto" ? t.auto : p === "light" ? t.day : t.night);

  return (
    <>
      <div role="radiogroup" aria-label={t.label} className="hidden items-center gap-3 md:flex">
        {ORDER.map((p) => (
          <button
            key={p}
            type="button"
            role="radio"
            aria-checked={pref === p}
            onClick={() => choose(p)}
            className={`label relative py-1 transition-colors duration-300 ${pref === p ? "text-white" : "text-white/45 hover:text-white/80"}`}
          >
            {name(p)}
            {p === "auto" && pref === "auto" && (
              <span className="text-white/45"> · {theme === "light" ? t.day : t.night}</span>
            )}
            <span
              aria-hidden="true"
              className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-white transition-transform duration-500 ease-[var(--ease-expo)] ${pref === p ? "scale-x-100" : "scale-x-0"}`}
            />
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => choose(ORDER[(ORDER.indexOf(pref) + 1) % ORDER.length])}
        className="label flex items-center gap-2 py-2 text-white md:hidden"
        aria-label={`${t.label}: ${name(pref)}. Tap to change.`}
      >
        <span aria-hidden="true" className="relative inline-block h-2.5 w-2.5 overflow-hidden rounded-full border border-white">
          <span className={`absolute inset-y-0 left-0 bg-white transition-all duration-500 ${theme === "light" ? "w-0" : pref === "auto" ? "w-1/2" : "w-full"}`} />
        </span>
        {name(pref)}
      </button>
    </>
  );
}
