// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/forms/Field.tsx
// Regenerate: pnpm generate

import { cloneElement, isValidElement, useId } from 'react';
import { cx } from '../lib/cx.jsx';
/**
 * Field — label + control + hint + error with `aria-describedby` wiring.
 * Wraps any Bridger control; keeps validation off color alone by pairing the
 * error text with the invalid state.
 */
export function Field({ label, hint, error, required = false, disabled = false, id, children, className, style, ...rest }) {
    const generatedId = useId();
    const controlId = id ?? `field-${generatedId}`;
    const hintId = `${controlId}-hint`;
    const errorId = `${controlId}-error`;
    const invalid = error != null && error !== false;
    const describedBy = [hint ? hintId : null, invalid ? errorId : null]
        .filter(Boolean)
        .join(' ') || undefined;
    const controlProps = {
        id: controlId,
        ...(describedBy ? { 'aria-describedby': describedBy } : {}),
        ...(invalid ? { 'aria-invalid': true } : {}),
        ...(required ? { 'aria-required': true, required: true } : {}),
        ...(disabled ? { disabled: true } : {}),
    };
    const control = typeof children === 'function'
        ? children(controlProps)
        : isValidElement(children)
            ? cloneElement(children, controlProps)
            : children;
    return (<div {...rest} className={cx('dt-field-group', className)} data-invalid={invalid ? '' : undefined} style={{ display: 'grid', gap: 7, ...style }}>
      {label ? (<label htmlFor={controlId} style={{ fontSize: 13, fontWeight: 600, color: 'var(--dt-muted-strong)' }}>
          {label}
          {required ? (<span aria-hidden="true" style={{ marginLeft: 4, color: 'var(--dt-accent)' }}>*</span>) : null}
        </label>) : null}
      {control}
      {hint ? (<span id={hintId} style={{ fontSize: 12, color: 'var(--dt-muted)' }}>{hint}</span>) : null}
      {invalid ? (<span id={errorId} style={{ fontSize: 12, fontWeight: 500, color: 'var(--dt-danger)' }}>{error}</span>) : null}
    </div>);
}
