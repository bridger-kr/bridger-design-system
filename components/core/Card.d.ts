// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/core/Card.tsx
// Regenerate: pnpm generate

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties, HTMLAttributes, ReactNode } from 'react';
export declare const CARD_VARIANT: {
    readonly Plain: "plain";
    readonly Sunken: "sunken";
};
export type CardVariant = (typeof CARD_VARIANT)[keyof typeof CARD_VARIANT];
/** @deprecated Use `CardVariant` (`plain` | `sunken`). Removed in v2.1. */
export declare const CardTone: {
    readonly Default: "default";
    readonly Muted: "muted";
    readonly Raised: "raised";
    readonly Panel: "panel";
};
/** @deprecated Use `CardVariant`. Removed in v2.1. */
export type CardTone = (typeof CardTone)[keyof typeof CardTone];
type CardVariantInput = CardVariant | CardTone;
interface CardVisualProps {
    readonly children?: ReactNode;
    /** `plain` = flat bordered plane; `sunken` = recessed well. */
    readonly variant?: CardVariantInput;
    /** @deprecated Use `variant`. Removed in v2.1. */
    readonly tone?: CardTone;
    readonly padding?: number;
    readonly style?: CSSProperties;
}
export type CardProps = Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'style'> & CardVisualProps;
export type CardButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'style' | 'type'> & CardVisualProps & {
    readonly type?: 'button' | 'submit' | 'reset';
};
export type CardLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'href' | 'style'> & CardVisualProps & {
    readonly href: string;
};
/**
 * Non-actionable surface container. Use `CardButton` for commands and
 * `CardLink` for navigation; the removed `interactive` flag produced a
 * pointer-only div and must be migrated to the matching semantic action.
 */
export declare const Card: import("react").ForwardRefExoticComponent<Omit<HTMLAttributes<HTMLDivElement>, "style" | "children"> & CardVisualProps & import("react").RefAttributes<HTMLDivElement>>;
/** Native card-shaped command. Do not place nested interactive controls inside. */
export declare const CardButton: import("react").ForwardRefExoticComponent<Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "style" | "children"> & CardVisualProps & {
    readonly type?: "button" | "submit" | "reset";
} & import("react").RefAttributes<HTMLButtonElement>>;
/** Native card-shaped navigation link. Do not place nested interactive controls inside. */
export declare const CardLink: import("react").ForwardRefExoticComponent<Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "style" | "children" | "href"> & CardVisualProps & {
    readonly href: string;
} & import("react").RefAttributes<HTMLAnchorElement>>;
export {};
