import { readFileSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

/**
 * EDD-230 — WCAG AA gate for the v2 color contract.
 *
 * Parses packages/tokens/css/contract.css directly (the canonical source),
 * resolves hex / oklch() / var() / color-mix(...) to sRGB, and asserts every
 * real text-on-surface pairing used by the system reaches 4.5:1.
 */

const contractPath = new URL('../packages/tokens/css/contract.css', import.meta.url);
const contractCss = readFileSync(contractPath, 'utf8');

// ---------- contract parsing ------------------------------------------------

function topLevelBlocks(css: string): { selector: string; body: string }[] {
  const noComments = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const blocks: { selector: string; body: string }[] = [];
  const re = /([^{}]+)\{([^{}]*)\}/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(noComments)) !== null) {
    blocks.push({ selector: m[1].trim(), body: m[2] });
  }
  return blocks;
}

function extractVars(body: string): Map<string, string> {
  const vars = new Map<string, string>();
  const re = /(--dt-[\w-]+)\s*:\s*([^;]+);/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(body)) !== null) vars.set(m[1], m[2].trim());
  return vars;
}

const blocks = topLevelBlocks(contractCss);
const darkBlock = blocks.find((b) => /\[data-theme=['"]dark['"]|\.dark/.test(b.selector));
const lightBlock = blocks.find((b) => b !== darkBlock && /:root/.test(b.selector));
if (!lightBlock || !darkBlock) throw new Error('contract.css theme blocks not found');

const lightVars = extractVars(lightBlock.body);
const darkVars = extractVars(darkBlock.body);

// ---------- color resolution -------------------------------------------------

type Rgba = [number, number, number, number];

function hexToRgba(hex: string): Rgba {
  const h = hex.replace('#', '');
  const n = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  return [
    parseInt(n.slice(0, 2), 16),
    parseInt(n.slice(2, 4), 16),
    parseInt(n.slice(4, 6), 16),
    1,
  ];
}

function oklchToRgba(val: string): Rgba | null {
  const m = val.match(
    /^oklch\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+%?))?\s*\)$/,
  );
  if (!m) return null;
  const L = parseFloat(m[1]);
  const C = parseFloat(m[2]);
  const H = (parseFloat(m[3]) * Math.PI) / 180;
  let A = m[4] == null ? 1 : parseFloat(m[4]);
  if (m[4]?.endsWith('%')) A /= 100;
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
  return [enc(lin[0]), enc(lin[1]), enc(lin[2]), A];
}

/** Resolve a contract value to sRGB. Returns null for non-colors (gradients etc.). */
function resolveColor(raw: string, vars: Map<string, string>, depth = 0): Rgba | null {
  if (depth > 8) return null;
  const val = raw.replace(/\/\*.*?\*\//g, '').trim();
  if (val.startsWith('#')) return hexToRgba(val);
  if (val.startsWith('oklch(')) return oklchToRgba(val);
  const varRef = val.match(/^var\(--([\w-]+)\)$/);
  if (varRef) {
    const target = vars.get(`--${varRef[1]}`);
    return target ? resolveColor(target, vars, depth + 1) : null;
  }
  // color-mix(in srgb, <color> N%, transparent) — alpha-scaled overlay
  const mixTransparent = val.match(
    /color-mix\(in srgb,\s*([^,]+?)\s+([\d.]+)%\s*,\s*transparent\)/,
  );
  if (mixTransparent) {
    const base = resolveColor(mixTransparent[1], vars, depth + 1);
    if (!base) return null;
    return [base[0], base[1], base[2], base[3] * (parseFloat(mixTransparent[2]) / 100)];
  }
  // color-mix(in srgb, <a> N%, <b>) — weighted blend
  const mixTwo = val.match(/color-mix\(in srgb,\s*([^,]+?)\s+([\d.]+)%\s*,\s*([^)]+)\)/);
  if (mixTwo) {
    const a = resolveColor(mixTwo[1], vars, depth + 1);
    const b = resolveColor(mixTwo[3], vars, depth + 1);
    if (!a || !b) return null;
    const p = parseFloat(mixTwo[2]) / 100;
    return [a[0] * p + b[0] * (1 - p), a[1] * p + b[1] * (1 - p), a[2] * p + b[2] * (1 - p), 1];
  }
  return null;
}

