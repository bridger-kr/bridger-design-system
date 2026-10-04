// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/core/Card.tsx
// Regenerate: pnpm generate

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties, HTMLAttributes, ReactNode } from 'react';
export declare const CardTone: {
    readonly Default: "default";
    readonly Muted: "muted";
    readonly Raised: "raised";
    readonly Panel: "panel";
};
export type CardTone = (typeof CardTone)[keyof typeof CardTone];
interface CardVisualProps {
    readonly children?: ReactNode;
    /** default = flat bordered plane; muted = sunken well; raised = elevated; panel = flat console panel. */
    readonly variant?: CardTone;
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
export declare function Card({ children, variant, tone, padding, className, style, ...rest }: CardProps): import("react").JSX.Element;
/** Native card-shaped command. Do not place nested interactive controls inside. */
export declare function CardButton({ children, variant, tone, padding, className, style, type, disabled, ...rest }: CardButtonProps): import("react").JSX.Element;
/** Native card-shaped navigation link. Do not place nested interactive controls inside. */
export declare function CardLink({ children, variant, tone, padding, className, style, href, ...rest }: CardLinkProps): import("react").JSX.Element;
export {};
