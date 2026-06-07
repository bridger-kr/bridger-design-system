#!/usr/bin/env node
/* ============================================================
   gen-tokens.mjs — parse tokens/*.css → figma/bridger-tokens.tokens.json
   Deterministic. Resolves color-mix(... N%, transparent) → rgba(),
   and clamp() display sizes → fixed px midpoints (Figma has no clamp).
   Run: node figma/scripts/gen-tokens.mjs   (from repo root)
============================================================ */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..', '..');
const TOKENS_DIR = resolve(ROOT, 'tokens');
const OUT = resolve(ROOT, 'figma', 'bridger-tokens.tokens.json');

// ---- tiny CSS custom-property extractor -----------------------------------
// Extracts `--name: value;` pairs from a given :root-ish block of text.
function extractVars(css) {
  const out = {};
  const re = /--([\w-]+)\s*:\s*([^;]+);/g;
  let m;
  while ((m = re.exec(css)) !== null) out[m[1].trim()] = m[2].trim();
  return out;
}

// Split colors.css into light (:root) and dark blocks.
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
function splitColorBlocks(css) {
  const blocks = topLevelBlocks(css);
  const darkBlock = blocks.find((b) => /\[data-theme=['"]dark['"]\]|\.dark/.test(b.selector));
  const lightBlock = blocks.find((b) => b !== darkBlock && /:root/.test(b.selector));
  return {
    light: extractVars(lightBlock ? lightBlock.body : ''),
    dark: extractVars(darkBlock ? darkBlock.body : ''),
  };
}

const HEX = {}; // resolved hex per var name, per theme (filled below)

function hexToRgbArr(hex) {
  const h = hex.replace('#', '');
  const n = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  return [parseInt(n.slice(0, 2), 16), parseInt(n.slice(2, 4), 16), parseInt(n.slice(4, 6), 16)];
}

// Resolve a value that may be a hex, a var(), or color-mix over transparent.
function resolveColor(val, theme, vars) {
  val = val.replace(/\/\*.*?\*\//g, '').trim();
  if (val.startsWith('#')) return val;
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
    const [r, g, b] = hexToRgbArr(base);
    return `rgba(${r},${g},${b},${round(pct)})`;
  }
  return val; // gradient or unknown -> passthrough (filtered out for variables)
}
const round = (n) => Math.round(n * 100) / 100;

// Map raw CSS var names -> grouped JSON structure.
const COLOR_GROUPS = {
  surface: ['paper', 'surface', 'surface-raised', 'surface-sunken', 'surface-muted'],
  ink: ['ink', 'ink-strong', 'muted', 'muted-strong'],
  border: ['border', 'border-strong'],
  accent: ['accent', 'accent-strong', 'accent-bright', 'accent-ink', 'accent-soft'],
  status: ['cobalt', 'lime', 'success', 'warning', 'danger', 'info'],
  tint: ['tint-accent', 'tint-cobalt', 'tint-success', 'tint-warning', 'tint-danger', 'tint-muted'],
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
  const colorsCss = readFileSync(resolve(TOKENS_DIR, 'colors.css'), 'utf8');
  const spacingCss = readFileSync(resolve(TOKENS_DIR, 'spacing.css'), 'utf8');
  const typoCss = readFileSync(resolve(TOKENS_DIR, 'typography.css'), 'utf8');

  const { light, dark } = splitColorBlocks(colorsCss);

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
      regular: { $value: '400' }, semibold: { $value: '600' }, bold: { $value: '700' },
    },
    fontSize: { $type: 'fontSizes' },
    lineHeight: { $type: 'lineHeights' },
    letterSpacing: { $type: 'letterSpacing', base: { $value: '0%' } },
    typography: { $type: 'typography' },
    boxShadow: { $type: 'boxShadow' },
  };

  // spacing 1..8 + radius
  const sp = extractVars(spacingCss);
  for (let i = 1; i <= 8; i += 1) {
    if (sp[`dt-space-${i}`]) out.spacing[String(i)] = { $value: px(sp[`dt-space-${i}`]) };
  }
  const radiusMap = { sm: 'sm', md: 'md', lg: 'lg', xl: 'xl', '2xl': '2xl', full: 'full' };
  for (const k in radiusMap) {
    const v = sp[`dt-radius-${k}`];
    if (v) out.radius[k] = { $value: v.includes('9999') ? '9999px' : px(v) };
  }

  // fonts + sizes from typography.css
  const ty = extractVars(typoCss);
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
    small: px(ty['dt-small-size']), mono: px(ty['dt-mono-size']),
  };
  for (const k in sizes) out.fontSize[k] = { $value: sizes[k] };

  const leads = {
    h1: ty['dt-h1-leading'], h2: ty['dt-h2-leading'], h3: ty['dt-h3-leading'],
    body: ty['dt-body-leading'], small: ty['dt-small-leading'], mono: ty['dt-mono-leading'],
  };
  for (const k in leads) out.lineHeight[k] = { $value: leads[k] };

  const tracks = {
    h1: ty['dt-h1-tracking'], h2: ty['dt-h2-tracking'], h3: ty['dt-h3-tracking'],
  };
  const pctTrack = (em) => `${round(parseFloat(em) * 100)}%`;
  for (const k in tracks) if (tracks[k]) out.letterSpacing[k] = { $value: pctTrack(tracks[k]) };

  // composite typography
  const weightRef = { h1: 'bold', h2: 'bold', h3: 'semibold', body: 'regular', small: 'regular', mono: 'regular' };
  const famRef = { h1: 'sans', h2: 'sans', h3: 'sans', body: 'sans', small: 'sans', mono: 'mono' };
  for (const k of ['h1', 'h2', 'h3', 'body', 'small', 'mono']) {
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

  // shadows from spacing.css light block
  const shadowDefs = {
    sm: '0 1px 2px rgba(24,22,18,0.05)',
    md: '0 2px 6px rgba(24,22,18,0.07)',
    lg: '0 6px 16px rgba(24,22,18,0.10)',
    xl: '0 12px 30px rgba(24,22,18,0.14)',
  };
  for (const k in shadowDefs) {
    const m = shadowDefs[k].match(/(\d+) (\d+)px (\d+)px (rgba\([^)]+\))/);
    out.boxShadow[k] = {
      $value: { x: '0', y: m[2], blur: m[3], spread: '0', color: m[4], type: 'dropShadow' },
    };
  }

  writeFileSync(OUT, JSON.stringify(out, null, 2) + '\n');
  const colorCount = Object.values(out.color.light).reduce(
    (n, g) => n + (typeof g === 'object' ? Object.keys(g).filter((x) => x !== '$type').length : 0), 0);
  console.log(`✓ wrote ${OUT}`);
  console.log(`  colors(light): ${colorCount}, spacing: ${Object.keys(out.spacing).length - 1}, typography: 6`);
}

main();
