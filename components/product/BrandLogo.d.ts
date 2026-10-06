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
export type BrandLogoLanguage = (typeof BRAND_LOGO_LANGUAGE)[keyof typeof BRAND_LOGO_LANGUAGE];
export type BrandLogoSize = keyof typeof BRAND_WORDMARK_SIZE | keyof typeof BRAND_SYMBOL_SIZE;
export interface BrandLogoHandle {
    readonly play: () => void;
}
export interface BrandLogoProps {
    size?: BrandLogoSize | number;
    autoplay?: boolean;
    loop?: boolean;
    lang?: BrandLogoLanguage;
    style?: CSSProperties;
}
export declare const BrandLogo: import("react").ForwardRefExoticComponent<BrandLogoProps & import("react").RefAttributes<BrandLogoHandle>>;
