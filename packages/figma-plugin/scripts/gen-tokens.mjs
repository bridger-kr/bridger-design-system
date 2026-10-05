#!/usr/bin/env node
/* ============================================================
   gen-tokens.mjs — parse the canonical contract → packages/figma-plugin/bridger-tokens.tokens.json
   Deterministic. Resolves color-mix(... N%, transparent) → rgba(),
   and clamp() display sizes → fixed px midpoints (Figma has no clamp).
   Run: node packages/figma-plugin/scripts/gen-tokens.mjs   (from repo root)
============================================================ */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..', '..', '..');
const CONTRACT = resolve(ROOT, 'packages', 'tokens', 'css', 'contract.css');
const OUT = resolve(ROOT, 'packages', 'figma-plugin', 'bridger-tokens.tokens.json');

// ---- tiny CSS custom-property extractor -----------------------------------
// Extracts `--name: value;` pairs from a given :root-ish block of text.
function extractVars(css) {
  const out = {};
  const re = /--([\w-]+)\s*:\s*([^;]+);/g;
  let m;
  while ((m = re.exec(css)) !== null) out[m[1].trim()] = m[2].trim();
  return out;
}

// Split the contract into light (:root) and dark blocks.
// Strip comments first so selectors mentioned in prose don't false-match,
// then pull each top-level { ... } block by walking braces. The dark block is
// the one whose selector text contains data-theme='dark' or .dark.
function topLevelBlocks(css) {
  const noComments = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const blocks = [];
  const re = /([^{}]+)\{([^{}]*)\}/g; // selector { body } — token files have no nesting
  let m;
  while ((m = re.exec(noComments)) !== null) {
    blocks.push({ selector: m[1].trim(), body: m[2] });
  }
  return blocks;
}

// Themed colors are single light-dark(<light>, <dark>) definitions on :root
// (DS #44); resolve one arm per theme. Nested functions (color-mix) carry
// commas, so split at paren depth 0.
function splitLightDark(value) {
  const m = value.match(/^\s*light-dark\(\s*([\s\S]*?)\s*\)\s*$/);
  if (!m) return null;
  const inner = m[1];
  let depth = 0;
  for (let i = 0; i < inner.length; i += 1) {
    const ch = inner[i];
    if (ch === '(') depth += 1;
    else if (ch === ')') depth -= 1;
    else if (ch === ',' && depth === 0) {
      return [inner.slice(0, i).trim(), inner.slice(i + 1).trim()];
    }
  }
  return null;
}
function themedVars(body, theme) {
  const out = {};
  for (const [name, value] of Object.entries(extractVars(body))) {
    const arms = splitLightDark(value);
    out[name] = arms ? arms[theme === 'light' ? 0 : 1] : value;
  }
  return out;
}
function splitColorBlocks(css) {
  const blocks = topLevelBlocks(css);
  const darkBlock = blocks.find((b) => /\[data-theme=['"]dark['"]\]|\.dark/.test(b.selector));
  const lightBlock = blocks.find((b) => b !== darkBlock && /:root/.test(b.selector));
  return {
    light: themedVars(lightBlock ? lightBlock.body : '', 'light'),
    dark: { ...themedVars(lightBlock ? lightBlock.body : '', 'dark'), ...extractVars(darkBlock ? darkBlock.body : '') },
  };
}

function hexToRgbArr(hex) {
  const h = hex.replace('#', '');
  const n = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  return [parseInt(n.slice(0, 2), 16), parseInt(n.slice(2, 4), 16), parseInt(n.slice(4, 6), 16)];
}

// oklch(L C H [/ A]) -> [r,g,b,a] in sRGB (0-255 / 0-1), Bjorn Ottosson matrices
function oklchToSrgb(val) {
  const m = val.match(/^oklch\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+%?))?\s*\)$/);
  if (!m) return null;
  const L = parseFloat(m[1]), C = parseFloat(m[2]), H = (parseFloat(m[3]) * Math.PI) / 180;
  let A = m[4] == null ? 1 : parseFloat(m[4]);
  if (m[4] && m[4].endsWith('%')) A /= 100;
  const a = C * Math.cos(H), b = C * Math.sin(H);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3, mm = m_ ** 3, s = s_ ** 3;
  const lin = [
    4.0767416621 * l - 3.3077115913 * mm + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * mm - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * mm + 1.707614701 * s,
  ];
  const enc = (c) => {
    c = Math.max(0, Math.min(1, c));
    return Math.round((c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055) * 255);
  };
  return [enc(lin[0]), enc(lin[1]), enc(lin[2]), A];
}

function rgbToHex([r, g, b]) {
  const h = (n) => n.toString(16).padStart(2, '0');
  return `#${h(r)}${h(g)}${h(b)}`;
}

