// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/forms/ThemeSwitch.tsx
// Regenerate: pnpm generate

import { forwardRef, useEffect, useState } from 'react';
export const THEME_PREFERENCE = {
    System: 'system',
    Light: 'light',
    Dark: 'dark',
};
export const DEFAULT_THEME_STORAGE_KEY = 'bridger-theme';
const THEME_PREFERENCE_EVENT = 'bridger-theme-preference-change';
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
function isThemePreference(value) {
    return value === THEME_PREFERENCE.Light || value === THEME_PREFERENCE.Dark || value === THEME_PREFERENCE.System;
}
function readStoredPreference(storageKey) {
    if (typeof window === 'undefined')
        return THEME_PREFERENCE.Light;
    try {
        const stored = window.localStorage.getItem(storageKey);
        if (isThemePreference(stored))
            return stored;
    }
    catch {
        // Storage is optional; use the light default.
    }
    return THEME_PREFERENCE.Light;
}
function systemTheme() {
    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    return 'light';
}
/**
 * Three-state theme switch (system / light / dark). It is the single owner of
 * the theme contract: it writes `:root[data-theme]`, persists explicit choices
 * to `storageKey`, and keeps following `prefers-color-scheme` while the
 * preference stays on `system`.
 */
export const ThemeSwitch = forwardRef(function ThemeSwitch({ labels, icons, storageKey = DEFAULT_THEME_STORAGE_KEY, className = '', style, onChange }, ref) {
    const [preference, setPreference] = useState(() => readStoredPreference(storageKey));
    const [system, setSystem] = useState(systemTheme);
    const resolved = preference === THEME_PREFERENCE.System ? system : preference;
    const mergedLabels = { ...DEFAULT_THEME_SWITCH_LABELS, ...labels };
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', resolved);
    }, [resolved]);
    useEffect(() => {
        const onPreferenceChange = (event) => {
            if (!(event instanceof CustomEvent))
                return;
            const detail = event.detail;
            if (!detail || typeof detail !== 'object' || !('storageKey' in detail) || detail.storageKey !== storageKey)
                return;
            if ('preference' in detail && isThemePreference(detail.preference))
                setPreference(detail.preference);
        };
        const onStorageChange = (event) => {
            if (event.key === storageKey || event.key === null)
                setPreference(readStoredPreference(storageKey));
        };
        window.addEventListener(THEME_PREFERENCE_EVENT, onPreferenceChange);
        window.addEventListener('storage', onStorageChange);
        return () => {
            window.removeEventListener(THEME_PREFERENCE_EVENT, onPreferenceChange);
            window.removeEventListener('storage', onStorageChange);
        };
    }, [storageKey]);
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
            window.localStorage.setItem(storageKey, next);
        }
        catch {
            // Storage is optional; the in-memory choice still applies for this session.
        }
        window.dispatchEvent(new CustomEvent(THEME_PREFERENCE_EVENT, { detail: { storageKey, preference: next } }));
        onChange?.(next, next === THEME_PREFERENCE.System ? system : next, previousResolved);
    };
    return (<div ref={ref} role="group" aria-label={mergedLabels.group} className={`dt-theme-switch${className ? ` ${className}` : ''}`} style={style}>
      {THEME_SWITCH_ORDER.map((option) => {
            const active = option === preference;
            const icon = icons?.[option];
            return (<button key={option} type="button" aria-pressed={active} aria-label={mergedLabels[option]} title={mergedLabels[option]} onClick={() => select(option)} className={`dt-theme-switch-option${icon ? ' dt-theme-switch-option-icon' : ''}`}>
            {icon ?? mergedLabels[option]}
          </button>);
        })}
    </div>);
});
ThemeSwitch.displayName = 'ThemeSwitch';
