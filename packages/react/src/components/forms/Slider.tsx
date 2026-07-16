import { Slider as BaseSlider } from '@base-ui-components/react/slider';
import { useState } from 'react';
import type { CSSProperties, InputHTMLAttributes } from 'react';

export interface SliderProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'defaultValue' | 'id' | 'max' | 'min' | 'onChange' | 'step' | 'style' | 'value'
  > {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  /** Suffix shown after the value readout, e.g. "회/일" or "ms". */
  unit?: string;
  hint?: string;
  id?: string;
  style?: CSSProperties;
}

/**
 * Numeric range input — hairline track, persimmon fill, tabular value readout.
 * @startingPoint section="Forms" subtitle="Numeric range with tabular readout" viewport="420x90"
 */
export function Slider({
  label,
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue,
  onChange,
  unit = '',
  hint,
  id,
  style,
}: SliderProps) {
  const sId = id || (label ? `sl-${label.replace(/\s+/g, '-')}` : undefined);
  const [internal, setInternal] = useState(defaultValue ?? min);
  const v = value ?? internal;
  const pct = ((v - min) / (max - min)) * 100;
  const handleValueChange = (nextValue: number) => {
    if (value === undefined) setInternal(nextValue);
    onChange?.(nextValue);
  };

  return (
    <BaseSlider.Root
      id={sId}
      min={min}
      max={max}
      step={step}
      value={value}
      defaultValue={defaultValue ?? min}
      onValueChange={handleValueChange}
      style={{ display: 'grid', gap: 9, ...style }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          {label ? (
            <label htmlFor={sId} style={{ fontSize: 13, fontWeight: 600, color: 'var(--dt-muted-strong)' }}>
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
              color: 'var(--dt-ink-strong)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {v}
            {unit ? <span style={{ color: 'var(--dt-muted)', fontWeight: 400 }}>{unit}</span> : null}
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
            borderRadius: 2,
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
      {hint ? <span style={{ fontSize: 12, color: 'var(--dt-muted)' }}>{hint}</span> : null}
    </BaseSlider.Root>
  );
}
