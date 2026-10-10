// Generates src/styles/primitives.css: the 12-step colour scales (--sand-1..12, --rust-*, --teal-*, --orange-*)
// for light and dark, built in OKLCH and checked with APCA + WCAG. Run: node scripts/gen-scales.mjs
//
// Step roles follow Radix Colors: 1-2 backgrounds, 3-5 component states, 6-8 borders, 9-10 solid fills (9 = the brand
// colour), 11 = low-contrast text, 12 = high-contrast text. Anchors below pin the brand colours the site already used,
// so the look does not change; the rest of each ramp is generated. Steps 11/12 are searched until they pass the
// contrast targets against steps 1-2 of the same scale (APCA Lc 60 / 90 and WCAG 4.5 / 7).
import { writeFileSync } from 'node:fs';

// ---------- colour maths ----------
const hex2rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
const toLin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const fromLin = (c) => (c <= 0.0031308 ? c * 12.92 : 1.055 * c ** (1 / 2.4) - 0.055);
function rgb2oklab([r, g, b]) {
  [r, g, b] = [r, g, b].map(toLin);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s];
}
function oklab2lin([L, a, b]) {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3, m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3, s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s];
}
const lch2lab = ([L, C, H]) => [L, C * Math.cos((H * Math.PI) / 180), C * Math.sin((H * Math.PI) / 180)];
const lab2lch = ([L, a, b]) => [L, Math.hypot(a, b), ((Math.atan2(b, a) * 180) / Math.PI + 360) % 360];
const inGamut = (lin) => lin.every((c) => c >= -0.0005 && c <= 1.0005);
const lchToLin = (lch) => oklab2lin(lch2lab(lch));
const lchToRgb = (lch) => lchToLin(lch).map((c) => Math.min(1, Math.max(0, fromLin(Math.min(1, Math.max(0, c))))));
function fit([L, C, H]) { while (C > 0 && !inGamut(lchToLin([L, C, H]))) C -= 0.002; return [L, Math.max(C, 0), H]; }
const hexToLch = (h) => lab2lch(rgb2oklab(hex2rgb(h)));
const css = ([L, C, H]) => `oklch(${L.toFixed(4)} ${C.toFixed(4)} ${C < 0.002 ? 0 : H.toFixed(1)})`;
const toHex = (lch) => '#' + lchToRgb(lch).map((c) => Math.round(c * 255).toString(16).padStart(2, '0')).join('');

// ---------- contrast ----------
const Y = (rgb) => { const [r, g, b] = rgb.map((c) => c ** 2.4); return 0.2126729 * r + 0.7151522 * g + 0.072175 * b; };
function apca(fg, bg) { // returns signed Lc (negative = light text on dark)
  let yt = Y(fg), yb = Y(bg);
  if (yt < 0.022) yt += (0.022 - yt) ** 1.414; if (yb < 0.022) yb += (0.022 - yb) ** 1.414;
  if (yb > yt) { const s = (yb ** 0.56 - yt ** 0.57) * 1.14; return s < 0.1 ? 0 : (s - 0.027) * 100; }
  const s = (yb ** 0.65 - yt ** 0.62) * 1.14; return s > -0.1 ? 0 : (s + 0.027) * 100;
}
const wcag = (a, b) => { const [x, y] = [Y(a) + 0.05, Y(b) + 0.05]; return Math.max(x, y) / Math.min(x, y); };
const passes = (lch, bgLch, lc, ratio) => { const f = lchToRgb(lch), b = lchToRgb(bgLch); return Math.abs(apca(f, b)) >= lc && wcag(f, b) >= ratio; };

