import React from 'react';

/**
 * FilterChip — a toggleable filter / tag for catalog facets (분야, 프로토콜, 상태).
 * Crisp small-radius tag with a hairline, NOT a rounded-full cushion. Active =
 * persimmon tint + border + bold. Optional count (mono) and a removable ✕.
 */
export function FilterChip({ label, count, active = false, removable = false, onToggle, onRemove, icon, style }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 7, height: 30, padding: '0 10px',
        borderRadius: 'var(--dt-radius-sm)', cursor: 'pointer',
        fontFamily: 'var(--dt-font-sans)', fontSize: 13, fontWeight: active ? 650 : 500,
        background: active ? 'var(--dt-tint-accent)' : 'var(--dt-surface)',
        color: active ? 'var(--dt-accent)' : 'var(--dt-muted-strong)',
        boxShadow: `inset 0 0 0 1px ${active ? 'color-mix(in srgb, var(--dt-accent) 40%, transparent)' : 'var(--dt-border-strong)'}`,
        transition: 'background-color var(--dt-motion-fast), box-shadow var(--dt-motion-fast)',
        ...style,
      }}
    >
      {icon ? <span style={{ display: 'inline-flex', color: active ? 'var(--dt-accent)' : 'var(--dt-muted)' }} aria-hidden="true">{icon}</span> : null}
      <span>{label}</span>
      {count != null ? (
        <span style={{ fontFamily: 'var(--dt-font-mono)', fontSize: 11, fontWeight: 600, color: active ? 'var(--dt-accent)' : 'var(--dt-muted)', fontVariantNumeric: 'tabular-nums' }}>{count}</span>
      ) : null}
      {removable ? (
        <span
          role="button" aria-label="제거"
          onClick={(e) => { e.stopPropagation(); onRemove?.(); }}
          style={{ display: 'inline-flex', marginRight: -2, color: active ? 'var(--dt-accent)' : 'var(--dt-muted)' }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
        </span>
      ) : null}
    </button>
  );
}
