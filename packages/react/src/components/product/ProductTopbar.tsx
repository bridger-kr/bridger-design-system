import { useEffect, useId, useRef, useState } from 'react';
import type { HTMLAttributes, MouseEvent, ReactNode } from 'react';
import { cx } from '../../lib/cx';

const PRODUCT_TOPBAR_MENU_CLOSE_KEY = 'Escape';

export interface ProductTopbarProps extends HTMLAttributes<HTMLElement> {
  brand: ReactNode;
  actions: ReactNode;
  mobileActions?: ReactNode;
  mobileMenuLabel?: string;
}

export interface ProductTopbarMenuProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  label?: string;
}

export function ProductTopbarMenu({ children, label = 'Menu', className, ...rest }: ProductTopbarMenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const handleToggle = () => {
    setOpen((currentOpen) => !currentOpen);
  };
  const handleMenuPanelClick = (event: MouseEvent<HTMLElement>) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (!target.closest('a[href]')) return;
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      const menu = menuRef.current;
      const target = event.target;
      if (!menu || !(target instanceof Node) || menu.contains(target)) return;
      setOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== PRODUCT_TOPBAR_MENU_CLOSE_KEY) return;
      event.preventDefault();
      buttonRef.current?.focus();
      setOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div {...rest} ref={menuRef} className={cx('dt-product-topbar-menu', className)} data-open={open ? 'true' : undefined}>
      <button
        ref={buttonRef}
        type="button"
        className="dt-product-topbar-menu-button"
        aria-label={label}
        aria-controls={panelId}
        aria-expanded={open}
        onClick={handleToggle}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
      {open ? (
        <nav id={panelId} className="dt-product-topbar-menu-panel" aria-label="Mobile primary" onClick={handleMenuPanelClick}>
          {children}
        </nav>
      ) : null}
    </div>
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
