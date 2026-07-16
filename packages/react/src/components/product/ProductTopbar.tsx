import { useEffect, useId, useRef, useState } from 'react';
import type { HTMLAttributes, MouseEvent, ReactNode } from 'react';
import { cx } from '../../lib/cx';

const PRODUCT_TOPBAR_MENU_KEY = {
  Close: 'Escape',
  Traverse: 'Tab',
} as const;

const PRODUCT_TOPBAR_MENU_FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function isFocusableInsideMenu(element: HTMLElement, menu: HTMLElement) {
  if (element.tabIndex < 0 || element.closest('[hidden], [inert]') !== null) return false;
  let current: HTMLElement | null = element;
  while (current && menu.contains(current)) {
    const style = window.getComputedStyle(current);
    if (style.display === 'none' || style.visibility === 'hidden' || style.contentVisibility === 'hidden') return false;
    if (current === menu) break;
    current = current.parentElement;
  }
  return true;
}

export interface ProductTopbarProps extends HTMLAttributes<HTMLElement> {
  brand: ReactNode;
  actions: ReactNode;
  mobileActions?: ReactNode;
  mobileMenuCloseLabel?: string;
  mobileMenuDialogLabel?: string;
  mobileMenuLabel?: string;
  mobileMenuNavigationLabel?: string;
}

export interface ProductTopbarMenuProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  closeLabel?: string;
  dialogLabel?: string;
  label?: string;
  navigationLabel?: string;
}

export function ProductTopbarMenu({
  children,
  closeLabel,
  dialogLabel = 'Mobile menu',
  label = 'Menu',
  navigationLabel = 'Mobile primary',
  className,
  ...rest
}: ProductTopbarMenuProps) {
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
      if (event.key === PRODUCT_TOPBAR_MENU_KEY.Traverse) {
        const menu = menuRef.current;
        if (!menu) return;
        const focusableElements = Array.from(
          menu.querySelectorAll<HTMLElement>(PRODUCT_TOPBAR_MENU_FOCUSABLE_SELECTOR),
        ).filter((element) => isFocusableInsideMenu(element, menu));
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        if (!firstElement || !lastElement) return;

        const activeElement = document.activeElement;
        const focusIsInside = activeElement !== null && menu.contains(activeElement);
        if (!focusIsInside || (event.shiftKey && activeElement === firstElement)) {
          event.preventDefault();
          (event.shiftKey ? lastElement : firstElement).focus();
          return;
        }
        if (!event.shiftKey && activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
        return;
      }

      if (event.key === PRODUCT_TOPBAR_MENU_KEY.Close) {
        event.preventDefault();
        buttonRef.current?.focus();
        setOpen(false);
      }
    };

    const handleResize = () => {
      const menu = menuRef.current;
      if (!menu || window.getComputedStyle(menu).display !== 'none') return;
      setOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const bodyStyle = document.body.style;
    const previousOverflow = bodyStyle.overflow;
    const previousOverscrollBehavior = bodyStyle.overscrollBehavior;
    const menu = menuRef.current;
    const topbar = menuRef.current?.closest('.dt-product-topbar');
    const topbarSiblings = topbar?.parentElement ? Array.from(topbar.parentElement.children) : [];
    const topbarChildren = topbar ? Array.from(topbar.children) : [];
    const backgroundElements = [...topbarSiblings, ...topbarChildren].filter(
      (element): element is HTMLElement => element instanceof HTMLElement && element !== topbar && element !== menu,
    );
    const backgroundSnapshots = backgroundElements.map((element) => ({
      ariaHidden: element.getAttribute('aria-hidden'),
      element,
      inert: element.hasAttribute('inert'),
    }));
    bodyStyle.overflow = 'hidden';
    bodyStyle.overscrollBehavior = 'none';
    for (const element of backgroundElements) {
      element.setAttribute('aria-hidden', 'true');
      element.setAttribute('inert', '');
    }

    return () => {
      bodyStyle.overflow = previousOverflow;
      bodyStyle.overscrollBehavior = previousOverscrollBehavior;
      for (const snapshot of backgroundSnapshots) {
        if (snapshot.ariaHidden === null) snapshot.element.removeAttribute('aria-hidden');
        else snapshot.element.setAttribute('aria-hidden', snapshot.ariaHidden);
        if (!snapshot.inert) snapshot.element.removeAttribute('inert');
      }
    };
  }, [open]);

  return (
    <div
      {...rest}
      ref={menuRef}
      className={cx('dt-product-topbar-menu', className)}
      data-open={open ? 'true' : undefined}
      role={open ? 'dialog' : undefined}
      aria-label={open ? dialogLabel : undefined}
      aria-modal={open ? 'true' : undefined}
    >
      <button
        ref={buttonRef}
        type="button"
        className="dt-product-topbar-menu-button"
        aria-label={open ? closeLabel ?? label : label}
        aria-controls={panelId}
        aria-expanded={open}
        onClick={handleToggle}
      >
        <span className="dt-product-topbar-menu-line dt-product-topbar-menu-line-top" aria-hidden="true" />
        <span className="dt-product-topbar-menu-line dt-product-topbar-menu-line-middle" aria-hidden="true" />
        <span className="dt-product-topbar-menu-line dt-product-topbar-menu-line-bottom" aria-hidden="true" />
      </button>
      {open ? (
        <div id={panelId} className="dt-product-topbar-menu-panel" onClick={handleMenuPanelClick}>
          <nav className="dt-product-topbar-menu-navigation" aria-label={navigationLabel}>
            {children}
          </nav>
        </div>
      ) : null}
    </div>
  );
}

export function ProductTopbar({
  brand,
  actions,
  mobileActions,
  mobileMenuCloseLabel,
  mobileMenuDialogLabel,
  mobileMenuLabel = 'Menu',
  mobileMenuNavigationLabel,
  className,
  ...rest
}: ProductTopbarProps) {
  return (
    <header className={cx('dt-product-topbar', className)} {...rest}>
      <div className="dt-product-topbar-brand">{brand}</div>
      <nav className="dt-product-topbar-actions" aria-label="Primary">
        {actions}
      </nav>
      <ProductTopbarMenu
        label={mobileMenuLabel}
        closeLabel={mobileMenuCloseLabel}
        dialogLabel={mobileMenuDialogLabel}
        navigationLabel={mobileMenuNavigationLabel}
      >
        {mobileActions ?? actions}
      </ProductTopbarMenu>
    </header>
  );
}
