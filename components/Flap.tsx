// Row of split-flap cells. Text is changed imperatively with flipTo().
export function Flap({ text, size = "sm", className = "" }: { text: string; size?: "sm" | "xl"; className?: string }) {
  const big = size === "xl";
  return (
    <span className={`flap inline-flex gap-[0.08em] ${className}`} aria-hidden="true">
      {text.split("").map((c, i) => (
        <span
          key={i}
          className={`relative inline-flex items-center justify-center overflow-hidden bg-ground-3 [perspective:400px] ${
            big ? "h-[1.15em] w-[0.78em] rounded-[0.06em]" : "h-[1.7em] w-[1.25em] rounded-[2px]"
          }`}
        >
          <span className="flap-ch inline-block will-change-transform tabular-nums">{c === " " ? " " : c}</span>
          <span aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px bg-ground/70" />
        </span>
      ))}
    </span>
  );
}
