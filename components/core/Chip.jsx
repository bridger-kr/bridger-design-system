// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/core/Chip.tsx
// Regenerate: pnpm generate

import { forwardRef } from 'react';
import { cx } from '../lib/cx.jsx';
import { warnOnce } from '../lib/deprecate.jsx';
function isActionChip(props) {
    return typeof props.onClick === 'function';
}
function resolveChipTone({ tone, variant }) {
    if (variant !== undefined) {
        warnOnce('chip-variant', 'Chip: `variant` is deprecated — use `tone` with the same values. Removed in v2.1.');
    }
    return tone ?? variant ?? 'neutral';
}
/**
 * Compact classification tag. Supplying `onClick` creates a native button with
 * keyboard, focus, and disabled behavior; omit it for a non-actionable span.
 */
export const Chip = forwardRef(function Chip(props, ref) {
    if (isActionChip(props)) {
        const { tone, variant, size = 'md', className, children, onClick, type = 'button', disabled = false, style, ...rest } = props;
        const resolvedTone = resolveChipTone({ tone, variant });
        return (<button {...rest} ref={ref} type={type} className={cx('dt-chip', `dt-chip-${resolvedTone}`, `dt-chip-${size}`, 'dt-chip-interactive', className)} disabled={disabled} onClick={onClick} style={{ minHeight: 'var(--dt-space-5)', minWidth: 'var(--dt-space-5)', ...style }}>
        {children}
      </button>);
    }
    const { tone, variant, size = 'md', className, children, style, ...rest } = props;
    const resolvedTone = resolveChipTone({ tone, variant });
    return (<span {...rest} ref={ref} className={cx('dt-chip', `dt-chip-${resolvedTone}`, `dt-chip-${size}`, className)} style={style}>
      {children}
    </span>);
});
Chip.displayName = 'Chip';
