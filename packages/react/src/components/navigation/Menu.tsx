import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, HTMLAttributes, KeyboardEvent, MouseEvent as ReactMouseEvent, ReactNode } from 'react';

export interface MenuItem {
  label?: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  danger?: boolean;
  divider?: boolean;
}

export interface MenuProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  trigger: ReactNode;
  items?: MenuItem[];
  align?: 'left' | 'right';
  width?: number;
  style?: CSSProperties;
}

export function Menu({ trigger, items = [], align = 'left', width = 200, style, ...rest }: MenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    window.addEventListener('mousedown', onDoc);
    return () => window.removeEventListener('mousedown', onDoc);
  }, [open]);

  const handleTriggerKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen((v) => !v);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const firstItem = ref.current?.querySelector('button[role="menuitem"]') as HTMLButtonElement | null;
      firstItem?.focus();
    }
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.onClick) {
      item.onClick();
      setOpen(false);
    }
  };

  const handleTriggerClick = () => {
    setOpen((v) => !v);
  };

  return (
    <span {...rest} ref={ref} style={{ position: 'relative', display: 'inline-flex', ...style }}>
      <button
        type="button"
        onClick={handleTriggerClick}
        onKeyDown={handleTriggerKeyDown}
        aria-expanded={open}
        aria-haspopup="menu"
        style={{ display: 'inline-flex', cursor: 'pointer', border: 'none', background: 'transparent', padding: 0, fontSize: 'inherit', fontFamily: 'inherit' }}
      >
        {trigger}
      </button>
      {open ? (
        <div role="menu" aria-orientation="vertical" style={{
          position: 'absolute', top: '100%', [align]: 0, marginTop: 6, zIndex: 80, width,
          padding: 5, background: 'var(--dt-surface)', borderRadius: 'var(--dt-radius-md)',
          boxShadow: 'var(--dt-shadow-lg)', animation: 'dt-menu 130ms var(--dt-ease)',
        }}>
          {items.map((it, i) => it.divider
            ? <div key={`d${i}`} style={{ height: 1, background: 'var(--dt-border)', margin: '5px 0' }} />
            : (
              <button
                key={i}
                role="menuitem"
                onClick={() => handleItemClick(it)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 9, width: '100%', textAlign: 'left',
                  padding: '8px 10px', border: 'none', borderRadius: 'var(--dt-radius-sm)', cursor: 'pointer',
                  background: 'transparent', fontSize: 13.5, fontWeight: 500, fontFamily: 'inherit',
                  color: it.danger ? 'var(--dt-danger)' : 'var(--dt-ink)',
                }}
                onMouseEnter={(e: ReactMouseEvent<HTMLButtonElement>) => { e.currentTarget.style.background = it.danger ? 'var(--dt-tint-danger)' : 'var(--dt-surface-sunken)'; }}
                onMouseLeave={(e: ReactMouseEvent<HTMLButtonElement>) => { e.currentTarget.style.background = 'transparent'; }}>
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
