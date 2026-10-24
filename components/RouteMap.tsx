"use client";

import { motion, useReducedMotion } from "framer-motion";
import { hero, mapRoutes, type MapRoute } from "@/content/site";

// Hand-drawn equirectangular chart of the south-west Pacific.
// 10 units per degree. Chart spans 138°E → 102°W and 36°N → 46°S.
const LON0 = 138;
const LAT0 = 36;
const W = 1200;
const H = 820;
const px = (lon: number) => (lon - LON0) * 10;
const py = (lat: number) => (LAT0 - lat) * 10;
const P = (lon: number, lat: number): [number, number] => [px(lon), py(lat)];

const poly = (pts: [number, number][]) =>
  "M" + pts.map(([lo, la]) => `${px(lo).toFixed(1)} ${py(la).toFixed(1)}`).join(" L") + " Z";

// Coastlines, simplified by hand. [lon, lat]
const LAND: string[] = [
  // Australia (eastern part, clipped at the chart edge)
  poly([
    [138, -16.6], [139.5, -17.5], [140.8, -17.4], [141.5, -15.5], [141.6, -12.5], [142.5, -10.7],
    [143.5, -14], [145.3, -15], [146, -17], [146.3, -19], [148.8, -20.3], [150.2, -22.5],
    [151.2, -23.8], [153, -25.3], [153.6, -28.2], [153, -31], [151.3, -33.8], [150.1, -36.5],
    [149.9, -37.5], [148, -37.8], [146.4, -39.1], [144.5, -38.2], [141, -38.1], [139.7, -37.2],
    [139.3, -35.8], [138.5, -35.6], [138, -35],
  ]),
  // Tasmania
  poly([[144.7, -40.7], [148.3, -40.9], [148.2, -42.2], [147, -43.6], [145.5, -42.8], [144.6, -41.2]]),
  // New Guinea (clipped)
  poly([
    [138, -1.6], [140, -2.4], [142, -3.1], [144, -3.8], [145.8, -5.3], [147.5, -6.1], [147.9, -6.8],
    [146.9, -7.7], [148.2, -8.6], [149.3, -9.6], [150.8, -10.3], [150, -10.6], [147.1, -9.5],
    [146, -8.1], [144.2, -7.6], [143.3, -8.6], [142.6, -9.3], [141, -9.1], [139.8, -8.1],
    [138.5, -8.4], [138, -8],
  ]),
  // New Britain
  poly([[148.3, -5.6], [150, -5.3], [151.5, -4.3], [152.4, -4.4], [152, -5.5], [150.5, -6.2], [149, -6.1]]),
  // New Caledonia
  poly([[164, -20.2], [165.5, -21.3], [167, -22.3], [166.4, -22.4], [164.9, -21.3], [164, -20.6]]),
  // New Zealand — North Island
  poly([
    [172.7, -34.4], [174.3, -35.3], [175, -36.7], [175.9, -37.4], [178, -37.6], [178.5, -38.6],
    [177.9, -39.2], [176.9, -39.6], [176.2, -41], [174.8, -41.3], [175.2, -40], [174, -39.3],
    [174.6, -38.3], [174.7, -37.2], [174.2, -36.5], [173, -35.2],
  ]),
  // New Zealand — South Island
  poly([
    [172.7, -40.5], [174, -41.2], [174.3, -41.7], [173, -43], [172.8, -43.7], [171.2, -44.4],
    [170.7, -45.9], [169, -46.6], [166.6, -46.1], [166.8, -45.2], [168.3, -44], [170.8, -42.7],
    [171.5, -41.8], [172.1, -40.8],
  ]),
  // Fiji — Viti Levu
  poly([[177.3, -17.6], [177.9, -17.3], [178.6, -17.6], [178.7, -18.1], [178.3, -18.25], [177.6, -18.2], [177.3, -18]]),
  // Fiji — Vanua Levu
  poly([[178.6, -16.6], [179.4, -16.3], [180, -16.2], [179.9, -16.8], [179.3, -16.8], [178.9, -17]]),
  // North America — California, Baja, west Mexico (clipped)
  poly([
    [238.1, 36], [239.5, 34.5], [241.7, 33.7], [242.8, 32.7], [243.4, 31.9], [244.1, 30.3],
    [244.9, 27.8], [246.2, 26.7], [248, 24.6], [250.1, 22.9], [250.3, 23.8], [249.7, 24.1],
    [248.6, 26], [247.7, 27.3], [246.4, 29], [245.2, 31.7], [246.5, 31.3], [247.8, 28.8],
    [249.1, 27.9], [251, 25.6], [253.6, 23.2], [254.7, 21.5], [254.8, 20.6], [255.7, 19.1],
    [257.8, 17.9], [258, 17.8], [258, 36],
  ]),
];

