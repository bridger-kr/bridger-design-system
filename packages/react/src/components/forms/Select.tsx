import { Select as BaseSelect } from '@base-ui-components/react/select';
import { ChevronDown } from 'lucide-react';
import type { CSSProperties, SelectHTMLAttributes } from 'react';
import { Icon } from '../../lib/icon';

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
    <div className="dt-select">
      {label ? (
        <label htmlFor={selId} className="dt-input-label">
          {label}
        </label>
      ) : null}
      <div className="dt-select-box">
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
            style={style}
          >
            <BaseSelect.Value>{selectedOption?.label ?? placeholder ?? ''}</BaseSelect.Value>
          </BaseSelect.Trigger>
          <BaseSelect.Portal>
            <BaseSelect.Positioner sideOffset={6} alignItemWithTrigger={false}>
              <BaseSelect.Popup className="dt-select-popup">
                <BaseSelect.List>
                  {normalizedOptions.map((opt) => (
                    <BaseSelect.Item
                      key={opt.value}
                      value={opt.value}
                      className="dt-select-option"
                    >
                      <BaseSelect.ItemText>{opt.label}</BaseSelect.ItemText>
                    </BaseSelect.Item>
                  ))}
                </BaseSelect.List>
              </BaseSelect.Popup>
            </BaseSelect.Positioner>
          </BaseSelect.Portal>
        </BaseSelect.Root>
        <Icon icon={ChevronDown} className="dt-select-chevron" />
      </div>
      {hint ? <span className="dt-input-hint">{hint}</span> : null}
    </div>
  );
}
