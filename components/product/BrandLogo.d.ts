// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/product/BrandLogo.tsx
// Regenerate: pnpm generate

import { type CSSProperties } from 'react';
import { BRAND_SYMBOL_SIZE, BRAND_WORDMARK_SIZE } from './brandLogoGeometry';
export declare const BRAND_LOGO_LANGUAGE: {
    readonly Korean: "ko";
    readonly English: "en";
};
export declare const BRAND_LOGO_SIZE_NAME: {
    readonly Small: "sm";
    readonly Medium: "md";
    readonly Large: "lg";
    readonly ExtraLarge: "xl";
    readonly Symbol: "symbol";
    readonly Favicon: "favicon";
};
/** Fixed-theme override for surfaces that do not follow the ambient theme —
 * e.g. a dark page chrome on a light app. §15.3: only the wordmark switches
 * ink; the mark never inverts. */
export declare const BRAND_LOGO_THEME: {
    readonly Light: "light";
    readonly Dark: "dark";
};
export type BrandLogoLanguage = (typeof BRAND_LOGO_LANGUAGE)[keyof typeof BRAND_LOGO_LANGUAGE];
export type BrandLogoSize = keyof typeof BRAND_WORDMARK_SIZE | keyof typeof BRAND_SYMBOL_SIZE;
export type BrandLogoTheme = (typeof BRAND_LOGO_THEME)[keyof typeof BRAND_LOGO_THEME];
export interface BrandLogoHandle {
    /**
     * @deprecated The legacy wordmark pulse is retired with the canonical mark
     * (EDD-225 §11/§15 — no decorative animation). Kept as a no-op so existing
     * call sites keep compiling; remove on the next major.
     */
    readonly play: () => void;
}
export interface BrandLogoProps {
    size?: BrandLogoSize | number;
    /** @deprecated No-op — the canonical mark ships no autoplay intro. */
    autoplay?: boolean;
    /** @deprecated No-op — the canonical mark ships no looped animation. */
    loop?: boolean;
    /** Language for the accessible label only; the wordmark is never localized. */
    lang?: BrandLogoLanguage;
    /** Force the wordmark ink for a fixed-theme surface; mark never inverts. */
    theme?: BrandLogoTheme;
    style?: CSSProperties;
}
export declare const BrandLogo: import("react").ForwardRefExoticComponent<BrandLogoProps & import("react").RefAttributes<BrandLogoHandle>>;
