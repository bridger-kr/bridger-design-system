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
export declare function ActionList({ children, className, ...rest }: ActionListProps): import("react").JSX.Element;
export declare function ActionListIndex({ children, className, ...rest }: ActionListIndexProps): import("react").JSX.Element;
