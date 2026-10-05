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
  chromeDot1: 'color-mix(in srgb, var(--dt-text-muted) 38%, var(--dt-surface-raised))',
  chromeDot2: 'color-mix(in srgb, var(--dt-warning) 46%, var(--dt-surface-raised))',
  chromeDot3: 'color-mix(in srgb, var(--dt-success) 46%, var(--dt-surface-raised))',
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
  chromeDot1: 'color-mix(in srgb, var(--dt-text-muted) 38%, var(--dt-surface-raised))',
  chromeDot2: 'color-mix(in srgb, var(--dt-warning) 46%, var(--dt-surface-raised))',
  chromeDot3: 'color-mix(in srgb, var(--dt-success) 46%, var(--dt-surface-raised))',
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
  chip: '6px',
  control: '10px',
  card: '14px',
  pill: '9999px',
  sm: '6px',
  inner: '6px',
  element: '10px',
  container: '14px',
  md: '12px',
  lg: '14px',
  xl: '14px',
  'button': '10px',
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
  focus: '0 0 0 2px var(--dt-surface), 0 0 0 5px var(--dt-accent)',
  cardRest: 'var(--dt-ring)',
  cardHover: 'var(--dt-ring-strong), var(--dt-shadow-sm)',
  cardFloat: 'var(--dt-ring-strong), var(--dt-shadow-md)',
  subtle: '0 1px 2px rgba(24, 22, 18, 0.07), 0 0 0 1px rgba(24, 22, 18, 0.03)',
  elevated: '0 8px 24px rgba(24, 22, 18, 0.10), 0 0 0 1px rgba(24, 22, 18, 0.04)',
  ambient01: '0 1px 3px color-mix(in srgb, var(--dt-text) 4%, transparent), 0 8px 24px -4px color-mix(in srgb, var(--dt-text) 8%, transparent)',
  ambient02: '0 1px 2px color-mix(in srgb, var(--dt-text) 6%, transparent), 0 16px 30px -16px color-mix(in srgb, var(--dt-text) 12%, transparent), 0 34px 64px -40px color-mix(in srgb, var(--dt-text) 18%, transparent)',
  ambient03: '0 2px 6px color-mix(in srgb, var(--dt-text) 8%, transparent), 0 24px 46px -20px color-mix(in srgb, var(--dt-text) 16%, transparent), 0 52px 88px -48px color-mix(in srgb, var(--dt-text) 22%, transparent)',
  ambient04: '0 4px 10px color-mix(in srgb, var(--dt-text) 10%, transparent), 0 32px 62px -24px color-mix(in srgb, var(--dt-text) 20%, transparent), 0 70px 120px -56px color-mix(in srgb, var(--dt-text) 28%, transparent)',
  insetCrisp: 'inset 0 0 0 1px color-mix(in srgb, var(--dt-text) 6%, transparent)',
} as const);

