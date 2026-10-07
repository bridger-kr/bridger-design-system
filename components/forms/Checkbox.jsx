// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/forms/Checkbox.tsx
// Regenerate: pnpm generate

import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import { Check } from 'lucide-react';
import { forwardRef, useId } from 'react';
import { cx } from '../lib/cx.jsx';
/** Checkbox — persimmon fill when checked. */
export const Checkbox = forwardRef(function Checkbox({ label, checked, defaultChecked, onChange, disabled, id, className, style, slotProps, ...rest }, ref) {
    const autoId = useId();
    const cbId = id ?? autoId;
    const labelId = label ? `${cbId}-label` : undefined;
    const handleCheckedChange = (nextChecked) => {
        onChange?.(nextChecked);
    };
    const { className: controlClassName, style: controlStyle, ...controlRest } = slotProps?.control ?? {};
    const { className: rootClassName, style: rootStyle, ...rootRest } = slotProps?.root ?? {};
    const { className: labelClassName, ...labelRest } = slotProps?.label ?? {};
    return (<label htmlFor={cbId} className={cx('dt-checkbox', className, rootClassName)} data-disabled={disabled ? '' : undefined} style={{ ...style, ...rootStyle }} {...rootRest}>
      <BaseCheckbox.Root render={<button type="button"/>} nativeButton={true} ref={ref} id={cbId} checked={checked} defaultChecked={defaultChecked} onCheckedChange={handleCheckedChange} disabled={disabled} className={cx('dt-checkbox-control', controlClassName)} style={controlStyle} aria-labelledby={labelId} {...rest} {...controlRest}>
        <span className="dt-checkbox-box">
          <BaseCheckbox.Indicator>
            {/* 12px box needs a heavier stroke than the 1.75 icon canon. */}
            <Check size={12} strokeWidth={2.5} color="var(--dt-accent-ink)" aria-hidden="true"/>
          </BaseCheckbox.Indicator>
        </span>
      </BaseCheckbox.Root>
      {label ? (<span id={labelId} className={cx('dt-checkbox-label', labelClassName)} {...labelRest}>
          {label}
        </span>) : null}
    </label>);
});
Checkbox.displayName = 'Checkbox';
