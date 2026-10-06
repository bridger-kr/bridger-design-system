import { readFileSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

/**
 * DS #44 — dark-mode contract parity.
 *
 * The contract follows `prefers-color-scheme` by default and lets an explicit
 * `:root[data-theme='light'|'dark']` win. Themed colors are single light-dark()
 * definitions on :root; the overlay shadow is restated under the OS-dark media
 * query and the explicit dark selector, so the two must never drift.
 */

const contractCss = readFileSync(new URL('../css/contract.css', import.meta.url), 'utf8');
const css = contractCss.replace(/\/\*[\s\S]*?\*\//g, '');

// ---------- contract parsing ------------------------------------------------

function blockBody(needle: string): string {
  const selectorIndex = css.indexOf(needle);
  expect(selectorIndex, `missing ${needle} in contract.css`).toBeGreaterThanOrEqual(0);
  const open = css.indexOf('{', selectorIndex);
  let depth = 0;
  for (let index = open; index < css.length; index += 1) {
    if (css[index] === '{') depth += 1;
    else if (css[index] === '}') {
      depth -= 1;
      if (depth === 0) return css.slice(open + 1, index);
    }
  }
  throw new Error(`unclosed block after ${needle}`);
}

function varsOf(body: string): Map<string, string> {
  const vars = new Map<string, string>();
  for (const match of body.matchAll(/(--dt-[\w-]+)\s*:\s*([^;]+);/g)) {
    vars.set(match[1], match[2].replace(/\s+/g, ' ').trim());
  }
  return vars;
}

function splitLightDark(value: string): [string, string] | null {
  const match = value.match(/^\s*light-dark\(\s*([\s\S]*?)\s*\)\s*$/);
  if (!match) return null;
  const inner = match[1];
  let depth = 0;
  for (let index = 0; index < inner.length; index += 1) {
    const char = inner[index];
    if (char === '(') depth += 1;
    else if (char === ')') depth -= 1;
    else if (char === ',' && depth === 0) {
      return [inner.slice(0, index).trim(), inner.slice(index + 1).trim()];
    }
  }
  return null;
}

const rootVars = varsOf(blockBody(':root {'));
const explicitLight = blockBody(":root[data-theme='light']");
const explicitDarkBody = blockBody(":root[data-theme='dark']");
const explicitDark = varsOf(explicitDarkBody);
const mediaDarkBody = blockBody('@media (prefers-color-scheme: dark)');
const mediaDark = varsOf(mediaDarkBody);

// ---------- color resolution (hex + oklch arms only) -------------------------

type Rgba = [number, number, number, number];

function hexToRgba(hex: string): Rgba | null {
  const h = hex.replace('#', '');
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
    1,
  ];
}

function oklchToRgba(val: string): Rgba | null {
  const m = val.match(/^oklch\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+)\s*\)$/);
  if (!m) return null;
  const L = parseFloat(m[1]);
  const C = parseFloat(m[2]);
  const H = (parseFloat(m[3]) * Math.PI) / 180;
  const a = C * Math.cos(H);
  const b = C * Math.sin(H);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3;
  const mm = m_ ** 3;
  const s = s_ ** 3;
  const lin = [
    4.0767416621 * l - 3.3077115913 * mm + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * mm - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * mm + 1.707614701 * s,
  ];
  const enc = (c: number) => {
    const cl = Math.max(0, Math.min(1, c));
    return Math.round((cl <= 0.0031308 ? 12.92 * cl : 1.055 * cl ** (1 / 2.4) - 0.055) * 255);
  };
  return [enc(lin[0]), enc(lin[1]), enc(lin[2]), 1];
}

function themeColor(name: string, theme: 'light' | 'dark'): Rgba {
  const raw = explicitDark.get(name) ?? rootVars.get(name);
  if (raw == null) throw new Error(`${name} missing from contract.css`);
  const arms = splitLightDark(raw);
  const themed = arms ? arms[theme === 'light' ? 0 : 1] : raw;
  const color = hexToRgba(themed) ?? oklchToRgba(themed);
  if (!color) throw new Error(`${name} (${themed}) is not a plain color — extend the resolver`);
  return color;
}

