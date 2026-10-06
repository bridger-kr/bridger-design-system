// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/core/Badge.tsx
// Regenerate: pnpm generate

import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'style'> {
    children?: ReactNode;
    /** Semantic tone. info/success/warning/danger are status-only. */
    tone?: 'neutral' | 'accent' | 'info' | 'success' | 'warning' | 'danger';
    /** Show a leading status dot in the current tone color. */
    dot?: boolean;
    style?: CSSProperties;
}
/**
 * Status / classification badge. Pill-shaped, tinted. Status or
 * classification only — never decorative.
 */
export declare const Badge: import("react").ForwardRefExoticComponent<BadgeProps & import("react").RefAttributes<HTMLSpanElement>>;
