import { suvaIsDay } from "./sun";

const THEME_KEY = "tp-theme"; // keep in sync with lib/theme.ts

// Runs in <head> before first paint so the right theme shows immediately.
export const themeScript = `(function(){try{var p=localStorage.getItem("${THEME_KEY}")}catch(e){}if(p!=="light"&&p!=="dark")p="auto";var isDay=${suvaIsDay.toString()};var t=p==="auto"?(isDay(Date.now())?"light":"dark"):p;var r=document.documentElement;r.dataset.theme=t;r.dataset.themePref=p;})();`;
