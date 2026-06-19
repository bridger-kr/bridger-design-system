const freeze = <const TokenGroup extends Record<string, unknown>>(tokenGroup: TokenGroup): Readonly<TokenGroup> =>
  Object.freeze(tokenGroup);

const lightColors = freeze({
  paper: '#cfecd8',
  surface: '#ecfff2',
  surfaceRaised: '#ffffff',
  surfaceSunken: '#f4f3ef',
  surfaceMuted: '#f8f7f4',
  ink: '#0c0b08',
  inkStrong: '#0c0b08',
  muted: '#79766e',
  mutedStrong: '#423f38',
  border: '#d8d5ca',
  borderStrong: '#b6cbbd',
  divider: 'color-mix(in srgb, var(--dt-border) 50%, transparent)',
  accent: '#ec5e1f',
  accentStrong: '#ec5e1f',
  accentBright: '#ec5e1f',
  accentInk: '#ffffff',
  accentSoft: 'color-mix(in srgb, var(--dt-accent) 14%, transparent)',
  cobalt: '#256b5a',
  lime: '#dce95b',
  success: '#16a34a',
  warning: '#d97706',
  danger: '#dc2626',
  info: 'var(--dt-cobalt)',
  statusCobalt: '#2f6bff',
  statusSuccess: '#00b04e',
  statusWarning: '#ffa71a',
  statusDanger: '#dc3a34',
  alertInk: '#ecfff2',
  tintAccent: 'color-mix(in srgb, var(--dt-accent) 12%, transparent)',
  tintCobalt: 'color-mix(in srgb, var(--dt-cobalt) 10%, transparent)',
  tintSuccess: 'color-mix(in srgb, var(--dt-success) 12%, transparent)',
  tintWarning: 'color-mix(in srgb, var(--dt-warning) 14%, transparent)',
  tintDanger: 'color-mix(in srgb, var(--dt-danger) 12%, transparent)',
  tintMuted: 'color-mix(in srgb, var(--dt-ink) 5%, transparent)',
  codeBg: '#14161d',
  codeInk: '#e8e6df',
  codeBorder: '#262a35',
  brandGradient: 'linear-gradient(120deg, #ec5e1f 0%, #ec5e1f 100%)',
} as const);

const darkColors = freeze({
  paper: '#0a0b0f',
  surface: '#111218',
  surfaceRaised: '#181a22',
  surfaceSunken: '#07080b',
  surfaceMuted: '#16181f',
  ink: '#f5f4ee',
  inkStrong: '#ffffff',
  muted: '#9a9ba6',
  mutedStrong: '#c3c4cd',
  border: '#23252e',
  borderStrong: '#2f323d',
  divider: 'color-mix(in srgb, var(--dt-border) 55%, transparent)',
  accent: '#ec5e1f',
  accentStrong: '#ec5e1f',
  accentBright: '#ec5e1f',
  accentInk: '#1a1206',
  accentSoft: 'color-mix(in srgb, var(--dt-accent) 14%, transparent)',
  cobalt: '#7aa2ff',
  lime: '#d8f24a',
  success: '#34d399',
  warning: '#fbbf24',
  danger: '#f87171',
  info: 'var(--dt-cobalt)',
  statusCobalt: '#2f6bff',
  statusSuccess: '#00b04e',
  statusWarning: '#ec5e1f',
  statusDanger: '#dc3a34',
  alertInk: '#ecfff2',
  tintAccent: 'color-mix(in srgb, var(--dt-accent) 14%, transparent)',
  tintCobalt: 'color-mix(in srgb, var(--dt-cobalt) 14%, transparent)',
  tintSuccess: 'color-mix(in srgb, var(--dt-success) 16%, transparent)',
  tintWarning: 'color-mix(in srgb, var(--dt-warning) 16%, transparent)',
  tintDanger: 'color-mix(in srgb, var(--dt-danger) 16%, transparent)',
  tintMuted: 'color-mix(in srgb, var(--dt-ink) 6%, transparent)',
  codeBg: '#0a0b0f',
  codeInk: '#f4f3ee',
  codeBorder: '#23252e',
  brandGradient: 'linear-gradient(120deg, #ec5e1f 0%, #ec5e1f 100%)',
} as const);