// Small islands as ellipses: [lon, lat, rx, ry, rotation]
const ISLETS: [number, number, number, number, number][] = [
  [160, -9.6, 7, 3, -20], [161, -9, 6, 2, -40], [157.5, -8.2, 5, 2, -30], [162, -10.6, 5, 2, -20],
  [155.4, -6.2, 6, 3, -45], [166.9, -15.4, 4, 6, 10], [167.4, -16.2, 3, 4, 0], [168.3, -17.7, 3, 2.5, 0],
  [169.3, -19.5, 2.5, 2, 0], [187.6, -13.6, 4, 2.5, 0], [188.3, -13.9, 4, 2, 0], [184.8, -21.2, 3, 2, 0],
  [180.1, -16.8, 1.8, 3, 30], [178.2, -19.05, 2.5, 1.5, 0], [173, 1.4, 2, 2, 0], [179.2, -8.5, 1.5, 1.5, 0],
  [204.5, 19.6, 6, 6, 0], [203.7, 20.8, 3.5, 2, 0], [202, 21.5, 3, 2, 0], [200.5, 22.1, 2.5, 2, 0],
  [170.7, -14.3, 1.5, 1.5, 0], [190.2, -14.3, 1.5, 1.5, 0], [200.2, -21.2, 1.5, 1.5, 0],
];

const SUVA = P(178.44, -18.14);
const NADI = P(177.44, -17.76);

type Pt = [number, number];

function control(a: Pt, b: Pt, bend: number): Pt {
  const mx = (a[0] + b[0]) / 2;
  const my = (a[1] + b[1]) / 2;
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  return [mx - dy * bend, my + dx * bend];
}

function routeGeom(r: MapRoute, from: Pt, bend: number) {
  if (r.exit) {
    const end = P(r.exit.lon, r.exit.lat);
    // Quadratic through `via` at t = 0.5
    const c: Pt = r.exit.via
      ? [2 * px(r.exit.via[0]) - (from[0] + end[0]) / 2, 2 * py(r.exit.via[1]) - (from[1] + end[1]) / 2]
      : control(from, end, bend);
    return { end, c, d: `M${from[0]} ${from[1]} Q${c[0]} ${c[1]} ${end[0]} ${end[1]}` };
  }
  const end = P(r.lon, r.lat);
  const c = control(from, end, bend);
  return { end, c, d: `M${from[0]} ${from[1]} Q${c[0]} ${c[1]} ${end[0]} ${end[1]}` };
}

function quadAt(a: Pt, c: Pt, b: Pt, t: number): Pt {
  const u = 1 - t;
  return [u * u * a[0] + 2 * u * t * c[0] + t * t * b[0], u * u * a[1] + 2 * u * t * c[1] + t * t * b[1]];
}

const lonLabel = (lon: number) =>
  lon === 180 ? "180°" : lon < 180 ? `${lon}°E` : `${360 - lon}°W`;
const latLabel = (lat: number) => (lat === 0 ? "0°" : lat > 0 ? `${lat}°N` : `${-lat}°S`);

