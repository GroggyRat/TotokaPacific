import { about } from "@/content/site";
import { Photo } from "./Photo";
import { Reveal, RevealGroup } from "./Reveal";
import { Section, SectionHeading } from "./SectionLabel";

export function About() {
  return (
    <Section id="about" num={about.num} label={about.label} className="mt-24 lg:mt-36">
      <div className="mt-8 grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-10">
        <RevealGroup className="lg:col-span-6">
          <Reveal>
            <SectionHeading id="about">{about.heading}</SectionHeading>
          </Reveal>
          {about.body.map((p, i) => (
            <Reveal as="p" key={i} className={`max-w-[36rem] text-lg leading-relaxed ${i === 0 ? "mt-8" : "mt-5"}`}>
              {p}
            </Reveal>
          ))}
          <Reveal className="mt-10">
            <dl className="grid max-w-[36rem] grid-cols-1 border-t border-rule sm:grid-cols-3">
              {about.facts.map((f) => (
                <div key={f.k} className="border-b border-rule py-3 sm:border-b-0 sm:pr-4">
                  <dt className="text-sm text-mute">{f.k}</dt>
                  <dd className="mt-1 text-[0.95rem]">{f.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </RevealGroup>

        <div className="lg:col-span-5 lg:col-start-8 lg:mt-28">
          <Photo
            scene="coast"
            src={about.photo.src || undefined}
            alt={about.photo.alt}
            note={about.photo.note}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="aspect-[4/5]"
          />
        </div>
      </div>
    </Section>
  );
}
