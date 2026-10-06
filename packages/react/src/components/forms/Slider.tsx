import { Slider as BaseSlider } from '@base-ui-components/react/slider';
import { forwardRef, useId } from 'react';
import type { CSSProperties, HTMLAttributes, Ref } from 'react';
import { warnOnce } from '../../lib/deprecate';
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
    ...rest
  },
  ref,
) {
  const autoId = useId();
  const sId = id ?? autoId;
  const hintId = hint ? `${sId}-hint` : undefined;
  if (onChange !== undefined) {
    warnOnce('slider-onchange', 'Slider: `onChange` is deprecated — use `onValueChange`. Removed in v2.1.');
  }
  const v = value ?? defaultValue ?? min;
  const pct = ((v - min) / (max - min)) * 100;
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
      className={className}
      style={{ display: 'grid', gap: 9, ...style }}
      {...rest}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          {label ? (
            <label htmlFor={sId} style={{ fontSize: 13, fontWeight: 600, color: 'var(--dt-text-subtle)' }} {...slotProps?.label}>
              {label}
            </label>
          ) : (
            <span />
          )}
          <span
            style={{
              fontFamily: 'var(--dt-font-mono)',
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--dt-text-strong)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {v}
            {unit ? <span style={{ color: 'var(--dt-text-muted)', fontWeight: 400 }}>{unit}</span> : null}
          </span>
        </div>
      <BaseSlider.Control
        style={{ position: 'relative', height: 20, display: 'flex', alignItems: 'center', cursor: 'pointer', outline: 'none' }}
      >
        <BaseSlider.Track
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: 4,
            borderRadius: 'var(--dt-radius-sm)',
            background: 'var(--dt-surface-sunken)',
            boxShadow: 'inset 0 0 0 1px var(--dt-border-strong)',
          }}
        />
        <BaseSlider.Indicator style={{ position: 'absolute', left: 0, width: `${pct}%`, height: 4, borderRadius: 2, background: 'var(--dt-accent)' }} />
        <BaseSlider.Thumb
          style={{
            position: 'absolute',
            width: 16,
            height: 16,
            borderRadius: 'var(--dt-radius-sm)',
            background: 'var(--dt-surface)',
            boxShadow: '0 0 0 1.5px var(--dt-accent)',
            border: '3px solid var(--dt-surface)',
          }}
        />
      </BaseSlider.Control>
      {hint ? (
        <span id={hintId} style={{ fontSize: 12, color: 'var(--dt-text-muted)' }} {...slotProps?.hint}>
          {hint}
        </span>
      ) : null}
    </BaseSlider.Root>
  );
});
Slider.displayName = 'Slider';
