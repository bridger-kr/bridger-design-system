// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/product/ProductShell.tsx
// Regenerate: pnpm generate

import type { HTMLAttributes, ReactNode } from 'react';
export interface ProductShellProps extends HTMLAttributes<HTMLDivElement> {
}
export declare function ProductShell({ className, children, ...rest }: ProductShellProps): import("react").JSX.Element;
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
