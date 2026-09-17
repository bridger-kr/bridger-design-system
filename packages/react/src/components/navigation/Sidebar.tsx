import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface SidebarItem {
  label: string;
  icon?: ReactNode;
  href?: string;
  active?: boolean;
  /** Trailing count (e.g. tool count), rendered tabular-mono. */
  badge?: ReactNode;
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
  style?: CSSProperties;
}

/**
 * Console primary nav — flat column, active item marked by a persimmon left bar.
 * @startingPoint section="Navigation" subtitle="Console nav rail" viewport="260x440"
 */
export function Sidebar({ brand, sections = [], footer, width = 232, className, style, ...rest }: SidebarProps) {
  return (
    <nav
      {...rest}
      className={cx('dt-sidebar', className)}
      style={{
        width,
        ...style,
      }}
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
                aria-current={it.active ? 'page' : undefined}
                className={cx('dt-sidebar-item', it.active && 'dt-sidebar-item-active')}
              >
                {it.active ? <span className="dt-sidebar-item-marker" /> : null}
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
}
