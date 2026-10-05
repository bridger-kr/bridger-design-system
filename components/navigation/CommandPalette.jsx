// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/navigation/CommandPalette.tsx
// Regenerate: pnpm generate

import { useState, useEffect } from 'react';
import { cx } from '../lib/cx.jsx';
export function CommandPalette({ open = true, query = '', onQueryChange, groups = [], footerHint = '↑↓ 이동 · ↵ 실행 · esc 닫기', onSelect, style, className, ...rest }) {
    const [activeIndex, setActiveIndex] = useState([0, 0]);
    const [isOpen, setIsOpen] = useState(open);
    useEffect(() => {
        setIsOpen(open);
    }, [open]);
    if (!isOpen)
        return null;
    const handleKeyDown = (_e) => {
        if (_e.key === 'ArrowDown') {
            _e.preventDefault();
            setActiveIndex((prev) => {
                const [groupIdx, itemIdx] = prev;
                const group = groups[groupIdx];
                if (!group)
                    return prev;
                if (itemIdx < group.items.length - 1)
                    return [groupIdx, itemIdx + 1];
                const nextGroupIdx = (groupIdx + 1) % groups.length;
                const nextGroup = groups[nextGroupIdx];
                if (nextGroup && nextGroup.items.length > 0)
                    return [nextGroupIdx, 0];
                return prev;
            });
        }
        else if (_e.key === 'ArrowUp') {
            _e.preventDefault();
            setActiveIndex((prev) => {
                const [groupIdx, itemIdx] = prev;
                if (itemIdx > 0)
                    return [groupIdx, itemIdx - 1];
                const prevGroupIdx = (groupIdx - 1 + groups.length) % groups.length;
                const prevGroup = groups[prevGroupIdx];
                if (prevGroup && prevGroup.items.length > 0)
                    return [prevGroupIdx, prevGroup.items.length - 1];
                return prev;
            });
        }
        else if (_e.key === 'Enter') {
            _e.preventDefault();
            const [gi, ii] = activeIndex;
            const group = groups[gi];
            if (group && group.items[ii])
                onSelect?.(group.items[ii]);
        }
        else if (_e.key === 'Escape') {
            _e.preventDefault();
            setIsOpen(false);
        }
    };
    return (<div {...rest} role="listbox" onKeyDown={handleKeyDown} className={cx('dt-command-palette', className)} style={style}>
      {/* search */}
      <div className="dt-command-search">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="dt-command-search-icon">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/><path d="M21 21l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <input autoFocus value={query} onChange={(e) => onQueryChange?.(e.target.value)} placeholder="도구 · 액션 검색…" className="dt-command-input"/>
        <kbd className="dt-command-kbd">⌘K</kbd>
      </div>

      {/* results */}
      <div className="dt-command-results">
        {groups.map((g, gi) => (<div key={gi} className="dt-command-group">
            {g.heading ? (<div className="dt-command-group-heading">{g.heading}</div>) : null}
            {g.items.map((it, ii) => {
                const isActive = activeIndex[0] === gi && activeIndex[1] === ii;
                return (<button key={ii} type="button" role="option" aria-selected={isActive} onMouseDown={(e) => { e.preventDefault(); onSelect?.(it); }} className="dt-command-option">
                  {it.icon ? <span className="dt-command-option-icon" aria-hidden="true">{it.icon}</span> : null}
                  <span className="dt-command-option-label">
                    {it.label}
                    {it.meta ? <span className="dt-command-option-meta">{it.meta}</span> : null}
                  </span>
                  {it.shortcut ? (<kbd className="dt-command-shortcut">{it.shortcut}</kbd>) : null}
                </button>);
            })}
          </div>))}
      </div>

      {footerHint ? (<div className="dt-command-footer">{footerHint}</div>) : null}
    </div>);
}
