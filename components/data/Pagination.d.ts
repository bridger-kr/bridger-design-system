// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/data/Pagination.tsx
// Regenerate: pnpm generate

import type { CSSProperties, HTMLAttributes } from 'react';
export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange' | 'style'> {
    page?: number;
    pageCount?: number;
    onChange?: (page: number) => void;
    style?: CSSProperties;
}
/** Pagination — prev/next plus compact page numbers with an ellipsis. */
export declare const Pagination: import("react").ForwardRefExoticComponent<PaginationProps & import("react").RefAttributes<HTMLElement>>;