export const colors = freeze({
  light: lightColors,
  dark: darkColors,
} as const);

export const spacing = freeze({
  1: '4px',
  2: '8px',
  3: '16px',
  4: '24px',
  5: '40px',
  6: '64px',
  7: '96px',
  8: '128px',
} as const);

export const radius = freeze({
  sm: '6px',
  md: '12px',
  lg: '40px',
  xl: '40px',
  'button': '18px',
  full: '9999px',
} as const);

const lightShadows = freeze({
  ring: '0 0 0 1px var(--dt-border)',
  ringStrong: '0 0 0 1px var(--dt-border-strong)',
  xs: 'none',
  sm: '0 1px 2px rgba(24, 22, 18, 0.05)',
  md: '0 2px 6px rgba(24, 22, 18, 0.07)',
  lg: '0 6px 16px rgba(24, 22, 18, 0.10)',
  xl: '0 12px 30px rgba(24, 22, 18, 0.14)',
  focus: '0 0 0 2px color-mix(in srgb, var(--dt-accent) 60%, transparent)',
  cardRest: 'var(--dt-ring)',
  cardHover: 'var(--dt-ring-strong), var(--dt-shadow-sm)',
  cardFloat: 'var(--dt-ring-strong), var(--dt-shadow-md)',
  subtle: '0 1px 2px rgba(24, 22, 18, 0.07), 0 0 0 1px rgba(24, 22, 18, 0.03)',
  elevated: '0 8px 24px rgba(24, 22, 18, 0.10), 0 0 0 1px rgba(24, 22, 18, 0.04)',
} as const);

const darkShadows = freeze({
  ring: '0 0 0 1px rgba(255, 255, 255, 0.04)',
  ringStrong: '0 0 0 1px var(--dt-border-strong)',
  xs: '0 1px 2px rgba(0, 0, 0, 0.4)',
  sm: '0 1px 2px rgba(0, 0, 0, 0.5), 0 2px 6px rgba(0, 0, 0, 0.4)',
  md: '0 4px 10px rgba(0, 0, 0, 0.5), 0 12px 24px rgba(0, 0, 0, 0.45)',
  lg: '0 8px 20px rgba(0, 0, 0, 0.55), 0 24px 48px rgba(0, 0, 0, 0.5)',
  xl: '0 16px 32px rgba(0, 0, 0, 0.6), 0 40px 72px rgba(0, 0, 0, 0.55)',
  focus: '0 0 0 2px color-mix(in srgb, var(--dt-accent) 60%, transparent)',
  cardRest: 'var(--dt-ring)',
  cardHover: 'var(--dt-ring-strong), var(--dt-shadow-sm)',
  cardFloat: 'var(--dt-ring-strong), var(--dt-shadow-md)',
  subtle: '0 1px 2px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.02)',
  elevated: '0 12px 32px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.03)',
} as const);

export const shadows = freeze({
  light: lightShadows,
  dark: darkShadows,
} as const);

const fontFamilies = freeze({
  sans: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif",
  mono: "'JetBrains Mono', 'Geist Mono', SFMono-Regular, ui-monospace, Menlo, monospace",
} as const);

const fontSizes = freeze({
  h1: 'clamp(40px, 6vw, 72px)',
  h2: 'clamp(28px, 3.5vw, 40px)',
  h3: '18px',
  body: '16px',
  small: '13px',
  mono: '13px',
} as const);

const fontWeights = freeze({
  h1: 560,
  h2: 540,
  h3: 600,
  body: 400,
} as const);

const lineHeights = freeze({
  h1: '1.08',
  h2: '1.15',
  h3: '1.3',
  body: '1.6',
  small: '1.55',
  mono: '1.55',
} as const);

const letterSpacing = freeze({
  h1: '0',
  h2: '0',
  h3: '0',
} as const);

export const typography = freeze({
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacing,
} as const);

