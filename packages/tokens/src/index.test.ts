import { readFileSync } from 'node:fs';

import { describe, expect, expectTypeOf, it } from 'vitest';

import { colors, cssVarName, radius, shadows, spacing, typography } from './index';

type TokenRecord = Record<string, string | number>;

const contractCss = readFileSync(new URL('../css/contract.css', import.meta.url), 'utf8').replace(
  /\/\*[\s\S]*?\*\//g,
  '',
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

const darkContract = extractVars(':root');
const lightContract = extractVars(":root[data-theme='light']");

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
    h3Tracking: typography.letterSpacing.h3,
    h3Weight: typography.fontWeights.h3,
    bodySize: typography.fontSizes.body,
    bodyLeading: typography.lineHeights.body,
    bodyWeight: typography.fontWeights.body,
    smallSize: typography.fontSizes.small,
    smallLeading: typography.lineHeights.small,
    monoSize: typography.fontSizes.mono,
    monoLeading: typography.lineHeights.mono,
  };
}

describe('@bridger-kr/tokens', () => {
  it('keeps exported color tokens aligned with the CSS contract', () => {
    expectGroupMatchesContract(darkContract, colors.dark, cssVarName.colors);
    expectGroupMatchesContract(lightContract, colors.light, cssVarName.colors);
  });

  it('keeps exported scale and typography tokens aligned with the CSS contract', () => {
    expectGroupMatchesContract(darkContract, spacing, cssVarName.spacing);
    expectGroupMatchesContract(darkContract, radius, cssVarName.radius);
    expectGroupMatchesContract(darkContract, typographyValues(), cssVarName.typography);
  });

  it('keeps exported shadow tokens aligned with both theme blocks in the CSS contract', () => {
    expectGroupMatchesContract(darkContract, shadows.dark, cssVarName.shadows);
    expectGroupMatchesContract(lightContract, shadows.light, cssVarName.shadows);
  });

  it('preserves literal token types', () => {
    expectTypeOf(colors.light.paper).toEqualTypeOf<'#cfecd8'>();
    expectTypeOf(colors.light.surface).toEqualTypeOf<'#ecfff2'>();
    expectTypeOf(colors.light.surfaceSunken).toEqualTypeOf<'#f4f3ef'>();
    expectTypeOf(colors.light.ink).toEqualTypeOf<'#0c0b08'>();
    expectTypeOf(colors.light.border).toEqualTypeOf<'#d8d5ca'>();
    expectTypeOf(colors.light.accent).toEqualTypeOf<'#ec5e1f'>();
    expectTypeOf(colors.light.accentSoft).toEqualTypeOf<'color-mix(in srgb, var(--dt-accent) 14%, transparent)'>();
    expectTypeOf(colors.light.statusWarning).toEqualTypeOf<'#ffa71a'>();
    expectTypeOf(colors.dark.paper).toEqualTypeOf<'#0a0b0f'>();
    expectTypeOf(colors.dark.statusWarning).toEqualTypeOf<'#ec5e1f'>();
    expectTypeOf(radius.lg).toEqualTypeOf<'40px'>();
    expectTypeOf(radius.xl).toEqualTypeOf<'40px'>();
    expectTypeOf(typography.fontFamilies.sans).toEqualTypeOf<
      "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif"
    >();
  });

  it('freezes exported token objects at runtime', () => {
    expect(Object.isFrozen(colors)).toBe(true);
    expect(Object.isFrozen(colors.light)).toBe(true);
    expect(Object.isFrozen(colors.dark)).toBe(true);
    expect(Object.isFrozen(radius)).toBe(true);
    expect(Object.isFrozen(shadows.light)).toBe(true);
    expect(Object.isFrozen(shadows.dark)).toBe(true);
    expect(Object.isFrozen(typography)).toBe(true);
    expect(Object.isFrozen(typography.fontFamilies)).toBe(true);
  });
});
