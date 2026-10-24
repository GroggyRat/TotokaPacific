"use client";

import type Lenis from "lenis";

// Single shared Lenis instance, set by <SmoothScroll>.
export const lenisRef: { current: Lenis | null } = { current: null };
