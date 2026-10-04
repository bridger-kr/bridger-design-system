// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/core/Section.tsx
// Regenerate: pnpm generate

import type { HTMLAttributes, ReactNode } from 'react';
export type SectionVariant = 'band' | 'proof' | 'plain';
export type SectionTone = 'soft' | 'accent-wash' | 'grid';
export interface SectionProps extends HTMLAttributes<HTMLElement> {
    variant?: SectionVariant;
    tone?: SectionTone;
    innerClassName?: string;
    children?: ReactNode;
}
export declare function Section({ variant, tone, innerClassName, className, children, ...rest }: SectionProps): import("react").JSX.Element;
