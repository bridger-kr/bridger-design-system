# @bridger-ds/tokens

Design tokens for the Bridger Design System. The package publishes the CSS contract, the local Pretendard Variable font asset, and typed JavaScript/TypeScript token objects.

## Install

```sh
pnpm add @bridger-ds/tokens
```

## CSS

Import the full token contract once in your app entrypoint:

```ts
import '@bridger-ds/tokens/css';
```

The full entrypoint imports files in this order: fonts, colors, typography, spacing, base.

Per-file imports are available when you only need part of the contract:

```ts
import '@bridger-ds/tokens/css/fonts';
import '@bridger-ds/tokens/css/colors';
import '@bridger-ds/tokens/css/typography';
import '@bridger-ds/tokens/css/spacing';
import '@bridger-ds/tokens/css/base';
```

`@bridger-ds/tokens/styles.css` is an alias for the full CSS entrypoint.

## TypeScript Tokens

```ts
import { colors, spacing, radius, shadows, typography, cssVarName } from '@bridger-ds/tokens';

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

That path is relative to the published `css/` directory and resolves to the package's published `assets/fonts/PretendardVariable.woff2`. Bundlers that process CSS from npm packages should copy or serve that referenced asset. If your framework does not automatically serve CSS-referenced package assets, copy `@bridger-ds/tokens/assets/fonts/PretendardVariable.woff2` into your public asset pipeline and rewrite the URL in your app-level CSS.
