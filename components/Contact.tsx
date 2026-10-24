import { company, contact } from "@/content/site";
import { ContactForm } from "./ContactForm";
import { PatternStrip } from "./Pattern";
import { Section, SectionHeading } from "./SectionLabel";
import { WhatsAppMark } from "./WhatsAppMark";

export function Contact() {
  const l = contact.labels;
  return (
    <>
      <div className="mx-auto mt-24 max-w-[88rem] px-4 sm:px-6 lg:mt-36 lg:px-10">
        <PatternStrip height={12} opacity={0.18} />
      </div>
      <Section id="contact" num={contact.num} label={contact.label} className="mt-10">
        <div className="mt-8 grid grid-cols-1 gap-y-14 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-5">
            <SectionHeading id="contact">{contact.heading}</SectionHeading>
            <p className="mt-6 max-w-[28rem] text-lg">{contact.intro}</p>

            <a
              href={company.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-sq border border-navy px-5 py-3 font-medium text-navy transition-colors duration-200 hover:bg-navy hover:text-paper"
            >
              <WhatsAppMark className="h-5 w-5" />
              {contact.whatsapp}
            </a>

            <dl className="mt-10 max-w-[28rem] border-t border-rule">
              <Row k={l.email}>
                <a href={`mailto:${company.email}`} className="sweep text-navy">{company.email}</a>
              </Row>
              <Row k={l.phone}>
                <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="sweep text-navy">{company.phone}</a>
              </Row>
              <Row k={l.office}>
                <address className="not-italic">
                  {company.address.map((a) => (
                    <span key={a} className="block">{a}</span>
                  ))}
                </address>
              </Row>
              <Row k={l.hours}>{contact.hours}</Row>
            </dl>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}

function Row({ k, children }: { k: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-rule py-3">
      <dt className="text-sm text-mute">{k}</dt>
      <dd>{children}</dd>
    </div>
  );
}
