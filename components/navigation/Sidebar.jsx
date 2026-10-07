// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/navigation/Sidebar.tsx
// Regenerate: pnpm generate

import { forwardRef } from 'react';
import { cx } from '../lib/cx.jsx';
/**
 * Console primary nav — flat column, active item marked by a sunken row.
 * @startingPoint section="Navigation" subtitle="Console nav rail" viewport="260x440"
 */
export const Sidebar = forwardRef(function Sidebar({ brand, sections = [], footer, width = 240, onNavigate, className, style, ...rest }, ref) {
    return (<nav ref={ref} {...rest} className={cx('dt-sidebar', className)} style={{ '--dt-sidebar-width': `${width}px`, ...style }}>
      {brand ? (<div className="dt-sidebar-brand">{brand}</div>) : null}

      <div className="dt-sidebar-body">
        {sections.map((sec, si) => (<div className="dt-sidebar-section" key={si}>
            {sec.heading ? (<div className="dt-sidebar-heading">{sec.heading}</div>) : null}
            {sec.items.map((it, ii) => (<a key={ii} href={it.href || '#'} target={it.external ? '_blank' : undefined} rel={it.external ? 'noreferrer noopener' : undefined} aria-current={it.active ? 'page' : undefined} className={cx('dt-sidebar-item', it.active && 'dt-sidebar-item-active')} onClick={onNavigate ? (event) => onNavigate(event, it) : undefined}>
                {it.icon ? <span className="dt-sidebar-item-icon" aria-hidden="true">{it.icon}</span> : null}
                <span className="dt-sidebar-item-label">{it.label}</span>
                {it.badge != null ? (<span className="dt-sidebar-item-badge">{it.badge}</span>) : null}
              </a>))}
          </div>))}
      </div>

      {footer ? <div className="dt-sidebar-footer">{footer}</div> : null}
    </nav>);
});
Sidebar.displayName = 'Sidebar';
