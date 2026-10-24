import Image from "next/image";

// Photo slot. Pass `src` (a file in /public) to show a real photo.
// Without `src`, a flat stand-in scene is drawn so the layout reads correctly.
export function Photo({
  src,
  alt,
  note,
  scene = "plain",
  className = "",
  priority = false,
  sizes = "100vw",
}: {
  src?: string;
  alt: string;
  note: string;
  scene?: "wharf" | "coast" | "warehouse" | "portrait" | "plain";
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden bg-paper-2 ${className}`}>
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
      </div>
    );
  }
  return (
    <div className={`relative overflow-hidden bg-paper-2 ${className}`} role="img" aria-label={alt}>
      {scene === "wharf" && <WharfScene />}
      {scene === "coast" && <CoastScene />}
      {scene === "warehouse" && <WarehouseScene />}
      {scene === "portrait" && <PortraitScene />}
      <span className="absolute bottom-0 left-0 bg-paper px-2.5 py-1.5 font-mono text-[0.7rem] text-mute">
        {note} — placeholder
      </span>
    </div>
  );
}

// Seeded so server and client render the same scene.
function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
}

const BOX = ["#8a4b35", "#3d5566", "#6b7d6a", "#b08a52", "#2f3a4c", "#97958e", "#7d3f33", "#4f6b78"];

function stacks(seed: number, x0: number, x1: number, base: number, w: number, h: number, maxH: number) {
  const r = rng(seed);
  const out: { x: number; y: number; w: number; h: number; c: string }[] = [];
  let x = x0;
  while (x < x1) {
    const n = 1 + Math.floor(r() * maxH);
    const bw = r() > 0.7 ? w / 2 : w;
    for (let i = 0; i < n; i++) {
      out.push({ x, y: base - (i + 1) * h, w: bw - 3, h: h - 2, c: BOX[Math.floor(r() * BOX.length)] });
    }
    x += bw + (r() > 0.85 ? w * 0.6 : 0);
  }
  return out;
}

function WharfScene() {
  const back = stacks(7, 40, 1120, 520, 92, 38, 3);
  const front = stacks(42, -20, 1060, 640, 140, 56, 4);
  const shipBoxes = stacks(19, 120, 620, 418, 34, 15, 2);
  return (
    <svg viewBox="0 0 1600 700" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <pattern id="rib" width="7" height="10" patternUnits="userSpaceOnUse">
          <line x1="0.5" y1="0" x2="0.5" y2="10" stroke="#000" strokeOpacity="0.16" />
        </pattern>
      </defs>
      <rect width="1600" height="700" fill="#dddad2" />
      {/* Hills of Viti Levu */}
      <path
        d="M0 392 L120 352 L260 366 L380 322 L520 346 L640 300 L760 336 L900 312 L1040 352 L1180 326 L1320 360 L1460 340 L1600 368 L1600 420 L0 420 Z"
        fill="#b7bcb8"
      />
      <path d="M0 404 L180 384 L330 396 L520 378 L700 398 L880 380 L1100 396 L1300 384 L1600 400 L1600 420 L0 420 Z" fill="#a4aca8" />
      {/* Harbour */}
      <rect y="410" width="1600" height="62" fill="#9fabab" />
      {/* Ship at berth */}
      <path d="M90 418 L680 418 L660 452 L120 452 Z" fill="#2f3a4c" />
      <rect x="600" y="384" width="46" height="34" fill="#e9e7e1" />
      <rect x="610" y="370" width="26" height="14" fill="#e9e7e1" />
      {shipBoxes.map((b, i) => (
        <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} fill={b.c} />
      ))}
      {/* Wharf apron */}
      <rect y="470" width="1600" height="230" fill="#8f8b83" />
      <rect y="470" width="1600" height="4" fill="#5c5953" />
      <rect y="652" width="1600" height="3" fill="#a5a199" />
      {[back, front].map((row, k) => (
        <g key={k}>
          {row.map((b, i) => (
            <g key={i}>
              <rect x={b.x} y={b.y} width={b.w} height={b.h} fill={b.c} />
              <rect x={b.x} y={b.y} width={b.w} height={b.h} fill="url(#rib)" />
            </g>
          ))}
        </g>
      ))}
      {/* Gantry crane */}
      <g stroke="#2b2d30" strokeWidth="9" fill="none" strokeLinecap="square">
        <path d="M1240 650 L1240 210 M1430 650 L1430 210" />
        <path d="M1240 330 L1430 330 M1240 470 L1430 470" strokeWidth="6" />
        <path d="M1240 330 L1430 470 M1430 330 L1240 470" strokeWidth="3" />
        <path d="M1060 205 L1600 205" strokeWidth="11" />
        <path d="M1290 205 L1335 120 L1380 205 M1335 120 L1110 205 M1335 120 L1560 205" strokeWidth="3" />
      </g>
      <rect x="1300" y="212" width="58" height="26" fill="#2b2d30" />
      <path d="M1316 238 L1316 300 M1342 238 L1342 300" stroke="#2b2d30" strokeWidth="2" />
      <rect x="1296" y="300" width="66" height="26" fill="#b08a52" />
    </svg>
  );
}

function CoastScene() {
  return (
    <svg viewBox="0 0 900 1100" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <rect width="900" height="1100" fill="#dfddd6" />
      <path d="M0 470 L90 440 L170 452 L260 410 L330 430 L420 396 L500 428 L600 418 L700 446 L820 430 L900 448 L900 520 L0 520 Z" fill="#b5bbb7" />
      <rect y="500" width="900" height="380" fill="#9eaeae" />
      <rect y="560" width="900" height="6" fill="#b3c0bf" />
      <rect y="640" width="900" height="4" fill="#b3c0bf" />
      <rect y="760" width="900" height="8" fill="#b3c0bf" />
      {/* Ships at anchor */}
      <path d="M140 540 L330 540 L318 556 L152 556 Z" fill="#2f3a4c" />
      <rect x="290" y="522" width="24" height="18" fill="#e9e7e1" />
      <rect x="170" y="530" width="20" height="10" fill="#8a4b35" />
      <rect x="192" y="530" width="20" height="10" fill="#3d5566" />
      <rect x="214" y="530" width="20" height="10" fill="#b08a52" />
      <path d="M560 600 L700 600 L692 612 L568 612 Z" fill="#3d5566" />
      <rect x="668" y="588" width="18" height="12" fill="#e9e7e1" />
      {/* Sea wall and shore */}
      <path d="M0 880 L900 840 L900 1100 L0 1100 Z" fill="#cfc6b1" />
      <path d="M0 880 L900 840 L900 856 L0 896 Z" fill="#8f8b83" />
    </svg>
  );
}

function WarehouseScene() {
  const r = rng(11);
  const cols = [40, 290, 540];
  return (
    <svg viewBox="0 0 800 1000" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <rect width="800" height="1000" fill="#d9d6ce" />
      <rect y="860" width="800" height="140" fill="#a8a49b" />
      <rect y="900" width="800" height="3" fill="#d8b24a" />
      {cols.map((x) => (
        <g key={x}>
          {[180, 400, 620, 840].map((y) => (
            <g key={y}>
              <rect x={x} y={y} width="220" height="10" fill="#7d6a52" />
              {y < 840 &&
                [0, 1].map((k) => {
                  const h = 120 + Math.floor(r() * 70);
                  const tone = ["#b9a27a", "#c9b48e", "#a98f63", "#d7d2c6"][Math.floor(r() * 4)];
                  return (
                    <g key={k}>
                      <rect x={x + 8 + k * 106} y={y + 200 - h - 14} width="96" height={h} fill={tone} />
                      <rect x={x + 8 + k * 106} y={y + 200 - h - 14} width="96" height={h} fill="url(#wrap)" />
                      <rect x={x + 4 + k * 106} y={y + 186} width="104" height="14" fill="#8c6f4a" />
                    </g>
                  );
                })}
            </g>
          ))}
          <rect x={x} y="160" width="10" height="700" fill="#2f3a4c" />
          <rect x={x + 210} y="160" width="10" height="700" fill="#2f3a4c" />
        </g>
      ))}
      <defs>
        <pattern id="wrap" width="12" height="12" patternUnits="userSpaceOnUse">
          <line x1="0" y1="11.5" x2="12" y2="11.5" stroke="#000" strokeOpacity="0.08" />
        </pattern>
      </defs>
    </svg>
  );
}

function PortraitScene() {
  return (
    <svg viewBox="0 0 800 1000" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <rect width="800" height="1000" fill="#d6d2c8" />
      <rect x="0" y="0" width="260" height="1000" fill="#cdc8bc" />
      <circle cx="400" cy="400" r="150" fill="#9b968c" />
      <path d="M130 1000 C130 760 250 640 400 640 C550 640 670 760 670 1000 Z" fill="#8a857b" />
    </svg>
  );
}
