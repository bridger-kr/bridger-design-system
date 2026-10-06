// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/navigation/ConsolePageHeader.tsx
// Regenerate: pnpm generate

import type { HTMLAttributes, ReactNode } from 'react';
export interface ConsolePageHeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
    /** Page name — rendered as the route's single h1 (20px / 600). */
    title: ReactNode;
    /** Supporting copy (14px, subtle). */
    description?: ReactNode;
    /** Right-aligned actions — keep to two or fewer. */
    actions?: ReactNode;
    children?: ReactNode;
}
/**
 * Console route header — flat title/description/actions row shared by every
 * authenticated page so routes read identically. No eyebrow: console pages do
 * not carry decorative kickers.
 * @startingPoint section="Navigation" subtitle="Console page header" viewport="720x160"
 */
export declare const ConsolePageHeader: import("react").ForwardRefExoticComponent<ConsolePageHeaderProps & import("react").RefAttributes<HTMLElement>>;
