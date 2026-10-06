// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/product/ActionList.tsx
// Regenerate: pnpm generate

import type { HTMLAttributes, ReactNode } from 'react';
export interface ActionListProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
}
export interface ActionListItemClassNameOptions {
    interactive?: boolean;
    className?: string;
}
export interface ActionListIndexProps extends HTMLAttributes<HTMLSpanElement> {
    children: ReactNode;
}
export declare function actionListClassName(className?: string): string;
export declare function actionListItemClassName({ interactive, className }?: ActionListItemClassNameOptions): string;
export declare const ActionList: import("react").ForwardRefExoticComponent<ActionListProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const ActionListIndex: import("react").ForwardRefExoticComponent<ActionListIndexProps & import("react").RefAttributes<HTMLSpanElement>>;