const darkShadows = freeze({
  ring: '0 0 0 1px rgba(255, 255, 255, 0.04)',
  ringStrong: '0 0 0 1px var(--dt-border-strong)',
  xs: '0 1px 2px rgba(0, 0, 0, 0.4)',
  sm: '0 1px 2px rgba(0, 0, 0, 0.5), 0 2px 6px rgba(0, 0, 0, 0.4)',
  md: '0 4px 10px rgba(0, 0, 0, 0.5), 0 12px 24px rgba(0, 0, 0, 0.45)',
  lg: '0 8px 20px rgba(0, 0, 0, 0.55), 0 24px 48px rgba(0, 0, 0, 0.5)',
  xl: '0 16px 32px rgba(0, 0, 0, 0.6), 0 40px 72px rgba(0, 0, 0, 0.55)',
  focus: '0 0 0 2px var(--dt-surface), 0 0 0 5px var(--dt-accent)',
  cardRest: 'var(--dt-ring)',
  cardHover: 'var(--dt-ring-strong), var(--dt-shadow-sm)',
  cardFloat: 'var(--dt-ring-strong), var(--dt-shadow-md)',
  subtle: '0 1px 2px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.02)',
  elevated: '0 12px 32px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.03)',
  ambient01: '0 1px 3px color-mix(in srgb, var(--dt-text) 4%, transparent), 0 8px 24px -4px color-mix(in srgb, var(--dt-text) 8%, transparent)',
  ambient02: '0 1px 2px color-mix(in srgb, var(--dt-text) 6%, transparent), 0 16px 30px -16px color-mix(in srgb, var(--dt-text) 12%, transparent), 0 34px 64px -40px color-mix(in srgb, var(--dt-text) 18%, transparent)',
  ambient03: '0 2px 6px color-mix(in srgb, var(--dt-text) 8%, transparent), 0 24px 46px -20px color-mix(in srgb, var(--dt-text) 16%, transparent), 0 52px 88px -48px color-mix(in srgb, var(--dt-text) 22%, transparent)',
  ambient04: '0 4px 10px color-mix(in srgb, var(--dt-text) 10%, transparent), 0 32px 62px -24px color-mix(in srgb, var(--dt-text) 20%, transparent), 0 70px 120px -56px color-mix(in srgb, var(--dt-text) 28%, transparent)',
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
  ambient: '16000ms ease-in-out',
  ambientSlow: '24000ms ease-in-out',
  flow: '8000ms linear',
  flowSlow: '32000ms linear',
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
  glassBg: 'color-mix(in srgb, var(--dt-bg) 78%, transparent)',
  glassBlur: 'saturate(180%) blur(16px)',
} as const);

const darkEffects = freeze({
  shadowGradient: 'radial-gradient( ellipse at 50% 100%, color-mix(in srgb, var(--dt-accent) 10%, transparent) 0%, color-mix(in srgb, var(--dt-accent) 4%, transparent) 42%, transparent 72% )',
  gradientMesh: 'radial-gradient(circle at 18% 12%, color-mix(in srgb, var(--dt-accent) 18%, transparent) 0%, transparent 38%), radial-gradient(circle at 82% 18%, color-mix(in srgb, var(--dt-accent) 10%, transparent) 0%, transparent 34%), radial-gradient(circle at 50% 100%, color-mix(in srgb, var(--dt-accent) 6%, transparent) 0%, transparent 48%)',
  glassBg: 'color-mix(in srgb, var(--dt-bg) 72%, transparent)',
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
  h3: '20px',
  body: '16px',
  label: '14px',
  small: '13px',
  caption: '12px',
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
  label: '1.5',
  small: '1.55',
  caption: '1.5',
  mono: '1.55',
} as const);

const letterSpacing = freeze({
  h1: '-0.02em',
  h2: '-0.015em',
  h3: '0',
} as const);

const eyebrow = freeze({
  size: '11px',
  tracking: '0.18em',
  weight: 700,
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
  eyebrow,
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
    12: '--dt-space-12',
    32: '--dt-space-32',
  } as const),
  radius: freeze({
    chip: '--dt-radius-chip',
    control: '--dt-radius-control',
    card: '--dt-radius-card',
    pill: '--dt-radius-pill',
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
      ambient: '--dt-motion-ambient',
      ambientSlow: '--dt-motion-ambient-slow',
      flow: '--dt-motion-flow',
      flowSlow: '--dt-motion-flow-slow',
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
    labelSize: '--dt-label-size',
    labelLeading: '--dt-label-leading',
    smallSize: '--dt-small-size',
    smallLeading: '--dt-small-leading',
    captionSize: '--dt-caption-size',
    captionLeading: '--dt-caption-leading',
    monoSize: '--dt-mono-size',
    monoLeading: '--dt-mono-leading',
    eyebrowSize: '--dt-eyebrow-size',
    eyebrowTracking: '--dt-eyebrow-tracking',
    eyebrowWeight: '--dt-eyebrow-weight',
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
