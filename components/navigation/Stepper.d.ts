// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/navigation/Stepper.tsx
// Regenerate: pnpm generate

import type { CSSProperties, HTMLAttributes } from 'react';
export interface Step {
    label: string;
    description?: string;
}
export interface StepperProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    steps?: Step[];
    /** Index of the in-progress step; earlier steps render as done. */
    current?: number;
    orientation?: 'horizontal' | 'vertical';
    style?: CSSProperties;
}
/**
 * Multi-step progress — done (check) / current (persimmon) / upcoming (muted).
 * @startingPoint section="Navigation" subtitle="Onboarding step progress" viewport="560x120"
 */
export declare function Stepper({ steps, current, orientation, style, ...rest }: StepperProps): import("react").JSX.Element;
