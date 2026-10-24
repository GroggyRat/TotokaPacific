// Line-drawn stand-ins for photos, in the theme's colours.
// Each is replaced by a real photo when its `src` is set in content/site.ts.
import type { Shot } from "@/content/site";

const S = {
  fill: "none",
  stroke: "var(--color-fg)",
  strokeOpacity: 0.32,
  strokeWidth: 1,
  vectorEffect: "non-scaling-stroke" as const,
};

function Ship() {
  const boxes = [];
  for (let y = 120; y < 380; y += 24) for (let x = 160; x < 240; x += 20) boxes.push(<rect key={`${x}-${y}`} x={x} y={y} width="17" height="21" />);
  return (
    <>
      <g {...S} strokeOpacity={0.12}>
        {Array.from({ length: 22 }, (_, i) => (
          <path key={i} d={`M0 ${i * 24 + 6} q 25 -5 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0`} />
        ))}
      </g>
      <g {...S}>
        <path d="M200 40 C238 70 250 110 250 150 L250 440 L150 440 L150 150 C150 110 162 70 200 40 Z" />
        <rect x="160" y="395" width="80" height="34" />
        {boxes}
        <path d="M150 440 L104 520 M250 440 L296 520 M175 440 L160 520 M225 440 L240 520" strokeOpacity={0.18} />
      </g>
    </>
  );
}

function Cranes() {
  return (
    <>
      <circle cx="292" cy="300" r="46" fill="none" stroke="var(--color-accent)" strokeOpacity={0.8} vectorEffect="non-scaling-stroke" />
      <rect x="0" y="300" width="400" height="200" fill="var(--color-ground-3)" />
      <g {...S}>
        <path d="M0 300 L400 300" />
        {[40, 170].map((x) => (
          <g key={x}>
            <path d={`M${x} 300 L${x} 120 M${x + 70} 300 L${x + 70} 120 M${x} 200 L${x + 70} 200 M${x} 200 L${x + 70} 120 M${x - 40} 120 L${x + 150} 120 M${x + 35} 120 L${x + 35} 80 L${x + 150} 120 M${x + 35} 80 L${x - 40} 120`} />
            <path d={`M${x + 100} 120 L${x + 100} 170 M${x + 90} 170 h20 v10 h-20 z`} />
          </g>
        ))}
        {[0, 1, 2].map((r) =>
          Array.from({ length: 9 }, (_, i) => <rect key={`${r}-${i}`} x={i * 46 - 6 + (r % 2) * 18} y={300 + r * 34} width="44" height="32" />),
        )}
      </g>
    </>
  );
}

function Containers() {
  return (
    <g {...S}>
      <defs>
        <pattern id="ribs" width="8" height="10" patternUnits="userSpaceOnUse">
          <path d="M4 0 V10" stroke="var(--color-fg)" strokeOpacity="0.14" />
        </pattern>
      </defs>
      {Array.from({ length: 9 }, (_, r) =>
        Array.from({ length: 3 }, (_, c) => {
          const x = c * 140 - ((r % 2) * 50) - 10;
          const y = 470 - (r + 1) * 52;
          return (
            <g key={`${r}-${c}`}>
              <rect x={x} y={y} width="134" height="48" fill="url(#ribs)" />
              <path d={`M${x + 112} ${y + 4} V${y + 44} M${x + 120} ${y + 4} V${y + 44}`} />
            </g>
          );
        }),
      )}
      <path d="M0 470 H400" />
    </g>
  );
}

function Coast() {
  return (
    <g {...S}>
      <path d="M0 150 H400" />
      <path d="M0 150 C40 120 70 96 110 104 C140 110 160 84 190 92 C220 100 240 128 280 132 C320 136 360 120 400 140" />
      <path d="M220 150 C250 138 270 140 300 150" strokeOpacity={0.2} />
      {Array.from({ length: 12 }, (_, i) => (
        <path key={i} d={`M${-20 + (i % 3) * 30} ${180 + i * 18} q 40 -6 80 0 t 80 0 t 80 0 t 80 0 t 80 0`} strokeOpacity={0.14 + i * 0.01} />
      ))}
      <path d="M0 330 C60 300 120 320 170 300 C230 276 300 300 400 280" strokeDasharray="2 6" strokeOpacity={0.45} />
      <path d="M0 500 L0 420 C80 400 160 430 240 410 C300 396 350 400 400 380 L400 500" />
    </g>
  );
}

function Docs() {
  return (
    <>
      <g {...S}>
        <rect x="70" y="90" width="230" height="300" transform="rotate(-6 185 240)" />
        <rect x="95" y="110" width="230" height="300" transform="rotate(3 210 260)" />
        {Array.from({ length: 11 }, (_, i) => (
          <path key={i} d={`M125 ${160 + i * 20} H${i % 3 === 2 ? 240 : 295}`} transform="rotate(3 210 260)" strokeOpacity={0.22} />
        ))}
        <path d="M125 135 H215" transform="rotate(3 210 260)" strokeOpacity={0.5} />
      </g>
      <g transform="rotate(-14 270 360)">
        <circle cx="270" cy="360" r="46" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        <circle cx="270" cy="360" r="38" fill="none" stroke="var(--color-accent)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <text x="270" y="365" textAnchor="middle" fill="var(--color-accent)" style={{ font: "600 15px var(--font-sans)", letterSpacing: "0.18em" }}>
          CLEARED
        </text>
      </g>
    </>
  );
}

function Pallets() {
  return (
    <g {...S}>
      {[20, 210].map((x) => (
        <g key={x}>
          <path d={`M${x} 40 V470 M${x + 170} 40 V470`} />
          {[150, 300, 450].map((y) => (
            <g key={y}>
              <path d={`M${x} ${y} H${x + 170}`} />
              {[0, 1].map((k) => (
                <g key={k}>
                  <rect x={x + 10 + k * 80} y={y - 96} width="70" height="88" />
                  <path d={`M${x + 10 + k * 80} ${y - 70} h70 M${x + 10 + k * 80} ${y - 40} h70`} strokeOpacity={0.15} />
                  <path d={`M${x + 6 + k * 80} ${y - 8} h78`} />
                </g>
              ))}
            </g>
          ))}
        </g>
      ))}
    </g>
  );
}

function Portrait() {
  return (
    <g {...S}>
      {Array.from({ length: 14 }, (_, i) => (
        <path key={i} d={`M${i * 30} 0 V500`} strokeOpacity={0.07} />
      ))}
      <ellipse cx="200" cy="200" rx="68" ry="84" />
      <path d="M60 500 C60 380 130 320 200 320 C270 320 340 380 340 500" />
      <path d="M170 300 C175 320 225 320 230 300" strokeOpacity={0.2} />
    </g>
  );
}

export function Scene({ scene }: { scene: Shot["scene"] }) {
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      {scene === "ship" && <Ship />}
      {scene === "cranes" && <Cranes />}
      {scene === "containers" && <Containers />}
      {scene === "coast" && <Coast />}
      {scene === "docs" && <Docs />}
      {scene === "pallets" && <Pallets />}
      {scene === "portrait" && <Portrait />}
    </svg>
  );
}
