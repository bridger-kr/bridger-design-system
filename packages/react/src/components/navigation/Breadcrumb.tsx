import { Fragment } from 'react';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
}

export interface BreadcrumbProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  items?: BreadcrumbItem[];
  style?: CSSProperties;
}

/** Breadcrumb trail — last item is the current page. */
export function Breadcrumb({ items = [], style, ...rest }: BreadcrumbProps) {
  return (
    <nav
      {...rest}
      aria-label="breadcrumb"
      style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', ...style }}
    >
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <Fragment key={i}>
            {last
              ? <span aria-current="page" style={{ fontSize: 13, fontWeight: 600, color: 'var(--dt-ink-strong)' }}>{it.label}</span>
              : <a href={it.href || '#'} style={{ fontSize: 13, fontWeight: 500, color: 'var(--dt-muted)', textDecoration: 'none' }}>{it.label}</a>}
            {!last ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--dt-border-strong)' }} aria-hidden="true">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : null}
          </Fragment>
        );
      })}
    </nav>
  );
}
