const freeze = <const TokenGroup extends Record<string, unknown>>(tokenGroup: TokenGroup): Readonly<TokenGroup> =>
  Object.freeze(tokenGroup);

const lightColors = freeze({
  bg: '#ffffff',
  surface: 'oklch(0.9875 0 0)',
  surfaceRaised: '#ffffff',
  surfaceSunken: 'oklch(0.97 0 0)',
  surfaceMuted: 'oklch(0.975 0 0)',
  text: 'oklch(0.205 0 0)',
  textStrong: 'oklch(0.145 0 0)',
  textSubtle: 'oklch(0.556 0 0)',
  textMuted: 'oklch(0.54 0 0)',
  textPlaceholder: 'oklch(0.708 0 0)',
  border: 'oklch(0.145 0 0 / 0.10)',
  borderStrong: 'oklch(0.145 0 0 / 0.18)',
  divider: 'color-mix(in srgb, var(--dt-border) 50%, transparent)',
  borderAlpha: 'color-mix(in srgb, var(--dt-text) 8%, transparent)',
  borderAlphaStrong: 'color-mix(in srgb, var(--dt-text) 14%, transparent)',
  accent: '#ec5e1f',
  accentText: '#b83c0d',
  accentStrong: '#93390c',
  accentBright: '#ff6f2e',
  accentInk: '#1a1206',
  accentSoft: 'color-mix(in srgb, var(--dt-accent) 14%, transparent)',
  cobalt: '#1d4ed8',
  success: '#0d7233',
  warning: '#785800',
  danger: '#b91c1c',
  info: 'var(--dt-cobalt)',
  statusCobalt: 'var(--dt-info)',
  statusSuccess: 'var(--dt-success)',
  statusWarning: 'var(--dt-warning)',
  codeBg: '#14161d',
  codeInk: '#e8e6df',
  codeBorder: '#262a35',
  brandGradient: 'linear-gradient(120deg, #ec5e1f 0%, #ec5e1f 100%)',
  syntaxKey: 'color-mix(in srgb, var(--dt-code-ink) 70%, var(--dt-info))',
  syntaxString: 'color-mix(in srgb, var(--dt-accent) 55%, var(--dt-code-ink))',
  syntaxNumber: 'color-mix(in srgb, var(--dt-success) 60%, var(--dt-code-ink))',
  syntaxComment: 'color-mix(in srgb, var(--dt-code-ink) 42%, transparent)',
  syntaxPunctuation: 'color-mix(in srgb, var(--dt-code-ink) 55%, transparent)',
  syntaxSuccess: 'color-mix(in srgb, var(--dt-success) 60%, var(--dt-code-ink))',
  tintAccent: 'color-mix(in srgb, var(--dt-accent) 12%, transparent)',
  tintAccent06: 'color-mix(in srgb, var(--dt-accent) 6%, transparent)',
  tintAccent10: 'color-mix(in srgb, var(--dt-accent) 10%, transparent)',
  tintAccent16: 'color-mix(in srgb, var(--dt-accent) 16%, transparent)',
  tintCobalt: 'color-mix(in srgb, var(--dt-cobalt) 10%, transparent)',
  tintSuccess: 'color-mix(in srgb, var(--dt-success) 12%, transparent)',
  tintWarning: 'color-mix(in srgb, var(--dt-warning) 14%, transparent)',
  tintDanger: 'color-mix(in srgb, var(--dt-danger) 12%, transparent)',
  tintText: 'color-mix(in srgb, var(--dt-text) 5%, transparent)',
  tintText03: 'color-mix(in srgb, var(--dt-text) 3%, transparent)',
  tintText05: 'color-mix(in srgb, var(--dt-text) 5%, transparent)',
  tintText07: 'color-mix(in srgb, var(--dt-text) 7%, transparent)',
  chromeBar: 'color-mix(in srgb, var(--dt-surface-raised) 94%, var(--dt-surface-sunken))',
  chromeDivider: 'color-mix(in srgb, var(--dt-text) 9%, transparent)',
} as const);

