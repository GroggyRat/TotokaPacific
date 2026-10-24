import { hero } from "@/content/site";
import { Mark } from "./Wordmark";
import { RouteMap } from "./RouteMap";
import { Reveal, RevealGroup } from "./Reveal";
import { SectionLabel } from "./SectionLabel";
import { PatternStrip } from "./Pattern";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="mx-auto max-w-[88rem] px-4 pt-6 sm:px-6 lg:px-10 lg:pt-10">
      <SectionLabel num={hero.num} label={hero.label} aside={hero.docRef} />

      <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 border-b border-rule pb-3 font-mono text-[0.72rem] uppercase tracking-wider text-mute">
        {hero.meta.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-x-10 gap-y-10 pt-10 lg:grid-cols-12 lg:pt-14">
        <RevealGroup immediate className="lg:col-span-5 lg:pt-4">
          <Reveal>
            <h1 id="hero-title" className="font-display font-semibold uppercase leading-[0.84] tracking-[-0.005em] text-navy text-[clamp(4rem,11vw,9.25rem)]">
              <span className="block">Totoka</span>
              <span className="flex items-end gap-[0.12em]">
                Pacific
                <Mark className="mb-[0.1em] h-[0.42em] w-[0.42em] shrink-0" />
              </span>
            </h1>
          </Reveal>

          <Reveal as="p" className="mt-8 max-w-[30rem] text-lg leading-snug sm:text-xl">
            {hero.sentence}
          </Reveal>

          <Reveal className="mt-8">
            <a
              href={hero.cta.href}
              className="group inline-flex items-center gap-3 border border-navy px-5 py-3 font-mono text-sm uppercase tracking-wider text-navy transition-colors duration-200 hover:bg-navy hover:text-paper rounded-sq"
            >
              {hero.cta.label}
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none">
                →
              </span>
            </a>
          </Reveal>

          <Reveal as="div" className="mt-12">
            <dl className="border-t border-charcoal font-mono text-[0.78rem]">
              {hero.fields.map((f) => (
                <div key={f.k} className="grid grid-cols-[8.5rem_1fr] gap-4 border-b border-rule py-2.5">
                  <dt className="uppercase tracking-wider text-mute">{f.k}</dt>
                  <dd className="text-charcoal">{f.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </RevealGroup>

        <div className="lg:col-span-7 lg:-mr-4">
          <RouteMap />
        </div>
      </div>

      <PatternStrip className="mt-16" />
    </section>
  );
}
