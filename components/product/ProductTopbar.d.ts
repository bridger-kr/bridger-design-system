// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/product/ProductTopbar.tsx
// Regenerate: pnpm generate

import type { HTMLAttributes, ReactNode } from 'react';
export interface ProductTopbarProps extends HTMLAttributes<HTMLElement> {
    brand: ReactNode;
    actions: ReactNode;
    mobileActions?: ReactNode;
    mobileMenuCloseLabel?: string;
    mobileMenuDialogLabel?: string;
    mobileMenuLabel?: string;
    mobileMenuNavigationLabel?: string;
}
export interface ProductTopbarMenuProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    closeLabel?: string;
    dialogLabel?: string;
    label?: string;
    navigationLabel?: string;
    /** Controlled open state of the mobile menu. */
    open?: boolean;
    /** Uncontrolled initial open state. */
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
}
export declare const ProductTopbarMenu: import("react").ForwardRefExoticComponent<ProductTopbarMenuProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const ProductTopbar: import("react").ForwardRefExoticComponent<ProductTopbarProps & import("react").RefAttributes<HTMLElement>>;
