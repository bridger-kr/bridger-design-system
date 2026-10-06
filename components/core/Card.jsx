// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/core/Card.tsx
// Regenerate: pnpm generate

import { forwardRef } from 'react';
import { cx } from '../lib/cx.jsx';
import { warnOnce } from '../lib/deprecate.jsx';
export const CARD_VARIANT = {
    Plain: 'plain',
    Sunken: 'sunken',
};
/** @deprecated Use `CardVariant` (`plain` | `sunken`). Removed in v2.1. */
export const CardTone = {
    Default: 'default',
    Muted: 'muted',
    Raised: 'raised',
    Panel: 'panel',
};
const LEGACY_VARIANT_MAP = {
    default: CARD_VARIANT.Plain,
    panel: CARD_VARIANT.Plain,
    // v2 prohibits resting elevation: raised collapses to the flat plane.
    raised: CARD_VARIANT.Plain,
    muted: CARD_VARIANT.Sunken,
};
function resolveCardVariant(variant, tone) {
    if (tone !== undefined) {
        warnOnce('card-tone', 'Card: `tone` is deprecated — use `variant` ("plain" | "sunken"). Removed in v2.1.');
    }
    const raw = tone ?? variant ?? CARD_VARIANT.Plain;
    if (raw === CARD_VARIANT.Plain || raw === CARD_VARIANT.Sunken)
        return raw;
    warnOnce(`card-variant-${raw}`, `Card: variant="${raw}" is deprecated — use "${LEGACY_VARIANT_MAP[raw]}". Removed in v2.1.`);
    return LEGACY_VARIANT_MAP[raw];
}
// `variant` is kept in the signature so the selected variant stays part of
// every card render path; backgrounds/transitions come from `.dt-card-*` CSS.
function cardStyle(variant, padding, style) {
    void variant;
    return {
        padding,
        ...style,
    };
}
/**
 * Non-actionable surface container. Use `CardButton` for commands and
 * `CardLink` for navigation; the removed `interactive` flag produced a
 * pointer-only div and must be migrated to the matching semantic action.
 */
export const Card = forwardRef(function Card({ children, variant, tone, padding = 20, className, style, ...rest }, ref) {
    const selectedVariant = resolveCardVariant(variant, tone);
    return (<div ref={ref} className={cx('dt-card', `dt-card-${selectedVariant}`, className)} style={cardStyle(selectedVariant, padding, style)} {...rest}>
      {children}
    </div>);
});
Card.displayName = 'Card';
/** Native card-shaped command. Do not place nested interactive controls inside. */
export const CardButton = forwardRef(function CardButton({ children, variant, tone, padding = 20, className, style, type = 'button', disabled, ...rest }, ref) {
    const selectedVariant = resolveCardVariant(variant, tone);
    return (<button {...rest} ref={ref} type={type} disabled={disabled} className={cx('dt-card', `dt-card-${selectedVariant}`, 'dt-card-action', className)} style={cardStyle(selectedVariant, padding, style)}>
      {children}
    </button>);
});
CardButton.displayName = 'CardButton';
/** Native card-shaped navigation link. Do not place nested interactive controls inside. */
export const CardLink = forwardRef(function CardLink({ children, variant, tone, padding = 20, className, style, href, ...rest }, ref) {
    const selectedVariant = resolveCardVariant(variant, tone);
    return (<a {...rest} ref={ref} href={href} className={cx('dt-card', `dt-card-${selectedVariant}`, 'dt-card-action', className)} style={cardStyle(selectedVariant, padding, style)}>
      {children}
    </a>);
});
CardLink.displayName = 'CardLink';
