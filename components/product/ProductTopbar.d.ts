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
}
export declare function ProductTopbarMenu({ children, closeLabel, dialogLabel, label, navigationLabel, className, ...rest }: ProductTopbarMenuProps): import("react").JSX.Element;
export declare function ProductTopbar({ brand, actions, mobileActions, mobileMenuCloseLabel, mobileMenuDialogLabel, mobileMenuLabel, mobileMenuNavigationLabel, className, ...rest }: ProductTopbarProps): import("react").JSX.Element;