export const cssVarName = freeze({
  colors: freeze({
    paper: '--dt-paper',
    surface: '--dt-surface',
    surfaceRaised: '--dt-surface-raised',
    surfaceSunken: '--dt-surface-sunken',
    surfaceMuted: '--dt-surface-muted',
    ink: '--dt-ink',
    inkStrong: '--dt-ink-strong',
    muted: '--dt-muted',
    mutedStrong: '--dt-muted-strong',
    border: '--dt-border',
    borderStrong: '--dt-border-strong',
    divider: '--dt-divider',
    accent: '--dt-accent',
    accentStrong: '--dt-accent-strong',
    accentBright: '--dt-accent-bright',
    accentInk: '--dt-accent-ink',
    accentSoft: '--dt-accent-soft',
    cobalt: '--dt-cobalt',
    lime: '--dt-lime',
    success: '--dt-success',
    warning: '--dt-warning',
    danger: '--dt-danger',
    info: '--dt-info',
    statusCobalt: '--dt-status-cobalt',
    statusSuccess: '--dt-status-success',
    statusWarning: '--dt-status-warning',
    statusDanger: '--dt-status-danger',
    alertInk: '--dt-alert-ink',
    tintAccent: '--dt-tint-accent',
    tintCobalt: '--dt-tint-cobalt',
    tintSuccess: '--dt-tint-success',
    tintWarning: '--dt-tint-warning',
    tintDanger: '--dt-tint-danger',
    tintMuted: '--dt-tint-muted',
    codeBg: '--dt-code-bg',
    codeInk: '--dt-code-ink',
    codeBorder: '--dt-code-border',
    brandGradient: '--dt-brand-gradient',
  } as const),
  spacing: freeze({
    1: '--dt-space-1',
    2: '--dt-space-2',
    3: '--dt-space-3',
    4: '--dt-space-4',
    5: '--dt-space-5',
    6: '--dt-space-6',
    7: '--dt-space-7',
    8: '--dt-space-8',
  } as const),
  radius: freeze({
    sm: '--dt-radius-sm',
    md: '--dt-radius-md',
    lg: '--dt-radius-lg',
    xl: '--dt-radius-xl',
    button: '--dt-radius-button',
    full: '--dt-radius-full',
  } as const),
  shadows: freeze({
    ring: '--dt-ring',
    ringStrong: '--dt-ring-strong',
    xs: '--dt-shadow-xs',
    sm: '--dt-shadow-sm',
    md: '--dt-shadow-md',
    lg: '--dt-shadow-lg',
    xl: '--dt-shadow-xl',
    focus: '--dt-shadow-focus',
    cardRest: '--dt-card-rest',
    cardHover: '--dt-card-hover',
    cardFloat: '--dt-card-float',
    subtle: '--dt-shadow-subtle',
    elevated: '--dt-shadow-elevated',
  } as const),
  typography: freeze({
    fontSans: '--dt-font-sans',
    fontMono: '--dt-font-mono',
    h1Size: '--dt-h1-size',
    h1Leading: '--dt-h1-leading',
    h1Tracking: '--dt-h1-tracking',
    h1Weight: '--dt-h1-weight',
    h2Size: '--dt-h2-size',
    h2Leading: '--dt-h2-leading',
    h2Tracking: '--dt-h2-tracking',
    h2Weight: '--dt-h2-weight',
    h3Size: '--dt-h3-size',
    h3Leading: '--dt-h3-leading',
    h3Tracking: '--dt-h3-tracking',
    h3Weight: '--dt-h3-weight',
    bodySize: '--dt-body-size',
    bodyLeading: '--dt-body-leading',
    bodyWeight: '--dt-body-weight',
    smallSize: '--dt-small-size',
    smallLeading: '--dt-small-leading',
    monoSize: '--dt-mono-size',
    monoLeading: '--dt-mono-leading',
  } as const),
} as const);

export const tokens = freeze({
  colors,
  spacing,
  radius,
  shadows,
  typography,
  cssVarName,
} as const);

export type Tokens = typeof tokens;
export type Colors = typeof colors;
export type Spacing = typeof spacing;
export type Radius = typeof radius;
export type Shadows = typeof shadows;
export type Typography = typeof typography;
