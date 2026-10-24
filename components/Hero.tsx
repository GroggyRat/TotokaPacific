import { hero } from "@/content/site";
import { Photo } from "./Photo";
import { RouteMap } from "./RouteMap";
import { Reveal, RevealGroup } from "./Reveal";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="mx-auto max-w-[88rem] px-4 pt-4 sm:px-6 lg:px-10 lg:pt-6">
      <Photo
        scene="wharf"
        src={hero.photo.src || undefined}
        alt={hero.photo.alt}
        note={hero.photo.note}
        priority
        className="aspect-[4/3] sm:aspect-[16/7] lg:aspect-[21/8]"
      />

      <RevealGroup immediate className="grid grid-cols-1 gap-y-6 pt-10 lg:grid-cols-12 lg:gap-x-10 lg:pt-14">
        <Reveal className="lg:col-span-7">
          <p className="text-sm text-mute">{hero.eyebrow}</p>
          <h1
            id="hero-title"
            className="mt-3 font-display text-[clamp(2.4rem,5.4vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.025em] text-navy [font-stretch:92%]"
          >
            {hero.heading}
          </h1>
        </Reveal>
        <Reveal className="lg:col-span-4 lg:col-start-9 lg:self-end">
          <p className="text-lg leading-snug">{hero.sentence}</p>
          <a
            href={hero.cta.href}
            className="group mt-5 inline-flex items-center gap-2 text-lg font-medium text-navy"
          >
            <span className="underline decoration-1 underline-offset-[6px] transition-colors duration-200 group-hover:text-charcoal">
              {hero.cta.label}
            </span>
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none">
              →
            </span>
          </a>
        </Reveal>
      </RevealGroup>

      <div className="mt-16 grid grid-cols-1 gap-y-4 border-t border-rule pt-6 lg:mt-24 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-3">
          <h2 className="font-display text-xl font-semibold text-navy">{hero.map.title}</h2>
          <p className="mt-2 max-w-[22rem] text-mute">{hero.map.note}</p>
        </div>
        <div className="lg:col-span-8 lg:col-start-5">
          <RouteMap />
        </div>
      </div>
    </section>
  );
}
