import React from 'react';

/**
 * Searchable select for large option sets (e.g. the 230+ public-data APIs).
 * Flat hairline field; the listbox is a bordered plane, not a floating cushion.
 * Filters options by query against label + meta. Controlled or uncontrolled.
 */
export function Combobox({
  label, hint, options = [], value, onChange, placeholder = '검색…', emptyText = '결과 없음', id, style,
}) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [active, setActive] = React.useState(0);
  const rootRef = React.useRef(null);
  const cbId = id || (label ? `cb-${label.replace(/\s+/g, '-')}` : undefined);

  const selected = options.find((o) => o.value === value) || null;

  React.useEffect(() => {
    const onDoc = (e) => { if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const q = query.trim().toLowerCase();
  const filtered = q
    ? options.filter((o) => (o.label + ' ' + (o.meta || '')).toLowerCase().includes(q))
    : options;

  const commit = (o) => { onChange?.(o.value); setOpen(false); setQuery(''); };

  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); setActive((i) => Math.min(i + 1, filtered.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((i) => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter' && open && filtered[active]) { e.preventDefault(); commit(filtered[active]); }
    else if (e.key === 'Escape') { setOpen(false); }
  };

  return (
    <div ref={rootRef} style={{ display: 'grid', gap: 7, position: 'relative', ...style }}>
      {label ? <label htmlFor={cbId} style={{ fontSize: 13, fontWeight: 600, color: 'var(--dt-muted-strong)' }}>{label}</label> : null}
      <div
        className="dt-field"
        style={{
          display: 'flex', alignItems: 'center', gap: 9, height: 44, padding: '0 12px',
          boxShadow: open ? 'var(--dt-shadow-focus)' : undefined,
          background: open ? 'var(--dt-surface)' : 'var(--dt-surface-sunken)',
        }}
        onClick={() => setOpen(true)}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ color: 'var(--dt-muted)', flex: '0 0 auto' }}>
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" /><path d="M21 21l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          id={cbId}
          value={open ? query : (selected ? selected.label : '')}
          placeholder={selected && !open ? selected.label : placeholder}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); setActive(0); }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKey}
          style={{
            flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent',
            fontSize: 14, fontFamily: 'inherit', color: 'var(--dt-ink-strong)',
          }}
        />
        {selected && !open ? (
          <span style={{ fontFamily: 'var(--dt-font-mono)', fontSize: 11, color: 'var(--dt-muted)' }}>{selected.meta}</span>
        ) : null}
      </div>

      {open ? (
        <div
          role="listbox"
          style={{
            position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, zIndex: 20,
            background: 'var(--dt-surface)', border: '1px solid var(--dt-border-strong)',
            borderRadius: 'var(--dt-radius-lg)', boxShadow: 'var(--dt-shadow-md)',
            maxHeight: 240, overflowY: 'auto', padding: 4,
          }}
        >
          {filtered.length === 0 ? (
            <div style={{ padding: '12px 12px', fontSize: 13, color: 'var(--dt-muted)' }}>{emptyText}</div>
          ) : filtered.map((o, i) => {
            const isActive = i === active; const isSel = o.value === value;
            return (
              <div
                key={o.value}
                role="option"
                aria-selected={isSel}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => { e.preventDefault(); commit(o); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px',
                  borderRadius: 'var(--dt-radius-md)', cursor: 'pointer',
                  background: isActive ? 'var(--dt-surface-sunken)' : 'transparent',
                }}
              >
                <span style={{ flex: 1, minWidth: 0, fontSize: 13.5, fontWeight: isSel ? 600 : 500, color: 'var(--dt-ink-strong)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{o.label}</span>
                {o.meta ? <span style={{ fontFamily: 'var(--dt-font-mono)', fontSize: 11, color: 'var(--dt-muted)', flex: '0 0 auto' }}>{o.meta}</span> : null}
                {isSel ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ color: 'var(--dt-accent)', flex: '0 0 auto' }}><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : null}
      {hint ? <span style={{ fontSize: 12, color: 'var(--dt-muted)' }}>{hint}</span> : null}
    </div>
  );
}
