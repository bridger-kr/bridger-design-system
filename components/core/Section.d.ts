// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/core/Section.tsx
// Regenerate: pnpm generate

import type { HTMLAttributes, ReactNode } from 'react';
/** `plain` = transparent band; `sunken` = recessed surface wash. */
export type SectionVariant = 'plain' | 'sunken';
/** Deprecated v1 layout roles accepted on `variant` for one minor cycle. */
type LegacySectionVariant = 'band' | 'proof';
/** @deprecated Use `variant`. Removed in v2.1. */
export type SectionTone = 'soft' | 'accent-wash' | 'grid';
/** Inner content column width. */
export type SectionWidth = 'narrow' | 'default' | 'wide';
export interface SectionProps extends HTMLAttributes<HTMLElement> {
    /** Background treatment. `band`/`proof` are deprecated and map to `sunken`. */
    variant?: SectionVariant | LegacySectionVariant;
    /** @deprecated Use `variant`. `soft` → `plain`; `accent-wash`/`grid` → `sunken`. Removed in v2.1. */
    tone?: SectionTone;
    /** Content column width. */
    width?: SectionWidth;
    innerClassName?: string;
    children?: ReactNode;
}
export declare const Section: import("react").ForwardRefExoticComponent<SectionProps & import("react").RefAttributes<HTMLElement>>;
export {};
