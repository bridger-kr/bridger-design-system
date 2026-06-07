import { useState } from 'react';
import type { CSSProperties, HTMLAttributes } from 'react';

export interface SegmentOption {
  value: string;
  label: string;
}

export interface SegmentedControlProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange' | 'style'> {
  options?: Array<string | SegmentOption>;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: 'sm' | 'md';
  style?: CSSProperties;
}

/** Inset segmented control for 2–4 short, exclusive options. */
export function SegmentedControl({
  options = [],
  value,
  defaultValue,
  onChange,
  size = 'md',
  style,
}: SegmentedControlProps) {
  const firstOption = typeof options[0] === 'string' ? options[0] : options[0]?.value;
  const [internal, setInternal] = useState(defaultValue ?? firstOption);
  const current = value !== undefined ? value : internal;
  const select = (v: string) => {
    if (value === undefined) setInternal(v);
    onChange?.(v);
  };
  const pad = size === 'sm' ? '5px 11px' : '7px 14px';
  return (
    <div
      style={{
        display: 'inline-flex',
        padding: 3,
        gap: 2,
        background: 'var(--dt-surface-sunken)',
        borderRadius: 'var(--dt-radius-md)',
        ...style,
      }}
    >
      {options.map((o) => {
        const opt = typeof o === 'string' ? { value: o, label: o } : o;
        const on = opt.value === current;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => select(opt.value)}
            style={{
              border: 'none',
              cursor: 'pointer',
              padding: pad,
              borderRadius: 'var(--dt-radius-sm)',
              fontSize: size === 'sm' ? 12 : 13,
              fontWeight: 600,
              fontFamily: 'inherit',
              whiteSpace: 'nowrap',
              color: on ? 'var(--dt-ink-strong)' : 'var(--dt-muted)',
              background: on ? 'var(--dt-surface)' : 'transparent',
              boxShadow: on ? 'var(--dt-ring), var(--dt-shadow-xs)' : 'none',
              transition: 'color 130ms, background-color 130ms',
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
