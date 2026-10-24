import { globeStatic } from "@/lib/globeStatic";

// SVG globe drawn at build time. Shown on first paint while WebGL loads,
// and as the whole hero for reduced motion or low-data visitors.
export function StaticGlobe({ showArcs, className = "" }: { showArcs: boolean; className?: string }) {
  const [ox, oy] = globeStatic.origin;
  return (
    <svg viewBox="0 0 500 500" className={className} aria-hidden="true" focusable="false">
      <defs>
        <pattern id="sg-dots" width="4.2" height="4.2" patternUnits="userSpaceOnUse">
          <circle cx="2.1" cy="2.1" r="0.85" fill="var(--color-fg)" fillOpacity="0.5" />
        </pattern>
        <clipPath id="sg-clip">
          <circle cx="250" cy="250" r="240" />
        </clipPath>
      </defs>
      <circle cx="250" cy="250" r="240" fill="var(--globe-sea)" />
      <g clipPath="url(#sg-clip)">
        <path d={globeStatic.graticule} fill="none" stroke="var(--color-fg)" strokeOpacity="0.05" strokeWidth="0.6" />
        <path d={globeStatic.land} fill="url(#sg-dots)" />
      </g>
      <circle cx="250" cy="250" r="240.5" fill="none" stroke="var(--globe-rim)" strokeOpacity="0.35" strokeWidth="1" />
      {showArcs && (
        <g fill="none" stroke="var(--color-accent)" strokeWidth="1.1" strokeOpacity="0.85">
          {globeStatic.arcs.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
      )}
      <circle cx={ox} cy={oy} r="3.2" fill="var(--color-accent)" />
      <circle cx={ox} cy={oy} r="8" fill="none" stroke="var(--color-accent)" strokeOpacity="0.6" />
    </svg>
  );
}
