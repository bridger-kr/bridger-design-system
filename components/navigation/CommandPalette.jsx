import React from 'react';

/**
 * CommandPalette (⌘K) — a fast switcher over tools and actions. A bordered plane
 * with a search field, grouped results, and mono shortcut hints. Render it as a
 * controlled panel (open + query + groups). Keeps the console flat: the only
 * elevation is the one floating layer. Pair items with Lucide icons.
 */
export function CommandPalette({ open = true, query = '', onQueryChange, groups = [], footerHint = '↑↓ 이동 · ↵ 실행 · esc 닫기', onSelect, style }) {
  if (!open) return null;
  return (
    <div style={{
      width: 520, maxWidth: '100%', background: 'var(--dt-surface)',
      border: '1px solid var(--dt-border-strong)', borderRadius: 'var(--dt-radius-xl)',
      boxShadow: 'var(--dt-shadow-xl)', overflow: 'hidden', fontFamily: 'var(--dt-font-sans)', ...style,
    }}>
      {/* search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '14px 16px', borderBottom: '1px solid var(--dt-border)' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ color: 'var(--dt-muted)', flex: '0 0 auto' }}>
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" /><path d="M21 21l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          autoFocus value={query} onChange={(e) => onQueryChange?.(e.target.value)}
          placeholder="도구 · 액션 검색…"
          style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 15, fontFamily: 'inherit', color: 'var(--dt-ink-strong)' }}
        />
        <kbd style={{
          fontFamily: 'var(--dt-font-mono)', fontSize: 11, fontWeight: 600, color: 'var(--dt-muted)',
          border: '1px solid var(--dt-border-strong)', borderRadius: 'var(--dt-radius-sm)', padding: '2px 7px',
        }}>⌘K</kbd>
      </div>

      {/* results */}
      <div style={{ maxHeight: 320, overflowY: 'auto', padding: 6 }}>
        {groups.map((g, gi) => (
          <div key={gi} style={{ marginBottom: 4 }}>
            {g.heading ? (
              <div style={{ fontFamily: 'var(--dt-font-mono)', fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--dt-muted)', padding: '8px 10px 5px' }}>{g.heading}</div>
            ) : null}
            {g.items.map((it, ii) => (
              <div
                key={ii}
                onMouseDown={(e) => { e.preventDefault(); onSelect?.(it); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 11, padding: '9px 10px',
                  borderRadius: 'var(--dt-radius-md)', cursor: 'pointer',
                  background: it.active ? 'var(--dt-tint-accent)' : 'transparent',
                }}
              >
                {it.icon ? <span style={{ display: 'inline-flex', flex: '0 0 auto', color: it.active ? 'var(--dt-accent)' : 'var(--dt-muted)' }} aria-hidden="true">{it.icon}</span> : null}
                <span style={{ flex: 1, minWidth: 0, fontSize: 13.5, fontWeight: it.active ? 600 : 500, color: it.active ? 'var(--dt-accent)' : 'var(--dt-ink-strong)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {it.label}
                  {it.meta ? <span style={{ fontFamily: 'var(--dt-font-mono)', fontSize: 11, color: 'var(--dt-muted)', fontWeight: 400, marginLeft: 8 }}>{it.meta}</span> : null}
                </span>
                {it.shortcut ? (
                  <kbd style={{ fontFamily: 'var(--dt-font-mono)', fontSize: 11, color: 'var(--dt-muted-strong)', border: '1px solid var(--dt-border-strong)', borderRadius: 'var(--dt-radius-sm)', padding: '1px 6px' }}>{it.shortcut}</kbd>
                ) : null}
              </div>
            ))}
          </div>
        ))}
      </div>

      {footerHint ? (
        <div style={{ borderTop: '1px solid var(--dt-border)', padding: '8px 14px', fontFamily: 'var(--dt-font-mono)', fontSize: 11, color: 'var(--dt-muted)' }}>{footerHint}</div>
      ) : null}
    </div>
  );
}
