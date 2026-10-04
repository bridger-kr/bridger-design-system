// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/product/SectionCard.tsx
// Regenerate: pnpm generate

import type { ReactNode, HTMLAttributes } from 'react';
export interface SectionCardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
    eyebrow?: string;
    title?: ReactNode;
    description?: ReactNode;
    /** Right-aligned action (usually a ghost Button). */
    action?: ReactNode;
    children?: ReactNode;
    contentClassName?: string;
}
/**
 * Console section panel — title, description, action, body. No eyebrow kicker:
 * the title is a plain noun-phrase heading, the section's own content does the
 * rest. Lay items flat inside; never card-in-card.
 */
export declare function SectionCard({ eyebrow, title, description, action, children, contentClassName, style, ...rest }: SectionCardProps): import("react").JSX.Element;