const darkColors = freeze({
  bg: 'oklch(0.145 0 0)',
  surface: 'oklch(0.17 0 0)',
  surfaceRaised: 'oklch(0.24 0 0)',
  surfaceSunken: 'oklch(0.205 0 0)',
  surfaceMuted: 'oklch(0.19 0 0)',
  text: 'oklch(0.97 0 0)',
  textStrong: 'oklch(1 0 0)',
  textSubtle: 'oklch(0.708 0 0)',
  textMuted: 'oklch(0.72 0 0)',
  textPlaceholder: 'oklch(0.556 0 0)',
  border: 'oklch(1 0 0 / 0.08)',
  borderStrong: 'oklch(1 0 0 / 0.16)',
  divider: 'color-mix(in srgb, var(--dt-border) 55%, transparent)',
  borderAlpha: 'color-mix(in srgb, var(--dt-text) 8%, transparent)',
  borderAlphaStrong: 'color-mix(in srgb, var(--dt-text) 14%, transparent)',
  accent: '#f07a45',
  accentText: '#f99566',
  accentStrong: '#ffab85',
  accentBright: '#ff9a6a',
  accentInk: '#1a1206',
  accentSoft: 'color-mix(in srgb, var(--dt-accent) 14%, transparent)',
  cobalt: '#7aa2ff',
  success: '#4ade80',
  warning: '#fbbf24',
  danger: '#f87171',
  info: 'var(--dt-cobalt)',
  statusCobalt: 'var(--dt-info)',
  statusSuccess: 'var(--dt-success)',
  statusWarning: 'var(--dt-warning)',
  codeBg: '#0a0b0f',
  codeInk: '#f4f3ee',
  codeBorder: '#23252e',
  brandGradient: 'linear-gradient(120deg, #ec5e1f 0%, #ec5e1f 100%)',
  syntaxKey: 'color-mix(in srgb, var(--dt-code-ink) 70%, var(--dt-info))',
  syntaxString: 'color-mix(in srgb, var(--dt-accent) 55%, var(--dt-code-ink))',
  syntaxNumber: 'color-mix(in srgb, var(--dt-success) 60%, var(--dt-code-ink))',
  syntaxComment: 'color-mix(in srgb, var(--dt-code-ink) 42%, transparent)',
  syntaxPunctuation: 'color-mix(in srgb, var(--dt-code-ink) 55%, transparent)',
  syntaxSuccess: 'color-mix(in srgb, var(--dt-success) 60%, var(--dt-code-ink))',
  tintAccent: 'color-mix(in srgb, var(--dt-accent) 14%, transparent)',
  tintAccent06: 'color-mix(in srgb, var(--dt-accent) 6%, transparent)',
  tintAccent10: 'color-mix(in srgb, var(--dt-accent) 10%, transparent)',
  tintAccent16: 'color-mix(in srgb, var(--dt-accent) 16%, transparent)',
  tintCobalt: 'color-mix(in srgb, var(--dt-cobalt) 14%, transparent)',
  tintSuccess: 'color-mix(in srgb, var(--dt-success) 16%, transparent)',
  tintWarning: 'color-mix(in srgb, var(--dt-warning) 16%, transparent)',
  tintDanger: 'color-mix(in srgb, var(--dt-danger) 16%, transparent)',
  tintText: 'color-mix(in srgb, var(--dt-text) 6%, transparent)',
  tintText03: 'color-mix(in srgb, var(--dt-text) 3%, transparent)',
  tintText05: 'color-mix(in srgb, var(--dt-text) 5%, transparent)',
  tintText07: 'color-mix(in srgb, var(--dt-text) 7%, transparent)',
  chromeBar: 'color-mix(in srgb, var(--dt-surface-raised) 94%, var(--dt-surface-sunken))',
  chromeDivider: 'color-mix(in srgb, var(--dt-text) 9%, transparent)',
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
  12: '12px',
  32: '32px',
} as const);

export const radius = freeze({
  chip: 'var(--dt-radius-sm)',
  control: 'var(--dt-radius-md)',
  card: 'var(--dt-radius-lg)',
  pill: '9999px',
  sm: '4px',
  md: '6px',
  lg: '8px',
} as const);

const lightShadows = freeze({
  overlay: '0 8px 24px rgba(24, 22, 18, 0.1), 0 0 0 1px rgba(24, 22, 18, 0.04)',
} as const);

const darkShadows = freeze({
  overlay: '0 12px 32px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.03)',
} as const);

export const shadows = freeze({
  light: lightShadows,
  dark: darkShadows,
} as const);

export const layers = freeze({
  base: 0,
  raised: 10,
  overlay: 40,
  modal: 50,
  popover: 60,
  toast: 80,
} as const);

const motionDurations = freeze({
  fast: '120ms',
  base: '160ms',
} as const);

const motionEasing = freeze({
  standard: 'cubic-bezier(0.23, 1, 0.32, 1)',
} as const);

const motionInteraction = freeze({
  pressScale: 0.97,
  hotspotRing: 'var(--dt-accent)',
  hotspotSize: '8px',
} as const);

export const motion = freeze({
  durations: motionDurations,
  easing: motionEasing,
  interaction: motionInteraction,
} as const);

const fontFamilies = freeze({
  sans: "'Pretendard Variable', Pretendard, system-ui, -apple-system, 'Segoe UI', sans-serif",
  mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, 'Pretendard Variable', monospace",
} as const);

const fontSizes = freeze({
  h1: '36px',
  h2: '28px',
  h3: '20px',
  body: '16px',
  label: '14px',
  small: '13px',
  caption: '12px',
  mono: '13px',
} as const);

const fontWeights = freeze({
  h1: 600,
  h2: 600,
  h3: 600,
  body: 400,
} as const);

const lineHeights = freeze({
  h1: '44px',
  h2: '36px',
  h3: '28px',
  body: '24px',
  label: '20px',
  small: '18px',
  caption: '16px',
  mono: '18px',
} as const);

const letterSpacing = freeze({
  h1: '-0.015em',
  h2: '-0.01em',
} as const);

