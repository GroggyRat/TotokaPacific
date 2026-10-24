import { services } from "@/content/site";
import { Reveal, RevealGroup } from "./Reveal";
import { Section, SectionHeading } from "./SectionLabel";

export function Services() {
  const c = services.columns;
  return (
    <Section id="services" num={services.num} label={services.label} className="mt-24 lg:mt-36">
      <div className="mt-8 grid grid-cols-1 gap-y-4 lg:grid-cols-12 lg:gap-x-10">
        <SectionHeading id="services" className="lg:col-span-7">
          {services.heading}
        </SectionHeading>
        <p className="text-lg text-mute lg:col-span-4 lg:col-start-9 lg:self-end">{services.intro}</p>
      </div>

      <div className="mt-12 border-t border-charcoal">
        <div aria-hidden="true" className="hidden grid-cols-12 gap-x-10 border-b border-rule py-3 text-sm text-mute lg:grid">
          <span className="col-span-1" />
          <span className="col-span-3">{c.service}</span>
          <span className="col-span-4">{c.what}</span>
          <span className="col-span-4">{c.docs}</span>
        </div>
        <RevealGroup as="ol">
          {services.rows.map((row, i) => (
            <Reveal as="li" key={row.name} className="grid grid-cols-12 gap-x-4 gap-y-3 border-b border-rule py-7 lg:gap-x-10">
              <span className="col-span-2 pt-1.5 font-mono text-sm text-mute tabular-nums sm:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="col-span-10 font-display text-2xl font-semibold leading-tight text-navy [font-stretch:92%] sm:col-span-11 lg:col-span-3">
                {row.name}
              </h3>
              <p className="col-span-12 leading-relaxed sm:col-span-11 sm:col-start-2 lg:col-span-4 lg:col-start-auto">
                {row.what}
              </p>
              <div className="col-span-12 sm:col-span-11 sm:col-start-2 lg:col-span-4 lg:col-start-auto">
                <p className="sr-only">{c.docs}:</p>
                <p className="mb-2 text-sm text-mute lg:hidden" aria-hidden="true">
                  {c.docs}
                </p>
                <ul className="space-y-1 text-[0.95rem]">
                  {row.docs.map((d) => (
                    <li key={d} className="flex gap-2.5">
                      <span aria-hidden="true" className="text-mute">–</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
