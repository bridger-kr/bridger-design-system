import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface ConsolePageHeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Page name — rendered as the route's single h1 (20px / 600). */
  title: ReactNode;
  /** Supporting copy (14px, subtle). */
  description?: ReactNode;
  /** Right-aligned actions — keep to two or fewer. */
  actions?: ReactNode;
  children?: ReactNode;
}

/**
 * Console route header — flat title/description/actions row shared by every
 * authenticated page so routes read identically. No eyebrow: console pages do
 * not carry decorative kickers.
 * @startingPoint section="Navigation" subtitle="Console page header" viewport="720x160"
 */
export function ConsolePageHeader({
  title,
  description,
  actions,
  children,
  className,
  ...rest
}: ConsolePageHeaderProps) {
  return (
    <header className={cx('dt-console-page-header', className)} {...rest}>
      <div className="dt-console-page-header-row">
        <div className="dt-console-page-header-text">
          <h1>{title}</h1>
          {description ? <p>{description}</p> : null}
        </div>
        {actions ? <div className="dt-console-page-header-actions">{actions}</div> : null}
      </div>
      {children ? <div className="dt-console-page-header-content">{children}</div> : null}
    </header>
  );
}
