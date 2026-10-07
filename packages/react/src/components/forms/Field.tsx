import type { CSSProperties, HTMLAttributes, ReactElement, ReactNode } from 'react';
import { cloneElement, isValidElement, useId } from 'react';
import { cx } from '../../lib/cx';

/** Props injected into the wrapped control so label/hint/error associate. */
export interface FieldControlProps {
  id: string;
  'aria-describedby'?: string;
  'aria-invalid'?: true;
  'aria-required'?: true;
  disabled?: boolean;
  required?: boolean;
}

export interface FieldProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Visible label bound to the control via `htmlFor`. */
  label?: ReactNode;
  /** Supporting copy under the control, linked via `aria-describedby`. */
  hint?: ReactNode;
  /** Validation message; sets `aria-invalid` and joins `aria-describedby`. */
  error?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  /** Control id override; defaults to a generated id. */
  id?: string;
  /**
   * The control. Either a single element (injected with `id`,
   * `aria-describedby`, `aria-invalid`) or a render function receiving those
   * props for composition with non-input children.
   */
  children: ReactElement | ((control: FieldControlProps) => ReactNode);
  style?: CSSProperties;
}

/**
 * Field — label + control + hint + error with `aria-describedby` wiring.
 * Wraps any Bridger control; keeps validation off color alone by pairing the
 * error text with the invalid state.
 */
export function Field({
  label,
  hint,
  error,
  required = false,
  disabled = false,
  id,
  children,
  className,
  style,
  ...rest
}: FieldProps) {
  const generatedId = useId();
  const controlId = id ?? `field-${generatedId}`;
  const hintId = `${controlId}-hint`;
  const errorId = `${controlId}-error`;
  const invalid = error != null && error !== false;

  const childDescribedBy = isValidElement(children)
    ? (children.props as FieldControlProps)['aria-describedby']
    : undefined;
  const describedBy = [
    childDescribedBy,
    hint ? hintId : null,
    invalid ? errorId : null,
  ]
    .filter(Boolean)
    .filter((id, index, ids) => ids.indexOf(id) === index)
    .join(' ') || undefined;

  const controlProps: FieldControlProps = {
    id: controlId,
    ...(describedBy ? { 'aria-describedby': describedBy } : {}),
    ...(invalid ? { 'aria-invalid': true as const } : {}),
    ...(required ? { 'aria-required': true as const, required: true } : {}),
    ...(disabled ? { disabled: true } : {}),
  };

  const control = typeof children === 'function'
    ? children(controlProps)
    : isValidElement(children)
      ? cloneElement(children as ReactElement<FieldControlProps>, controlProps)
      : children;

  return (
    <div
      {...rest}
      className={cx('dt-field-group', className)}
      data-invalid={invalid ? '' : undefined}
      style={style}
    >
      {label ? (
        <label htmlFor={controlId} className="dt-field-label">
          {label}
          {required ? <span aria-hidden="true" className="dt-field-required">*</span> : null}
        </label>
      ) : null}
      {control}
      {hint ? <span id={hintId} className="dt-field-hint">{hint}</span> : null}
      {invalid ? <span id={errorId} className="dt-field-error">{error}</span> : null}
    </div>
  );
}
