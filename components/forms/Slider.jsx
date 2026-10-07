// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/forms/Slider.tsx
// Regenerate: pnpm generate

import { Slider as BaseSlider } from '@base-ui/react/slider';
import { forwardRef, useId } from 'react';
import { warnOnce } from '../lib/deprecate.jsx';
import { cx } from '../lib/cx.jsx';
import { useDSMessages } from '../locale/DSLocaleProvider.jsx';
/**
 * Numeric range input — hairline track, persimmon fill, tabular value readout.
 * @startingPoint section="Forms" subtitle="Numeric range with tabular readout" viewport="420x90"
 */
export const Slider = forwardRef(function Slider({ label, min = 0, max = 100, step = 1, value, defaultValue, onValueChange, onChange, unit = '', hint, id, name, disabled, slotProps, className, style, 'aria-label': ariaLabel, ...rest }, ref) {
    const messages = useDSMessages();
    const autoId = useId();
    const sId = id ?? autoId;
    const hintId = hint ? `${sId}-hint` : undefined;
    const inputLabel = ariaLabel ?? label ?? messages.slider.valueLabel;
    if (onChange !== undefined) {
        warnOnce('slider-onchange', 'Slider: `onChange` is deprecated — use `onValueChange`. Removed in v2.1.');
    }
    const v = value ?? defaultValue ?? min;
    const pct = ((v - min) / (max - min)) * 100;
    const { className: labelClassName, ...labelRest } = slotProps?.label ?? {};
    const { className: hintClassName, ...hintRest } = slotProps?.hint ?? {};
    const handleValueChange = (nextValue) => {
        if (typeof nextValue === 'number') {
            onValueChange?.(nextValue);
            onChange?.(nextValue);
        }
    };
    return (<BaseSlider.Root ref={ref} id={sId} min={min} max={max} step={step} value={value} defaultValue={defaultValue ?? min} onValueChange={handleValueChange} name={name} disabled={disabled} aria-describedby={hintId} className={cx('dt-slider', className)} style={style} {...rest}>
      <div className="dt-slider-head">
          {label ? (<label htmlFor={sId} className={cx('dt-slider-label', labelClassName)} {...labelRest}>
              {label}
            </label>) : (<span />)}
          <span className="dt-slider-value">
            {v}
            {unit ? <span className="dt-slider-unit">{unit}</span> : null}
          </span>
        </div>
      <BaseSlider.Control className="dt-slider-control">
        <BaseSlider.Track className="dt-slider-track"/>
        <BaseSlider.Indicator className="dt-slider-indicator" style={{ '--dt-slider-pct': `${pct}%` }}/>
        <BaseSlider.Thumb className="dt-slider-thumb" getAriaLabel={() => inputLabel}/>
      </BaseSlider.Control>
      {hint ? (<span id={hintId} className={cx('dt-slider-hint', hintClassName)} {...hintRest}>
          {hint}
        </span>) : null}
    </BaseSlider.Root>);
});
Slider.displayName = 'Slider';
