import { readFileSync } from 'node:fs';

import { describe, expect, expectTypeOf, it } from 'vitest';

import {
  colors,
  cssVarName,
  layers,
  motion,
  radius,
  shadows,
  spacing,
  typography,
} from './index';

type TokenRecord = Record<string, string | number>;

const contractCss = readFileSync(new URL('../css/contract.css', import.meta.url), 'utf8').replace(
  /\/\*[\s\S]*?\*\//g,
  '',
);
const baseCss = readFileSync(new URL('../css/base.css', import.meta.url), 'utf8');
// The .dt-* class vocabulary moved out of base.css into the React package.
const componentsCss = readFileSync(new URL('../../react/src/styles.css', import.meta.url), 'utf8');
const figmaGenerator = readFileSync(
  new URL('../../figma-plugin/scripts/gen-tokens.mjs', import.meta.url),
  'utf8',
);
const rootTokenEntrypoints = ['colors.css', 'spacing.css', 'typography.css'].map((fileName) =>
  readFileSync(new URL(`../../../tokens/${fileName}`, import.meta.url), 'utf8'),
);

function findMatchingBrace(css: string, openIndex: number): number {
  let depth = 0;

  for (let index = openIndex; index < css.length; index += 1) {
    if (css[index] === '{') {
      depth += 1;
      continue;
    }

    if (css[index] === '}') {
      depth -= 1;
      if (depth === 0) {
        return index;
      }
    }
  }

  throw new Error(`Unclosed CSS block near byte ${openIndex}`);
}

function normalizeValue(value: string | number): string {
  return String(value).replace(/\s+/g, ' ').trim();
}

function extractVars(selector: string): Map<string, string> {
  const selectorIndex = contractCss.indexOf(selector);
  if (selectorIndex === -1) {
    throw new Error(`Missing ${selector} in CSS contract`);
  }

  const open = contractCss.indexOf('{', selectorIndex);
  const close = findMatchingBrace(contractCss, open);
  const body = contractCss.slice(open + 1, close);
  const variables = new Map<string, string>();

  for (const match of body.matchAll(/(--dt-[\w-]+)\s*:\s*([\s\S]*?);/g)) {
    expect(variables.has(match[1]), `${selector} declares duplicate ${match[1]}`).toBe(false);
    variables.set(match[1], normalizeValue(match[2]));
  }

  return variables;
}

/** Split `light-dark(<a>, <b>)` into its two arms; null for plain values. */
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
      return [normalizeValue(inner.slice(0, index)), normalizeValue(inner.slice(index + 1))];
    }
  }
  return null;
}

/** Resolve a contract value for one theme: unwraps the matching light-dark() arm. */
function themeValue(value: string | undefined, theme: 'light' | 'dark'): string | undefined {
  if (value == null) return undefined;
  const arms = splitLightDark(value);
  return arms ? arms[theme === 'light' ? 0 : 1] : value;
}

function themedContract(vars: Map<string, string>, theme: 'light' | 'dark'): Map<string, string> {
  const out = new Map<string, string>();
  for (const [name, value] of vars) out.set(name, themeValue(value, theme) ?? value);
  return out;
}

const lightDefaultContract = extractVars(':root');
const darkContract = extractVars(":root[data-theme='dark']");
const lightContract = extractVars(":root[data-theme='light']");
// :root carries single light-dark() definitions; the explicit dark block only
// restates the overlay shadow (light-dark() cannot express non-color values).
const lightThemeContract = themedContract(lightDefaultContract, 'light');
const darkThemeContract = themedContract(lightDefaultContract, 'dark');
for (const [name, value] of darkContract) darkThemeContract.set(name, value);

