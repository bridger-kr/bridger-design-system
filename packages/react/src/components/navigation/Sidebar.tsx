import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';

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
export function Sidebar({ brand, sections = [], footer, width = 232, style, ...rest }: SidebarProps) {
  return (
    <nav
      {...rest}
      style={{
        width, display: 'flex', flexDirection: 'column',
        background: 'var(--dt-surface)', borderRight: '1px solid var(--dt-border-strong)',
        fontFamily: 'var(--dt-font-sans)', ...style,
      }}
    >
      {brand ? (
        <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--dt-border)' }}>{brand}</div>
      ) : null}

      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 10px', display: 'grid', gap: 16, alignContent: 'start' }}>
        {sections.map((sec, si) => (
          <div key={si} style={{ display: 'grid', gap: 2 }}>
            {sec.heading ? (
              <div style={{ fontFamily: 'var(--dt-font-mono)', fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--dt-muted)', padding: '4px 10px 6px' }}>{sec.heading}</div>
            ) : null}
            {sec.items.map((it, ii) => (
              <a
                key={ii}
                href={it.href || '#'}
                aria-current={it.active ? 'page' : undefined}
                style={{
                  position: 'relative', display: 'flex', alignItems: 'center', gap: 11,
                  padding: '8px 10px 8px 12px', borderRadius: 'var(--dt-radius-md)', textDecoration: 'none',
                  fontSize: 13.5, fontWeight: it.active ? 600 : 500,
                  color: it.active ? 'var(--dt-accent)' : 'var(--dt-muted-strong)',
                  background: it.active ? 'var(--dt-tint-accent)' : 'transparent',
                }}
              >
                {it.active ? <span style={{ position: 'absolute', left: 0, top: 7, bottom: 7, width: 3, borderRadius: 2, background: 'var(--dt-accent)' }} /> : null}
                {it.icon ? <span style={{ display: 'inline-flex', flex: '0 0 auto', color: it.active ? 'var(--dt-accent)' : 'var(--dt-muted)' }} aria-hidden="true">{it.icon}</span> : null}
                <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{it.label}</span>
                {it.badge != null ? (
                  <span style={{ fontFamily: 'var(--dt-font-mono)', fontSize: 11, color: it.active ? 'var(--dt-accent)' : 'var(--dt-muted)', fontVariantNumeric: 'tabular-nums' }}>{it.badge}</span>
                ) : null}
              </a>
            ))}
          </div>
        ))}
      </div>

      {footer ? <div style={{ padding: '12px 16px', borderTop: '1px solid var(--dt-border)' }}>{footer}</div> : null}
    </nav>
  );
}
