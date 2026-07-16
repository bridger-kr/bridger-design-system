import { Select as BaseSelect } from '@base-ui-components/react/select';
import type { CSSProperties, SelectHTMLAttributes } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends Omit<
    SelectHTMLAttributes<HTMLSelectElement>,
    'defaultValue' | 'disabled' | 'id' | 'onChange' | 'style' | 'value'
  > {
  label?: string;
  hint?: string;
  options?: Array<string | SelectOption>;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  style?: CSSProperties;
}

/** Flat native-backed select with a persimmon focus ring. */
export function Select({ label, hint, options = [], value, defaultValue, onChange, placeholder, disabled, id, style }: SelectProps) {
  const selId = id || (label ? `sel-${label.replace(/\s+/g, '-')}` : undefined);
  const normalizedOptions = options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o));
  const selectedOption = normalizedOptions.find((option) => option.value === value);
  const handleValueChange = (nextValue: string | null) => {
    if (nextValue !== null) onChange?.(nextValue);
  };

  return (
    <div style={{ display: 'grid', gap: 7 }}>
      {label ? (
        <label htmlFor={selId} style={{ fontSize: 13, fontWeight: 600, color: 'var(--dt-muted-strong)' }}>
          {label}
        </label>
      ) : null}
      <div style={{ position: 'relative', display: 'flex' }}>
        <BaseSelect.Root<string>
          id={selId}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          onValueChange={handleValueChange}
        >
          <BaseSelect.Trigger
            id={selId}
            className="dt-field dt-select-trigger"
            style={{
              appearance: 'none', WebkitAppearance: 'none', width: '100%', padding: '10px 36px 10px 13px', fontSize: 14,
              fontFamily: 'inherit', color: 'var(--dt-ink-strong)', cursor: disabled ? 'not-allowed' : 'pointer',
              opacity: disabled ? 0.55 : 1, textAlign: 'left', border: '1px solid var(--dt-border)', ...style,
            }}
          >
            <BaseSelect.Value>{selectedOption?.label ?? placeholder ?? ''}</BaseSelect.Value>
          </BaseSelect.Trigger>
          <BaseSelect.Portal>
            <BaseSelect.Positioner sideOffset={6} alignItemWithTrigger={false}>
              <BaseSelect.Popup className="dt-select-popup" style={{
                 zIndex: 'var(--dt-z-index-popover)', minWidth: 'var(--anchor-width)', padding: 5, background: 'var(--dt-surface)', borderRadius: 'var(--dt-radius-md)',
                 border: '1px solid var(--dt-border-strong)', boxShadow: 'var(--dt-shadow-lg)',
              }}>
                <BaseSelect.List>
                  {normalizedOptions.map((opt) => (
                    <BaseSelect.Item
                      key={opt.value}
                      value={opt.value}
                      className="dt-select-option"
                      style={{
                        display: 'flex', alignItems: 'center', gap: 9, width: '100%', textAlign: 'left', padding: '8px 10px',
                        borderRadius: 'var(--dt-radius-sm)', cursor: 'pointer', fontSize: 13.5, fontWeight: 500, color: 'var(--dt-ink)',
                      }}
                    >
                      <BaseSelect.ItemText>{opt.label}</BaseSelect.ItemText>
                    </BaseSelect.Item>
                  ))}
                </BaseSelect.List>
              </BaseSelect.Popup>
            </BaseSelect.Positioner>
          </BaseSelect.Portal>
        </BaseSelect.Root>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: 11,
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            color: 'var(--dt-muted)',
          }}
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {hint ? <span style={{ fontSize: 12, color: 'var(--dt-muted)' }}>{hint}</span> : null}
    </div>
  );
}
