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
  return (
    <BaseRadioGroup
      name={groupName}
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
      onValueChange={(nextValue) => { if (typeof nextValue === 'string') onChange?.(nextValue); }}
      style={{ display: 'grid', gap: 10, ...style }}
    >
      {options.map((o) => {
        const opt = typeof o === 'string' ? { value: o, label: o } : o;
        return (
          <label
            key={opt.value}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 10,
              cursor: disabled ? 'not-allowed' : 'pointer',
              opacity: disabled ? 0.55 : 1,
            }}
          >
            <BaseRadio.Root
              value={opt.value}
              disabled={disabled}
              style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
            />
            <span
              style={{
                width: 18,
                height: 18,
                marginTop: 1,
                flex: '0 0 auto',
                borderRadius: 9999,
                display: 'grid',
                placeItems: 'center',
                background: 'var(--dt-surface)',
                border: '1.5px solid var(--dt-border-strong)',
                transition: 'border-color 130ms',
              }}
            >
              <BaseRadio.Indicator>
                <span style={{ width: 9, height: 9, borderRadius: 9999, background: 'var(--dt-accent)', display: 'block' }} />
              </BaseRadio.Indicator>
            </span>
            <span style={{ display: 'grid', gap: 2 }}>
              <span style={{ fontSize: 14, color: 'var(--dt-ink)', lineHeight: 1.3 }}>{opt.label}</span>
              {opt.hint ? <span style={{ fontSize: 12, color: 'var(--dt-muted)' }}>{opt.hint}</span> : null}
            </span>
          </label>
        );
      })}
      <style>{`[role="radio"][data-checked] + span{border-color:var(--dt-accent)!important}`}</style>
    </BaseRadioGroup>
  );
}
