"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import type { Line2 } from "three-stdlib";
import { globe } from "@/content/site";
import { heroState } from "@/lib/heroState";

const D2R = Math.PI / 180;
const SEG = 72;
const GOLD = new THREE.Color("#e0a458");
const BONE = new THREE.Color("#eee8dd");

function ll(lat: number, lon: number, r = 1) {
  const phi = (90 - lat) * D2R;
  const theta = (lon + 180) * D2R;
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
}

// Great-circle arc lifted off the surface; higher for longer routes.
function arcPoints(a: THREE.Vector3, b: THREE.Vector3) {
  const ang = a.angleTo(b);
  const h = 0.03 + 0.34 * (ang / Math.PI);
  const s = Math.sin(ang);
  return Array.from({ length: SEG + 1 }, (_, i) => {
    const t = i / SEG;
    const v = a.clone().multiplyScalar(Math.sin((1 - t) * ang) / s).add(b.clone().multiplyScalar(Math.sin(t * ang) / s));
    return v.multiplyScalar(1.004 + h * Math.sin(Math.PI * t));
  });
}

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const dotsVert = /* glsl */ `
  uniform float uSize;
  uniform float uOpacity;
  uniform vec3 uOrigin;
  varying float vAlpha;
  varying float vNear;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vec3 n = normalize(normalMatrix * position);
    float facing = dot(n, normalize(-mv.xyz));
    vAlpha = smoothstep(0.0, 0.45, facing) * uOpacity;
    vNear = 1.0 - smoothstep(0.0, 0.16, distance(position, uOrigin));
    gl_PointSize = min(uSize / -mv.z, uSize * 0.9);
    gl_Position = projectionMatrix * mv;
  }
`;
const dotsFrag = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uGold;
  varying float vAlpha;
  varying float vNear;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    if (dot(c, c) > 0.25) discard;
    gl_FragColor = vec4(mix(uColor, uGold, vNear), vAlpha * mix(0.55, 1.0, vNear));
  }
`;
const glowVert = /* glsl */ `
  uniform float uSize;
  attribute float aAlpha;
  varying float vAlpha;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vAlpha = aAlpha;
    gl_PointSize = uSize / -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;
const glowFrag = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    float a = pow(max(0.0, 1.0 - d), 2.2);
    gl_FragColor = vec4(mix(uColor, vec3(1.0), a * 0.6), a * vAlpha);
  }
