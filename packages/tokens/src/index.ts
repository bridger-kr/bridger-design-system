const freeze = <const TokenGroup extends Record<string, unknown>>(tokenGroup: TokenGroup): Readonly<TokenGroup> =>
  Object.freeze(tokenGroup);

const lightColors = freeze({
  paper: '#fbfaf8',
  surface: '#ffffff',
  surfaceRaised: '#ffffff',
  surfaceSunken: '#f4f3ef',
  surfaceMuted: '#f8f7f4',
  ink: '#1b1a16',
  inkStrong: '#0c0b08',
  muted: '#69655d',
  mutedStrong: '#423f38',
  border: '#eceae3',
  borderStrong: '#ddd9cf',
  divider: 'color-mix(in srgb, var(--dt-border) 50%, transparent)',
  borderAlpha: 'color-mix(in srgb, var(--dt-ink) 8%, transparent)',
  borderAlphaStrong: 'color-mix(in srgb, var(--dt-ink) 14%, transparent)',
  accent: '#ec5e1f',
  accentStrong: '#b83c0d',
  accentBright: '#ec5e1f',
  accentInk: '#1a1206',
  accentSoft: 'color-mix(in srgb, var(--dt-accent) 14%, transparent)',
  cobalt: '#256b5a',
  lime: '#dce95b',
  success: '#168044',
  warning: '#a85b08',
  danger: '#c62828',
  info: 'var(--dt-cobalt)',
  statusCobalt: '#2f6bff',
  statusSuccess: '#00b04e',
  statusWarning: '#a85b08',
  statusDanger: '#dc3a34',
  alertInk: '#ecfff2',
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
  tintMuted: 'color-mix(in srgb, var(--dt-ink) 5%, transparent)',
  tintInk03: 'color-mix(in srgb, var(--dt-ink) 3%, transparent)',
  tintInk05: 'color-mix(in srgb, var(--dt-ink) 5%, transparent)',
  tintInk07: 'color-mix(in srgb, var(--dt-ink) 7%, transparent)',
  chromeBar: 'color-mix(in srgb, var(--dt-surface-raised) 94%, var(--dt-surface-sunken))',
  chromeDot1: 'color-mix(in srgb, var(--dt-muted) 38%, var(--dt-surface-raised))',
  chromeDot2: 'color-mix(in srgb, var(--dt-warning) 46%, var(--dt-surface-raised))',
  chromeDot3: 'color-mix(in srgb, var(--dt-success) 46%, var(--dt-surface-raised))',
  chromeDivider: 'color-mix(in srgb, var(--dt-ink) 9%, transparent)',
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
  borderAlpha: 'color-mix(in srgb, var(--dt-ink) 8%, transparent)',
  borderAlphaStrong: 'color-mix(in srgb, var(--dt-ink) 14%, transparent)',
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
  tintMuted: 'color-mix(in srgb, var(--dt-ink) 6%, transparent)',
  tintInk03: 'color-mix(in srgb, var(--dt-ink) 3%, transparent)',
  tintInk05: 'color-mix(in srgb, var(--dt-ink) 5%, transparent)',
  tintInk07: 'color-mix(in srgb, var(--dt-ink) 7%, transparent)',
  chromeBar: 'color-mix(in srgb, var(--dt-surface-raised) 94%, var(--dt-surface-sunken))',
  chromeDot1: 'color-mix(in srgb, var(--dt-muted) 38%, var(--dt-surface-raised))',
  chromeDot2: 'color-mix(in srgb, var(--dt-warning) 46%, var(--dt-surface-raised))',
  chromeDot3: 'color-mix(in srgb, var(--dt-success) 46%, var(--dt-surface-raised))',
  chromeDivider: 'color-mix(in srgb, var(--dt-ink) 9%, transparent)',
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
  inner: '6px',
  element: '10px',
  container: '14px',
  md: '12px',
  lg: '14px',
  xl: '14px',
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
  focus: '0 0 0 3px color-mix(in srgb, var(--dt-accent) 60%, transparent)',
  cardRest: 'var(--dt-ring)',
  cardHover: 'var(--dt-ring-strong), var(--dt-shadow-sm)',
  cardFloat: 'var(--dt-ring-strong), var(--dt-shadow-md)',
  subtle: '0 1px 2px rgba(24, 22, 18, 0.07), 0 0 0 1px rgba(24, 22, 18, 0.03)',
  elevated: '0 8px 24px rgba(24, 22, 18, 0.10), 0 0 0 1px rgba(24, 22, 18, 0.04)',
  ambient01: '0 1px 3px color-mix(in srgb, var(--dt-ink) 4%, transparent), 0 8px 24px -4px color-mix(in srgb, var(--dt-ink) 8%, transparent)',
  ambient02: '0 1px 2px color-mix(in srgb, var(--dt-ink) 6%, transparent), 0 16px 30px -16px color-mix(in srgb, var(--dt-ink) 12%, transparent), 0 34px 64px -40px color-mix(in srgb, var(--dt-ink) 18%, transparent)',
  ambient03: '0 2px 6px color-mix(in srgb, var(--dt-ink) 8%, transparent), 0 24px 46px -20px color-mix(in srgb, var(--dt-ink) 16%, transparent), 0 52px 88px -48px color-mix(in srgb, var(--dt-ink) 22%, transparent)',
  ambient04: '0 4px 10px color-mix(in srgb, var(--dt-ink) 10%, transparent), 0 32px 62px -24px color-mix(in srgb, var(--dt-ink) 20%, transparent), 0 70px 120px -56px color-mix(in srgb, var(--dt-ink) 28%, transparent)',
  insetCrisp: 'inset 0 0 0 1px color-mix(in srgb, var(--dt-ink) 6%, transparent)',
} as const);

