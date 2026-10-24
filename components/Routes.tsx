import { routes } from "@/content/site";
import { Reveal, RevealGroup } from "./Reveal";
import { Section, SectionHeading } from "./SectionLabel";

function ModeTag({ on, label }: { on: boolean; label: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 font-mono text-xs ${on ? "text-navy" : "text-mute/50"}`}>
      <span aria-hidden="true" className={`inline-block h-2 w-2 border border-current ${on ? "bg-current" : ""}`} />
      {label}
    </span>
  );
}

export function Routes() {
  const c = routes.columns;
  return (
    <Section id="routes" num={routes.num} label={routes.label} className="mt-24 lg:mt-36">
      <div className="mt-8 grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            <SectionHeading id="routes">{routes.heading}</SectionHeading>
            <p className="mt-6 max-w-[26rem] text-lg text-mute">{routes.intro}</p>
            <p className="mt-6 flex gap-5" aria-hidden="true">
              <ModeTag on label={routes.legend.on} />
              <ModeTag on={false} label={routes.legend.off} />
            </p>
          </div>
        </div>

        <div className="lg:col-span-8">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">{routes.heading}</caption>
            <thead className="hidden border-y border-charcoal text-sm text-mute md:table-header-group">
              <tr>
                <th scope="col" className="py-3 pr-4 font-normal">{c.country}</th>
                <th scope="col" className="py-3 pr-4 font-normal">{c.lane}</th>
                <th scope="col" className="py-3 pr-4 font-normal">{c.modes}</th>
                <th scope="col" className="py-3 font-normal">{c.time}</th>
              </tr>
            </thead>
            <RevealGroup as="tbody" className="border-t border-charcoal md:border-t-0">
              {routes.rows.map((r) => (
                <Reveal
                  as="tr"
                  key={r.country}
                  className="grid grid-cols-2 gap-x-4 gap-y-1 border-b border-rule py-4 md:table-row md:py-0"
                >
                  <th scope="row" className="font-display text-xl font-semibold text-navy [font-stretch:92%] md:py-4 md:pr-4">
                    {r.country}
                  </th>
                  <td className="text-right font-mono text-sm md:py-4 md:pr-4 md:text-left">{r.lane}</td>
                  <td className="md:py-4 md:pr-4">
                    <span className="sr-only">
                      {[r.sea && routes.legend.sea, r.air && routes.legend.air].filter(Boolean).join(" and ")}
                    </span>
                    <span className="flex gap-3" aria-hidden="true">
                      <ModeTag on={r.sea} label={routes.legend.sea.toUpperCase()} />
                      <ModeTag on={r.air} label={routes.legend.air.toUpperCase()} />
                    </span>
                  </td>
                  <td className="col-span-2 pt-1 text-[0.95rem] text-mute md:py-4">{r.time}</td>
                </Reveal>
              ))}
            </RevealGroup>
          </table>
        </div>
      </div>
    </Section>
  );
}
