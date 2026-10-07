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
    const childDescribedBy = isValidElement(children)
        ? children.props['aria-describedby']
        : undefined;
    const describedBy = [
        childDescribedBy,
        hint ? hintId : null,
        invalid ? errorId : null,
    ]
        .filter(Boolean)
        .filter((id, index, ids) => ids.indexOf(id) === index)
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
    return (<div {...rest} className={cx('dt-field-group', className)} data-invalid={invalid ? '' : undefined} style={style}>
      {label ? (<label htmlFor={controlId} className="dt-field-label">
          {label}
          {required ? <span aria-hidden="true" className="dt-field-required">*</span> : null}
        </label>) : null}
      {control}
      {hint ? <span id={hintId} className="dt-field-hint">{hint}</span> : null}
      {invalid ? <span id={errorId} className="dt-field-error">{error}</span> : null}
    </div>);
}
