import { Radio as BaseRadio } from '@base-ui/react/radio';
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group';
import { forwardRef, useId } from 'react';
import type { CSSProperties, HTMLAttributes } from 'react';
import { cx } from '../../lib/cx';
import { warnOnce } from '../../lib/deprecate';

export interface RadioOption {
  value: string;
  label: string;
  hint?: string;
}

export interface RadioGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange' | 'style'> {
  name?: string;
  options?: Array<string | RadioOption>;
  value?: string;
  defaultValue?: string;
  /** Called with the newly selected value. */
  onValueChange?: (value: string) => void;
  /** @deprecated Use `onValueChange`. Removed in v2.1. */
  onChange?: (value: string) => void;
  disabled?: boolean;
  style?: CSSProperties;
}

/** Radio group with optional per-option hint text. */
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(function RadioGroup(
  { name, options = [], value, defaultValue, onValueChange, onChange, disabled, className, style, ...rest },
  ref,
) {
  const generatedName = useId();
  const groupName = name || generatedName;
  if (onChange !== undefined) {
    warnOnce('radiogroup-onchange', 'RadioGroup: `onChange` is deprecated — use `onValueChange`. Removed in v2.1.');
  }
  const handleValueChange = (nextValue: unknown) => {
    if (typeof nextValue === 'string') {
      onValueChange?.(nextValue);
      onChange?.(nextValue);
    }
  };

  return (
    <BaseRadioGroup
      ref={ref}
      name={groupName}
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
      onValueChange={handleValueChange}
      className={cx('dt-radio-group', className)}
      style={{ display: 'grid', gap: 10, ...style }}
      {...rest}
    >
      {options.map((o) => {
        const opt = typeof o === 'string' ? { value: o, label: o } : o;
        return (
          <label
            key={opt.value}
            className="dt-radio-option"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 0,
              cursor: disabled ? 'not-allowed' : 'pointer',
              opacity: disabled ? 0.55 : 1,
            }}
          >
            <BaseRadio.Root
              render={<button type="button" />}
              nativeButton={true}
              value={opt.value}
              disabled={disabled}
              className="dt-radio-root"
              style={{
                width: 'var(--dt-space-5)',
                height: 'var(--dt-space-5)',
                flex: '0 0 auto',
                display: 'grid',
                placeItems: 'center',
                border: 0,
                background: 'transparent',
                padding: 0,
                cursor: disabled ? 'not-allowed' : 'pointer',
              }}
            >
              <span className="dt-radio-control">
                <BaseRadio.Indicator>
                  <span className="dt-radio-indicator" style={{ width: 9, height: 9, borderRadius: 9999, background: 'var(--dt-accent)', display: 'block' }} />
                </BaseRadio.Indicator>
              </span>
            </BaseRadio.Root>
            <span style={{ display: 'grid', gap: 2 }}>
              <span style={{ fontSize: 14, color: 'var(--dt-text)', lineHeight: 1.3 }}>{opt.label}</span>
              {opt.hint ? <span style={{ fontSize: 12, color: 'var(--dt-text-muted)' }}>{opt.hint}</span> : null}
            </span>
          </label>
        );
      })}
    </BaseRadioGroup>
  );
});
RadioGroup.displayName = 'RadioGroup';
