"use client";

// Day/Night theme. "auto" follows sunrise and sunset in Suva.
export type ThemePref = "auto" | "light" | "dark";
export const THEME_KEY = "tp-theme";
export const THEME_EVENT = "totoka:theme";

import { suvaIsDay } from "./sun";
export { suvaIsDay };

export function readPref(): ThemePref {
  try {
    const v = localStorage.getItem(THEME_KEY);
    if (v === "light" || v === "dark" || v === "auto") return v;
  } catch {}
  return "auto";
}

export function resolve(pref: ThemePref): "light" | "dark" {
  return pref === "auto" ? (suvaIsDay(Date.now()) ? "light" : "dark") : pref;
}

export function currentTheme(): "light" | "dark" {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function applyTheme(pref: ThemePref, animate = true) {
  const root = document.documentElement;
  const next = resolve(pref);
  root.dataset.themePref = pref;
  if (root.dataset.theme === next) return;
  if (animate && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    root.classList.add("theme-anim");
    window.setTimeout(() => root.classList.remove("theme-anim"), 1000);
  }
  root.dataset.theme = next;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "light" ? "#eee8dd" : "#060b14");
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function setPref(pref: ThemePref) {
  try {
    localStorage.setItem(THEME_KEY, pref);
  } catch {}
  applyTheme(pref);
}
