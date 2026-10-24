import { company } from "@/content/site";

// Small tapa-style mark: a bow-tie of two triangles inside a square,
// with an open diamond at the centre.
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <rect x="0.75" y="0.75" width="22.5" height="22.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 4 L12 12 L4 20 Z M20 4 L12 12 L20 20 Z" fill="currentColor" />
      <path d="M12 7 L14.2 12 L12 17 L9.8 12 Z" fill="none" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-[0.55em] font-display uppercase tracking-[0.12em] ${className}`}>
      <Mark className="h-[1.1em] w-[1.1em] shrink-0" />
      <span className="leading-none">{company.name}</span>
    </span>
  );
}
