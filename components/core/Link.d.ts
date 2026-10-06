// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/core/Link.tsx
// Regenerate: pnpm generate

import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { useRender } from '@base-ui/react/use-render';
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
export declare const Link: import("react").ForwardRefExoticComponent<LinkProps & import("react").RefAttributes<HTMLAnchorElement>>;
