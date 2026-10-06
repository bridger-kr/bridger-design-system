// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/locale/DSLocaleProvider.tsx
// Regenerate: pnpm generate

import type { ReactNode } from 'react';
import { type DSMessageCatalog, type DSLocale } from './messages';
/** Recursive partial: strings and functions are leaves, objects merge. */
type MessageLeaves<T> = T extends string | ((...args: never[]) => unknown) ? T : {
    [K in keyof T]?: MessageLeaves<T[K]>;
};
export type DSMessageOverrides = {
    [K in keyof DSMessageCatalog]?: MessageLeaves<DSMessageCatalog[K]>;
};
export declare function mergeDSMessages(base: DSMessageCatalog, overrides?: DSMessageOverrides): DSMessageCatalog;
export interface DSLocaleProviderProps {
    /** Catalog to resolve defaults from. Defaults to Korean per DESIGN.md §3.2. */
    locale?: DSLocale;
    /** Partial catalog merged over the locale's defaults. */
    messages?: DSMessageOverrides;
    children?: ReactNode;
}
export declare function DSLocaleProvider({ locale, messages, children }: DSLocaleProviderProps): import("react").JSX.Element;
/** Default UI strings for the ambient locale. Falls back to Korean outside a provider. */
export declare function useDSMessages(): DSMessageCatalog;
export {};