const darkShadows = freeze({
  ring: '0 0 0 1px rgba(255, 255, 255, 0.04)',
  ringStrong: '0 0 0 1px var(--dt-border-strong)',
  xs: '0 1px 2px rgba(0, 0, 0, 0.4)',
  sm: '0 1px 2px rgba(0, 0, 0, 0.5), 0 2px 6px rgba(0, 0, 0, 0.4)',
  md: '0 4px 10px rgba(0, 0, 0, 0.5), 0 12px 24px rgba(0, 0, 0, 0.45)',
  lg: '0 8px 20px rgba(0, 0, 0, 0.55), 0 24px 48px rgba(0, 0, 0, 0.5)',
  xl: '0 16px 32px rgba(0, 0, 0, 0.6), 0 40px 72px rgba(0, 0, 0, 0.55)',
  focus: '0 0 0 3px color-mix(in srgb, var(--dt-accent) 60%, transparent)',
  cardRest: 'var(--dt-ring)',
  cardHover: 'var(--dt-ring-strong), var(--dt-shadow-sm)',
  cardFloat: 'var(--dt-ring-strong), var(--dt-shadow-md)',
  subtle: '0 1px 2px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.02)',
  elevated: '0 12px 32px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.03)',
  ambient01: '0 1px 3px color-mix(in srgb, var(--dt-ink) 4%, transparent), 0 8px 24px -4px color-mix(in srgb, var(--dt-ink) 8%, transparent)',
  ambient02: '0 1px 2px color-mix(in srgb, var(--dt-ink) 6%, transparent), 0 16px 30px -16px color-mix(in srgb, var(--dt-ink) 12%, transparent), 0 34px 64px -40px color-mix(in srgb, var(--dt-ink) 18%, transparent)',
  ambient03: '0 2px 6px color-mix(in srgb, var(--dt-ink) 8%, transparent), 0 24px 46px -20px color-mix(in srgb, var(--dt-ink) 16%, transparent), 0 52px 88px -48px color-mix(in srgb, var(--dt-ink) 22%, transparent)',
  ambient04: '0 4px 10px color-mix(in srgb, var(--dt-ink) 10%, transparent), 0 32px 62px -24px color-mix(in srgb, var(--dt-ink) 20%, transparent), 0 70px 120px -56px color-mix(in srgb, var(--dt-ink) 28%, transparent)',
  insetCrisp: 'inset 0 0 0 1px color-mix(in srgb, #ffffff 15%, transparent)',
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
  base: '200ms',
  slow: '280ms',
} as const);

const motionEasing = freeze({
  moonStandard: 'cubic-bezier(0.23, 1, 0.32, 1)',
  moonEnter: 'cubic-bezier(0.23, 1, 0.32, 1)',
  moonExit: 'cubic-bezier(0.4, 0, 1, 1)',
  standard: 'cubic-bezier(0.23, 1, 0.32, 1)',
  enter: 'cubic-bezier(0.55, 0.05, 0.55, 0.2)',
  decisive: 'cubic-bezier(0.2, 0, 0, 1)',
} as const);

const motionTransitions = freeze({
  fast: '120ms var(--dt-ease)',
  base: '200ms var(--dt-ease)',
  default: '200ms var(--dt-ease)',
  slow: '280ms var(--dt-ease)',
  slower: '600ms var(--dt-ease)',
} as const);

const motionInteraction = freeze({
  pressScale: 0.97,
  hotspotRing: 'var(--dt-accent)',
  hotspotSize: '8px',
} as const);

export const motion = freeze({
  durations: motionDurations,
  easing: motionEasing,
  transitions: motionTransitions,
  interaction: motionInteraction,
} as const);

const lightEffects = freeze({
  shadowGradient: 'radial-gradient( ellipse at 50% 100%, color-mix(in srgb, var(--dt-accent) 10%, transparent) 0%, color-mix(in srgb, var(--dt-accent) 4%, transparent) 42%, transparent 72% )',
  gradientMesh: 'radial-gradient(circle at 18% 12%, color-mix(in srgb, var(--dt-accent) 18%, transparent) 0%, transparent 38%), radial-gradient(circle at 82% 18%, color-mix(in srgb, var(--dt-accent) 10%, transparent) 0%, transparent 34%), radial-gradient(circle at 50% 100%, color-mix(in srgb, var(--dt-accent) 6%, transparent) 0%, transparent 48%)',
  glassBg: 'color-mix(in srgb, var(--dt-paper) 78%, transparent)',
  glassBlur: 'saturate(180%) blur(16px)',
} as const);

