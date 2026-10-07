// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/forms/Switch.tsx
// Regenerate: pnpm generate

import { Switch as BaseSwitch } from '@base-ui/react/switch';
import { forwardRef } from 'react';
import { cx } from '../lib/cx.jsx';
import { useControllableState } from '../lib/useControllableState.jsx';
/** Toggle switch for instant on/off settings — persimmon track when on. */
export const Switch = forwardRef(function Switch({ checked, defaultChecked, onChange, disabled, label, id, name, uncheckedValue, required, className, style, ...rest }, ref) {
    const [isOn, setIsOn] = useControllableState({
        value: checked,
        defaultValue: defaultChecked ?? false,
        onChange,
    });
    const on = isOn === true;
    const handleCheckedChange = (nextChecked) => {
        setIsOn(nextChecked);
    };
    const sw = (<BaseSwitch.Root render={<button type="button" disabled={disabled}/>} nativeButton={true} ref={ref} id={id} name={name} uncheckedValue={uncheckedValue} required={required} checked={on} onCheckedChange={handleCheckedChange} disabled={disabled} className={cx('dt-switch-control', !label && className)} style={!label ? style : undefined} {...rest}>
      <span aria-hidden="true" className="dt-switch-track"/>
      <BaseSwitch.Thumb className="dt-switch-thumb"/>
    </BaseSwitch.Root>);
    if (!label)
        return sw;
    return (<label className={cx('dt-switch-row', className)} data-disabled={disabled ? '' : undefined} style={style}>
      {sw}
      <span className="dt-switch-label">{label}</span>
    </label>);
});
Switch.displayName = 'Switch';
/** @deprecated Alias of `Switch` kept for one minor cycle; prefer `Switch`. */
export const ToggleSwitch = forwardRef(function ToggleSwitch({ checked, label, onChange, disabled = false, className = '', style }, ref) {
    return (<BaseSwitch.Root render={<button type="button" disabled={disabled}/>} nativeButton={true} ref={ref} checked={checked} aria-checked={checked} aria-label={label} disabled={disabled} onClick={() => {
            if (!disabled)
                onChange(!checked);
        }} className={`relative inline-flex h-11 w-11 shrink-0 items-center rounded-full border border-transparent bg-transparent transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${className}`} style={style}>
      <span aria-hidden className={`pointer-events-none absolute inset-x-0 h-6 rounded-full border transition-colors ${checked ? 'border-success/40 bg-success/80' : 'border-line-strong bg-raised'}`}/>
      <BaseSwitch.Thumb aria-hidden className={`relative inline-block h-4 w-4 transform rounded-full bg-surface shadow-dtSubtle transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`}/>
    </BaseSwitch.Root>);
});
ToggleSwitch.displayName = 'ToggleSwitch';
