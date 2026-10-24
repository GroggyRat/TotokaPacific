import { founder } from "@/content/site";
import { Photo } from "./Photo";
import { Reveal, RevealGroup } from "./Reveal";
import { Section, SectionHeading } from "./SectionLabel";

export function Founder() {
  return (
    <Section id="founder" num={founder.num} label={founder.label} className="mt-24 lg:mt-36">
      <div className="mt-8 grid grid-cols-1 gap-y-10 md:grid-cols-12 md:gap-x-10">
        <div className="md:col-span-5 lg:col-span-4">
          <Photo
            scene="portrait"
            src={founder.photo.src || undefined}
            alt={founder.photo.alt}
            note={founder.photo.note}
            sizes="(min-width: 768px) 35vw, 100vw"
            className="aspect-[4/5]"
          />
        </div>
        <RevealGroup className="md:col-span-7 lg:col-span-6 lg:col-start-6">
          <Reveal>
            <SectionHeading id="founder">{founder.heading}</SectionHeading>
          </Reveal>
          <Reveal className="mt-8 border-t border-rule pt-4">
            <p className="font-display text-2xl font-semibold text-charcoal [font-stretch:92%]">{founder.name}</p>
            <p className="mt-0.5 text-mute">{founder.role}</p>
          </Reveal>
          {founder.note.map((p, i) => (
            <Reveal as="p" key={i} className="mt-6 max-w-[36rem] text-xl leading-relaxed">
              {p}
            </Reveal>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
