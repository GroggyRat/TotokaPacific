import { company } from "@/content/site";

// Small tapa-style mark: a bow-tie of two triangles inside a square,
// with a diamond at the centre.
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <rect x="0.5" y="0.5" width="23" height="23" fill="none" stroke="currentColor" />
      <path d="M3 3 L12 12 L3 21 Z M21 3 L12 12 L21 21 Z" fill="currentColor" />
      <path d="M12 6.5 L14.5 12 L12 17.5 L9.5 12 Z" fill="var(--color-paper)" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 font-display font-semibold uppercase tracking-[0.04em] ${className}`}>
      <Mark className="h-[1.05em] w-[1.05em] shrink-0" />
      <span>{company.name}</span>
    </span>
  );
}
