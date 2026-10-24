export function SectionLabel({ num, label, className = "" }: { num: string; label: string; className?: string }) {
  return (
    <p className={`label flex items-center gap-3 text-mist ${className}`}>
      <span className="text-accent tabular-nums">{num}</span>
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-50" />
      <span>{label}</span>
    </p>
  );
}
