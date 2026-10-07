// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/navigation/CommandPalette.tsx
// Regenerate: pnpm generate

import { Search } from 'lucide-react';
import { forwardRef, useEffect, useId, useState } from 'react';
import { cx } from '../lib/cx.jsx';
import { Icon } from '../lib/icon.jsx';
import { useControllableState } from '../lib/useControllableState.jsx';
import { useDSMessages } from '../locale/DSLocaleProvider.jsx';
export const CommandPalette = forwardRef(function CommandPalette({ open, defaultOpen, onOpenChange, query = '', onQueryChange, groups = [], inputLabel, listboxLabel, footerHint, placeholder, onSelect, style, className, ...rest }, ref) {
    const messages = useDSMessages();
    const resolvedFooterHint = footerHint ?? messages.commandPalette.footerHint;
    const resolvedPlaceholder = placeholder ?? messages.commandPalette.placeholder;
    const resolvedInputLabel = inputLabel ?? messages.commandPalette.inputLabel;
    const resolvedListboxLabel = listboxLabel ?? messages.commandPalette.listboxLabel;
    const uid = useId();
    const listboxId = `${uid}-listbox`;
    const optionId = (gi, ii) => `${uid}-option-${gi}-${ii}`;
    const groupLabelId = (gi) => `${uid}-group-${gi}`;
    const flatItems = groups.flatMap((g, gi) => g.items.map((item, ii) => ({ item, gi, ii })));
    const [activeFlat, setActiveFlat] = useState(0);
    const [isOpen, setIsOpen] = useControllableState({
        value: open,
        defaultValue: defaultOpen ?? true,
        onChange: onOpenChange,
    });
    useEffect(() => {
        setActiveFlat(0);
    }, [query, groups]);
    const active = flatItems.length ? flatItems[Math.min(activeFlat, flatItems.length - 1)] : undefined;
    const activeDescendant = active ? optionId(active.gi, active.ii) : undefined;
    useEffect(() => {
        const el = activeDescendant ? document.getElementById(activeDescendant) : null;
        el?.scrollIntoView?.({ block: 'nearest' });
    }, [activeDescendant]);
    if (!isOpen)
        return null;
    const moveActive = (delta) => {
        if (!flatItems.length)
            return;
        setActiveFlat((prev) => (prev + delta + flatItems.length) % flatItems.length);
    };
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            moveActive(1);
        }
        else if (e.key === 'ArrowUp') {
            e.preventDefault();
            moveActive(-1);
        }
        else if (e.key === 'Home') {
            e.preventDefault();
            setActiveFlat(0);
        }
        else if (e.key === 'End') {
            e.preventDefault();
            setActiveFlat(flatItems.length - 1);
        }
        else if (e.key === 'Enter') {
            if (e.nativeEvent.isComposing)
                return;
            e.preventDefault();
            if (active)
                onSelect?.(active.item);
        }
        else if (e.key === 'Escape') {
            e.preventDefault();
            setIsOpen(false);
        }
    };
    return (<div ref={ref} {...rest} className={cx('dt-command-palette', className)} style={style}>
      {/* search */}
      <div className="dt-command-search">
        <Icon icon={Search} className="dt-command-search-icon"/>
        <input autoFocus value={query} onChange={(e) => onQueryChange?.(e.target.value)} onKeyDown={handleKeyDown} placeholder={resolvedPlaceholder} role="combobox" aria-expanded="true" aria-autocomplete="list" aria-controls={listboxId} aria-activedescendant={activeDescendant} aria-label={resolvedInputLabel} className="dt-command-input"/>
        <kbd className="dt-command-kbd">⌘K</kbd>
      </div>

      {/* results */}
      <div id={listboxId} role="listbox" aria-label={resolvedListboxLabel} className="dt-command-results">
        {groups.map((g, gi) => (<div key={gi} role="group" aria-labelledby={g.heading ? groupLabelId(gi) : undefined} className="dt-command-group">
            {g.heading ? (<div id={groupLabelId(gi)} className="dt-command-group-heading">{g.heading}</div>) : null}
            {g.items.map((it, ii) => {
                const isActive = active?.gi === gi && active?.ii === ii;
                return (<div key={ii} id={optionId(gi, ii)} role="option" aria-selected={isActive} onMouseDown={(e) => { e.preventDefault(); onSelect?.(it); }} className="dt-command-option">
                  {it.icon ? <span className="dt-command-option-icon" aria-hidden="true">{it.icon}</span> : null}
                  <span className="dt-command-option-label">
                    {it.label}
                    {it.meta ? <span className="dt-command-option-meta">{it.meta}</span> : null}
                  </span>
                  {it.shortcut ? (<kbd className="dt-command-shortcut">{it.shortcut}</kbd>) : null}
                </div>);
            })}
          </div>))}
      </div>

      {footerHint ? (<div className="dt-command-footer">{resolvedFooterHint}</div>) : null}
    </div>);
});
CommandPalette.displayName = 'CommandPalette';
