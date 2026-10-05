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

## TypeScript Tokens

```ts
import { colors, spacing, radius, shadows, typography, cssVarName } from '@bridger-kr/tokens';

colors.light.accent; // '#ec5e1f'
colors.dark.accent; // '#ec5e1f'
spacing[4]; // '24px'
cssVarName.colors.accent; // '--dt-accent'
```

The exported objects are authored from the CSS source of truth and frozen at runtime. They are also declared with literal `as const` values for precise TypeScript types.

## Font Assets

`css/fonts.css` defines two self-hosted families:

- **Pretendard Variable** — a 92-slice dynamic subset under `assets/fonts/pretendard/`. Each `@font-face` carries a `unicode-range`, so the browser only downloads the slices a page actually renders (typically a few hundred KB, not the full 2MB master). The slices are cut from the shipped master by `scripts/subset-fonts.py` using the upstream `pretendard@1.3.9` slice definitions in `scripts/pretendard-ranges.json`.
- **JetBrains Mono** — a single ASCII/box-drawing subset (`assets/fonts/JetBrainsMono.subset.woff2`, ~38KB, OFL 1.1 in `OFL-JetBrainsMono.txt`). Its `unicode-range` means it is only fetched when a page renders code. `--dt-font-mono` ends in `'Pretendard Variable'` before the generic `monospace` so Korean glyphs inside code surfaces fall back cleanly; per DESIGN.md the mono stack is ASCII-only — never apply it to Korean labels, buttons, or headings.

The full `assets/fonts/PretendardVariable.woff2` master stays published for offline documents and the Figma plugin; `css/fonts.css` intentionally does not reference it.

All `url()` paths are relative to the published `css/` directory. Bundlers that process CSS from npm packages resolve each slice into a hashed build asset — do **not** copy font files into your app's `public/` directory.

### Preload

Preload exactly one slice — slice `91`, which holds printable ASCII plus the highest-frequency Hangul syllables (`subset-fonts.py pretendard --print-preload` recomputes this):

```ts
// Vite: inject the preload tag via transformIndexHtml
import fontUrl from '@bridger-kr/tokens/assets/fonts/pretendard/PretendardVariable.subset.91.woff2?url';
// <link rel="preload" as="font" type="font/woff2" crossorigin href={fontUrl} />
```

### Regenerating

```sh
python3 -m pip install fonttools brotli
python3 packages/tokens/scripts/subset-fonts.py pretendard --emit-css
# JetBrains Mono: download the v2.304 release zip, then
python3 packages/tokens/scripts/subset-fonts.py jetbrains --source 'JetBrainsMono[wght].ttf'
```
