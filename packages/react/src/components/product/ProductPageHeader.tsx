import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface ProductPageHeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
}

export function ProductPageHeader({
  eyebrow,
  title,
  description,
  actions,
  children,
  className,
  ...rest
}: ProductPageHeaderProps) {
  return (
    <header className={cx('dt-product-page-header', className)} {...rest}>
      <div className="dt-product-page-header-row">
        <div className="dt-product-page-header-copy">
          {eyebrow ? <span className="dt-product-page-header-eyebrow">{eyebrow}</span> : null}
          <div className="dt-product-page-header-text">
            <h1>{title}</h1>
            {description ? <p>{description}</p> : null}
          </div>
        </div>
        {actions ? <div className="dt-product-page-header-actions">{actions}</div> : null}
      </div>
      {children ? <div className="dt-product-page-header-content">{children}</div> : null}
    </header>
  );
}
