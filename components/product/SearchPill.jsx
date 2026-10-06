// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/product/SearchPill.tsx
// Regenerate: pnpm generate

import { forwardRef } from 'react';
import { cx } from '../lib/cx.jsx';
export const SEARCH_PILL_TONE = {
    Accent: 'accent',
    Neutral: 'neutral',
};
export const SEARCH_PILL_SIZE = {
    Small: 'sm',
    Medium: 'md',
    Large: 'lg',
};
export const SearchPill = forwardRef(function SearchPill({ tone = SEARCH_PILL_TONE.Neutral, size = SEARCH_PILL_SIZE.Medium, leadingIcon, trailingIcon, artifactLabel, children, className, ...rest }, ref) {
    const pill = (<div ref={ref} className={cx('dt-search-pill', `dt-search-pill-${tone}`, `dt-search-pill-${size}`, className)} {...rest}>
      {leadingIcon ? <span className="dt-search-pill-icon">{leadingIcon}</span> : null}
      <span className="dt-search-pill-label">{children}</span>
      {trailingIcon ? <span className="dt-search-pill-icon">{trailingIcon}</span> : null}
    </div>);
    if (!artifactLabel) {
        return pill;
    }
    return (<div className="dt-search-pill-artifact">
      <div className="dt-search-pill-artifact-header">{artifactLabel}</div>
      {pill}
    </div>);
});
SearchPill.displayName = 'SearchPill';