function hexChannel(value: string): number {
  const parsed = Number.parseInt(value, 16) / 255;
  return parsed <= 0.04045 ? parsed / 12.92 : ((parsed + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string): number {
  const red = hexChannel(hex.slice(1, 3));
  const green = hexChannel(hex.slice(3, 5));
  const blue = hexChannel(hex.slice(5, 7));
  return red * 0.2126 + green * 0.7152 + blue * 0.0722;
}

function contrastRatio(foreground: string, background: string): number {
  const foregroundLuminance = luminance(foreground);
  const backgroundLuminance = luminance(background);
  const lighter = Math.max(foregroundLuminance, backgroundLuminance);
  const darker = Math.min(foregroundLuminance, backgroundLuminance);
  return (lighter + 0.05) / (darker + 0.05);
}

function expectGroupMatchesContract(
  contract: Map<string, string>,
  values: TokenRecord,
  varNames: Record<string, string>,
) {
  const exportedNames = Object.keys(values).sort();

  expect(Object.keys(varNames).sort()).toEqual(exportedNames);

  for (const key of exportedNames) {
    const variableName = varNames[key];
    const expected = contract.get(variableName);

    expect(expected, `${variableName} is missing from contract.css`).toBeDefined();
    expect(normalizeValue(values[key]), `${variableName} drifted from contract.css`).toBe(expected);
  }
}

function typographyValues(): TokenRecord {
  return {
    fontSans: typography.fontFamilies.sans,
    fontMono: typography.fontFamilies.mono,
    tabular: typography.fontFeatures.tabular,
    h1Size: typography.fontSizes.h1,
    h1Leading: typography.lineHeights.h1,
    h1Tracking: typography.letterSpacing.h1,
    h1Weight: typography.fontWeights.h1,
    h2Size: typography.fontSizes.h2,
    h2Leading: typography.lineHeights.h2,
    h2Tracking: typography.letterSpacing.h2,
    h2Weight: typography.fontWeights.h2,
    h3Size: typography.fontSizes.h3,
    h3Leading: typography.lineHeights.h3,
    h3Weight: typography.fontWeights.h3,
    bodySize: typography.fontSizes.body,
    bodyLeading: typography.lineHeights.body,
    bodyWeight: typography.fontWeights.body,
    labelSize: typography.fontSizes.label,
    labelLeading: typography.lineHeights.label,
    smallSize: typography.fontSizes.small,
    smallLeading: typography.lineHeights.small,
    captionSize: typography.fontSizes.caption,
    captionLeading: typography.lineHeights.caption,
    monoSize: typography.fontSizes.mono,
    monoLeading: typography.lineHeights.mono,
  };
}

describe('@bridger-kr/tokens', () => {
  it('follows the OS theme by default and lets explicit data-theme choices win', () => {
    // DS #44 — system default: :root opts into both schemes, so
    // prefers-color-scheme resolves light-dark() with no JS involved.
    expect(contractCss).toContain('color-scheme: light dark');
    expect(contractCss).toContain('@media (prefers-color-scheme: dark)');
    // Explicit selectors pin the scheme; they restate no token values.
    expect(lightContract.size).toBe(0);
    expect(themeValue(lightDefaultContract.get('--dt-bg'), 'light')).toBe('#ffffff');
    expect(themeValue(lightDefaultContract.get('--dt-bg'), 'dark')).toBe('oklch(0.145 0 0)');
    expect(themeValue(lightDefaultContract.get('--dt-surface'), 'light')).toBe('oklch(0.9875 0 0)');
  });

  it('keeps root compatibility entrypoints and the Figma generator on the canonical contract', () => {
    expect(figmaGenerator).toContain("packages', 'tokens', 'css', 'contract.css'");
    for (const entrypoint of rootTokenEntrypoints) {
      expect(entrypoint).toContain("../packages/tokens/css/contract.css");
    }
  });

  it('keeps the explicit dark block to the overlay shadow; themed colors are single light-dark() definitions', () => {
    for (const name of darkContract.keys()) {
      expect(
        name === cssVarName.shadows.overlay,
        `${name} is restated in the explicit dark block`,
      ).toBe(true);
    }
    // Every color token whose light/dark exports differ must be a light-dark()
    // pair on :root, and the arms must actually differ.
    for (const [key, varName] of Object.entries(cssVarName.colors)) {
      const lightExport = colors.light[key as keyof typeof colors.light];
      const darkExport = colors.dark[key as keyof typeof colors.dark];
      const contractValue = lightDefaultContract.get(varName);
      expect(contractValue, `${varName} is missing from contract.css`).toBeDefined();
      const arms = splitLightDark(contractValue ?? '');
      if (lightExport !== darkExport) {
        expect(arms, `${varName} differs per theme but is not light-dark()`).not.toBeNull();
        expect(arms?.[0], `${varName} light arm must differ from its dark arm`).not.toBe(arms?.[1]);
      }
    }
    // Nothing outside colors + the overlay shadow may vary across themes.
    const colorVarNames = new Set<string>(Object.values(cssVarName.colors));
    for (const [name, value] of lightDefaultContract) {
      const arms = splitLightDark(value);
      if (arms) expect(colorVarNames.has(name), `${name} uses light-dark() but is not a color token`).toBe(true);
    }
  });

  it('uses accessible persimmon identity and neutral primary-action roles', () => {
    expect(colors.light.accent).toBe('#ec5e1f');
    expect(colors.light.accentText).toBe('#b83c0d');
    expect(colors.dark.accentText).toBe('#f99566');
    expect(contrastRatio(colors.light.accentInk, colors.light.accent)).toBeGreaterThanOrEqual(4.5);
    // The full AA gate (every text token >=4.5 on every surface, both themes,
    // incl. accent-text) lives in tests/contrast.test.ts — oklch-aware.
    expect(baseCss).toContain('a { color: var(--dt-accent-text);');
    expect(componentsCss).toContain('.dt-badge-accent  { background: var(--dt-tint-accent);  color: var(--dt-accent-text);');
    expect(componentsCss).toContain('background: var(--dt-text-strong); color: var(--dt-surface);');
    expect(componentsCss).toContain('.dt-button-solid:not(:disabled):hover { background: var(--dt-text);');
  });

  it('keeps exported color tokens aligned with the CSS contract', () => {
    expectGroupMatchesContract(lightThemeContract, colors.light, cssVarName.colors);
    expectGroupMatchesContract(darkThemeContract, colors.dark, cssVarName.colors);
  });

  it('keeps exported scale and typography tokens aligned with the CSS contract', () => {
    expectGroupMatchesContract(lightDefaultContract, spacing, cssVarName.spacing);
    expectGroupMatchesContract(lightDefaultContract, radius, cssVarName.radius);
    expectGroupMatchesContract(lightDefaultContract, typographyValues(), cssVarName.typography);
  });

  it('keeps exported shadow tokens aligned with both theme blocks in the CSS contract', () => {
    expectGroupMatchesContract(darkThemeContract, shadows.dark, cssVarName.shadows);
    expectGroupMatchesContract(lightThemeContract, shadows.light, cssVarName.shadows);
  });

  it('keeps layers, motion, and effects aligned with the CSS contract', () => {
    expectGroupMatchesContract(lightDefaultContract, layers, cssVarName.layers);
    expectGroupMatchesContract(lightDefaultContract, motion.durations, cssVarName.motion.durations);
    expectGroupMatchesContract(lightDefaultContract, motion.easing, cssVarName.motion.easing);
    expectGroupMatchesContract(lightDefaultContract, motion.interaction, cssVarName.motion.interaction);
  });

  it('preserves literal token types', () => {
    expectTypeOf(colors.light.bg).toEqualTypeOf<'#ffffff'>();
    expectTypeOf(colors.light.surface).toEqualTypeOf<'oklch(0.9875 0 0)'>();
    expectTypeOf(colors.light.surfaceSunken).toEqualTypeOf<'oklch(0.97 0 0)'>();
    expectTypeOf(colors.light.text).toEqualTypeOf<'oklch(0.205 0 0)'>();
    expectTypeOf(colors.light.accent).toEqualTypeOf<'#ec5e1f'>();
    expectTypeOf(colors.light.accentText).toEqualTypeOf<'#b83c0d'>();
    expectTypeOf(colors.light.accentInk).toEqualTypeOf<'#1a1206'>();
    expectTypeOf(motion.durations.base).toEqualTypeOf<'160ms'>();
    expectTypeOf(motion.easing.standard).toEqualTypeOf<'cubic-bezier(0.23, 1, 0.32, 1)'>();
    expectTypeOf(layers.popover).toEqualTypeOf<60>();
    expectTypeOf(colors.dark.bg).toEqualTypeOf<'oklch(0.145 0 0)'>();
    expectTypeOf(colors.dark.statusWarning).toEqualTypeOf<'var(--dt-warning)'>();
    expectTypeOf(radius.lg).toEqualTypeOf<'8px'>();
    expectTypeOf(radius.card).toEqualTypeOf<'var(--dt-radius-lg)'>();
    expectTypeOf(radius.pill).toEqualTypeOf<'9999px'>();
    expectTypeOf(typography.fontSizes.h1).toEqualTypeOf<'36px'>();
    expectTypeOf(typography.lineHeights.h1).toEqualTypeOf<'44px'>();
    expectTypeOf(typography.fontWeights.h1).toEqualTypeOf<600>();
    expectTypeOf(typography.fontFamilies.sans).toEqualTypeOf<
      "'Pretendard Variable', Pretendard, system-ui, -apple-system, 'Segoe UI', sans-serif"
    >();
  });

  it('freezes exported token objects at runtime', () => {
    expect(Object.isFrozen(colors)).toBe(true);
    expect(Object.isFrozen(colors.light)).toBe(true);
    expect(Object.isFrozen(colors.dark)).toBe(true);
    expect(Object.isFrozen(radius)).toBe(true);
    expect(Object.isFrozen(shadows.light)).toBe(true);
    expect(Object.isFrozen(shadows.dark)).toBe(true);
    expect(Object.isFrozen(layers)).toBe(true);
    expect(Object.isFrozen(motion)).toBe(true);
    expect(Object.isFrozen(motion.durations)).toBe(true);
    expect(Object.isFrozen(typography)).toBe(true);
    expect(Object.isFrozen(typography.fontFamilies)).toBe(true);
  });
});
