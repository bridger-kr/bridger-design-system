# @bridger-kr/tokens

Design tokens for the Bridger Design System. The package publishes the CSS contract, the local Pretendard Variable font asset, and typed JavaScript/TypeScript token objects.

## Install

```sh
pnpm add @bridger-kr/tokens
```

## CSS

Import the full token contract once in your app entrypoint:

```ts
import '@bridger-kr/tokens/css';
```

The full entrypoint imports files in this order: fonts, colors, typography, spacing, base.

Per-file imports are available when you only need part of the contract:

```ts
import '@bridger-kr/tokens/css/fonts';
import '@bridger-kr/tokens/css/colors';
import '@bridger-kr/tokens/css/typography';
import '@bridger-kr/tokens/css/spacing';
import '@bridger-kr/tokens/css/base';
```

`@bridger-kr/tokens/styles.css` is an alias for the full CSS entrypoint.

## Theming

The contract follows the OS (`prefers-color-scheme`) by default: `:root` carries `color-scheme: light dark` and themed tokens are single `light-dark()` definitions, so no JavaScript is required to honor a dark OS. An explicit user choice pins the theme through `:root[data-theme='light'|'dark']` and wins over the OS. `.dark` is a deprecated alias for the same dark scope.

To prevent a flash of the wrong theme, run a pre-paint script in `<head>` that applies only a *persisted* choice (leave the attribute unset to keep following the OS):

```html
<script>
  try {
    var theme = localStorage.getItem('bridger-theme'); // 'light' | 'dark' | null
    if (theme === 'light' || theme === 'dark') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  } catch {}
</script>
```

`@bridger-kr/react`'s `ThemeSwitch` owns this attribute at runtime and clears the storage key when the preference returns to `system`.

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
