import { forwardRef } from 'react';
import type { CSSProperties, HTMLAttributes, MouseEvent, ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface SidebarItem {
  label: string;
  icon?: ReactNode;
  href?: string;
  active?: boolean;
  /** Trailing count (e.g. tool count), rendered tabular-mono. */
  badge?: ReactNode;
  /** Opens in a new tab with noreferrer semantics (e.g. a sibling console host). */
  external?: boolean;
}

export interface SidebarSection {
  heading?: string;
  items: SidebarItem[];
}

export interface SidebarProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** Brand block for the header (e.g. <BrandLogo/>). */
  brand?: ReactNode;
  sections?: SidebarSection[];
  footer?: ReactNode;
  width?: number;
  /**
   * Icon-only rail: labels stay in the accessibility tree and each item gets
   * a native `title` tooltip so the collapsed rail still names destinations.
   */
  collapsed?: boolean;
  /**
   * Called when an item is activated. Apps with client-side routers use this
   * to intercept plain clicks (modifier/middle clicks still open natively).
   */
  onNavigate?: (event: MouseEvent<HTMLAnchorElement>, item: SidebarItem) => void;
  style?: CSSProperties;
}

/**
 * Console primary nav — flat column, active item marked by a sunken row.
 * @startingPoint section="Navigation" subtitle="Console nav rail" viewport="260x440"
 */
export const Sidebar = forwardRef<HTMLElement, SidebarProps>(function Sidebar(
  { brand, sections = [], footer, width = 240, collapsed = false, onNavigate, className, style, ...rest },
  ref,
) {
  return (
    <nav
      ref={ref}
      {...rest}
      className={cx('dt-sidebar', collapsed && 'dt-sidebar-collapsed', className)}
      style={{ '--dt-sidebar-width': `${width}px`, ...style } as CSSProperties}
    >
      {brand ? (
        <div className="dt-sidebar-brand">{brand}</div>
      ) : null}

      <div className="dt-sidebar-body">
        {sections.map((sec, si) => (
          <div className="dt-sidebar-section" key={si}>
            {sec.heading ? (
              <div className="dt-sidebar-heading">{sec.heading}</div>
            ) : null}
            {sec.items.map((it, ii) => (
              <a
                key={ii}
                href={it.href || '#'}
                target={it.external ? '_blank' : undefined}
                rel={it.external ? 'noreferrer noopener' : undefined}
                aria-current={it.active ? 'page' : undefined}
                title={collapsed && typeof it.label === 'string' ? it.label : undefined}
                className={cx('dt-sidebar-item', it.active && 'dt-sidebar-item-active')}
                onClick={onNavigate ? (event) => onNavigate(event, it) : undefined}
              >
                {it.icon ? <span className="dt-sidebar-item-icon" aria-hidden="true">{it.icon}</span> : null}
                <span className="dt-sidebar-item-label">{it.label}</span>
                {it.badge != null ? (
                  <span className="dt-sidebar-item-badge">{it.badge}</span>
                ) : null}
              </a>
            ))}
          </div>
        ))}
      </div>

      {footer ? <div className="dt-sidebar-footer">{footer}</div> : null}
    </nav>
  );
});
Sidebar.displayName = 'Sidebar';
