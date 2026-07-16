import type { CSSProperties, ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface FilterChipProps {
  label: string;
  /** Trailing count, rendered tabular-mono. */
  count?: number;
  active?: boolean;
  removable?: boolean;
  onToggle?: () => void;
  onRemove?: () => void;
  icon?: ReactNode;
  style?: CSSProperties;
}

/**
 * FilterChip — a toggleable filter / tag for catalog facets (분야, 프로토콜, 상태).
 * Crisp small-radius tag with a hairline, NOT a rounded-full cushion. Active =
 * persimmon tint + border + bold. Optional count (mono) and a removable ✕.
 * @startingPoint section="Core" subtitle="Toggleable catalog filter" viewport="520x80"
 */
export function FilterChip({ label, count, active = false, removable = false, onToggle, onRemove, icon, style }: FilterChipProps) {
  const toggle = (
    <button
      type="button"
      className={cx('dt-filter-chip', active && 'dt-filter-chip-active')}
      onClick={onToggle}
      aria-pressed={active}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 7, minHeight: 'var(--dt-space-5)', padding: '0 10px',
        borderRadius: 'var(--dt-radius-sm)', cursor: 'pointer',
        fontFamily: 'var(--dt-font-sans)', fontSize: 13, fontWeight: active ? 650 : 500,
        background: active ? 'var(--dt-tint-accent)' : 'var(--dt-surface)',
        color: active ? 'var(--dt-accent)' : 'var(--dt-muted-strong)',
        border: `1px solid ${active ? 'color-mix(in srgb, var(--dt-accent) 40%, transparent)' : 'var(--dt-border)'}`,
        transition: 'background-color var(--dt-motion-fast), border-color var(--dt-motion-fast), box-shadow var(--dt-motion-fast), transform var(--dt-motion-fast)',
        ...style,
      }}
    >
      {icon ? <span style={{ display: 'inline-flex', color: active ? 'var(--dt-accent)' : 'var(--dt-muted)' }} aria-hidden="true">{icon}</span> : null}
      <span>{label}</span>
      {count != null ? (
        <span style={{ fontFamily: 'var(--dt-font-mono)', fontSize: 11, fontWeight: 600, color: active ? 'var(--dt-accent)' : 'var(--dt-muted)', fontVariantNumeric: 'tabular-nums' }}>{count}</span>
      ) : null}
    </button>
  );

  if (!removable) return toggle;

  return (
    <span className="dt-filter-chip-group" data-active={active ? '' : undefined}>
      {toggle}
      <button
        type="button"
        className="dt-filter-chip-remove"
        aria-label={`${label} 제거`}
        onClick={onRemove}
        style={{ color: active ? 'var(--dt-accent)' : 'var(--dt-muted)' }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
      </button>
    </span>
  );
}
