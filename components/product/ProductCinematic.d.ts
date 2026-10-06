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
export declare const ProductShell: import("react").ForwardRefExoticComponent<ProductShellProps & import("react").RefAttributes<HTMLDivElement>>;
export interface ProductCinematicBackdropProps extends HTMLAttributes<HTMLDivElement> {
    animated?: boolean;
}
export declare const ProductCinematicBackdrop: import("react").ForwardRefExoticComponent<ProductCinematicBackdropProps & import("react").RefAttributes<HTMLDivElement>>;
export interface ProductMotionFieldProps extends HTMLAttributes<HTMLDivElement> {
    gridSrc?: string;
    label?: string;
}
export declare const ProductMotionField: import("react").ForwardRefExoticComponent<ProductMotionFieldProps & import("react").RefAttributes<HTMLDivElement>>;
export interface ProductSideRailItem {
    key: string;
    href: string;
    label: ReactNode;
}
export interface ProductSideRailProps extends HTMLAttributes<HTMLElement> {
    items: readonly ProductSideRailItem[];
    label: string;
}
export declare const ProductSideRail: import("react").ForwardRefExoticComponent<ProductSideRailProps & import("react").RefAttributes<HTMLElement>>;
