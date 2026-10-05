import type { ChangeEvent, CSSProperties, HTMLAttributes, KeyboardEvent, MouseEvent as ReactMouseEvent, ReactNode } from 'react';
import { useState, useEffect, useId } from 'react';
import { cx } from '../../lib/cx';

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
  /** Called when the palette asks to close (Escape). Pair with `open` for controlled usage. */
  onOpenChange?: (open: boolean) => void;
  query?: string;
  onQueryChange?: (q: string) => void;
  groups?: CommandGroup[];
  /** Accessible name for the search input (rendered as a combobox). */
  inputLabel?: string;
  /** Accessible name for the results listbox. */
  listboxLabel?: string;
  footerHint?: string;
  onSelect?: (item: CommandItem) => void;
  style?: CSSProperties;
}

export function CommandPalette({
  open = true,
  onOpenChange,
  query = '',
  onQueryChange,
  groups = [],
  inputLabel = '도구 · 액션 검색',
  listboxLabel = '검색 결과',
  footerHint = '↑↓ 이동 · ↵ 실행 · esc 닫기',
  onSelect,
  style,
  className,
  ...rest
}: CommandPaletteProps) {
  const uid = useId();
  const listboxId = `${uid}-listbox`;
  const optionId = (gi: number, ii: number) => `${uid}-option-${gi}-${ii}`;
  const groupLabelId = (gi: number) => `${uid}-group-${gi}`;

  const flatItems = groups.flatMap((g, gi) => g.items.map((item, ii) => ({ item, gi, ii })));
  const [activeFlat, setActiveFlat] = useState(0);
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    setActiveFlat(0);
  }, [query, groups]);

  const active = flatItems.length ? flatItems[Math.min(activeFlat, flatItems.length - 1)] : undefined;
  const activeDescendant = active ? optionId(active.gi, active.ii) : undefined;

  useEffect(() => {
    const el = activeDescendant ? document.getElementById(activeDescendant) : null;
    el?.scrollIntoView?.({ block: 'nearest' });
  }, [activeDescendant]);

  if (!isOpen) return null;

  const moveActive = (delta: number) => {
    if (!flatItems.length) return;
    setActiveFlat((prev) => (prev + delta + flatItems.length) % flatItems.length);
  };

  const close = () => {
    setIsOpen(false);
    onOpenChange?.(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      moveActive(1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      moveActive(-1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActiveFlat(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setActiveFlat(flatItems.length - 1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (active) onSelect?.(active.item);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      close();
    }
  };

  return (
    <div
      {...rest}
      className={cx('dt-command-palette', className)}
      style={style}
    >
      {/* search */}
      <div className="dt-command-search">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="dt-command-search-icon">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" /><path d="M21 21l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          autoFocus value={query} onChange={(e: ChangeEvent<HTMLInputElement>) => onQueryChange?.(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="도구 · 액션 검색…"
          role="combobox"
          aria-expanded="true"
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-activedescendant={activeDescendant}
          aria-label={inputLabel}
          className="dt-command-input"
        />
        <kbd className="dt-command-kbd">⌘K</kbd>
      </div>

      {/* results */}
      <div
        id={listboxId}
        role="listbox"
        aria-label={listboxLabel}
        className="dt-command-results"
      >
        {groups.map((g, gi) => (
          <div
            key={gi}
            role="group"
            aria-labelledby={g.heading ? groupLabelId(gi) : undefined}
            className="dt-command-group"
          >
            {g.heading ? (
              <div id={groupLabelId(gi)} className="dt-command-group-heading">{g.heading}</div>
            ) : null}
            {g.items.map((it, ii) => {
              const isActive = active?.gi === gi && active?.ii === ii;
              return (
                <div
                  key={ii}
                  id={optionId(gi, ii)}
                  role="option"
                  aria-selected={isActive}
                  onMouseDown={(e: ReactMouseEvent<HTMLDivElement>) => { e.preventDefault(); onSelect?.(it); }}
                  className="dt-command-option"
                >
                  {it.icon ? <span className="dt-command-option-icon" aria-hidden="true">{it.icon}</span> : null}
                  <span className="dt-command-option-label">
                    {it.label}
                    {it.meta ? <span className="dt-command-option-meta">{it.meta}</span> : null}
                  </span>
                  {it.shortcut ? (
                    <kbd className="dt-command-shortcut">{it.shortcut}</kbd>
                  ) : null}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {footerHint ? (
        <div className="dt-command-footer">{footerHint}</div>
      ) : null}
    </div>
  );
}
