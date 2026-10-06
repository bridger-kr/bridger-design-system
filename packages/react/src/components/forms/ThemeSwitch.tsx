import { forwardRef, useEffect, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

export const THEME_PREFERENCE = {
  System: 'system',
  Light: 'light',
  Dark: 'dark',
} as const;

export type ThemePreference = (typeof THEME_PREFERENCE)[keyof typeof THEME_PREFERENCE];
export type ResolvedTheme = 'light' | 'dark';

export const DEFAULT_THEME_STORAGE_KEY = 'bridger-theme';

const THEME_SWITCH_ORDER: readonly ThemePreference[] = [
  THEME_PREFERENCE.System,
  THEME_PREFERENCE.Light,
  THEME_PREFERENCE.Dark,
];

const DEFAULT_THEME_SWITCH_LABELS = {
  group: 'Theme',
  system: 'System',
  light: 'Light',
  dark: 'Dark',
} as const;

function readStoredPreference(storageKey: string): ThemePreference {
  if (typeof window === 'undefined') return THEME_PREFERENCE.System;
  try {
    const stored = window.localStorage.getItem(storageKey);
    if (stored === THEME_PREFERENCE.Light || stored === THEME_PREFERENCE.Dark) return stored;
  } catch {
    // localStorage can be unavailable (private mode); fall through to system.
  }
  return THEME_PREFERENCE.System;
}

function systemTheme(): ResolvedTheme {
  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  return 'dark';
}

export interface ThemeSwitchLabels {
  /** Accessible name for the whole segmented group. */
  group: string;
  system: string;
  light: string;
  dark: string;
}

export interface ThemeSwitchProps {
  /** Per-option labels, also used as tooltips and text fallback when no icon is given. */
  labels?: Partial<ThemeSwitchLabels>;
  /** Optional icon per option (for example Lucide Monitor / Sun / Moon glyphs). */
  icons?: Partial<Record<ThemePreference, ReactNode>>;
  /** Storage key holding an explicit 'light' | 'dark' choice; absent means follow the OS. */
  storageKey?: string;
  className?: string;
  style?: CSSProperties;
  onChange?: (
    preference: ThemePreference,
    resolved: ResolvedTheme,
    previousResolved: ResolvedTheme,
  ) => void;
}

/**
 * Three-state theme switch (system / light / dark). It is the single owner of
 * the theme contract: it writes `:root[data-theme]`, persists explicit choices
 * to `storageKey`, and keeps following `prefers-color-scheme` while the
 * preference stays on `system`.
 */
export const ThemeSwitch = forwardRef<HTMLDivElement, ThemeSwitchProps>(function ThemeSwitch(
  { labels, icons, storageKey = DEFAULT_THEME_STORAGE_KEY, className = '', style, onChange },
  ref,
) {
  const [preference, setPreference] = useState<ThemePreference>(() => readStoredPreference(storageKey));
  const [system, setSystem] = useState<ResolvedTheme>(systemTheme);
  const resolved: ResolvedTheme = preference === THEME_PREFERENCE.System ? system : preference;
  const mergedLabels = { ...DEFAULT_THEME_SWITCH_LABELS, ...labels };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', resolved);
  }, [resolved]);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
    const mql = window.matchMedia('(prefers-color-scheme: light)');
    const onMediaChange = (event: MediaQueryListEvent) => {
      setSystem(event.matches ? 'light' : 'dark');
    };
    mql.addEventListener('change', onMediaChange);
    return () => mql.removeEventListener('change', onMediaChange);
  }, []);

  const select = (next: ThemePreference) => {
    const previousResolved = resolved;
    setPreference(next);
    try {
      if (next === THEME_PREFERENCE.System) {
        window.localStorage.removeItem(storageKey);
      } else {
        window.localStorage.setItem(storageKey, next);
      }
    } catch {
      // Storage is optional; the in-memory choice still applies for this session.
    }
    onChange?.(next, next === THEME_PREFERENCE.System ? system : next, previousResolved);
  };

  return (
    <div
      ref={ref}
      role="group"
      aria-label={mergedLabels.group}
      className={`dt-theme-switch${className ? ` ${className}` : ''}`}
      style={style}
    >
      {THEME_SWITCH_ORDER.map((option) => {
        const active = option === preference;
        const icon = icons?.[option];
        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            aria-label={mergedLabels[option]}
            title={mergedLabels[option]}
            onClick={() => select(option)}
            className={`dt-theme-switch-option${icon ? ' dt-theme-switch-option-icon' : ''}`}
          >
            {icon ?? mergedLabels[option]}
          </button>
        );
      })}
    </div>
  );
});
ThemeSwitch.displayName = 'ThemeSwitch';
