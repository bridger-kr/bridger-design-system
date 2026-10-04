// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/core/Section.tsx
// Regenerate: pnpm generate

import { cx } from '../lib/cx.jsx';
export function Section({ variant = 'plain', tone = 'soft', innerClassName, className, children, ...rest }) {
    return (<section className={cx('dt-section', `dt-section-${variant}`, `dt-section-${tone}`, className)} {...rest}>
      <div className={cx('dt-section-inner', innerClassName)}>{children}</div>
    </section>);
}