// ---------- scales ----------
const lerp = (a, b, t) => a + (b - a) * t;
// Neutral: pinned anchors, the gaps interpolated in OKLab (so they stay on the warm axis).
function neutral(anchors) {
  const labs = Object.fromEntries(Object.entries(anchors).map(([k, v]) => [k, rgb2oklab(hex2rgb(v))]));
  const keys = Object.keys(labs).map(Number).sort((a, b) => a - b), out = {};
  for (let s = 1; s <= 12; s++) {
    if (labs[s]) { out[s] = lab2lch(labs[s]); continue; }
    const lo = Math.max(...keys.filter((k) => k < s)), hi = Math.min(...keys.filter((k) => k > s)), t = (s - lo) / (hi - lo);
    out[s] = lab2lch(labs[lo].map((v, i) => lerp(v, labs[hi][i], t)));
  }
  return out;
}
// Chromatic: step 9 pinned to the brand colour; the rest follows a lightness/chroma ramp at the brand hue.
function chromatic({ hex9, dark, pins = {}, hue, page }) {
  const [L9, C9, H9] = hexToLch(hex9), H = hue ?? H9, out = { 9: [L9, C9, H9] };
  const Ls = dark ? [0.17, 0.205, 0.25, 0.285, 0.32, 0.365, 0.43, 0.51] : [0.985, 0.968, 0.94, 0.915, 0.885, 0.845, 0.79, 0.72];
  const Cf = [0.06, 0.12, 0.25, 0.35, 0.45, 0.55, 0.7, 0.85];
  Ls.forEach((L, i) => (out[i + 1] = fit([L, C9 * Cf[i], H])));
  out[10] = fit([dark ? Math.min(L9 + 0.05, 0.95) : L9 - 0.05, C9 * 0.95, H]);
  for (const [k, v] of Object.entries(pins)) out[k] = hexToLch(v);
  // 11: text. Step toward the extreme until it passes against steps 1 and 2.
  let L = L9; const dir = dark ? 1 : -1;
  for (let i = 0; i < 80; i++) { const c = fit([L, C9 * 0.9, H]); if ([out[1], out[2], ...page].every((b) => passes(c, b, 60, 4.5))) { out[11] = c; break; } L += dir * 0.005; }
  L = out[11][0];
  for (let i = 0; i < 80; i++) { const c = fit([L, C9 * 0.3, H]); if (passes(c, out[2], 90, 7) && page.every((b) => passes(c, b, 90, 7))) { out[12] = c; break; } L += dir * 0.005; }
  return out;
}

const sand = {
  light: neutral({ 1: '#fbf6ec', 2: '#f6efe3', 6: '#d9cdb8', 11: '#6f665a', 12: '#1d1a16' }),
  dark: neutral({ 1: '#16120e', 2: '#1e1913', 6: '#3a3128', 11: '#b9ae9d', 12: '#f1e7d6' }),
};
const pageBgs = { light: [sand.light[1], sand.light[2]], dark: [sand.dark[1], sand.dark[2]] }; // page + card surfaces
const scales = {
  sand,
  rust: { light: chromatic({ hex9: '#b8431a', page: pageBgs.light }), dark: chromatic({ hex9: '#e0824f', dark: true, page: pageBgs.dark }) },
  teal: { light: chromatic({ hex9: '#00ADB5', page: pageBgs.light }), dark: chromatic({ hex9: '#00ADB5', dark: true, page: pageBgs.dark }) },
  orange: {
    light: chromatic({ hex9: '#FF7F11', pins: { 5: '#ffc98a' }, page: pageBgs.light }),
    dark: chromatic({ hex9: '#FF7F11', dark: true, pins: { 5: '#6b4a1d' }, page: pageBgs.dark }),
  },
};
// The logo teal/orange are mid-lightness fills in both themes, so their step 11 text colours must still pass; the
// searches above handle that. Sand's 11 (muted) is an anchor: audit it below.

let cssOut = `/* GENERATED by scripts/gen-scales.mjs: do not edit by hand. Re-run the script after changing an anchor.
   Primitive tier: 12-step scales per hue (Radix roles: 1-2 bg, 3-5 components, 6-8 borders, 9-10 solid, 11-12 text).
   Same variable names in both themes; the values differ. Components never use these directly: tokens.css maps them to roles. */\n`;
const block = (mode) => Object.entries(scales).map(([n, s]) => Object.entries(s[mode]).map(([k, v]) => `  --${n}-${k}:${css(v)};`).join('\n')).join('\n');
cssOut += `:root, :root[data-theme='dark'] {\n${block('dark')}\n}\n:root[data-theme='light'] {\n${block('light')}\n}\n`;
writeFileSync(new URL('../src/styles/primitives.css', import.meta.url), cssOut);

// ---------- audit ----------
const pair = (name, fg, bg) => { const f = lchToRgb(fg), b = lchToRgb(bg); console.log(`${name.padEnd(34)} Lc ${apca(f, b).toFixed(0).padStart(4)}   WCAG ${wcag(f, b).toFixed(2)}`); };
for (const m of ['light', 'dark']) {
  const S = scales.sand[m], R = scales.rust[m], T = scales.teal[m], O = scales.orange[m], bg = m === 'light' ? S[2] : S[1];
  console.log(`\n--- ${m} (bg ${toHex(bg)}) ---`);
  pair('fg   sand-12 on bg', S[12], bg); pair('muted sand-11 on bg', S[11], bg);
  pair('accent rust-9 on bg', R[9], bg); pair('accent-fg rust-11 on bg', R[11], bg);
  pair('teal-11 (text) on bg', T[11], bg); pair('orange-11 on bg', O[11], bg);
  console.log('rust-11', toHex(R[11]), ' teal-11', toHex(T[11]), ' orange-11', toHex(O[11]), ' sand-9', toHex(S[9]));
}
