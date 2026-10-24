export function SectionLabel({ num, label, aside }: { num: string; label: string; aside?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-t border-charcoal pt-3 font-mono text-[0.75rem] uppercase tracking-[0.12em]">
      <span>
        <span className="text-navy">{num}</span>
        <span className="mx-2 text-mute">/</span>
        {label}
      </span>
      {aside && <span className="text-mute">{aside}</span>}
    </div>
  );
}
