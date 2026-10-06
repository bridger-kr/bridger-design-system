// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/navigation/ConsolePageHeader.tsx
// Regenerate: pnpm generate

import { forwardRef } from 'react';
import { cx } from '../lib/cx.jsx';
/**
 * Console route header — flat title/description/actions row shared by every
 * authenticated page so routes read identically. No eyebrow: console pages do
 * not carry decorative kickers.
 * @startingPoint section="Navigation" subtitle="Console page header" viewport="720x160"
 */
export const ConsolePageHeader = forwardRef(function ConsolePageHeader({ title, description, actions, children, className, ...rest }, ref) {
    return (<header ref={ref} className={cx('dt-console-page-header', className)} {...rest}>
      <div className="dt-console-page-header-row">
        <div className="dt-console-page-header-text">
          <h1>{title}</h1>
          {description ? <p>{description}</p> : null}
        </div>
        {actions ? <div className="dt-console-page-header-actions">{actions}</div> : null}
      </div>
      {children ? <div className="dt-console-page-header-content">{children}</div> : null}
    </header>);
});
ConsolePageHeader.displayName = 'ConsolePageHeader';
