// Small, quiet section number and name.
export function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <p className="flex items-baseline gap-3 text-sm text-mute">
      <span className="font-mono text-xs tabular-nums">{num}</span>
      <span>{label}</span>
    </p>
  );
}

export function Section({
  id,
  num,
  label,
  className = "",
  children,
}: {
  id: string;
  num: string;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-10 ${className}`}>
      <div className="border-t border-rule pt-5">
        <SectionLabel num={num} label={label} />
      </div>
      {children}
    </section>
  );
}

export function SectionHeading({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <h2
      id={`${id}-title`}
      className={`font-display text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.02em] text-navy [font-stretch:92%] ${className}`}
    >
      {children}
    </h2>
  );
}
