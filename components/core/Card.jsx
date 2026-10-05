// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/core/Card.tsx
// Regenerate: pnpm generate

import { cx } from '../lib/cx.jsx';
export const CardTone = {
    Default: 'default',
    Muted: 'muted',
    Raised: 'raised',
    Panel: 'panel',
};
const VARIANT_STYLE = {
    default: { background: 'var(--dt-surface)', boxShadow: 'none' },
    muted: { background: 'var(--dt-surface-sunken)', boxShadow: 'none' },
    raised: { background: 'var(--dt-surface-raised)' },
    panel: { background: 'var(--dt-surface)', boxShadow: 'none' },
};
function cardStyle(tone, padding, style) {
    return {
        borderRadius: 'var(--dt-radius-card)',
        border: '1px solid var(--dt-border)',
        color: 'var(--dt-text)',
        padding,
        transition: 'border-color var(--dt-duration-base) var(--dt-ease), box-shadow var(--dt-duration-base) var(--dt-ease), background-color var(--dt-duration-base) var(--dt-ease), transform var(--dt-duration-base) var(--dt-ease)',
        ...VARIANT_STYLE[tone],
        ...style,
    };
}
/**
 * Non-actionable surface container. Use `CardButton` for commands and
 * `CardLink` for navigation; the removed `interactive` flag produced a
 * pointer-only div and must be migrated to the matching semantic action.
 */
export function Card({ children, variant, tone, padding = 20, className, style, ...rest }) {
    const selectedTone = tone ?? variant ?? CardTone.Default;
    return (<div className={cx('dt-card', `dt-card-${selectedTone}`, className)} style={cardStyle(selectedTone, padding, style)} {...rest}>
      {children}
    </div>);
}
/** Native card-shaped command. Do not place nested interactive controls inside. */
export function CardButton({ children, variant, tone, padding = 20, className, style, type = 'button', disabled, ...rest }) {
    const selectedTone = tone ?? variant ?? CardTone.Default;
    return (<button {...rest} type={type} disabled={disabled} className={cx('dt-card', `dt-card-${selectedTone}`, 'dt-card-action', className)} style={{
            appearance: 'none',
            display: 'block',
            font: 'inherit',
            minHeight: 'var(--dt-space-5)',
            textAlign: 'inherit',
            width: '100%',
            ...cardStyle(selectedTone, padding, style),
        }}>
      {children}
    </button>);
}
/** Native card-shaped navigation link. Do not place nested interactive controls inside. */
export function CardLink({ children, variant, tone, padding = 20, className, style, href, ...rest }) {
    const selectedTone = tone ?? variant ?? CardTone.Default;
    return (<a {...rest} href={href} className={cx('dt-card', `dt-card-${selectedTone}`, 'dt-card-action', className)} style={{
            display: 'block',
            minHeight: 'var(--dt-space-5)',
            textDecoration: 'none',
            width: '100%',
            ...cardStyle(selectedTone, padding, style),
        }}>
      {children}
    </a>);
}
