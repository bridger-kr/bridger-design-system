import { Menu as BaseMenu } from '@base-ui-components/react/menu';
import { useState } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface ProductTopbarProps extends HTMLAttributes<HTMLElement> {
  brand: ReactNode;
  actions: ReactNode;
  mobileActions?: ReactNode;
  mobileMenuLabel?: string;
}

export interface ProductTopbarMenuProps extends HTMLAttributes<HTMLDetailsElement> {
  children: ReactNode;
  label?: string;
}

export function ProductTopbarMenu({ children, label = 'Menu', className, ...rest }: ProductTopbarMenuProps) {
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((currentOpen) => !currentOpen);
  };

  return (
    <BaseMenu.Root modal={false} open={open} onOpenChange={setOpen}>
      <details className={cx('dt-product-topbar-menu', className)} open={open} {...rest}>
        <BaseMenu.Trigger
          render={<summary />}
          className="dt-product-topbar-menu-button"
          aria-label={label}
          onClick={(event) => {
            event.preventDefault();
            handleToggle();
          }}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </BaseMenu.Trigger>
        <BaseMenu.Portal>
          <BaseMenu.Positioner sideOffset={8} align="end">
            <BaseMenu.Popup>
              <nav className="dt-product-topbar-menu-panel" aria-label="Mobile primary">
                {children}
              </nav>
            </BaseMenu.Popup>
          </BaseMenu.Positioner>
        </BaseMenu.Portal>
      </details>
    </BaseMenu.Root>
  );
}

export function ProductTopbar({ brand, actions, mobileActions, mobileMenuLabel = 'Menu', className, ...rest }: ProductTopbarProps) {
  return (
    <header className={cx('dt-product-topbar', className)} {...rest}>
      <div className="dt-product-topbar-brand">{brand}</div>
      <nav className="dt-product-topbar-actions" aria-label="Primary">
        {actions}
      </nav>
      <ProductTopbarMenu label={mobileMenuLabel}>{mobileActions ?? actions}</ProductTopbarMenu>
    </header>
  );
}
