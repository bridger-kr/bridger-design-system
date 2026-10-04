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
export declare function Menu({ trigger, items, align, width, className, style, ...rest }: MenuProps): import("react").JSX.Element;
