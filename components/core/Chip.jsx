// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/core/Chip.tsx
// Regenerate: pnpm generate

import { cx } from '../lib/cx.jsx';
function isActionChip(props) {
    return typeof props.onClick === 'function';
}
/**
 * Compact classification tag. Supplying `onClick` creates a native button with
 * keyboard, focus, and disabled behavior; omit it for a non-actionable span.
 */
export function Chip(props) {
    if (isActionChip(props)) {
        const { variant = 'neutral', size = 'md', className, children, onClick, type = 'button', disabled = false, style, ...rest } = props;
        return (<button {...rest} type={type} className={cx('dt-chip', `dt-chip-${variant}`, `dt-chip-${size}`, 'dt-chip-interactive', className)} disabled={disabled} onClick={onClick} style={{ minHeight: 'var(--dt-space-5)', minWidth: 'var(--dt-space-5)', ...style }}>
        {children}
      </button>);
    }
    const { variant = 'neutral', size = 'md', className, children, style, ...rest } = props;
    return (<span {...rest} className={cx('dt-chip', `dt-chip-${variant}`, `dt-chip-${size}`, className)} style={style}>
      {children}
    </span>);
}