`;
const atmoVert = /* glsl */ `
  varying vec3 vN;
  void main() {
    vN = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const atmoFrag = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vN;
  void main() {
    float i = pow(max(0.0, 0.62 - dot(vN, vec3(0.0, 0.0, 1.0))), 4.0);
    gl_FragColor = vec4(vec3(0.56, 0.65, 0.77), i * uOpacity);
  }
`;

function Scene({ low, onReady }: { low: boolean; onReady: () => void }) {
  const { camera, size, gl } = useThree();
  const aim = useRef<THREE.Group>(null);
  const outer = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const [dots, setDots] = useState<THREE.BufferGeometry | null>(null);
  const lines = useRef<(Line2 | null)[]>([]);
  const ring = useRef<THREE.Mesh>(null);
  const readyFired = useRef(false);

  const origin = useMemo(() => ll(globe.origin.lat, globe.origin.lon), []);
  const arcs = useMemo(() => globe.destinations.map((d) => arcPoints(origin, ll(d.lat, d.lon))), [origin]);

  // Orientation that puts Fiji facing the camera, north up.
  const base = useMemo(() => {
    const yaw = -Math.atan2(origin.x, origin.z);
    const after = origin.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw);
    return { yaw, pitch: Math.atan2(after.y, after.z) + 0.06 };
  }, [origin]);

  // Land dots, fetched after first paint.
  useEffect(() => {
    let alive = true;
    fetch(new URL("data/land-dots.bin", document.baseURI))
      .then((r) => r.arrayBuffer())
      .then((buf) => {
        if (!alive) return;
        const ints = new Int16Array(buf);
        const every = low ? 2 : 1; // phones draw half the dots
        const pos: number[] = [];
        for (let i = 0; i < ints.length; i += 2 * every) {
          const v = ll(ints[i] / 100, ints[i + 1] / 100, 1.001);
          pos.push(v.x, v.y, v.z);
        }
        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
        setDots(g);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [low]);

  const dpr = gl.getPixelRatio();
  const dotMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: dotsVert,
        fragmentShader: dotsFrag,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uSize: { value: (low ? 5.2 : 4.6) * dpr },
          uOpacity: { value: 1 },
          uColor: { value: BONE },
          uGold: { value: GOLD },
          uOrigin: { value: origin.clone().multiplyScalar(1.001) },
        },
      }),
    [dpr, low, origin],
  );

  const PULSES = 2;
  const pulseGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const n = arcs.length * PULSES + 1;
    g.setAttribute("position", new THREE.Float32BufferAttribute(new Float32Array(n * 3), 3));
    g.setAttribute("aAlpha", new THREE.Float32BufferAttribute(new Float32Array(n), 1));
    return g;
  }, [arcs.length]);
  const pulseMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: glowVert,
        fragmentShader: glowFrag,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uSize: { value: 30 * dpr }, uColor: { value: GOLD } },
      }),
    [dpr],
  );
  const atmoMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: atmoVert,
        fragmentShader: atmoFrag,
        transparent: true,
        depthWrite: false,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        uniforms: { uOpacity: { value: 0.5 } },
      }),
    [],
  );

  const ringQuat = useMemo(
    () => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), origin.clone().normalize()),
    [origin],
  );

  const tmp = useMemo(() => new THREE.Vector3(), []);
  const sway = useRef(0);
  const tilt = useRef({ x: 0, y: 0 });

  useFrame((_, delta) => {
    const t = performance.now() / 1000;
    const p = heroState.scroll;
    const e = easeInOut(p);
    const aspect = size.width / size.height;
    const wide = aspect >= 1;

    // Framing: globe to the right on wide screens. On tall screens the globe
    // is 1.25× the screen width, centred at 38% of the height.
    const TAN = Math.tan((35 / 2) * D2R);
    const camZ = wide ? 3.3 : Math.sqrt(1 + Math.pow(1 / (TAN * 1.25 * aspect), 2));
    const offX = wide ? 0.62 : 0;
    const offY = wide ? -0.18 : 0.24 * TAN * camZ;
    camera.position.z = lerp(camZ, 1.16, e);
    camera.updateProjectionMatrix();

    if (aim.current && outer.current && inner.current) {
      // Point Fiji straight at the camera even when the globe sits off-centre.
      const gx = lerp(offX, 0, e);
      const gy = lerp(offY, 0, e);
      aim.current.position.set(gx, gy, 0);
      const dz = camera.position.z;
      const len = Math.hypot(gx, gy, dz);
      aim.current.rotation.set(Math.asin(gy / len), Math.atan2(-gx, dz), 0, "YXZ");
      // Slow auto-rotate around Fiji, drag offset that eases home, pointer tilt.
      if (!heroState.dragging) heroState.drag *= Math.pow(0.12, delta);
      sway.current = Math.sin(t * 0.09) * 0.14;
      const k = 1 - e;
      tilt.current.x = lerp(tilt.current.x, heroState.pointer.y * 0.12, 1 - Math.pow(0.02, delta));
      tilt.current.y = lerp(tilt.current.y, heroState.pointer.x * 0.16, 1 - Math.pow(0.02, delta));
      inner.current.rotation.y = base.yaw + (sway.current + heroState.drag + tilt.current.y) * k;
      outer.current.rotation.x = base.pitch + tilt.current.x * k;
    }

    // Dissolve as the camera reaches Fiji.
    const fade = 1 - smooth(0.55, 0.92, p);
    dotMat.uniforms.uOpacity.value = fade;
    atmoMat.uniforms.uOpacity.value = 0.5 * fade;

    // Arcs draw out after the intro, staggered.
    const since = heroState.introAt < 0 ? -1 : t - heroState.introAt;
    const pos = pulseGeo.attributes.position as THREE.BufferAttribute;
    const alpha = pulseGeo.attributes.aAlpha as THREE.BufferAttribute;
    arcs.forEach((pts, i) => {
      const prog = since < 0 ? 0 : smooth(0, 1, (since - 0.35 - i * 0.11) / 1.5);
      const line = lines.current[i];
      if (line) {
        (line.geometry as THREE.InstancedBufferGeometry).instanceCount = Math.floor(prog * SEG);
        (line.material as THREE.Material & { opacity: number }).opacity = 0.85 * fade;
      }
      for (let j = 0; j < PULSES; j++) {
        const u = (t * (0.16 + (i % 3) * 0.03) + i * 0.37 + j / PULSES) % 1;
        const f = u * SEG;
        const a = Math.floor(f);
        tmp.copy(pts[a]).lerp(pts[Math.min(SEG, a + 1)], f - a);
        const idx = i * PULSES + j;
        pos.setXYZ(idx, tmp.x, tmp.y, tmp.z);
        alpha.setX(idx, prog >= 1 ? Math.sin(Math.PI * u) * fade : 0);
      }
    });
    // Origin glow
    const o = arcs.length * PULSES;
    pos.setXYZ(o, origin.x * 1.006, origin.y * 1.006, origin.z * 1.006);
    alpha.setX(o, (0.75 + 0.25 * Math.sin(t * 2.4)) * Math.max(fade, 0.0) * (since < 0 ? 0.4 : 1));
    pos.needsUpdate = true;
    alpha.needsUpdate = true;

    if (ring.current) {
      const r = (t * 0.55) % 1;
      ring.current.scale.setScalar(1 + r * 3.2);
      (ring.current.material as THREE.MeshBasicMaterial).opacity = (1 - r) * 0.8 * fade;
    }

    if (dots && !readyFired.current) {
      readyFired.current = true;
      // If the intro already played before WebGL arrived, draw arcs from now.
      if (heroState.introAt > 0) heroState.introAt = Math.max(heroState.introAt, t);
      requestAnimationFrame(onReady);
    }
  });

  return (
    <group ref={aim}>
    <group ref={outer}>
      <group ref={inner}>
        <mesh>
          <sphereGeometry args={[0.996, low ? 48 : 72, low ? 48 : 72]} />
          <meshBasicMaterial color="#0b1524" />
        </mesh>
        <mesh scale={1.1} material={atmoMat}>
          <sphereGeometry args={[1, 48, 48]} />
        </mesh>
        {dots && <points geometry={dots} material={dotMat} />}
        {arcs.map((pts, i) => (
          <Line
            key={i}
            ref={(l) => {
              lines.current[i] = l as unknown as Line2 | null;
            }}
            points={pts}
            color="#e0a458"
            lineWidth={low ? 1.1 : 1.35}
            transparent
            opacity={0.85}
            depthWrite={false}
          />
        ))}
        <points geometry={pulseGeo} material={pulseMat} frustumCulled={false} />
        <mesh ref={ring} position={origin.clone().multiplyScalar(1.003)} quaternion={ringQuat}>
          <ringGeometry args={[0.018, 0.021, 48]} />
          <meshBasicMaterial color="#e0a458" transparent depthWrite={false} />
        </mesh>
      </group>
    </group>
    </group>
  );
}

export default function Globe({ active, low, onReady }: { active: boolean; low: boolean; onReady: () => void }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={low ? [1, 1.25] : [1, 1.75]}
      gl={{ antialias: !low, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: 35, position: [0, 0, 3.3], near: 0.01, far: 20 }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Scene low={low} onReady={onReady} />
    </Canvas>
  );
}
