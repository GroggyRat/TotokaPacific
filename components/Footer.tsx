import { company, footer, nav } from "@/content/site";
import { PatternStrip } from "./Pattern";
import { Wordmark } from "./Wordmark";

export function Footer() {
  return (
    <footer className="mt-28 bg-navy text-paper lg:mt-40">
      <PatternStrip tone="text-paper" height={16} opacity={0.2} />
      <div className="mx-auto grid max-w-[88rem] grid-cols-1 gap-y-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-12 lg:gap-x-10 lg:px-10">
        <div className="lg:col-span-5">
          <Wordmark className="text-xl" />
          <p className="mt-4 max-w-[22rem] text-paper/75">{footer.line}</p>
        </div>
        <nav aria-label="Footer" className="lg:col-span-3">
          <ul className="grid grid-cols-2 gap-y-2 text-[0.95rem]">
            {nav.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="sweep text-paper/85 hover:text-paper">{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-1.5 text-[0.95rem] lg:col-span-4">
          <a href={`mailto:${company.email}`} className="sweep block w-fit text-paper/85 hover:text-paper">{company.email}</a>
          <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="sweep block w-fit text-paper/85 hover:text-paper">{company.phone}</a>
          <address className="pt-2 not-italic text-paper/75">
            {company.address.map((a) => (
              <span key={a} className="block">{a}</span>
            ))}
          </address>
        </div>
      </div>
      <div className="mx-auto flex max-w-[88rem] flex-wrap justify-between gap-4 border-t border-paper/15 px-4 py-5 text-sm text-paper/60 sm:px-6 lg:px-10">
        <span>{footer.copyright}</span>
        <a href="#top" className="sweep hover:text-paper">Back to top <span aria-hidden="true">↑</span></a>
      </div>
    </footer>
  );
}
