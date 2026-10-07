// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/locale/DSLocaleProvider.tsx
// Regenerate: pnpm generate

import { createContext, useContext, useMemo } from 'react';
import { DS_MESSAGES } from './messages.jsx';
function isPlainObject(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
function mergeNode(base, override) {
    if (override === undefined)
        return base;
    if (!isPlainObject(base) || !isPlainObject(override))
        return override;
    const out = { ...base };
    for (const key of Object.keys(override)) {
        out[key] = mergeNode(base[key], override[key]);
    }
    return out;
}
export function mergeDSMessages(base, overrides) {
    return (overrides ? mergeNode(base, overrides) : base);
}
const DSMessageContext = createContext(DS_MESSAGES.ko);
const DSLocaleContext = createContext('ko');
/** Dev-mode warning for override keys that don't exist in the catalog. */
function warnUnknownOverrides(base, overrides, path) {
    for (const key of Object.keys(overrides)) {
        const next = path ? `${path}.${key}` : key;
        if (!(key in base)) {
            console.warn(`[ds-locale] Unknown message override '${next}' — check for typos or a catalog version mismatch.`);
            continue;
        }
        if (isPlainObject(base[key]) && isPlainObject(overrides[key])) {
            warnUnknownOverrides(base[key], overrides[key], next);
        }
    }
}
export function DSLocaleProvider({ locale = 'ko', messages, children }) {
    const resolvedLocale = DS_MESSAGES[locale] ? locale : 'ko';
    const value = useMemo(() => {
        if (typeof process === 'undefined' || process.env?.NODE_ENV !== 'production') {
            if (messages) {
                warnUnknownOverrides(DS_MESSAGES[resolvedLocale], messages, '');
            }
        }
        return mergeDSMessages(DS_MESSAGES[resolvedLocale], messages);
    }, [resolvedLocale, messages]);
    return (<DSLocaleContext.Provider value={resolvedLocale}>
      <DSMessageContext.Provider value={value}>{children}</DSMessageContext.Provider>
    </DSLocaleContext.Provider>);
}
/** Default UI strings for the ambient locale. Falls back to Korean outside a provider. */
export function useDSMessages() {
    return useContext(DSMessageContext);
}
/** The active DS locale ('ko' | 'en') for Intl formatting and locale-aware helpers. */
export function useDSLocale() {
    return useContext(DSLocaleContext);
}
