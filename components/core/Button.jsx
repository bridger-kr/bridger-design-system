// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/core/Button.tsx
// Regenerate: pnpm generate

import { forwardRef } from 'react';
import { useRender } from '@base-ui/react/use-render';
import { cx } from '../lib/cx.jsx';
import { warnOnce } from '../lib/deprecate.jsx';
import { Spinner } from '../feedback/Spinner.jsx';
export const BUTTON_VARIANT = {
    Solid: 'solid',
    Outline: 'outline',
    Ghost: 'ghost',
    /** @deprecated Use `BUTTON_VARIANT.Solid`. Removed in v2.1. */
    Primary: 'primary',
    /** @deprecated Use `BUTTON_VARIANT.Outline`. Removed in v2.1. */
    Secondary: 'secondary',
    /** @deprecated Use `variant={BUTTON_VARIANT.Solid}` + `tone="danger"`. Removed in v2.1. */
    Danger: 'danger',
};
export const BUTTON_TONE = {
    Neutral: 'neutral',
    Danger: 'danger',
};
export const BUTTON_SIZE = {
    Small: 'sm',
    Medium: 'md',
    Large: 'lg',
};
const LEGACY_VARIANT = {
    primary: { variant: BUTTON_VARIANT.Solid, tone: BUTTON_TONE.Neutral },
    secondary: { variant: BUTTON_VARIANT.Outline, tone: BUTTON_TONE.Neutral },
    danger: { variant: BUTTON_VARIANT.Solid, tone: BUTTON_TONE.Danger },
};
/**
 * Bridger button. `solid` is the single strongest action per surface;
 * `outline` for regular actions; `ghost` for low-emphasis commands;
 * `tone="danger"` marks a destructive action.
 * @startingPoint section="Core" subtitle="Solid / outline / ghost, neutral / danger" viewport="700x140"
 */
export const Button = forwardRef(function Button({ children, variant = BUTTON_VARIANT.Solid, tone = BUTTON_TONE.Neutral, size = BUTTON_SIZE.Medium, icon, iconRight, disabled = false, loading = false, type = 'button', render, onClick, className, style, ...rest }, ref) {
    let resolvedVariant = variant;
    let resolvedTone = tone;
    const legacy = LEGACY_VARIANT[variant];
    if (legacy) {
        warnOnce(`button-variant-${variant}`, `Button variant="${variant}" is deprecated — use variant="${legacy.variant}"${legacy.tone === 'danger' ? ' tone="danger"' : ''}. Removed in v2.1.`);
        resolvedVariant = legacy.variant;
        if (tone === BUTTON_TONE.Neutral)
            resolvedTone = legacy.tone;
    }
    return useRender({
        render,
        defaultTagName: 'button',
        ref,
        props: {
            type,
            disabled: disabled || loading,
            className: cx('dt-button', `dt-button-${size}`, `dt-button-${resolvedVariant}`, className),
            'data-tone': resolvedTone === BUTTON_TONE.Danger ? 'danger' : undefined,
            'aria-busy': loading || undefined,
            onClick,
            style,
            ...rest,
            children: (<>
          <span className="dt-button-content">
            {icon ? (<span className="dt-button-icon" aria-hidden="true">
                {icon}
              </span>) : null}
            {children}
            {iconRight ? (<span className="dt-button-icon" aria-hidden="true">
                {iconRight}
              </span>) : null}
          </span>
          {loading ? (<span className="dt-button-spinner" aria-hidden="true">
              <Spinner size={16} color="currentColor"/>
            </span>) : null}
        </>),
        },
    });
});
Button.displayName = 'Button';
