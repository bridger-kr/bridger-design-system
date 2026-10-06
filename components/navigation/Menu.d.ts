// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/navigation/Menu.tsx
// Regenerate: pnpm generate

import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
export interface MenuItem {
    label?: ReactNode;
    icon?: ReactNode;
    onClick?: () => void;
    danger?: boolean;
    divider?: boolean;
}
export interface MenuProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
    trigger: ReactNode;
    items?: MenuItem[];
    align?: 'left' | 'right';
    width?: number;
    style?: CSSProperties;
}
export declare const Menu: import("react").ForwardRefExoticComponent<MenuProps & import("react").RefAttributes<HTMLSpanElement>>;
