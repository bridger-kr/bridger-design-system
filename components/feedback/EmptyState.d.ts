// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/feedback/EmptyState.tsx
// Regenerate: pnpm generate

import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    icon?: ReactNode;
    title?: ReactNode;
    description?: ReactNode;
    action?: ReactNode;
    style?: CSSProperties;
}
/** Empty state for lists/tables — quiet icon, title, guidance, action. */
export declare const EmptyState: import("react").ForwardRefExoticComponent<EmptyStateProps & import("react").RefAttributes<HTMLDivElement>>;
