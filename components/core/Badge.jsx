// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/core/Badge.tsx
// Regenerate: pnpm generate

import { forwardRef } from 'react';
import { cx } from '../lib/cx.jsx';
const TONE_CLASS = {
    neutral: 'dt-badge',
    accent: 'dt-badge dt-badge-accent',
    info: 'dt-badge dt-badge-info',
    success: 'dt-badge dt-badge-success',
    warning: 'dt-badge dt-badge-warning',
    danger: 'dt-badge dt-badge-danger',
};
/**
 * Status / classification badge. Pill-shaped, tinted. Status or
 * classification only — never decorative.
 */
export const Badge = forwardRef(function Badge({ children, tone = 'neutral', dot = false, className, style, ...rest }, ref) {
    const cls = cx(TONE_CLASS[tone] ?? TONE_CLASS.neutral, className);
    return (<span ref={ref} className={cls} style={style} {...rest}>
      {dot ? (<span aria-hidden="true" style={{
                width: 6,
                height: 6,
                borderRadius: 'var(--dt-radius-pill)',
                background: 'currentColor',
                display: 'inline-block',
            }}/>) : null}
      {children}
    </span>);
});
Badge.displayName = 'Badge';
