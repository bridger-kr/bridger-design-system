import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface ProductTopbarProps extends HTMLAttributes<HTMLElement> {
  brand: ReactNode;
  actions: ReactNode;
  mobileActions?: ReactNode;
  mobileMenuLabel?: string;
}

export function ProductTopbar({ brand, actions, mobileActions, mobileMenuLabel = 'Menu', className, ...rest }: ProductTopbarProps) {
  return (
    <header className={cx('dt-product-topbar', className)} {...rest}>
      <div className="dt-product-topbar-brand">{brand}</div>
      <nav className="dt-product-topbar-actions" aria-label="Primary">
        {actions}
      </nav>
      <details className="dt-product-topbar-menu">
        <summary className="dt-product-topbar-menu-button" aria-label={mobileMenuLabel}>
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </summary>
        <nav className="dt-product-topbar-menu-panel" aria-label="Mobile primary">
          {mobileActions ?? actions}
        </nav>
      </details>
    </header>
  );
}
