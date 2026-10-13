// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/product/BrandLogo.tsx
// Regenerate: pnpm generate

import { forwardRef, useImperativeHandle } from 'react';
import { BRAND_MARK_GLYPH_PATH, BRAND_SYMBOL_SIZE, BRAND_SYMBOL_VIEW_BOX, BRAND_WORDMARK_ASPECT_RATIO, BRAND_WORDMARK_PATHS, BRAND_WORDMARK_PATH_TRANSFORMS, BRAND_WORDMARK_SIZE, BRAND_WORDMARK_TRANSFORM, BRAND_WORDMARK_VIEW_BOX, } from './brandLogoGeometry.jsx';
import { useDSMessages } from '../locale/DSLocaleProvider.jsx';
export const BRAND_LOGO_LANGUAGE = {
    Korean: 'ko',
    English: 'en',
};
export const BRAND_LOGO_SIZE_NAME = {
    Small: 'sm',
    Medium: 'md',
    Large: 'lg',
    ExtraLarge: 'xl',
    Symbol: 'symbol',
    Favicon: 'favicon',
};
/** Fixed-theme override for surfaces that do not follow the ambient theme —
 * e.g. a dark page chrome on a light app. §15.3: only the wordmark switches
 * ink; the mark never inverts. */
export const BRAND_LOGO_THEME = {
    Light: 'light',
    Dark: 'dark',
};
function renderBrandSymbol() {
    /* Canonical mark: persimmon square + paper glyph — identical in both
     * themes (§15.3), so the glyph stays a fixed paper color on purpose. */
    return (<>
      <rect width="45" height="45" fill="var(--dt-accent)"/>
      <path d={BRAND_MARK_GLYPH_PATH} fill="#ffffff"/>
    </>);
}
function renderBrandWordmark() {
    return (<svg width="100%" height="100%" viewBox={BRAND_WORDMARK_VIEW_BOX} aria-hidden="true" focusable="false">
      <g transform={BRAND_WORDMARK_TRANSFORM} fill="currentColor">
        {BRAND_WORDMARK_PATHS.map((path, index) => (<path key={index} d={path} transform={BRAND_WORDMARK_PATH_TRANSFORMS[index]}/>))}
      </g>
    </svg>);
}
function resolveWordmarkSize(size) {
    if (typeof size === 'number') {
        return {
            width: Number((size * BRAND_WORDMARK_ASPECT_RATIO).toFixed(3)),
            height: size,
        };
    }
    if (size in BRAND_WORDMARK_SIZE) {
        return BRAND_WORDMARK_SIZE[size];
    }
    return BRAND_WORDMARK_SIZE[BRAND_LOGO_SIZE_NAME.Medium];
}
function resolveSymbolSize({ isFavicon }) {
    return isFavicon
        ? BRAND_SYMBOL_SIZE[BRAND_LOGO_SIZE_NAME.Favicon]
        : BRAND_SYMBOL_SIZE[BRAND_LOGO_SIZE_NAME.Symbol];
}
export const BrandLogo = forwardRef(function BrandLogo({ size = BRAND_LOGO_SIZE_NAME.Medium, lang = BRAND_LOGO_LANGUAGE.Korean, theme, style }, ref) {
    const isSymbol = size === BRAND_LOGO_SIZE_NAME.Symbol;
    const isFavicon = size === BRAND_LOGO_SIZE_NAME.Favicon;
    const messages = useDSMessages();
    const wordmarkLabel = messages.brand.wordmark[lang];
    const frame = isSymbol || isFavicon ? resolveSymbolSize({ isFavicon }) : resolveWordmarkSize(size);
    /* play() stays a no-op on the handle — see BrandLogoHandle for why. */
    useImperativeHandle(ref, () => ({ play: () => undefined }), []);
    return (<span aria-label={wordmarkLabel} role="img" className="dt-brand-logo" data-variant={isSymbol ? 'symbol' : isFavicon ? 'favicon' : 'wordmark'} data-brand-theme={theme} style={{
            '--dt-brand-logo-width': `${frame.width}px`,
            '--dt-brand-logo-height': `${frame.height}px`,
            ...style,
        }}>
      {isSymbol || isFavicon ? (<svg width="100%" height="100%" viewBox={BRAND_SYMBOL_VIEW_BOX} aria-hidden="true" focusable="false">
          {renderBrandSymbol()}
        </svg>) : (<span className="dt-brand-logo-wordmark" aria-hidden="true">
          {renderBrandWordmark()}
        </span>)}
    </span>);
});
BrandLogo.displayName = 'BrandLogo';
