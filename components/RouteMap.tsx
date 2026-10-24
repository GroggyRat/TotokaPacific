"use client";

import { motion, useReducedMotion } from "framer-motion";
import { hero, mapLanes, type MapLane } from "@/content/site";

// Hand-drawn equirectangular map of the south-west Pacific.
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

type Pt = [number, number];

function control(a: Pt, b: Pt, bend: number): Pt {
  const mx = (a[0] + b[0]) / 2;
  const my = (a[1] + b[1]) / 2;
  return [mx - (b[1] - a[1]) * bend, my + (b[0] - a[0]) * bend];
}

function laneGeom(l: MapLane) {
  const end = l.exit ? P(l.exit.lon, l.exit.lat) : P(l.lon, l.lat);
  // With `via`, pick the control point so the curve passes through it.
  const c: Pt = l.exit?.via
    ? [2 * px(l.exit.via[0]) - (SUVA[0] + end[0]) / 2, 2 * py(l.exit.via[1]) - (SUVA[1] + end[1]) / 2]
    : control(SUVA, end, l.bend);
  return { end, c, d: `M${SUVA[0]} ${SUVA[1]} Q${c[0]} ${c[1]} ${end[0]} ${end[1]}` };
}

function quadAt(a: Pt, c: Pt, b: Pt, t: number): Pt {
  const u = 1 - t;
  return [u * u * a[0] + 2 * u * t * c[0] + t * t * b[0], u * u * a[1] + 2 * u * t * c[1] + t * t * b[1]];
}

const HULL = "M-10 -4.5 L6 -4.5 L11 0 L6 4.5 L-10 4.5 Z";

export function RouteMap() {
  const reduce = useReducedMotion();
  const usa = laneGeom(mapLanes.find((l) => l.name === "USA")!);
  const parked = quadAt(SUVA, usa.c, usa.end, 0.42);

  const summary = `Map of sea lanes from Fiji to ${mapLanes.map((l) => l.name).join(", ")}.`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full text-navy" role="img" aria-label={summary}>
      <style>{`
        .m-name{font:600 21px var(--font-display);fill:var(--color-charcoal)}
        .m-place{font:400 15px var(--font-sans);fill:var(--color-mute)}
        .m-fiji{font:700 30px var(--font-display);fill:var(--color-navy)}
        @media (max-width:640px){
          .m-name{font-size:38px}
          .m-fiji{font-size:48px}
          .m-place,.m-minor{display:none}
        }
      `}</style>
      <defs>
        <clipPath id="map-clip">
          <rect width={W} height={H} />
        </clipPath>
      </defs>

      <g clipPath="url(#map-clip)">
        <g fill="var(--color-paper-2)">
          {LAND.map((d, i) => (
            <path key={i} d={d} />
          ))}
          {ISLETS.map(([lo, la, rx, ry, rot], i) => (
            <ellipse key={i} cx={px(lo)} cy={py(la)} rx={rx + 1} ry={ry + 1} transform={`rotate(${rot} ${px(lo)} ${py(la)})`} />
          ))}
        </g>

        <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          {mapLanes.map((l, i) => (
            <motion.path
              key={l.name}
              d={laneGeom(l).d}
              initial={reduce ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, delay: 0.2 + i * 0.1, ease: [0.4, 0, 0.2, 1] }}
            />
          ))}
        </g>

        {mapLanes.map((l, i) => {
          const { end } = laneGeom(l);
          const [x, y] = end;
          const left = l.label === "l";
          const dy = l.dy ?? 0;
          const tx = l.exit ? x + 18 : left ? x - 14 : x + 14;
          const anchor = l.exit || !left ? "start" : "end";
          return (
            <motion.g
              key={l.name}
              className={l.minor ? "m-minor" : undefined}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.1 + i * 0.1 }}
              aria-hidden="true"
            >
              {l.exit ? (
                <path d={`M${x + 12} ${y - 7} L${x + 1} ${y} L${x + 12} ${y + 7}`} fill="none" stroke="currentColor" strokeWidth="2.2" />
              ) : (
                <circle cx={x} cy={y} r="5" fill="var(--color-paper)" stroke="currentColor" strokeWidth="2.2" />
              )}
              <text x={tx} y={y + dy + 2} textAnchor={anchor} className="m-name">
                {l.name}
              </text>
              <text x={tx} y={y + dy + 21} textAnchor={anchor} className="m-place">
                {l.exit ? `${l.place}, ${hero.map.offChart}` : l.place}
              </text>
            </motion.g>
          );
        })}

        <g aria-hidden="true">
          <circle cx={SUVA[0]} cy={SUVA[1]} r="8" fill="currentColor" />
          <text x={SUVA[0] + 6} y={SUVA[1] + 46} className="m-fiji">
            Fiji
          </text>
        </g>

        <g aria-hidden="true">
          {reduce ? (
            <path d={HULL} fill="var(--color-accent)" transform={`translate(${parked[0]} ${parked[1]}) rotate(-38)`} />
          ) : (
            <path d={HULL} fill="var(--color-accent)" opacity="0">
              <set attributeName="opacity" to="1" begin="2s" />
              <animateMotion dur="16s" begin="2s" repeatCount="indefinite" rotate="auto" path={usa.d} />
            </path>
          )}
        </g>
      </g>
    </svg>
  );
}
