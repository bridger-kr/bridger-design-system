// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/feedback/Spinner.tsx
// Regenerate: pnpm generate

import type { CSSProperties, HTMLAttributes } from 'react';
export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
    size?: number;
    stroke?: number;
    color?: string;
    /** Accessible name announced through the status role. Pass `aria-hidden` instead when a parent (e.g. a busy button) already conveys the loading state. */
    label?: string;
    style?: CSSProperties;
}
export declare const Spinner: import("react").ForwardRefExoticComponent<SpinnerProps & import("react").RefAttributes<HTMLSpanElement>>;
