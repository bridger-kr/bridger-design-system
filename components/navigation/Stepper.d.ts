import * as React from 'react';

export interface Step { label: string; description?: string; }
export interface StepperProps {
  steps: Step[];
  /** Index of the in-progress step; earlier steps render as done. */
  current?: number;
  orientation?: 'horizontal' | 'vertical';
  style?: React.CSSProperties;
}

/**
 * Multi-step progress — done (check) / current (persimmon) / upcoming (muted).
 * @startingPoint section="Navigation" subtitle="Onboarding step progress" viewport="560x120"
 */
export function Stepper(props: StepperProps): React.JSX.Element;