const darkEffects = freeze({
  shadowGradient: 'radial-gradient( ellipse at 50% 100%, color-mix(in srgb, var(--dt-accent) 10%, transparent) 0%, color-mix(in srgb, var(--dt-accent) 4%, transparent) 42%, transparent 72% )',
  gradientMesh: 'radial-gradient(circle at 18% 12%, color-mix(in srgb, var(--dt-accent) 18%, transparent) 0%, transparent 38%), radial-gradient(circle at 82% 18%, color-mix(in srgb, var(--dt-accent) 10%, transparent) 0%, transparent 34%), radial-gradient(circle at 50% 100%, color-mix(in srgb, var(--dt-accent) 6%, transparent) 0%, transparent 48%)',
  glassBg: 'color-mix(in srgb, var(--dt-paper) 72%, transparent)',
  glassBlur: 'saturate(180%) blur(16px)',
} as const);

export const effects = freeze({
  light: lightEffects,
  dark: darkEffects,
} as const);

const fontFamilies = freeze({
  sans: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif",
  mono: "'JetBrains Mono', 'Geist Mono', SFMono-Regular, ui-monospace, Menlo, monospace",
} as const);

const fontSizes = freeze({
  h1: 'clamp(36px, 4.5vw, 54px)',
  h2: 'clamp(26px, 3vw, 34px)',
  h3: '18px',
  body: '16px',
  small: '13px',
  mono: '13px',
} as const);

const fontWeights = freeze({
  h1: 650,
  h2: 620,
  h3: 600,
  body: 400,
} as const);

const lineHeights = freeze({
  h1: '1.12',
  h2: '1.2',
  h3: '1.3',
  body: '1.6',
  small: '1.55',
  mono: '1.55',
} as const);

const letterSpacing = freeze({
  h1: '-0.02em',
  h2: '-0.015em',
  h3: '0',
} as const);

const fontFeatures = freeze({
  tabular: "'tnum' 0",
} as const);

const displayTracking = freeze({
  tight: '-0.04em',
  display: '-0.02em',
} as const);

export const typography = freeze({
  fontFamilies,
  fontFeatures,
  displayTracking,
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
    borderAlpha: '--dt-border-alpha',
    borderAlphaStrong: '--dt-border-alpha-strong',
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
    tintMuted: '--dt-tint-muted',
    tintInk03: '--dt-tint-ink-03',
    tintInk05: '--dt-tint-ink-05',
    tintInk07: '--dt-tint-ink-07',
    chromeBar: '--dt-chrome-bar',
    chromeDot1: '--dt-chrome-dot-1',
    chromeDot2: '--dt-chrome-dot-2',
    chromeDot3: '--dt-chrome-dot-3',
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
  } as const),
  radius: freeze({
    sm: '--dt-radius-sm',
    inner: '--dt-radius-inner',
    element: '--dt-radius-element',
    container: '--dt-radius-container',
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
    ambient01: '--dt-ambient-01',
    ambient02: '--dt-ambient-02',
    ambient03: '--dt-ambient-03',
    ambient04: '--dt-ambient-04',
    insetCrisp: '--dt-shadow-inset-crisp',
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
      slow: '--dt-duration-slow',
    } as const),
    easing: freeze({
      moonStandard: '--dt-moon-standard',
      moonEnter: '--dt-moon-enter',
      moonExit: '--dt-moon-exit',
      standard: '--dt-ease',
      enter: '--dt-ease-in',
      decisive: '--dt-ease-decisive',
    } as const),
    transitions: freeze({
      fast: '--dt-motion-fast',
      base: '--dt-motion-base',
      default: '--dt-motion',
      slow: '--dt-motion-slow',
      slower: '--dt-motion-slower',
    } as const),
    interaction: freeze({
      pressScale: '--dt-press-scale',
      hotspotRing: '--dt-hotspot-ring',
      hotspotSize: '--dt-hotspot-size',
    } as const),
  } as const),
  effects: freeze({
    shadowGradient: '--dt-shadow-gradient',
    gradientMesh: '--dt-gradient-mesh',
    glassBg: '--dt-glass-bg',
    glassBlur: '--dt-glass-blur',
  } as const),
  typography: freeze({
    fontSans: '--dt-font-sans',
    fontMono: '--dt-font-mono',
    tabular: '--dt-tabular',
    displayTrackingTight: '--dt-display-tracking-tight',
    displayTrackingDisplay: '--dt-display-tracking-display',
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
  layers,
  motion,
  effects,
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
export type Effects = typeof effects;
export type Typography = typeof typography;
