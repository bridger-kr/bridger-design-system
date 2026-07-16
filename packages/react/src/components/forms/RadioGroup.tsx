import { Radio as BaseRadio } from '@base-ui-components/react/radio';
import { RadioGroup as BaseRadioGroup } from '@base-ui-components/react/radio-group';
import { useId } from 'react';
import type { CSSProperties, HTMLAttributes } from 'react';

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
  onChange?: (value: string) => void;
  disabled?: boolean;
  style?: CSSProperties;
}

/** Radio group with optional per-option hint text. */
export function RadioGroup({ name, options = [], value, defaultValue, onChange, disabled, style }: RadioGroupProps) {
  const generatedName = useId();
  const groupName = name || generatedName;
  const handleValueChange = (nextValue: unknown) => {
    if (typeof nextValue === 'string') onChange?.(nextValue);
  };

  return (
    <BaseRadioGroup
      name={groupName}
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
      onValueChange={handleValueChange}
      className="dt-radio-group"
      style={{ display: 'grid', gap: 10, ...style }}
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
              <span
                className="dt-radio-control"
                style={{
                  width: 18,
                  height: 18,
                  flex: '0 0 auto',
                  borderRadius: 9999,
                  display: 'grid',
                  placeItems: 'center',
                  background: 'var(--dt-surface)',
                  border: '1.5px solid var(--dt-border-strong)',
                  transition: 'border-color var(--dt-motion-fast)',
                }}
              >
                <BaseRadio.Indicator>
                  <span className="dt-radio-indicator" style={{ width: 9, height: 9, borderRadius: 9999, background: 'var(--dt-accent)', display: 'block' }} />
                </BaseRadio.Indicator>
              </span>
            </BaseRadio.Root>
            <span style={{ display: 'grid', gap: 2 }}>
              <span style={{ fontSize: 14, color: 'var(--dt-ink)', lineHeight: 1.3 }}>{opt.label}</span>
              {opt.hint ? <span style={{ fontSize: 12, color: 'var(--dt-muted)' }}>{opt.hint}</span> : null}
            </span>
          </label>
        );
      })}
    </BaseRadioGroup>
  );
}
