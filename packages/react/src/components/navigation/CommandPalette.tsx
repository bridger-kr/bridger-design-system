import type { ChangeEvent, CSSProperties, HTMLAttributes, KeyboardEvent, MouseEvent as ReactMouseEvent, ReactNode } from 'react';
import { useState, useEffect } from 'react';

export interface CommandItem {
  label: string;
  icon?: ReactNode;
  meta?: string;
  shortcut?: string;
  active?: boolean;
}

export interface CommandGroup {
  heading?: string;
  items: CommandItem[];
}

export interface CommandPaletteProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onSelect'> {
  open?: boolean;
  query?: string;
  onQueryChange?: (q: string) => void;
  groups?: CommandGroup[];
  footerHint?: string;
  onSelect?: (item: CommandItem) => void;
  style?: CSSProperties;
}

export function CommandPalette({ open = true, query = '', onQueryChange, groups = [], footerHint = '↑↓ 이동 · ↵ 실행 · esc 닫기', onSelect, style, ...rest }: CommandPaletteProps) {
  const [activeIndex, setActiveIndex] = useState([0, 0]);
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  if (!isOpen) return null;

  const handleKeyDown = (_e: KeyboardEvent) => {
    if (_e.key === 'ArrowDown') {
      _e.preventDefault();
      setActiveIndex((prev) => {
        const [groupIdx, itemIdx] = prev;
        const group = groups[groupIdx];
        if (!group) return prev;
        if (itemIdx < group.items.length - 1) return [groupIdx, itemIdx + 1];
        const nextGroupIdx = (groupIdx + 1) % groups.length;
        const nextGroup = groups[nextGroupIdx];
        if (nextGroup && nextGroup.items.length > 0) return [nextGroupIdx, 0];
        return prev;
      });
    } else if (_e.key === 'ArrowUp') {
      _e.preventDefault();
      setActiveIndex((prev) => {
        const [groupIdx, itemIdx] = prev;
        if (itemIdx > 0) return [groupIdx, itemIdx - 1];
        const prevGroupIdx = (groupIdx - 1 + groups.length) % groups.length;
        const prevGroup = groups[prevGroupIdx];
        if (prevGroup && prevGroup.items.length > 0) return [prevGroupIdx, prevGroup.items.length - 1];
        return prev;
      });
    } else if (_e.key === 'Enter') {
      _e.preventDefault();
      const [gi, ii] = activeIndex;
      const group = groups[gi];
      if (group && group.items[ii]) onSelect?.(group.items[ii]);
    } else if (_e.key === 'Escape') {
      _e.preventDefault();
      setIsOpen(false);
    }
  };

  return (
    <div
      {...rest}
      role="listbox"
      onKeyDown={handleKeyDown}
      style={{
        width: 520, maxWidth: '100%', background: 'var(--dt-surface)',
        border: '1px solid var(--dt-border-strong)', borderRadius: 'var(--dt-radius-xl)',
        boxShadow: 'var(--dt-shadow-xl)', overflow: 'hidden', fontFamily: 'var(--dt-font-sans)', ...style,
      }}
    >
      {/* search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '14px 16px', borderBottom: '1px solid var(--dt-border)' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ color: 'var(--dt-muted)', flex: '0 0 auto' }}>
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" /><path d="M21 21l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          autoFocus value={query} onChange={(e: ChangeEvent<HTMLInputElement>) => onQueryChange?.(e.target.value)}
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
            {g.items.map((it, ii) => {
              const isActive = activeIndex[0] === gi && activeIndex[1] === ii;
              return (
                <button
                  key={ii}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onMouseDown={(e: ReactMouseEvent<HTMLButtonElement>) => { e.preventDefault(); onSelect?.(it); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 11, padding: '9px 10px',
                    borderRadius: 'var(--dt-radius-md)', cursor: 'pointer',
                    background: isActive ? 'var(--dt-tint-accent)' : 'transparent',
                    border: 'none', outline: 'none',
                  }}
                >
                  {it.icon ? <span style={{ display: 'inline-flex', flex: '0 0 auto', color: isActive ? 'var(--dt-accent)' : 'var(--dt-muted)' }} aria-hidden="true">{it.icon}</span> : null}
                  <span style={{ flex: 1, minWidth: 0, fontSize: 13.5, fontWeight: isActive ? 600 : 500, color: isActive ? 'var(--dt-accent)' : 'var(--dt-ink-strong)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {it.label}
                    {it.meta ? <span style={{ fontFamily: 'var(--dt-font-mono)', fontSize: 11, color: 'var(--dt-muted)', fontWeight: 400, marginLeft: 8 }}>{it.meta}</span> : null}
                  </span>
                  {it.shortcut ? (
                    <kbd style={{ fontFamily: 'var(--dt-font-mono)', fontSize: 11, color: 'var(--dt-muted-strong)', border: '1px solid var(--dt-border-strong)', borderRadius: 'var(--dt-radius-sm)', padding: '1px 6px' }}>{it.shortcut}</kbd>
                  ) : null}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {footerHint ? (
        <div style={{ borderTop: '1px solid var(--dt-border)', padding: '8px 14px', fontFamily: 'var(--dt-font-mono)', fontSize: 11, color: 'var(--dt-muted)' }}>{footerHint}</div>
      ) : null}
    </div>
  );
}
