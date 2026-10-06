// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/core/Section.tsx
// Regenerate: pnpm generate

import { forwardRef } from 'react';
import { cx } from '../lib/cx.jsx';
import { warnOnce } from '../lib/deprecate.jsx';
const LEGACY_VARIANT_MAP = {
    band: 'sunken',
    proof: 'sunken',
};
const LEGACY_TONE_MAP = {
    soft: 'plain',
    'accent-wash': 'sunken',
    grid: 'sunken',
};
export const Section = forwardRef(function Section({ variant = 'plain', tone, width, innerClassName, className, children, ...rest }, ref) {
    let resolvedVariant;
    if (tone !== undefined) {
        warnOnce(`section-tone-${tone}`, `Section: tone="${tone}" is deprecated — use variant="${LEGACY_TONE_MAP[tone]}". Removed in v2.1.`);
        resolvedVariant = LEGACY_TONE_MAP[tone];
    }
    else if (variant === 'band' || variant === 'proof') {
        warnOnce(`section-variant-${variant}`, `Section: variant="${variant}" is deprecated — use variant="sunken". Removed in v2.1.`);
        resolvedVariant = LEGACY_VARIANT_MAP[variant];
    }
    else {
        resolvedVariant = variant;
    }
    return (<section ref={ref} className={cx('dt-section', `dt-section-${resolvedVariant}`, width && width !== 'default' && `dt-section-width-${width}`, className)} {...rest}>
      <div className={cx('dt-section-inner', innerClassName)}>{children}</div>
    </section>);
});
Section.displayName = 'Section';