export function RouteMap() {
  const reduce = useReducedMotion();
  const vesselRoute = mapRoutes.find((r) => r.code === "USLAX")!;
  const vessel = routeGeom(vesselRoute, SUVA, vesselRoute.bend);
  const vesselStatic = quadAt(SUVA, vessel.c, vessel.end, 0.42);

  const draw = (i: number) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { pathLength: 0 },
          animate: { pathLength: 1 },
          transition: { duration: 1.4, delay: 0.3 + i * 0.12, ease: [0.4, 0, 0.2, 1] as const },
        };

  const summary =
    "Chart of trade lanes from Fiji to " + mapRoutes.map((r) => r.city).join(", ") + ".";

  return (
    <figure className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full text-navy"
        role="img"
        aria-label={summary}
      >
        <style>{`
          .m-code{font:500 19px var(--font-mono);letter-spacing:.04em}
          .m-city{font:400 14px var(--font-mono);fill:var(--color-mute)}
          .m-grid{font:400 13px var(--font-mono);fill:var(--color-mute)}
          @media (max-width:640px){
            .m-code{font-size:32px}
            .m-city,.m-minor{display:none}
            .m-grid{font-size:24px}
          }
        `}</style>

        <defs>
          <clipPath id="chart">
            <rect width={W} height={H} />
          </clipPath>
          {mapRoutes.map((r) => {
            if (!r.modes.includes("air")) return null;
            const g = routeGeom(r, NADI, -r.bend * 0.9);
            return (
              <mask id={`air-${r.code}`} key={r.code} maskUnits="userSpaceOnUse">
                <motion.path d={g.d} stroke="#fff" strokeWidth="6" fill="none" {...draw(mapRoutes.length)} />
              </mask>
            );
          })}
        </defs>

        <g clipPath="url(#chart)">
          {/* Graticule */}
          <g stroke="var(--color-rule)" strokeWidth="1">
            {Array.from({ length: 12 }, (_, i) => 140 + i * 10).map((lon) => (
              <line key={lon} x1={px(lon)} y1={0} x2={px(lon)} y2={H} />
            ))}
            {[30, 20, 10, -10, -20, -30, -40].map((lat) => (
              <line key={lat} x1={0} y1={py(lat)} x2={W} y2={py(lat)} />
            ))}
            <line x1={0} y1={py(0)} x2={W} y2={py(0)} strokeDasharray="6 6" stroke="var(--color-mute)" strokeOpacity="0.5" />
          </g>
          <g className="m-grid" aria-hidden="true">
            {[150, 170, 190, 210, 230, 250].map((lon) => (
              <text key={lon} x={px(lon) + 6} y={H - 10}>
                {lonLabel(lon)}
              </text>
            ))}
            {[30, 0, -20, -40].map((lat) => (
              <text key={lat} x={W - 10} y={py(lat) - 7} textAnchor="end">
                {lat === 0 ? "EQUATOR 0°" : latLabel(lat)}
              </text>
            ))}
          </g>

          {/* Land */}
          <g fill="var(--color-paper-2)" stroke="var(--color-charcoal)" strokeWidth="0.9" strokeLinejoin="round">
            {LAND.map((d, i) => (
              <path key={i} d={d} />
            ))}
            {ISLETS.map(([lo, la, rx, ry, rot], i) => (
              <ellipse
                key={i}
                cx={px(lo)}
                cy={py(la)}
                rx={rx}
                ry={ry}
                transform={`rotate(${rot} ${px(lo)} ${py(la)})`}
              />
            ))}
          </g>

          {/* Sea lanes */}
          <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            {mapRoutes.map((r, i) => {
              if (!r.modes.includes("sea")) return null;
              const g = routeGeom(r, SUVA, r.bend);
              return (
                <motion.path
                  key={r.code}
                  id={`sea-${r.code}`}
                  d={g.d}
                  className={r.minor ? "m-minor" : undefined}
                  {...draw(i)}
                />
              );
            })}
          </g>

          {/* Air lanes, dashed, revealed through masks */}
          <g fill="none" stroke="currentColor" strokeWidth="1.3" strokeDasharray="2 6" strokeLinecap="round">
            {mapRoutes.map((r) => {
              if (!r.modes.includes("air")) return null;
              const g = routeGeom(r, NADI, -r.bend * 0.9);
              return <path key={r.code} d={g.d} mask={`url(#air-${r.code})`} />;
            })}
          </g>

          {/* Destinations */}
          {mapRoutes.map((r, i) => {
            const g = routeGeom(r, SUVA, r.bend);
            const [x, y] = g.end;
            const left = r.labelSide === "l";
            const dy = r.labelDy ?? 0;
            const tx = r.exit ? x + 14 : left ? x - 12 : x + 12;
            const anchor = r.exit ? "start" : left ? "end" : "start";
            return (
              <motion.g
                key={r.code}
                className={r.minor ? "m-minor" : undefined}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.2 + i * 0.12 }}
                aria-hidden="true"
              >
                {r.exit ? (
                  <path d={`M${x + 10} ${y - 6} L${x} ${y} L${x + 10} ${y + 6}`} fill="none" stroke="currentColor" strokeWidth="1.6" />
                ) : (
                  <rect x={x - 4} y={y - 4} width="8" height="8" fill="var(--color-paper)" stroke="currentColor" strokeWidth="1.6" />
                )}
                <text x={tx} y={y + dy - 2} textAnchor={anchor} className="m-code" fill="currentColor">
                  {r.code}
                </text>
                <text x={tx} y={y + dy + 15} textAnchor={anchor} className="m-city">
                  {r.exit ? `${r.city} · ${hero.map.offChart}` : r.city}
                </text>
              </motion.g>
            );
          })}

          {/* Origin: Fiji */}
          <g aria-hidden="true">
            <circle cx={SUVA[0]} cy={SUVA[1]} r="13" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx={SUVA[0]} cy={SUVA[1]} r="5" fill="currentColor" />
            <path
              d={`M${SUVA[0] + 9} ${SUVA[1] + 9} L${SUVA[0] + 70} ${SUVA[1] + 110} L${SUVA[0] + 96} ${SUVA[1] + 110}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <text x={SUVA[0] + 102} y={SUVA[1] + 108} className="m-code" fill="currentColor" style={{ fontWeight: 600 }}>
              FJSUV · FJLTK · NAN
            </text>
            <text x={SUVA[0] + 102} y={SUVA[1] + 126} className="m-city">
              Fiji — Suva · Lautoka · Nadi
            </text>
          </g>

          {/* Vessel — replace path or timing in content if needed */}
          <g aria-hidden="true">
            {reduce ? (
              <path
                d="M-9 -4 L5 -4 L10 0 L5 4 L-9 4 Z"
                fill="var(--color-accent)"
                transform={`translate(${vesselStatic[0]} ${vesselStatic[1]}) rotate(-38)`}
              />
            ) : (
              <path d="M-9 -4 L5 -4 L10 0 L5 4 L-9 4 Z" fill="var(--color-accent)" opacity="0">
                <set attributeName="opacity" to="1" begin="2.2s" />
                <animateMotion dur="16s" begin="2.2s" repeatCount="indefinite" rotate="auto" path={vessel.d} />
              </path>
            )}
          </g>
        </g>

        <rect x="0.5" y="0.5" width={W - 1} height={H - 1} fill="none" stroke="var(--color-charcoal)" strokeWidth="1" />
      </svg>

      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 font-mono text-[0.72rem] uppercase tracking-wider text-mute">
        <span>
          <span className="text-charcoal">{hero.map.figure}</span> — {hero.map.caption}
        </span>
        <span className="flex flex-wrap gap-x-5 gap-y-1" aria-hidden="true">
          <span className="inline-flex items-center gap-2">
            <svg width="22" height="6"><line x1="0" y1="3" x2="22" y2="3" stroke="var(--color-navy)" strokeWidth="1.6" /></svg>
            {hero.map.legend.sea}
          </span>
          <span className="inline-flex items-center gap-2">
            <svg width="22" height="6"><line x1="1" y1="3" x2="22" y2="3" stroke="var(--color-navy)" strokeWidth="1.4" strokeDasharray="2 4" strokeLinecap="round" /></svg>
            {hero.map.legend.air}
          </span>
          <span className="inline-flex items-center gap-2">
            <svg width="14" height="8" viewBox="-9 -4 19 8"><path d="M-9 -4 L5 -4 L10 0 L5 4 L-9 4 Z" fill="var(--color-accent)" /></svg>
            {hero.map.legend.vessel}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
