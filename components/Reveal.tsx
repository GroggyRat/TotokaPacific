"use client";

import { motion, type Variants } from "framer-motion";

// Fade + 12px rise, 400ms, staggered children. MotionConfig drops the
// transform for users who prefer reduced motion.
const parent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const child: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function RevealGroup({
  children,
  className,
  as = "div",
  immediate = false,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol" | "dl" | "tbody";
  immediate?: boolean;
}) {
  const M = motion[as];
  return (
    <M
      className={className}
      variants={parent}
      initial="hidden"
      {...(immediate ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "-10% 0px" } })}
    >
      {children}
    </M>
  );
}

export function Reveal({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "p" | "span" | "tr";
}) {
  const M = motion[as];
  return (
    <M className={className} variants={child}>
      {children}
    </M>
  );
}