// Resolve a value that may be a hex, oklch(), a var(), or color-mix over transparent.
function resolveColor(val, theme, vars) {
  val = val.replace(/\/\*.*?\*\//g, '').trim();
  if (val.startsWith('#')) return val;
  if (val.startsWith('oklch(')) {
    const rgba = oklchToSrgb(val);
    if (!rgba) return val;
    return rgba[3] >= 1 ? rgbToHex(rgba) : `rgba(${rgba[0]},${rgba[1]},${rgba[2]},${round(rgba[3])})`;
  }
  // var(--x)
  const varRef = val.match(/^var\(--([\w-]+)\)$/);
  if (varRef) return resolveColor(vars[varRef[1]], theme, vars);
  // color-mix(in srgb, <color> N%, transparent)
  const mix = val.match(/color-mix\(in srgb,\s*([^,]+?)\s+([\d.]+)%\s*,\s*transparent\)/);
  if (mix) {
    let base = mix[1].trim();
    const pct = parseFloat(mix[2]) / 100;
    const baseRef = base.match(/^var\(--([\w-]+)\)$/);
    if (baseRef) base = resolveColor(vars[baseRef[1]], theme, vars);
    else if (base.startsWith('oklch(') || base.startsWith('#')) base = resolveColor(base, theme, vars);
    const rgbaMatch = base.match(/^rgba\((\d+),(\d+),(\d+),([\d.]+)\)$/);
    if (rgbaMatch) {
      return `rgba(${rgbaMatch[1]},${rgbaMatch[2]},${rgbaMatch[3]},${round(parseFloat(rgbaMatch[4]) * pct)})`;
    }
    const [r, g, b] = hexToRgbArr(base);
    return `rgba(${r},${g},${b},${round(pct)})`;
  }
  return val; // gradient or unknown -> passthrough (filtered out for variables)
}
const round = (n) => Math.round(n * 100) / 100;

// Map raw CSS var names -> grouped JSON structure.
const COLOR_GROUPS = {
  surface: ['bg', 'surface', 'surface-raised', 'surface-sunken', 'surface-muted'],
  text: ['text', 'text-strong', 'text-subtle', 'text-muted', 'text-placeholder'],
  border: ['border', 'border-strong'],
  accent: ['accent', 'accent-text', 'accent-strong', 'accent-bright', 'accent-ink', 'accent-soft'],
  status: ['cobalt', 'success', 'warning', 'danger', 'info'],
  tint: ['tint-accent', 'tint-cobalt', 'tint-success', 'tint-warning', 'tint-danger', 'tint-text'],
  code: ['code-bg', 'code-ink', 'code-border'],
};

function buildColorTheme(vars) {
  const theme = {};
  for (const group in COLOR_GROUPS) {
    theme[group] = {};
    if (group !== 'surface') theme[group] = {}; // keep order
  }
  // assign $type per group
  const result = {};
  for (const group in COLOR_GROUPS) {
    result[group] = { };
    for (const name of COLOR_GROUPS[group]) {
      const raw = vars[`dt-${name}`];
      if (raw == null) continue;
      result[group][name] = { $value: resolveColor(raw, null, prefixed(vars)) };
    }
  }
  // $type at theme root
  return { $type: 'color', ...result };
}

// vars are stored without the dt- prefix lookup convenience
function prefixed(vars) {
  // resolveColor expects keys WITHOUT 'dt-' when following var(--dt-x)?  Actually
  // CSS uses var(--dt-accent); our vars map keys are 'dt-accent'. Provide both.
  const m = {};
  for (const k in vars) { m[k] = vars[k]; }
  return m;
}

// ---- number/typography parsing --------------------------------------------
const px = (s) => `${parseFloat(s)}px`;

function main() {
  const contractCss = readFileSync(CONTRACT, 'utf8');

  const { light, dark: darkOverrides } = splitColorBlocks(contractCss);
  // The dark block only overrides what changes; resolve the full dark palette.
  const dark = { ...light, ...darkOverrides };

  const out = {
    $schema: 'https://schemas.tokens.studio/latest/tokens-schema.json',
    color: {
      light: buildColorTheme(light),
      dark: buildColorTheme(dark),
    },
    spacing: { $type: 'spacing' },
    radius: { $type: 'borderRadius' },
    fontFamily: { $type: 'fontFamilies' },
    fontWeight: {
      $type: 'fontWeights',
      regular: { $value: '400' }, medium: { $value: '500' }, semibold: { $value: '600' },
    },
    fontSize: { $type: 'fontSizes' },
    lineHeight: { $type: 'lineHeights' },
    letterSpacing: { $type: 'letterSpacing', base: { $value: '0%' } },
    typography: { $type: 'typography' },
    boxShadow: { $type: 'boxShadow' },
  };

  // spacing 1..8 + px-named fill steps + radius
  const sp = light;
  for (const i of [1, 2, 3, 4, 5, 6, 7, 8, 12, 32]) {
    if (sp[`dt-space-${i}`]) out.spacing[String(i)] = { $value: px(sp[`dt-space-${i}`]) };
  }
  const resolveRef = (v) => {
    const ref = v && v.match(/^var\(--([\w-]+)\)$/);
    return ref ? sp[ref[1]] : v;
  };
  const radiusMap = {
    chip: 'chip', control: 'control', card: 'card', pill: 'pill',
    sm: 'sm', md: 'md', lg: 'lg',
  };
  for (const k in radiusMap) {
    const v = resolveRef(sp[`dt-radius-${k}`]);
    if (v) out.radius[k] = { $value: px(v) };
  }

  // fonts + sizes from the canonical light contract
  const ty = light;
  out.fontFamily.sans = { $value: 'Pretendard Variable' };
  out.fontFamily.mono = { $value: 'JetBrains Mono' };

  // clamp() -> fixed midpoint for display sizes
  const clampMid = (raw) => {
    const m = raw.match(/clamp\(\s*([\d.]+)px[^,]*,[^,]*,\s*([\d.]+)px/);
    if (m) return `${Math.round((parseFloat(m[1]) + parseFloat(m[2])) / 2)}px`;
    return px(raw);
  };
  const sizes = {
    h1: clampMid(ty['dt-h1-size']), h2: clampMid(ty['dt-h2-size']),
    h3: px(ty['dt-h3-size']), body: px(ty['dt-body-size']),
    label: px(ty['dt-label-size']), small: px(ty['dt-small-size']),
    caption: px(ty['dt-caption-size']), mono: px(ty['dt-mono-size']),
  };
  for (const k in sizes) out.fontSize[k] = { $value: sizes[k] };

  const leads = {
    h1: ty['dt-h1-leading'], h2: ty['dt-h2-leading'], h3: ty['dt-h3-leading'],
    body: ty['dt-body-leading'], label: ty['dt-label-leading'],
    small: ty['dt-small-leading'], caption: ty['dt-caption-leading'],
    mono: ty['dt-mono-leading'],
  };
  for (const k in leads) out.lineHeight[k] = { $value: leads[k] };

  const tracks = {
    h1: ty['dt-h1-tracking'], h2: ty['dt-h2-tracking'],
  };
  const pctTrack = (em) => `${round(parseFloat(em) * 100)}%`;
  for (const k in tracks) if (tracks[k]) out.letterSpacing[k] = { $value: pctTrack(tracks[k]) };

  // composite typography
  const weightRef = { h1: 'semibold', h2: 'semibold', h3: 'semibold', body: 'regular', label: 'regular', small: 'regular', caption: 'regular', mono: 'regular' };
  const famRef = { h1: 'sans', h2: 'sans', h3: 'sans', body: 'sans', label: 'sans', small: 'sans', caption: 'sans', mono: 'mono' };
  for (const k of ['h1', 'h2', 'h3', 'body', 'label', 'small', 'caption', 'mono']) {
    out.typography[k] = {
      $value: {
        fontFamily: `{fontFamily.${famRef[k]}}`,
        fontWeight: `{fontWeight.${weightRef[k]}}`,
        fontSize: `{fontSize.${k}}`,
        lineHeight: `{lineHeight.${k}}`,
        letterSpacing: out.letterSpacing[k] ? `{letterSpacing.${k}}` : '{letterSpacing.base}',
      },
    };
  }

  // single overlay shadow: emit the drop layer of --dt-shadow-overlay
  const overlayRaw = light['dt-shadow-overlay'] || '0 8px 24px rgba(24,22,18,0.1)';
  const m = overlayRaw.match(/(-?\d+)(?:px)?\s+(-?\d+)px\s+(-?\d+)px\s+(rgba?\([^)]+\))/);
  out.boxShadow.overlay = {
    $value: { x: m[1], y: m[2], blur: m[3], spread: '0', color: m[4], type: 'dropShadow' },
  };

  writeFileSync(OUT, JSON.stringify(out, null, 2) + '\n');
  const colorCount = Object.values(out.color.light).reduce(
    (n, g) => n + (typeof g === 'object' ? Object.keys(g).filter((x) => x !== '$type').length : 0), 0);
  console.log(`✓ wrote ${OUT}`);
  console.log(`  colors(light): ${colorCount}, spacing: ${Object.keys(out.spacing).length - 1}, typography: ${Object.keys(out.typography).length - 1}`);
}

main();
