import { ChevronRight } from 'lucide-react';
import { forwardRef } from 'react';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
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
export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(function Breadcrumb(
  { items = [], className, style, ...rest },
  ref,
) {
  return (
    <nav
      ref={ref}
      {...rest}
      aria-label="breadcrumb"
      className={cx('dt-breadcrumb', className)}
      style={style}
    >
      <ol className="dt-breadcrumb-list">
        {items.map((it, i) => {
          const last = i === items.length - 1;

          return (
            <li key={i} className="dt-breadcrumb-item">
              {last ? (
                <span aria-current="page" className="dt-breadcrumb-current">{it.label}</span>
              ) : (
                <a href={it.href || '#'} className="dt-breadcrumb-link">
                  {it.label}
                </a>
              )}
              {!last ? (
                <Icon icon={ChevronRight} size="sm" className="dt-breadcrumb-sep" />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
});
Breadcrumb.displayName = 'Breadcrumb';