const fontFeatures = freeze({
  tabular: "'tnum' 0",
} as const);

export const typography = freeze({
  fontFamilies,
  fontFeatures,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacing,
} as const);

export const cssVarName = freeze({
  colors: freeze({
    bg: '--dt-bg',
    surface: '--dt-surface',
    surfaceRaised: '--dt-surface-raised',
    surfaceSunken: '--dt-surface-sunken',
    surfaceMuted: '--dt-surface-muted',
    text: '--dt-text',
    textStrong: '--dt-text-strong',
    textSubtle: '--dt-text-subtle',
    textMuted: '--dt-text-muted',
    textPlaceholder: '--dt-text-placeholder',
    border: '--dt-border',
    borderStrong: '--dt-border-strong',
    divider: '--dt-divider',
    borderAlpha: '--dt-border-alpha',
    borderAlphaStrong: '--dt-border-alpha-strong',
    accent: '--dt-accent',
    accentText: '--dt-accent-text',
    accentStrong: '--dt-accent-strong',
    accentBright: '--dt-accent-bright',
    accentInk: '--dt-accent-ink',
    accentSoft: '--dt-accent-soft',
    cobalt: '--dt-cobalt',
    success: '--dt-success',
    warning: '--dt-warning',
    danger: '--dt-danger',
    info: '--dt-info',
    statusCobalt: '--dt-status-cobalt',
    statusSuccess: '--dt-status-success',
    statusWarning: '--dt-status-warning',
    codeBg: '--dt-code-bg',
    codeInk: '--dt-code-ink',
    codeBorder: '--dt-code-border',
    brandGradient: '--dt-brand-gradient',
    syntaxKey: '--dt-syntax-key',
    syntaxString: '--dt-syntax-string',
    syntaxNumber: '--dt-syntax-number',
    syntaxComment: '--dt-syntax-comment',
    syntaxPunctuation: '--dt-syntax-punctuation',
    syntaxSuccess: '--dt-syntax-success',
    tintAccent: '--dt-tint-accent',
    tintAccent06: '--dt-tint-accent-06',
    tintAccent10: '--dt-tint-accent-10',
    tintAccent16: '--dt-tint-accent-16',
    tintCobalt: '--dt-tint-cobalt',
    tintSuccess: '--dt-tint-success',
    tintWarning: '--dt-tint-warning',
    tintDanger: '--dt-tint-danger',
    tintText: '--dt-tint-text',
    tintText03: '--dt-tint-text-03',
    tintText05: '--dt-tint-text-05',
    tintText07: '--dt-tint-text-07',
    chromeBar: '--dt-chrome-bar',
    chromeDivider: '--dt-chrome-divider',
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
    12: '--dt-space-12',
    32: '--dt-space-32',
  } as const),
  radius: freeze({
    chip: '--dt-radius-chip',
    control: '--dt-radius-control',
    card: '--dt-radius-card',
    pill: '--dt-radius-pill',
    sm: '--dt-radius-sm',
    md: '--dt-radius-md',
    lg: '--dt-radius-lg',
  } as const),
  shadows: freeze({
    overlay: '--dt-shadow-overlay',
  } as const),
  layers: freeze({
    base: '--dt-z-index-base',
    raised: '--dt-z-index-raised',
    overlay: '--dt-z-index-overlay',
    modal: '--dt-z-index-modal',
    popover: '--dt-z-index-popover',
    toast: '--dt-z-index-toast',
  } as const),
  motion: freeze({
    durations: freeze({
      fast: '--dt-duration-fast',
      base: '--dt-duration-base',
    } as const),
    easing: freeze({
      standard: '--dt-ease',
    } as const),
    interaction: freeze({
      pressScale: '--dt-press-scale',
      hotspotRing: '--dt-hotspot-ring',
      hotspotSize: '--dt-hotspot-size',
    } as const),
  } as const),
  typography: freeze({
    fontSans: '--dt-font-sans',
    fontMono: '--dt-font-mono',
    tabular: '--dt-tabular',
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
    h3Weight: '--dt-h3-weight',
    bodySize: '--dt-body-size',
    bodyLeading: '--dt-body-leading',
    bodyWeight: '--dt-body-weight',
    labelSize: '--dt-label-size',
    labelLeading: '--dt-label-leading',
    smallSize: '--dt-small-size',
    smallLeading: '--dt-small-leading',
    captionSize: '--dt-caption-size',
    captionLeading: '--dt-caption-leading',
    monoSize: '--dt-mono-size',
    monoLeading: '--dt-mono-leading',
  } as const),
} as const);

export const tokens = freeze({
  colors,
  spacing,
  radius,
  shadows,
  layers,
  motion,
  typography,
  cssVarName,
} as const);

export type Tokens = typeof tokens;
export type Colors = typeof colors;
export type Spacing = typeof spacing;
export type Radius = typeof radius;
export type Shadows = typeof shadows;
export type Layers = typeof layers;
export type Motion = typeof motion;
export type Typography = typeof typography;
