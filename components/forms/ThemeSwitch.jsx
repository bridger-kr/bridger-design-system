// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/forms/ThemeSwitch.tsx
// Regenerate: pnpm generate

import { useEffect, useState } from 'react';
export const THEME_PREFERENCE = {
    System: 'system',
    Light: 'light',
    Dark: 'dark',
};
export const DEFAULT_THEME_STORAGE_KEY = 'bridger-theme';
const THEME_SWITCH_ORDER = [
    THEME_PREFERENCE.System,
    THEME_PREFERENCE.Light,
    THEME_PREFERENCE.Dark,
];
const DEFAULT_THEME_SWITCH_LABELS = {
    group: 'Theme',
    system: 'System',
    light: 'Light',
    dark: 'Dark',
};
function readStoredPreference(storageKey) {
    if (typeof window === 'undefined')
        return THEME_PREFERENCE.System;
    try {
        const stored = window.localStorage.getItem(storageKey);
        if (stored === THEME_PREFERENCE.Light || stored === THEME_PREFERENCE.Dark)
            return stored;
    }
    catch {
        // localStorage can be unavailable (private mode); fall through to system.
    }
    return THEME_PREFERENCE.System;
}
function systemTheme() {
    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    return 'dark';
}
/**
 * Three-state theme switch (system / light / dark). It is the single owner of
 * the theme contract: it writes `:root[data-theme]`, persists explicit choices
 * to `storageKey`, and keeps following `prefers-color-scheme` while the
 * preference stays on `system`.
 */
export function ThemeSwitch({ labels, icons, storageKey = DEFAULT_THEME_STORAGE_KEY, className = '', style, onChange, }) {
    const [preference, setPreference] = useState(() => readStoredPreference(storageKey));
    const [system, setSystem] = useState(systemTheme);
    const resolved = preference === THEME_PREFERENCE.System ? system : preference;
    const mergedLabels = { ...DEFAULT_THEME_SWITCH_LABELS, ...labels };
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', resolved);
    }, [resolved]);
    useEffect(() => {
        if (typeof window === 'undefined' || typeof window.matchMedia !== 'function')
            return;
        const mql = window.matchMedia('(prefers-color-scheme: light)');
        const onMediaChange = (event) => {
            setSystem(event.matches ? 'light' : 'dark');
        };
        mql.addEventListener('change', onMediaChange);
        return () => mql.removeEventListener('change', onMediaChange);
    }, []);
    const select = (next) => {
        const previousResolved = resolved;
        setPreference(next);
        try {
            if (next === THEME_PREFERENCE.System) {
                window.localStorage.removeItem(storageKey);
            }
            else {
                window.localStorage.setItem(storageKey, next);
            }
        }
        catch {
            // Storage is optional; the in-memory choice still applies for this session.
        }
        onChange?.(next, next === THEME_PREFERENCE.System ? system : next, previousResolved);
    };
    return (<div role="group" aria-label={mergedLabels.group} className={`dt-theme-switch${className ? ` ${className}` : ''}`} style={style}>
      {THEME_SWITCH_ORDER.map((option) => {
            const active = option === preference;
            const icon = icons?.[option];
            return (<button key={option} type="button" aria-pressed={active} aria-label={mergedLabels[option]} title={mergedLabels[option]} onClick={() => select(option)} className={`dt-theme-switch-option${icon ? ' dt-theme-switch-option-icon' : ''}`}>
            {icon ?? mergedLabels[option]}
          </button>);
        })}
    </div>);
}
