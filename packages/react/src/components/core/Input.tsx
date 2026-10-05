import { forwardRef, useId } from 'react';
import type { CSSProperties, InputHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import type { SlotPropsFor } from '../../lib/slot';

export type InputSlotProps = SlotPropsFor<{
  input: 'input';
  label: 'label';
  hint: 'span';
  prefix: 'span';
}>;

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'prefix' | 'style'> {
  label?: string;
  hint?: string;
  /** Render the value in JetBrains Mono — for API paths, keys, IDs. */
  mono?: boolean;
  /** Leading adornment (icon or short text). */
  prefix?: ReactNode;
  invalid?: boolean;
  /** Root `<div>` class. Style the inner control via `slotProps.input`. */
  className?: string;
  /** Root `<div>` style. Style the inner control via `slotProps.input`. */
  style?: CSSProperties;
  /** Prop bags for inner elements (`input`, `label`, `hint`, `prefix`). */
  slotProps?: InputSlotProps;
}

/**
 * Compact labeled input, paired with a label or table context. Supports a
 * mono variant for API paths / keys / IDs.
 *
 * `className`/`style` apply to the root wrapper; reach the inner `<input>`
 * through `slotProps.input`. The control id defaults to `useId()` so repeated
 * labels never collide.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    hint,
    mono = false,
    id,
    type = 'text',
    prefix = null,
    invalid = false,
    disabled = false,
    className,
    style,
    slotProps,
    'aria-describedby': ariaDescribedBy,
    ...rest
  },
  ref,
) {
  const autoId = useId();
  const controlId = id ?? autoId;
  const hintId = hint ? `${controlId}-hint` : undefined;
  const describedBy = [hintId, ariaDescribedBy].filter(Boolean).join(' ') || undefined;
  const { className: inputClassName, style: inputStyle, ...inputRest } = slotProps?.input ?? {};

  return (
    <div className={cx('dt-input', className)} style={style}>
      {label ? (
        <label className="dt-input-label" htmlFor={controlId} {...slotProps?.label}>
          {label}
        </label>
      ) : null}
      <div className={cx('dt-field', invalid && 'dt-field-invalid')}>
        {prefix ? (
          <span className="dt-input-prefix" {...slotProps?.prefix}>
            {prefix}
          </span>
        ) : null}
        <input
          id={controlId}
          ref={ref}
          type={type}
          className={cx('dt-input-control', inputClassName)}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          style={{
            fontFamily: mono ? 'var(--dt-font-mono)' : 'var(--dt-font-sans)',
            ...inputStyle,
          }}
          {...rest}
          {...inputRest}
        />
      </div>
      {hint ? (
        <span id={hintId} className="dt-input-hint" {...slotProps?.hint}>
          {hint}
        </span>
      ) : null}
    </div>
  );
});
Input.displayName = 'Input';
