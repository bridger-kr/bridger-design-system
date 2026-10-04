// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/product/ProductCinematic.tsx
// Regenerate: pnpm generate

import type { HTMLAttributes, ReactNode } from 'react';
export declare const PRODUCT_SHELL_TONE: {
    readonly Cinematic: "cinematic";
    readonly Console: "console";
};
export type ProductShellTone = (typeof PRODUCT_SHELL_TONE)[keyof typeof PRODUCT_SHELL_TONE];
export interface ProductShellProps extends HTMLAttributes<HTMLDivElement> {
    tone?: ProductShellTone;
}
export declare function ProductShell({ tone, className, children, ...rest }: ProductShellProps): import("react").JSX.Element;
export interface ProductCinematicBackdropProps extends HTMLAttributes<HTMLDivElement> {
    animated?: boolean;
}
export declare function ProductCinematicBackdrop({ animated, className, ...rest }: ProductCinematicBackdropProps): import("react").JSX.Element;
export interface ProductMotionFieldProps extends HTMLAttributes<HTMLDivElement> {
    gridSrc?: string;
    label?: string;
}
export declare function ProductMotionField({ gridSrc, label, className, ...rest }: ProductMotionFieldProps): import("react").JSX.Element;
export interface ProductSideRailItem {
    key: string;
    href: string;
    label: ReactNode;
}
export interface ProductSideRailProps extends HTMLAttributes<HTMLElement> {
    items: readonly ProductSideRailItem[];
    label: string;
}
export declare function ProductSideRail({ items, label, className, ...rest }: ProductSideRailProps): import("react").JSX.Element;
