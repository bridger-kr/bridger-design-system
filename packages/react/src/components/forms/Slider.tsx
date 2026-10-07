import { Slider as BaseSlider } from '@base-ui/react/slider';
import { forwardRef, useId } from 'react';
import type { CSSProperties, HTMLAttributes, Ref } from 'react';
import { warnOnce } from '../../lib/deprecate';
import { cx } from '../../lib/cx';
import { useDSMessages } from '../../locale/DSLocaleProvider';
import type { SlotPropsFor } from '../../lib/slot';

export type SliderSlotProps = SlotPropsFor<{
  label: 'label';
  hint: 'span';
}>;

export interface SliderProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    'className' | 'defaultValue' | 'onChange' | 'style'
  > {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  /** Called with the newly selected value. */
  onValueChange?: (value: number) => void;
  /** @deprecated Use `onValueChange`. Removed in v2.1. */
  onChange?: (value: number) => void;
  /** Suffix shown after the value readout, e.g. "회/일" or "ms". */
  unit?: string;
  hint?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  /** Prop bags for inner elements (`label`, `hint`). */
  slotProps?: SliderSlotProps;
  /** Root element class. */
  className?: string;
  style?: CSSProperties;
}

/**
 * Numeric range input — hairline track, persimmon fill, tabular value readout.
 * @startingPoint section="Forms" subtitle="Numeric range with tabular readout" viewport="420x90"
 */
export const Slider = forwardRef<HTMLDivElement, SliderProps>(function Slider(
  {
    label,
    min = 0,
    max = 100,
    step = 1,
    value,
    defaultValue,
    onValueChange,
    onChange,
    unit = '',
    hint,
    id,
    name,
    disabled,
    slotProps,
    className,
    style,
    'aria-label': ariaLabel,
    ...rest
  },
  ref,
) {
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
  const handleValueChange = (nextValue: number | readonly number[]) => {
    if (typeof nextValue === 'number') {
      onValueChange?.(nextValue);
      onChange?.(nextValue);
    }
  };

  return (
    <BaseSlider.Root
      ref={ref as Ref<HTMLDivElement>}
      id={sId}
      min={min}
      max={max}
      step={step}
      value={value}
      defaultValue={defaultValue ?? min}
      onValueChange={handleValueChange}
      name={name}
      disabled={disabled}
      aria-describedby={hintId}
      className={cx('dt-slider', className)}
      style={style}
      {...rest}
    >
      <div className="dt-slider-head">
          {label ? (
            <label htmlFor={sId} className={cx('dt-slider-label', labelClassName)} {...labelRest}>
              {label}
            </label>
          ) : (
            <span />
          )}
          <span className="dt-slider-value">
            {v}
            {unit ? <span className="dt-slider-unit">{unit}</span> : null}
          </span>
        </div>
      <BaseSlider.Control
        className="dt-slider-control"
      >
        <BaseSlider.Track className="dt-slider-track" />
        <BaseSlider.Indicator
          className="dt-slider-indicator"
          style={{ '--dt-slider-pct': `${pct}%` } as CSSProperties}
        />
        <BaseSlider.Thumb
          className="dt-slider-thumb"
          getAriaLabel={() => inputLabel}
        />
      </BaseSlider.Control>
      {hint ? (
        <span id={hintId} className={cx('dt-slider-hint', hintClassName)} {...hintRest}>
          {hint}
        </span>
      ) : null}
    </BaseSlider.Root>
  );
});
Slider.displayName = 'Slider';
