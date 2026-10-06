// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/core/Link.tsx
// Regenerate: pnpm generate

import { forwardRef } from 'react';
import { useRender } from '@base-ui-components/react/use-render';
import { ExternalLink } from 'lucide-react';
import { Icon } from '../lib/icon.jsx';
import { cx } from '../lib/cx.jsx';
/**
 * Absolute `http(s)` hrefs pointing at a different origin are external. Same
 * as the DocsLayout rule: when `window` is unavailable (SSR) an absolute URL
 * is treated as external — the safe default, since `target`/`rel` are
 * idempotent for same-origin navigations.
 */
function isExternalHref(href) {
    if (!/^https?:\/\//i.test(href))
        return false;
    if (typeof window === 'undefined' || !window.location?.origin)
        return true;
    try {
        return new URL(href).origin !== window.location.origin;
    }
    catch {
        return true;
    }
}
/**
 * Text link. Internal links are plain anchors; external links open in a new
 * tab with `noopener noreferrer`, an `ExternalLink` glyph (`aria-hidden`),
 * and a visually-hidden "(새 창)" cue so the new context is never icon-only.
 */
export const Link = forwardRef(function Link({ href, external, externalLabel = '(새 창)', render, className, children, ...rest }, ref) {
    const isExternal = external ?? isExternalHref(href);
    return useRender({
        render,
        defaultTagName: 'a',
        ref,
        props: {
            href,
            className: cx('dt-link', className),
            ...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : null),
            ...rest,
            children: (<>
          {children}
          {isExternal ? (<>
              {' '}
              <Icon icon={ExternalLink} size="sm" className="dt-link-icon"/>
              <span className="dt-visually-hidden">{externalLabel}</span>
            </>) : null}
        </>),
        },
    });
});
Link.displayName = 'Link';
