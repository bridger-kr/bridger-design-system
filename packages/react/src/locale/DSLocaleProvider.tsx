import type { ReactNode } from 'react';
import { createContext, useContext, useMemo } from 'react';
import { DS_MESSAGES, type DSMessageCatalog, type DSLocale } from './messages';

/** Recursive partial: strings and functions are leaves, objects merge. */
type MessageLeaves<T> = T extends string | ((...args: never[]) => unknown)
  ? T
  : { [K in keyof T]?: MessageLeaves<T[K]> };

export type DSMessageOverrides = {
  [K in keyof DSMessageCatalog]?: MessageLeaves<DSMessageCatalog[K]>;
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function mergeNode(base: unknown, override: unknown): unknown {
  if (override === undefined) return base;
  if (!isPlainObject(base) || !isPlainObject(override)) return override;
  const out: Record<string, unknown> = { ...base };
  for (const key of Object.keys(override)) {
    out[key] = mergeNode(base[key], override[key]);
  }
  return out;
}

export function mergeDSMessages(
  base: DSMessageCatalog,
  overrides?: DSMessageOverrides,
): DSMessageCatalog {
  return (overrides ? mergeNode(base, overrides) : base) as DSMessageCatalog;
}

const DSMessageContext = createContext<DSMessageCatalog>(DS_MESSAGES.ko);

export interface DSLocaleProviderProps {
  /** Catalog to resolve defaults from. Defaults to Korean per DESIGN.md §3.2. */
  locale?: DSLocale;
  /** Partial catalog merged over the locale's defaults. */
  messages?: DSMessageOverrides;
  children?: ReactNode;
}

export function DSLocaleProvider({ locale = 'ko', messages, children }: DSLocaleProviderProps) {
  const value = useMemo(
    () => mergeDSMessages(DS_MESSAGES[locale] ?? DS_MESSAGES.ko, messages),
    [locale, messages],
  );
  return <DSMessageContext.Provider value={value}>{children}</DSMessageContext.Provider>;
}

/** Default UI strings for the ambient locale. Falls back to Korean outside a provider. */
export function useDSMessages(): DSMessageCatalog {
  return useContext(DSMessageContext);
}
