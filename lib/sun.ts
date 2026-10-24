// Self-contained so it can be inlined into the <head> script as a string.
// NOAA approximation of sunrise/sunset for Suva (18.14°S, 178.44°E).
export function suvaIsDay(now: number): boolean {
  const lat = -18.14;
  const lon = 178.44;
  const r = Math.PI / 180;
  const d = new Date(now);
  const n = (now - Date.UTC(d.getUTCFullYear(), 0, 0)) / 864e5;
  const g = ((2 * Math.PI) / 365) * (n - 1);
  const eqt =
    229.18 *
    (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
  const decl =
    0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) - 0.006758 * Math.cos(2 * g) +
    0.000907 * Math.sin(2 * g) - 0.002697 * Math.cos(3 * g) + 0.00148 * Math.sin(3 * g);
  const ha = Math.acos(Math.cos(90.833 * r) / (Math.cos(lat * r) * Math.cos(decl)) - Math.tan(lat * r) * Math.tan(decl)) / r;
  const norm = (x: number) => ((x % 1440) + 1440) % 1440;
  const rise = norm(720 - 4 * (lon + ha) - eqt);
  const set = norm(720 - 4 * (lon - ha) - eqt);
  const m = d.getUTCHours() * 60 + d.getUTCMinutes();
  return rise < set ? m >= rise && m < set : m >= rise || m < set;
}

