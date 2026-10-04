// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/product/ProductActionPill.tsx
// Regenerate: pnpm generate

import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
export declare const PRODUCT_ACTION_PILL_VARIANT: {
    readonly Default: "default";
    readonly Accent: "accent";
    readonly Outline: "outline";
};
export declare const PRODUCT_ACTION_PILL_SIZE: {
    readonly Compact: "compact";
    readonly Hero: "hero";
};
export type ProductActionPillVariant = (typeof PRODUCT_ACTION_PILL_VARIANT)[keyof typeof PRODUCT_ACTION_PILL_VARIANT];
export type ProductActionPillSize = (typeof PRODUCT_ACTION_PILL_SIZE)[keyof typeof PRODUCT_ACTION_PILL_SIZE];
export type ProductActionPillProps<T extends ElementType = 'a'> = {
    as?: T;
    variant?: ProductActionPillVariant;
    size?: ProductActionPillSize;
    leadingIcon?: ReactNode;
    trailingIcon?: ReactNode;
    children?: ReactNode;
    className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;
export declare function productActionPillClassName({ variant, size, iconOnly, className, }?: {
    variant?: ProductActionPillVariant;
    size?: ProductActionPillSize;
    iconOnly?: boolean;
    className?: string;
}): string;
export declare function ProductActionPill<T extends ElementType = 'a'>({ as, variant, size, leadingIcon, trailingIcon, children, className, ...rest }: ProductActionPillProps<T>): import("react").JSX.Element;
