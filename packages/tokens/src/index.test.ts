import { describe, expect, expectTypeOf, it } from 'vitest';

import { colors, typography } from './index';

describe('@bridger-ds/tokens', () => {
  it('exports faithful light and dark accent values from the CSS contract', () => {
    expect(colors.light.paper).toBe('#cfecd8');
    expect(colors.light.surface).toBe('#ecfff2');
    expect(colors.light.accent).toBe('#ec5e1f');
    expect(colors.light.statusCobalt).toBe('#2f6bff');
    expect(colors.light.alertInk).toBe('#ecfff2');
    expect(colors.dark.accent).toBe('#fb923c');
  });

  it('preserves literal token types', () => {
    expectTypeOf(colors.light.paper).toEqualTypeOf<'#cfecd8'>();
    expectTypeOf(colors.light.surface).toEqualTypeOf<'#ecfff2'>();
    expectTypeOf(colors.light.accent).toEqualTypeOf<'#ec5e1f'>();
    expectTypeOf(colors.light.statusDanger).toEqualTypeOf<'#dc3a34'>();
    expectTypeOf(colors.dark.accent).toEqualTypeOf<'#fb923c'>();
    expectTypeOf(typography.fontFamilies.sans).toEqualTypeOf<
      "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif"
    >();
  });

  it('freezes exported token objects at runtime', () => {
    expect(Object.isFrozen(colors)).toBe(true);
    expect(Object.isFrozen(colors.light)).toBe(true);
    expect(Object.isFrozen(colors.dark)).toBe(true);
    expect(Object.isFrozen(typography)).toBe(true);
    expect(Object.isFrozen(typography.fontFamilies)).toBe(true);
  });
});
