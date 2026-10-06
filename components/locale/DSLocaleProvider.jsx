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
export function DSLocaleProvider({ locale = 'ko', messages, children }) {
    const value = useMemo(() => mergeDSMessages(DS_MESSAGES[locale] ?? DS_MESSAGES.ko, messages), [locale, messages]);
    return <DSMessageContext.Provider value={value}>{children}</DSMessageContext.Provider>;
}
/** Default UI strings for the ambient locale. Falls back to Korean outside a provider. */
export function useDSMessages() {
    return useContext(DSMessageContext);
}
