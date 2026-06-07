import React from 'react';

/**
 * Dropdown menu — a trigger that opens a floating raised list. Items support
 * icons, danger tone, and dividers ({ divider: true }). Click-away closes.
 */
export function Menu({ trigger, items = [], align = 'left', width = 200 }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    window.addEventListener('mousedown', onDoc);
    return () => window.removeEventListener('mousedown', onDoc);
  }, [open]);
  return (
    <span ref={ref} style={{ position: 'relative', display: 'inline-flex' }}>
      <span onClick={() => setOpen((v) => !v)} style={{ display: 'inline-flex', cursor: 'pointer' }}>{trigger}</span>
      {open ? (
        <div role="menu" style={{
          position: 'absolute', top: '100%', [align]: 0, marginTop: 6, zIndex: 80, width,
          padding: 5, background: 'var(--dt-surface)', borderRadius: 'var(--dt-radius-md)',
          boxShadow: 'var(--dt-shadow-lg)', animation: 'dt-menu 130ms var(--dt-ease)',
        }}>
          {items.map((it, i) => it.divider
            ? <div key={`d${i}`} style={{ height: 1, background: 'var(--dt-border)', margin: '5px 0' }} />
            : (
              <button key={i} role="menuitem" onClick={() => { it.onClick?.(); setOpen(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 9, width: '100%', textAlign: 'left',
                  padding: '8px 10px', border: 'none', borderRadius: 'var(--dt-radius-sm)', cursor: 'pointer',
                  background: 'transparent', fontSize: 13.5, fontWeight: 500, fontFamily: 'inherit',
                  color: it.danger ? 'var(--dt-danger)' : 'var(--dt-ink)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = it.danger ? 'var(--dt-tint-danger)' : 'var(--dt-surface-sunken)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
                {it.icon ? <span style={{ display: 'inline-flex', color: it.danger ? 'var(--dt-danger)' : 'var(--dt-muted-strong)' }}>{it.icon}</span> : null}
                {it.label}
              </button>
            ))}
          <style>{`@keyframes dt-menu{from{opacity:0;transform:translateY(-4px)}}`}</style>
        </div>
      ) : null}
    </span>
  );
}
