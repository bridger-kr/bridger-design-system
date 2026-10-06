// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/forms/ThemeSwitch.tsx
// Regenerate: pnpm generate

import type { CSSProperties, ReactNode } from 'react';
export declare const THEME_PREFERENCE: {
    readonly System: "system";
    readonly Light: "light";
    readonly Dark: "dark";
};
export type ThemePreference = (typeof THEME_PREFERENCE)[keyof typeof THEME_PREFERENCE];
export type ResolvedTheme = 'light' | 'dark';
export declare const DEFAULT_THEME_STORAGE_KEY = "bridger-theme";
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
    onChange?: (preference: ThemePreference, resolved: ResolvedTheme, previousResolved: ResolvedTheme) => void;
}
/**
 * Three-state theme switch (system / light / dark). It is the single owner of
 * the theme contract: it writes `:root[data-theme]`, persists explicit choices
 * to `storageKey`, and keeps following `prefers-color-scheme` while the
 * preference stays on `system`.
 */
export declare const ThemeSwitch: import("react").ForwardRefExoticComponent<ThemeSwitchProps & import("react").RefAttributes<HTMLDivElement>>;
