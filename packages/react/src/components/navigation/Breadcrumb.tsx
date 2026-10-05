import { ChevronRight } from 'lucide-react';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { Icon } from '../../lib/icon';

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
      <ol
        style={{
          margin: 0,
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          flexWrap: 'wrap',
          listStyle: 'none',
        }}
      >
        {items.map((it, i) => {
          const last = i === items.length - 1;

          return (
            <li key={i}>
              {last ? (
                <span aria-current="page" style={{ fontSize: 13, fontWeight: 600, color: 'var(--dt-text-strong)' }}>{it.label}</span>
              ) : (
                <a href={it.href || '#'} style={{ fontSize: 13, fontWeight: 500, color: 'var(--dt-text-muted)', textDecoration: 'none' }}>
                  {it.label}
                </a>
              )}
              {!last ? (
                <Icon icon={ChevronRight} size="sm" style={{ color: 'var(--dt-border-strong)' }} />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
