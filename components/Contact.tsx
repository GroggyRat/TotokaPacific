"use client";

import { useRef, useState } from "react";
import { company, contact } from "@/content/site";
import { gsap, useGSAP, SplitText } from "@/lib/motion";
import { Magnetic } from "./Magnetic";
import { SectionLabel } from "./SectionLabel";
import { WhatsAppMark } from "./WhatsAppMark";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="group relative">
      <label htmlFor={id} className="label text-mist transition-colors duration-500 group-focus-within:text-fg">
        {label}
      </label>
      <div className="relative mt-2">
        {children}
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-fg/20" />
        <span
          aria-hidden="true"
          className={`absolute inset-x-0 bottom-0 h-px origin-left bg-fg transition-transform duration-700 ease-[var(--ease-expo)] group-focus-within:scale-x-100 ${error ? "scale-x-100 !bg-accent" : "scale-x-0"}`}
        />
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-accent">
          {error}
        </p>
      )}
    </div>
  );
}

const input = "block w-full bg-transparent py-3 text-lg text-fg placeholder:text-mist/60 focus:outline-none";

export function Contact() {
  const root = useRef<HTMLElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const f = contact.form;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(".ct-title", { type: "chars,lines", mask: "lines" });
        gsap.from(split.chars, {
          yPercent: 115,
          rotate: 6,
          duration: 1.4,
          stagger: 0.025,
          ease: "expo.out",
          scrollTrigger: { trigger: ".ct-title", start: "top 85%" },
        });
        gsap.from(".ct-reveal", { y: 30, autoAlpha: 0, stagger: 0.08, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: ".ct-body", start: "top 85%" } });
        return () => split.revert();
      });
    },
    { scope: root },
  );

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const v = (k: string) => String(data.get(k) ?? "").trim();
    const next: Errors = {};
    if (!v("name")) next.name = f.errors.name;
    if (!/^\S+@\S+\.\S+$/.test(v("email"))) next.email = f.errors.email;
    if (!v("message")) next.message = f.errors.message;
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    // TODO: post to a form service or API route instead of opening the email app.
    const subject = `Enquiry: ${v("type") || "General"} — ${v("name")}`;
    const body = [`Name: ${v("name")}`, `Email: ${v("email")}`, `Phone: ${v("phone")}`, `Type: ${v("type")}`, "", v("message")].join("\n");
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <section id="contact" ref={root} aria-labelledby="contact-title" className="relative px-5 pb-28 pt-24 sm:px-10 sm:pb-36 sm:pt-32">
      <SectionLabel num={contact.num} label={contact.label} />
      <h2 id="contact-title" className="ct-title display mt-8 text-[clamp(3.4rem,11vw,12rem)] leading-[0.92] tracking-[-0.03em]">
        {contact.heading}
      </h2>

      <div className="ct-body mt-16 grid grid-cols-1 gap-16 lg:mt-24 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="ct-reveal max-w-[32ch] text-lg leading-relaxed text-fg/80">{contact.intro}</p>
          <div className="ct-reveal mt-10">
            <Magnetic strength={0.45}>
              <a
                href={company.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Chat"
                className="flex h-40 w-40 flex-col items-center justify-center gap-3 rounded-full bg-accent text-ground transition-transform duration-700 ease-[var(--ease-expo)] hover:scale-105 sm:h-44 sm:w-44"
              >
                <WhatsAppMark className="h-7 w-7" />
                <span className="label">{contact.whatsapp}</span>
              </a>
            </Magnetic>
          </div>
          <dl className="mt-12 space-y-5">
            {[
              [contact.labels.email, <a key="e" href={`mailto:${company.email}`} className="hover:text-accent">{company.email}</a>],
              [contact.labels.phone, <a key="p" href={`tel:${company.phone.replace(/\s/g, "")}`} className="hover:text-accent">{company.phone}</a>],
              [contact.labels.office, <address key="a" className="not-italic">{company.address.join(", ")}</address>],
              [contact.labels.hours, contact.hours],
            ].map(([k, v]) => (
              <div key={String(k)} className="ct-reveal grid grid-cols-[5.5rem_1fr] gap-4 border-t border-fg/10 pt-4">
                <dt className="label pt-1 text-mist">{k}</dt>
                <dd className="text-[1.02rem] transition-colors duration-500">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <form ref={form} onSubmit={onSubmit} noValidate className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
          <div className="ct-reveal sm:col-span-2">
            <Field id="name" label={f.name} error={errors.name}>
              <input id="name" name="name" autoComplete="name" className={input} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
            </Field>
          </div>
          <div className="ct-reveal">
            <Field id="email" label={f.email} error={errors.email}>
              <input id="email" name="email" type="email" autoComplete="email" className={input} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
            </Field>
          </div>
          <div className="ct-reveal">
            <Field id="phone" label={f.phone}>
              <input id="phone" name="phone" type="tel" autoComplete="tel" className={input} />
            </Field>
          </div>
          <fieldset className="ct-reveal sm:col-span-2">
            <legend className="label text-mist">{f.type}</legend>
            <div className="mt-4 flex flex-wrap gap-2">
              {f.types.map((t, i) => (
                <label key={t} className="relative">
                  <input type="radio" name="type" value={t} defaultChecked={i === 0} className="peer sr-only" />
                  <span className="label block cursor-pointer rounded-full border border-fg/25 px-4 py-2.5 transition-colors duration-500 hover:border-fg/60 peer-checked:border-fg peer-checked:bg-fg peer-checked:text-ground peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-accent">
                    {t}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="ct-reveal sm:col-span-2">
            <Field id="message" label={f.message} error={errors.message}>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder={f.messageHint}
                className={`${input} resize-none`}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
            </Field>
          </div>
          <div className="ct-reveal flex flex-col items-start gap-4 sm:col-span-2">
            <Magnetic>
              <button
                type="submit"
                className="label group inline-flex items-center gap-3 rounded-full border border-fg px-7 py-4 transition-colors duration-500 hover:bg-fg hover:text-ground"
              >
                {f.submit}
                <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </Magnetic>
            <p role="status" className="text-sm text-mist">
              {sent ? f.sent : ""}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
