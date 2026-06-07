import React from 'react';

/** Pagination — prev/next plus compact page numbers with an ellipsis. */
export function Pagination({ page = 1, pageCount = 1, onChange, style }) {
  const go = (p) => { if (p >= 1 && p <= pageCount && p !== page) onChange?.(p); };
  const pages = [];
  const add = (p) => pages.push(p);
  if (pageCount <= 7) { for (let i = 1; i <= pageCount; i += 1) add(i); }
  else {
    add(1);
    if (page > 3) add('…');
    for (let i = Math.max(2, page - 1); i <= Math.min(pageCount - 1, page + 1); i += 1) add(i);
    if (page < pageCount - 2) add('…');
    add(pageCount);
  }
  const cell = (active) => ({
    minWidth: 32, height: 32, padding: '0 8px', borderRadius: 'var(--dt-radius-sm)', border: 'none', cursor: 'pointer',
    fontSize: 13, fontWeight: 600, fontVariantNumeric: 'tabular-nums',
    background: active ? 'var(--dt-accent)' : 'transparent',
    color: active ? 'var(--dt-accent-ink)' : 'var(--dt-muted-strong)',
  });
  const arrow = (dis) => ({ ...cell(false), opacity: dis ? 0.4 : 1, cursor: dis ? 'not-allowed' : 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' });
  return (
    <nav style={{ display: 'inline-flex', alignItems: 'center', gap: 2, ...style }} aria-label="페이지">
      <button style={arrow(page <= 1)} onClick={() => go(page - 1)} disabled={page <= 1} aria-label="이전">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      {pages.map((p, i) => p === '…'
        ? <span key={`e${i}`} style={{ minWidth: 22, textAlign: 'center', color: 'var(--dt-muted)' }}>…</span>
        : <button key={p} style={cell(p === page)} onClick={() => go(p)} aria-current={p === page ? 'page' : undefined}>{p}</button>)}
      <button style={arrow(page >= pageCount)} onClick={() => go(page + 1)} disabled={page >= pageCount} aria-label="다음">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
    </nav>
  );
}
