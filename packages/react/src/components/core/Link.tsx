import { forwardRef } from 'react';
import type { AnchorHTMLAttributes, ReactElement, ReactNode } from 'react';
import { useRender } from '@base-ui-components/react/use-render';
import { ExternalLink } from 'lucide-react';
import { Icon } from '../../lib/icon';
import { cx } from '../../lib/cx';

/**
 * Absolute `http(s)` hrefs pointing at a different origin are external. Same
 * as the DocsLayout rule: when `window` is unavailable (SSR) an absolute URL
 * is treated as external — the safe default, since `target`/`rel` are
 * idempotent for same-origin navigations.
 */
function isExternalHref(href: string): boolean {
  if (!/^https?:\/\//i.test(href)) return false;
  if (typeof window === 'undefined' || !window.location?.origin) return true;
  try {
    return new URL(href).origin !== window.location.origin;
  } catch {
    return true;
  }
}

export interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  /**
   * External-treatment override. When omitted, `href` is auto-detected:
   * absolute `http(s)` URLs on a different origin render with
   * `target="_blank" rel="noopener noreferrer"`, a trailing external icon,
   * and the `externalLabel` screen-reader cue. Visited links keep the accent
   * text color — no separate `:visited` hue.
   */
  external?: boolean;
  /** Screen-reader cue appended after the label for external links. */
  externalLabel?: ReactNode;
  /**
   * Replace the rendered `<a>` (base-ui `useRender` contract) so router links
   * can be injected, e.g. `<Link href="/docs" render={<RouterLink to="/docs" />}>`.
   * The rendered element receives `href`, `className`, and the external
   * attributes.
   */
  render?: useRender.RenderProp;
  children?: ReactNode;
}

/**
 * Text link. Internal links are plain anchors; external links open in a new
 * tab with `noopener noreferrer`, an `ExternalLink` glyph (`aria-hidden`),
 * and a visually-hidden "(새 창)" cue so the new context is never icon-only.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { href, external, externalLabel = '(새 창)', render, className, children, ...rest },
  ref,
) {
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
      children: (
        <>
          {children}
          {isExternal ? (
            <>
              {' '}
              <Icon icon={ExternalLink} size="sm" className="dt-link-icon" />
              <span className="dt-visually-hidden">{externalLabel}</span>
            </>
          ) : null}
        </>
      ),
    },
  }) as ReactElement;
});
Link.displayName = 'Link';
