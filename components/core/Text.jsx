// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/core/Text.tsx
// Regenerate: pnpm generate

import { forwardRef } from 'react';
import { cx } from '../lib/cx.jsx';
/**
 * Fixed v2 type scale for body-range text (DESIGN.md §4.3): no size outside
 * these four steps is permitted. `Heading` owns the 20/28/36 display steps.
 */
export const TEXT_SIZE = {
    Caption: 12,
    Small: 13,
    Label: 14,
    Body: 16,
};
export const TEXT_TONE = {
    Default: 'default',
    Muted: 'muted',
    Accent: 'accent',
    Danger: 'danger',
};
export const TEXT_WEIGHT = {
    Regular: 400,
    Medium: 500,
    Semibold: 600,
};
/**
 * Scale-locked body text. Enforces the 12/13/14/16 scale and the four text
 * roles so app code cannot reintroduce off-scale sizes or one-off colors
 * (EDD-231). Use `Heading` for real headings — this primitive never renders
 * a heading element.
 */
export const Text = forwardRef(function Text({ children, size = TEXT_SIZE.Body, weight, tone = TEXT_TONE.Default, as = 'span', className, ...rest }, ref) {
    const Tag = as;
    return (<Tag ref={ref} className={cx('dt-text', className)} data-size={size} data-weight={weight} data-tone={tone === TEXT_TONE.Default ? undefined : tone} {...rest}>
      {children}
    </Tag>);
});
Text.displayName = 'Text';
