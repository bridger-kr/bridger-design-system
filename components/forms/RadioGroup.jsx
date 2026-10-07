// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/forms/RadioGroup.tsx
// Regenerate: pnpm generate

import { Radio as BaseRadio } from '@base-ui/react/radio';
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group';
import { forwardRef, useId } from 'react';
import { cx } from '../lib/cx.jsx';
import { warnOnce } from '../lib/deprecate.jsx';
/** Radio group with optional per-option hint text. */
export const RadioGroup = forwardRef(function RadioGroup({ name, options = [], value, defaultValue, onValueChange, onChange, disabled, className, style, ...rest }, ref) {
    const generatedName = useId();
    const groupName = name || generatedName;
    if (onChange !== undefined) {
        warnOnce('radiogroup-onchange', 'RadioGroup: `onChange` is deprecated — use `onValueChange`. Removed in v2.1.');
    }
    const handleValueChange = (nextValue) => {
        if (typeof nextValue === 'string') {
            onValueChange?.(nextValue);
            onChange?.(nextValue);
        }
    };
    return (<BaseRadioGroup ref={ref} name={groupName} value={value} defaultValue={defaultValue} disabled={disabled} onValueChange={handleValueChange} className={cx('dt-radio-group', className)} style={style} {...rest}>
      {options.map((o) => {
            const opt = typeof o === 'string' ? { value: o, label: o } : o;
            return (<label key={opt.value} className="dt-radio-option" data-disabled={disabled ? '' : undefined}>
            <BaseRadio.Root render={<button type="button"/>} nativeButton={true} value={opt.value} disabled={disabled} className="dt-radio-root">
              <span className="dt-radio-control">
                <BaseRadio.Indicator>
                  <span className="dt-radio-indicator"/>
                </BaseRadio.Indicator>
              </span>
            </BaseRadio.Root>
            <span className="dt-radio-text">
              <span className="dt-radio-label">{opt.label}</span>
              {opt.hint ? <span className="dt-radio-hint">{opt.hint}</span> : null}
            </span>
          </label>);
        })}
    </BaseRadioGroup>);
});
RadioGroup.displayName = 'RadioGroup';
