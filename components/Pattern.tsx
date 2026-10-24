// Masi/tapa-inspired strip: sawtooth triangles between two rules, with a
// row of small diamonds. Used as thin dividers and the footer strip only.
export function PatternStrip({
  className = "",
  height = 14,
  opacity = 0.22,
  tone = "text-navy",
}: {
  tone?: string;
  className?: string;
  height?: number;
  opacity?: number;
}) {
  const id = `masi-${height}`;
  return (
    <svg
      className={`block w-full ${tone} ${className}`}
      height={height}
      aria-hidden="true"
      focusable="false"
      style={{ opacity }}
    >
      <defs>
        <pattern id={id} width={height * 2} height={height} patternUnits="userSpaceOnUse">
          <path
            d={`M0 ${height} L${height / 2} ${height / 2} L${height} ${height} L${height * 1.5} ${height / 2} L${height * 2} ${height}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d={`M${height} 1.5 L${height + 2.5} 4 L${height} 6.5 L${height - 2.5} 4 Z`}
            fill="currentColor"
          />
          <line x1="0" y1="0.5" x2={height * 2} y2="0.5" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height={height} fill={`url(#${id})`} />
    </svg>
  );
}
