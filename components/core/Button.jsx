// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/core/Button.tsx
// Regenerate: pnpm generate

import { cx } from '../lib/cx.jsx';
export const BUTTON_VARIANT = {
    Primary: 'primary',
    Secondary: 'secondary',
    Ghost: 'ghost',
    Danger: 'danger',
};
export const BUTTON_SIZE = {
    Small: 'sm',
    Medium: 'md',
    Large: 'lg',
};
const VARIANT_CLASS = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
    danger: 'btn-danger',
};
/**
 * Bridger button. Primary is the single strongest action per screen;
 * secondary for regular actions; ghost for low-emphasis commands; danger for destructive actions.
 *
 * The one strongest action per screen uses the ink-filled primary variant.
 * @startingPoint section="Core" subtitle="Primary / secondary / ghost / danger actions" viewport="700x140"
 */
export function Button({ children, variant = BUTTON_VARIANT.Primary, size = BUTTON_SIZE.Medium, icon = null, iconRight = null, disabled = false, type = 'button', onClick, className, style, ...rest }) {
    const cls = VARIANT_CLASS[variant];
    return (<button type={type} className={cx('dt-button', `dt-button-${size}`, cls, className)} disabled={disabled} onClick={onClick} style={style} {...rest}>
      {icon ? <span className="dt-button-icon" aria-hidden="true">{icon}</span> : null}
      {children}
      {iconRight ? <span className="dt-button-icon" aria-hidden="true">{iconRight}</span> : null}
    </button>);
}
