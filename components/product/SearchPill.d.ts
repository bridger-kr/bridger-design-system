// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/product/SearchPill.tsx
// Regenerate: pnpm generate

import type { HTMLAttributes, ReactNode } from 'react';
export declare const SEARCH_PILL_TONE: {
    readonly Accent: "accent";
    readonly Neutral: "neutral";
};
export type SearchPillTone = (typeof SEARCH_PILL_TONE)[keyof typeof SEARCH_PILL_TONE];
export declare const SEARCH_PILL_SIZE: {
    readonly Small: "sm";
    readonly Medium: "md";
    readonly Large: "lg";
};
export type SearchPillSize = (typeof SEARCH_PILL_SIZE)[keyof typeof SEARCH_PILL_SIZE];
export interface SearchPillProps extends HTMLAttributes<HTMLDivElement> {
    tone?: SearchPillTone;
    size?: SearchPillSize;
    leadingIcon?: ReactNode;
    trailingIcon?: ReactNode;
    artifactLabel?: ReactNode;
    children?: ReactNode;
}
export declare const SearchPill: import("react").ForwardRefExoticComponent<SearchPillProps & import("react").RefAttributes<HTMLDivElement>>;
