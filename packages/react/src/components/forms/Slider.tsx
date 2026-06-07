import { useRef, useState } from 'react';
import type { CSSProperties, InputHTMLAttributes, KeyboardEvent, PointerEvent } from 'react';

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
  const [internal, setInternal] = useState(defaultValue ?? min);
  const v = value != null ? value : internal;
  const trackRef = useRef<HTMLDivElement>(null);
  const sId = id || (label ? `sl-${label.replace(/\s+/g, '-')}` : undefined);
  const pct = ((v - min) / (max - min)) * 100;

  const set = (nv: number) => {
    const clamped = Math.min(max, Math.max(min, Math.round(nv / step) * step));
    if (value == null) setInternal(clamped);
    onChange?.(clamped);
  };

  const fromClientX = (clientX: number) => {
    const r = trackRef.current!.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    return min + ratio * (max - min);
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    set(fromClientX(e.clientX));
    const move = (ev: globalThis.PointerEvent) => set(fromClientX(ev.clientX));
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      set(v + step);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      set(v - step);
    }
  };

  return (
    <div style={{ display: 'grid', gap: 9, ...style }}>
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
      <div
        ref={trackRef}
        id={sId}
        role="slider"
        tabIndex={0}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={v}
        onPointerDown={onPointerDown}
        onKeyDown={onKey}
        style={{ position: 'relative', height: 20, display: 'flex', alignItems: 'center', cursor: 'pointer', outline: 'none' }}
      >
        <div
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
        <div style={{ position: 'absolute', left: 0, width: `${pct}%`, height: 4, borderRadius: 2, background: 'var(--dt-accent)' }} />
        <div
          style={{
            position: 'absolute',
            left: `${pct}%`,
            transform: 'translateX(-50%)',
            width: 16,
            height: 16,
            borderRadius: 'var(--dt-radius-sm)',
            background: 'var(--dt-surface)',
            boxShadow: '0 0 0 1.5px var(--dt-accent)',
            border: '3px solid var(--dt-surface)',
          }}
        />
      </div>
      {hint ? <span style={{ fontSize: 12, color: 'var(--dt-muted)' }}>{hint}</span> : null}
    </div>
  );
}