const channel = (v: number) => {
  const c = v / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};
const luminance = (c: Rgba) => 0.2126 * channel(c[0]) + 0.7152 * channel(c[1]) + 0.0722 * channel(c[2]);
const contrast = (fg: Rgba, bg: Rgba) =>
  (Math.max(luminance(fg), luminance(bg)) + 0.05) / (Math.min(luminance(fg), luminance(bg)) + 0.05);

// ---------- assertions -------------------------------------------------------

describe('theme contract (DS #44)', () => {
  it('follows the OS by default and lets an explicit choice win', () => {
    // :root opts into both schemes; prefers-color-scheme resolves light-dark()
    // with no JavaScript involved.
    expect(blockBody(':root {')).toContain('color-scheme: light dark');
    expect(css).toContain("@media (prefers-color-scheme: dark)");
    expect(mediaDarkBody).toContain(":root:not([data-theme='light'])");

    // Explicit selectors pin color-scheme; they restate no token values.
    expect(explicitLight).toContain('color-scheme: light');
    expect(varsOf(explicitLight).size).toBe(0);
    expect(explicitDarkBody).toContain('color-scheme: dark');

    // .dark stays as a deprecated alias for the same dark scope.
    expect(css).toContain('.dark');
    expect(contractCss).toContain('@deprecated');
    expect(contractCss).not.toContain('explicit user choice');
  });

  it('keeps OS-dark and explicit-dark overrides identical', () => {
    expect(explicitDark.size, 'explicit dark block should only carry overrides').toBeGreaterThan(0);
    for (const name of explicitDark.keys()) {
      expect(name, `${name} is a non-color themed token outside the shadow`).toBe('--dt-shadow-overlay');
    }
    expect([...mediaDark.entries()].sort()).toEqual([...explicitDark.entries()].sort());
  });

  it('keeps light and dark key sets identical', () => {
    // Colors are single light-dark() definitions on :root, so both themes expose
    // the same key set by construction; explicit overrides must name :root vars.
    for (const name of explicitDark.keys()) {
      expect(rootVars.has(name), `${name} is overridden without a :root default`).toBe(true);
    }
    for (const [name, value] of rootVars) {
      const arms = splitLightDark(value);
      if (!arms) continue;
      expect(arms[0], `${name} arms must differ`).not.toBe(arms[1]);
      expect(arms[0].length, `${name} light arm is empty`).toBeGreaterThan(0);
      expect(arms[1].length, `${name} dark arm is empty`).toBeGreaterThan(0);
    }
  });

  it('keeps body, secondary, and accent text at 4.5:1 or better in both themes', () => {
    // The exhaustive WCAG AA gate (every pairing incl. tinted badges) lives in
    // tests/contrast.test.ts; this is the theme-axis smoke check for the roles
    // DS #44 calls out — body/secondary text and --dt-accent-text (EDD-230).
    const pairs: [string, string][] = [
      ['--dt-text', '--dt-bg'],
      ['--dt-text', '--dt-surface'],
      ['--dt-text-strong', '--dt-bg'],
      ['--dt-text-subtle', '--dt-surface'],
      ['--dt-text-muted', '--dt-surface-sunken'],
      ['--dt-accent-text', '--dt-bg'],
      ['--dt-accent-text', '--dt-surface'],
    ];
    for (const theme of ['light', 'dark'] as const) {
      for (const [textRole, surfaceRole] of pairs) {
        const ratio = contrast(themeColor(textRole, theme), themeColor(surfaceRole, theme));
        expect(ratio, `${theme} ${textRole} on ${surfaceRole}: ${ratio.toFixed(2)}:1`).toBeGreaterThanOrEqual(4.5);
      }
    }
  });
});