function token(name: string, vars: Map<string, string>): Rgba {
  const raw = vars.get(`--dt-${name}`);
  if (raw == null) throw new Error(`--dt-${name} missing from contract.css`);
  const color = resolveColor(raw, vars);
  if (!color) throw new Error(`--dt-${name} (${raw}) did not resolve to a color`);
  return color;
}

/** Flatten an alpha color over an opaque background. */
function composite(fg: Rgba, bg: Rgba): Rgba {
  const a = fg[3] + bg[3] * (1 - fg[3]);
  if (a === 0) return [0, 0, 0, 0];
  return [
    (fg[0] * fg[3] + bg[0] * bg[3] * (1 - fg[3])) / a,
    (fg[1] * fg[3] + bg[1] * bg[3] * (1 - fg[3])) / a,
    (fg[2] * fg[3] + bg[2] * bg[3] * (1 - fg[3])) / a,
    a,
  ];
}

// ---------- WCAG math --------------------------------------------------------

const chan = (v: number) => {
  const c = v / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};
const luminance = (c: Rgba) => 0.2126 * chan(c[0]) + 0.7152 * chan(c[1]) + 0.0722 * chan(c[2]);
function contrast(fg: Rgba, bg: Rgba): number {
  const flat = fg[3] < 1 ? composite(fg, bg) : fg;
  const l1 = luminance(flat);
  const l2 = luminance(bg);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

/** sRGB -> oklch hue angle (degrees). */
function hueOf(c: Rgba): number {
  const r = chan(c[0]);
  const g = chan(c[1]);
  const b = chan(c[2]);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  const deg = (Math.atan2(B, A) * 180) / Math.PI;
  return deg < 0 ? deg + 360 : deg;
}
const hueDistance = (a: number, b: number) => {
  const d = Math.abs(a - b) % 360;
  return Math.min(d, 360 - d);
};

// ---------- assertions -------------------------------------------------------

const SURFACES = ['bg', 'surface', 'surface-raised', 'surface-muted', 'surface-sunken'] as const;

describe('EDD-230 token contrast (WCAG AA)', () => {
  for (const [themeName, vars] of [
    ['light', lightVars],
    ['dark', darkVars],
  ] as const) {
    describe(`${themeName} theme`, () => {
      it('primary, strong, and muted text reach 4.5:1 on every surface', () => {
        for (const textRole of ['text', 'text-strong', 'text-muted'] as const) {
          const fg = token(textRole, vars);
          for (const surface of SURFACES) {
            const bg = token(surface, vars);
            const ratio = contrast(fg, bg);
            expect(
              ratio,
              `${textRole} on ${surface}: ${ratio.toFixed(2)}:1`,
            ).toBeGreaterThanOrEqual(4.5);
          }
        }
      });

      it('subtle text reaches 4.5:1 on standard surfaces and stays legible on washes', () => {
        const fg = token('text-subtle', vars);
        for (const surface of ['bg', 'surface', 'surface-raised'] as const) {
          const ratio = contrast(fg, token(surface, vars));
          expect(ratio, `text-subtle on ${surface}: ${ratio.toFixed(2)}:1`).toBeGreaterThanOrEqual(4.5);
        }
        // On muted/sunken washes the AA-on-everything role is --dt-text-muted;
        // subtle there is the bounded >=3:1 exception documented in the contract.
        for (const surface of ['surface-muted', 'surface-sunken'] as const) {
          const ratio = contrast(fg, token(surface, vars));
          expect(ratio, `text-subtle on ${surface}: ${ratio.toFixed(2)}:1`).toBeGreaterThanOrEqual(3.0);
        }
      });

      it('accent text roles reach 4.5:1 on every surface', () => {
        for (const role of ['accent-text', 'accent-strong'] as const) {
          const fg = token(role, vars);
          for (const surface of SURFACES) {
            const ratio = contrast(fg, token(surface, vars));
            expect(ratio, `${role} on ${surface}: ${ratio.toFixed(2)}:1`).toBeGreaterThanOrEqual(4.5);
          }
        }
      });

      it('status text reaches 4.5:1 on its own tint over bg, surface, and sunken', () => {
        const pairs: [string, string][] = [
          ['accent-text', 'tint-accent'],
          ['cobalt', 'tint-cobalt'],
          ['success', 'tint-success'],
          ['warning', 'tint-warning'],
          ['danger', 'tint-danger'],
        ];
        for (const [textRole, tintRole] of pairs) {
          const fg = token(textRole, vars);
          const tint = token(tintRole, vars);
          for (const surface of ['bg', 'surface', 'surface-sunken'] as const) {
            const underlay = token(surface, vars);
            const bg = composite(tint, underlay);
            const ratio = contrast(fg, bg);
            expect(
              ratio,
              `${textRole} on ${tintRole} over ${surface}: ${ratio.toFixed(2)}:1`,
            ).toBeGreaterThanOrEqual(4.5);
          }
        }
      });

      it('primary action and code surfaces reach 4.5:1', () => {
        // .btn-primary { background: text-strong; color: surface }
        expect(contrast(token('surface', vars), token('text-strong', vars))).toBeGreaterThanOrEqual(4.5);
        // code panel
        expect(contrast(token('code-ink', vars), token('code-bg', vars))).toBeGreaterThanOrEqual(4.5);
      });

      it('placeholder is a de-emphasis role: lighter than subtle in light, darker in dark', () => {
        if (themeName === 'light') {
          expect(luminance(token('text-placeholder', vars))).toBeGreaterThan(
            luminance(token('text-subtle', vars)),
          );
        } else {
          expect(luminance(token('text-placeholder', vars))).toBeLessThan(
            luminance(token('text-subtle', vars)),
          );
        }
      });

      it('status hues differ from the brand accent; warning is unambiguously not brand', () => {
        const accent = token('accent', vars);
        const accentHue = hueOf(accent);
        // EDD-230 bug: dark --dt-status-warning was literally #ec5e1f (the brand).
        const warningDistance = hueDistance(hueOf(token('warning', vars)), accentHue);
        expect(warningDistance).toBeGreaterThan(25);
        // Danger is a warm red near persimmon by design — same family, but it
        // must remain a distinctly darker/different color, not the accent itself.
        for (const role of ['warning', 'success', 'danger', 'info'] as const) {
          const color = token(role, vars);
          const d = hueDistance(hueOf(color), accentHue);
          const sameRgb = color[0] === accent[0] && color[1] === accent[1] && color[2] === accent[2];
          expect(sameRgb, `${role} resolves to the accent color`).toBe(false);
          expect(d, `${role} hue distance from accent: ${d.toFixed(1)}°`).toBeGreaterThan(8);
        }
      });
    });
  }

  it('info, success, warning, danger keep the same hue across themes', () => {
    for (const role of ['cobalt', 'success', 'warning', 'danger'] as const) {
      const lh = hueOf(token(role, lightVars));
      const dh = hueOf(token(role, darkVars));
      const d = hueDistance(lh, dh);
      expect(d, `${role}: light ${lh.toFixed(1)}° vs dark ${dh.toFixed(1)}°`).toBeLessThanOrEqual(10);
    }
    // --dt-info resolves to the same cobalt in each theme
    expect(token('info', lightVars)).toEqual(token('cobalt', lightVars));
    expect(token('info', darkVars)).toEqual(token('cobalt', darkVars));
  });

  it('neutral ramp is achromatic (no warm tint) in both themes', () => {
    const neutralRoles = [
      'bg',
      'surface',
      'surface-raised',
      'surface-muted',
      'surface-sunken',
      'text',
      'text-strong',
      'text-subtle',
      'text-muted',
      'text-placeholder',
      'border',
      'border-strong',
    ] as const;
    for (const vars of [lightVars, darkVars]) {
      for (const role of neutralRoles) {
        const [r, g, b] = token(role, vars);
        const spread = Math.max(r, g, b) - Math.min(r, g, b);
        expect(spread, `${role} channel spread ${spread}`).toBeLessThanOrEqual(2);
      }
    }
  });

  it('removed tokens stay removed from the contract and exports', () => {
    for (const dead of ['--dt-lime', '--dt-alert-ink', '--dt-status-danger']) {
      expect(contractCss.includes(dead), `${dead} still in contract.css`).toBe(false);
    }
    expect(contractCss.includes('#256b5a')).toBe(false);
    for (const vars of [lightVars, darkVars]) {
      for (const name of ['lime', 'alert-ink', 'status-danger']) {
        expect(vars.has(`--dt-${name}`)).toBe(false);
      }
    }
  });
});
