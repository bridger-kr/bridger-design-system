// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/forms/Select.tsx
// Regenerate: pnpm generate

import { Select as BaseSelect } from '@base-ui-components/react/select';
/** Flat native-backed select with a persimmon focus ring. */
export function Select({ label, hint, options = [], value, defaultValue, onChange, placeholder, disabled, id, style }) {
    const selId = id || (label ? `sel-${label.replace(/\s+/g, '-')}` : undefined);
    const normalizedOptions = options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o));
    const selectedOption = normalizedOptions.find((option) => option.value === value);
    const handleValueChange = (nextValue) => {
        if (nextValue !== null)
            onChange?.(nextValue);
    };
    return (<div className="dt-select">
      {label ? (<label htmlFor={selId} className="dt-input-label">
          {label}
        </label>) : null}
      <div className="dt-select-box">
        <BaseSelect.Root id={selId} value={value} defaultValue={defaultValue} disabled={disabled} onValueChange={handleValueChange}>
          <BaseSelect.Trigger id={selId} className="dt-field dt-select-trigger" style={style}>
            <BaseSelect.Value>{selectedOption?.label ?? placeholder ?? ''}</BaseSelect.Value>
          </BaseSelect.Trigger>
          <BaseSelect.Portal>
            <BaseSelect.Positioner sideOffset={6} alignItemWithTrigger={false}>
              <BaseSelect.Popup className="dt-select-popup">
                <BaseSelect.List>
                  {normalizedOptions.map((opt) => (<BaseSelect.Item key={opt.value} value={opt.value} className="dt-select-option">
                      <BaseSelect.ItemText>{opt.label}</BaseSelect.ItemText>
                    </BaseSelect.Item>))}
                </BaseSelect.List>
              </BaseSelect.Popup>
            </BaseSelect.Positioner>
          </BaseSelect.Portal>
        </BaseSelect.Root>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="dt-select-chevron">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      {hint ? <span className="dt-input-hint">{hint}</span> : null}
    </div>);
}
