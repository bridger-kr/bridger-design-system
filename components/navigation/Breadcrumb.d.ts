// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/navigation/Breadcrumb.tsx
// Regenerate: pnpm generate

import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
export interface BreadcrumbItem {
    label: ReactNode;
    href?: string;
}
export interface BreadcrumbProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
    items?: BreadcrumbItem[];
    style?: CSSProperties;
}
/** Breadcrumb trail — last item is the current page. */
export declare function Breadcrumb({ items, style, ...rest }: BreadcrumbProps): import("react").JSX.Element;
