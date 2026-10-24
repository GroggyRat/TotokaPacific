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
  scene?: "wharf" | "plain";
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
