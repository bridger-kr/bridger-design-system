import type { CSSProperties, InputHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'style'> {
  label?: string;
  hint?: string;
  /** Render the value in JetBrains Mono — for API paths, keys, IDs. */
  mono?: boolean;
  /** Leading adornment (icon or short text). */
  prefix?: ReactNode;
  invalid?: boolean;
  style?: CSSProperties;
}

/**
 * Compact labeled input, paired with a label or table context. Supports a
 * mono variant for API paths / keys / IDs.
 */
export function Input({
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
  ...rest
}: InputProps) {
  const inputId = id || (label ? `in-${label.replace(/\s+/g, '-')}` : undefined);
  return (
    <div className="dt-input">
      {label ? (
        <label className="dt-input-label" htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <div
        className={cx('dt-field', invalid && 'dt-field-invalid')}
      >
        {prefix ? <span className="dt-input-prefix">{prefix}</span> : null}
        <input
          id={inputId}
          type={type}
          className={cx('dt-input-control', className)}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          style={{
            fontFamily: mono ? 'var(--dt-font-mono)' : 'var(--dt-font-sans)',
            ...style,
          }}
          {...rest}
        />
      </div>
      {hint ? <span className="dt-input-hint">{hint}</span> : null}
    </div>
  );
}
