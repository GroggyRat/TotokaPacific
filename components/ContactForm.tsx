"use client";

import { useRef, useState } from "react";
import { company, contact } from "@/content/site";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const field =
  "mt-2 block w-full rounded-sq border border-charcoal/30 bg-paper px-3 py-2.5 text-base text-charcoal transition-colors duration-200 hover:border-charcoal/60 focus:border-navy focus:outline-none focus-visible:outline-2 focus-visible:outline-navy aria-[invalid=true]:border-charcoal aria-[invalid=true]:border-2";

export function ContactForm() {
  const f = contact.form;
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sent">("idle");

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
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    // TODO: post to a form service or API route instead of opening the email app.
    const subject = `Enquiry: ${v("type") || "General"} — ${v("name")}`;
    const body = [`Name: ${v("name")}`, `Email: ${v("email")}`, `Phone: ${v("phone")}`, `Type: ${v("type")}`, "", v("message")].join("\n");
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("sent");
  }

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${k}-error`} className="mt-1.5 text-sm text-charcoal">
        <span aria-hidden="true" className="mr-1.5 inline-block h-2 w-2 bg-charcoal" />
        {errors[k]}
      </p>
    ) : null;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label htmlFor="name" className="text-sm font-medium">{f.name}</label>
        <input id="name" name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
        {err("name")}
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-medium">{f.email}</label>
        <input id="email" name="email" type="email" autoComplete="email" className={field} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
        {err("email")}
      </div>
      <div>
        <label htmlFor="phone" className="text-sm font-medium">
          {f.phone} <span className="font-normal text-mute">({f.phoneHint})</span>
        </label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" className={field} />
      </div>

      <fieldset className="sm:col-span-2">
        <legend className="text-sm font-medium">{f.type}</legend>
        <div className="mt-2 flex flex-wrap">
          {f.types.map((t, i) => (
            <label key={t} className="relative -ml-px first:ml-0">
              <input type="radio" name="type" value={t} defaultChecked={i === 0} className="peer sr-only" />
              <span className="block cursor-pointer border border-charcoal/30 px-4 py-2 text-[0.95rem] transition-colors duration-200 hover:text-navy peer-checked:relative peer-checked:z-10 peer-checked:border-navy peer-checked:bg-navy peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-navy">
                {t}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="sm:col-span-2">
        <label htmlFor="message" className="text-sm font-medium">{f.message}</label>
        <p id="message-hint" className="text-sm text-mute">{f.messageHint}</p>
        <textarea
          id="message"
          name="message"
          rows={5}
          className={field}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-hint message-error" : "message-hint"}
        />
        {err("message")}
      </div>

      <div className="flex flex-col items-start gap-4 sm:col-span-2">
        <button
          type="submit"
          className="rounded-sq bg-accent px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-charcoal"
        >
          {f.submit} <span aria-hidden="true">→</span>
        </button>
        <p role="status" className="text-sm text-mute">
          {status === "sent" ? f.sent : ""}
        </p>
      </div>
    </form>
  );
}
