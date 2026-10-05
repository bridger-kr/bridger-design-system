# @bridger-kr/tokens

Design tokens for the Bridger Design System. The package publishes the CSS contract, the local Pretendard Variable font asset, and typed JavaScript/TypeScript token objects.

## Install

```sh
pnpm add @bridger-kr/tokens
```

## CSS

Import the token contract once in your app entrypoint:

```ts
import '@bridger-kr/tokens/css';
```

The default entrypoint imports, in order: `fonts.css` (`@font-face`, unlayered), `reset.css` (`@layer dt.reset` — a minimal reset), and `contract.css` (`@layer dt.tokens` — the `--dt-*` custom properties). It declares the system-wide layer order `@layer dt.reset, dt.tokens, dt.base, dt.components, dt.utilities;`, so every DS rule sits inside a layer and any unlayered consumer CSS wins over it without `!important`.

Optional sheets are opt-in subpaths:

```ts
import '@bridger-kr/tokens/css/base';            // element defaults — body, headings, links, code (@layer dt.base)
import '@bridger-kr/tokens/css/legacy-classes';  // deprecated .btn-*/.badge/.card aliases — removed in 2.1.0
```

`base.css` is deliberately excluded from the default entrypoint because element defaults mutate a consumer's global styles. The compatibility subpaths `./css/colors`, `./css/typography`, and `./css/spacing` remain as aliases for the contract.

`@bridger-kr/tokens/styles.css` is an alias for the default CSS entrypoint.

`dt-` means **design token** (see `docs/adr/0001-token-prefix.md`), not a brand abbreviation.

## TypeScript Tokens

```ts
import { colors, spacing, radius, shadows, typography, cssVarName } from '@bridger-kr/tokens';

colors.light.accent; // '#ec5e1f'
colors.dark.accent; // '#ec5e1f'
spacing[4]; // '24px'
cssVarName.colors.accent; // '--dt-accent'
```

The exported objects are authored from the CSS source of truth and frozen at runtime. They are also declared with literal `as const` values for precise TypeScript types.

## Font Asset

`css/fonts.css` defines Pretendard Variable with:

```css
src: url('../assets/fonts/PretendardVariable.woff2') format('woff2-variations');
```

That path is relative to the published `css/` directory and resolves to the package's published `assets/fonts/PretendardVariable.woff2`. Bundlers that process CSS from npm packages should copy or serve that referenced asset. If your framework does not automatically serve CSS-referenced package assets, copy `@bridger-kr/tokens/assets/fonts/PretendardVariable.woff2` into your public asset pipeline and rewrite the URL in your app-level CSS.
