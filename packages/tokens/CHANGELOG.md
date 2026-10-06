# @bridger-kr/tokens

## 2.0.0

### Major Changes

- [#74](https://github.com/bridger-kr/bridger-design-system/pull/74) [`354f9c4`](https://github.com/bridger-kr/bridger-design-system/commit/354f9c4e1325ffc4c9c0f87ec7f6a97ba11bdd1b) Thanks [@happycastle114](https://github.com/happycastle114)! - Dark-mode contract: system default, explicit choice wins (DS [#44](https://github.com/bridger-kr/bridger-design-system/issues/44)).

  - The theme now follows the OS by default. `:root` carries `color-scheme: light dark` and every themed color token is a single `light-dark()` definition, so `prefers-color-scheme` resolves the correct theme with no JavaScript — including pre-paint and JS-free surfaces (docs embeds, e-mail previews, the Figma plugin preview).
  - An explicit `:root[data-theme='light'|'dark']` (written by `ThemeSwitch` or the consumer's pre-paint script) pins `color-scheme` and overrides the OS.
  - `.dark` remains functional as a deprecated alias for the dark scope; it will be removed in v2.1.
  - The dark block no longer restates ~30 color tokens; only `--dt-shadow-overlay` (a non-color value `light-dark()` cannot express) is restated under the explicit dark selector and a `@media (prefers-color-scheme: dark)` block for `:root:not([data-theme='light'])`.
  - `packages/tokens/src/theme-parity.test.ts` guards the contract: OS-dark and explicit-dark overrides stay identical, themed colors must be well-formed `light-dark()` pairs, and body/secondary/`--dt-accent-text` pairs hold ≥4.5:1 in both themes.
  - `tests/e2e/theme.spec.ts` + `playwright.config.ts` verify in a real browser that `prefers-color-scheme: dark` renders dark tokens with JavaScript disabled, and that explicit `data-theme` pins win.

  Breaking: the dark theme no longer activates on `.dark`-only consumers' expectation of a per-token override block — `.dark` still works via `color-scheme`, but apps that relied on dark custom-property values being _declared_ on the `.dark` element itself should move to `:root[data-theme]`. Consuming apps should remove any hardcoded `data-theme="light"` from their HTML shells and mirror this contract file.

- [#73](https://github.com/bridger-kr/bridger-design-system/pull/73) [`b020dab`](https://github.com/bridger-kr/bridger-design-system/commit/b020dab048c25e1175d6b10ed35060722408e2f9) Thanks [@happycastle114](https://github.com/happycastle114)! - Package build and CSS layering hardening (Issue [#45](https://github.com/bridger-kr/bridger-design-system/issues/45)). All shipped CSS now lives in explicit cascade layers (`@layer dt.reset, dt.tokens, dt.base, dt.components, dt.utilities;`), so unlayered consumer CSS always wins and DS `!important` drops to the three `prefers-reduced-motion` overrides.

  **BREAKING**

  - The public class vocabulary is `.dt-*` only. The unprefixed globals were removed from the default entrypoint:

    | Old                                    | New                                                                                   |
    | -------------------------------------- | ------------------------------------------------------------------------------------- |
    | `.btn-primary`                         | `.dt-button-solid`                                                                    |
    | `.btn-secondary`                       | `.dt-button-outline`                                                                  |
    | `.btn-ghost`                           | `.dt-button-ghost`                                                                    |
    | `.btn-danger`                          | `.dt-button-solid[data-tone='danger']`                                                |
    | `.badge`, `.badge-<tone>`              | `.dt-badge`, `.dt-badge-<tone>`                                                       |
    | `.card`, `.card-muted`, `.card-raised` | `.dt-card` + `.dt-card-default/.dt-card-muted/.dt-card-raised` (via `Card` component) |
    | `.tabular`, `.font-tabular`            | `.dt-tabular`                                                                         |

    Deprecated aliases ship as an opt-in sheet — `import '@bridger-kr/tokens/css/legacy-classes'` — scheduled for removal in 2.1.0. `.glass-card`, `.spec-strip`, `.mono`, and `.dt-grid-paper` were deleted with no alias (DESIGN.md §11 decoration).

  - `@bridger-kr/tokens/css` no longer includes element defaults (`body`, `h1–h4`, `a`, `code`, `pre`). Opt in with `import '@bridger-kr/tokens/css/base'`.
  - React deep imports are category-level only (`@bridger-kr/react/components/<family>`); per-component subpaths were removed.
  - Component class names (`Card`, `FilterChip`, `Tabs`, `Menu`, `ToolCard`, `FileUpload`, `StatTile`, and form controls) are stylesheet-owned; visuals that used to render as inline styles now live in `styles.css` so consumer overrides work without `!important`.
  - `dt-` is retained and now means "design token" (ADR 0001).

  **Also in this release**

  - tsup emits code-split ESM with shared chunks, so barrel + category imports share one module instance, and every output carries `"use client"` for Next.js App Router / RSC.
  - `styles.css` is built with Lightning CSS (minified bundle) instead of a raw copy.
  - `exports` maps gain `./package.json`, per-condition `types`, and CI validates with `publint` + `@arethetypeswrong/cli`.

  **Consumer migration notes** — Tailwind v3 apps must disable `preflight` (`corePlugins: { preflight: false }`; the `dt.reset` layer owns the reset) or wrap `@tailwind base` in a later `@layer`. Unlayered app CSS then overrides DS styles — remove any `!important` written to beat the old unlayered rules.

- [#67](https://github.com/bridger-kr/bridger-design-system/pull/67) [`9436c54`](https://github.com/bridger-kr/bridger-design-system/commit/9436c54c4c853e3033d4529a4f365093cc1ee9b4) Thanks [@devin-ai-integration](https://github.com/apps/devin-ai-integration)! - Token v2 color system (EDD-230): achromatic neutrals, single accent, stable status hues.

  - Neutral ramp is chroma-0 in both themes (no warm tint): `--dt-paper` → `--dt-bg` `#ffffff`/`oklch(.145)`, surfaces to `oklch` grays; borders become ink-alpha `oklch(... / .10/.18 | .08/.16)`.
  - Text roles renamed to the `text-*` namespace: `--dt-ink*` → `--dt-text*` (`--dt-ink` → `--dt-text`, `--dt-ink-strong` → `--dt-text-strong`), `--dt-muted-strong` → `--dt-text-subtle`, `--dt-muted` → `--dt-text-muted`, `--dt-tint-muted`/`--dt-tint-ink-*` → `--dt-tint-text*`. New `--dt-text-placeholder`. `--dt-text-muted` is text-only (never a background role) and holds ≥4.5:1 on every surface.
  - Accent split: `--dt-accent` is fill-only (light `#ec5e1f`, dark `#f07a45`); new `--dt-accent-text` (`#b83c0d` / `#f99566`) renders persimmon as text at AA. `a` links and `.badge-accent` now use `--dt-accent-text`.
  - Status fixes: `--dt-cobalt` is one blue hue in both themes (`#1d4ed8`/`#7aa2ff`, `--dt-info` aliases it); dark `--dt-status-warning` no longer equals the brand color — warning is amber `[#785800](https://github.com/bridger-kr/bridger-design-system/issues/785800)`/`#fbbf24`; success `#0d7233`/`#4ade80`; danger `#b91c1c`/`#f87171`; `--dt-status-*` aliases follow the base status tokens.
  - Removed: `--dt-lime`, `--dt-alert-ink`, `--dt-status-danger` (duplicate of `--dt-danger`); light `--dt-surface-raised` is now distinct from `--dt-surface`.
  - `tests/contrast.test.ts` adds a WCAG AA gate: every real text-on-surface pairing resolves ≥4.5:1, status hues are theme-stable (≤10°), neutrals are achromatic, and removed tokens stay removed.

  Breaking: renamed/removed custom properties and the matching `colors.*` export keys (`paper`, `ink*`, `muted*`, `lime`, `statusDanger`, `alertInk`, `tintMuted`, `tintInk*`). Consumers must migrate to the `--dt-bg`/`--dt-text*` names.

- [#67](https://github.com/bridger-kr/bridger-design-system/pull/67) [`9436c54`](https://github.com/bridger-kr/bridger-design-system/commit/9436c54c4c853e3033d4529a4f365093cc1ee9b4) Thanks [@devin-ai-integration](https://github.com/apps/devin-ai-integration)! - Token scale retarget to the DESIGN.md v2 flat canon (EDD-231, token v2 ③).

  **Breaking.** Deleted tokens, so any consumer referencing them must migrate:

  - Radius is now exactly 4 values: `--dt-radius-sm` 4px / `--dt-radius-md` 6px /
    `--dt-radius-lg` 8px / `--dt-radius-pill` 9999px (badge/dot/avatar only), with
    role aliases `--dt-radius-chip` / `--dt-radius-control` / `--dt-radius-card`.
    The old `inner` / `element` / `container` / `button` / `xl` / `2xl` / `full`
    names are gone.
  - Type is a fixed 7-step scale — 12 / 13 / 14 / 16 / 20 / 28 / 36 px
    (line-heights 16–44px), weights 400 / 500 / 600 only, H1 capped at 36px with
    no clamp() and no hero exception. `eyebrow` and display tracking tokens are
    removed.
  - Shadows collapse to a single `--dt-shadow-overlay` for floating overlays
    (menus, dialogs, drawers, toasts). All other surfaces are flat hairline
    planes: use `1px solid var(--dt-border)` (or `--dt-border-strong` for
    emphasis). `--dt-ring`, `--dt-card-rest`, `--dt-card-hover`, `--dt-shadow-*`
    scale, `--dt-shadow-focus`, and the ambient/inset shadows are removed.
    Focus is a 3px `--dt-accent` outline.
  - Motion is `--dt-duration-fast` 120ms / `--dt-duration-base` 160ms / one
    `--dt-ease`. The `--dt-motion-*` compound tokens, extra durations, and
    infinite-animation token sets are gone.
  - `--dt-font-sans` now leads with Pretendard Variable; `--dt-font-mono` is
    documented as code-surfaces only.
  - The dark block is deduplicated: it now carries only color overrides plus the
    dark `--dt-shadow-overlay` (was a verbatim restatement of the whole contract).
  - TypeScript: `tokens.effects` / `Effects`, `motion.transitions`, `eyebrow`, and
    `displayTracking` exports are removed; `radius`/`shadows`/`motionDurations`
    objects reflect the new scale.

  React components migrated onto the new tokens — flat bordered surfaces, single
  overlay shadow on floating components, scale-conform radii/weights/sizes.

- [#53](https://github.com/bridger-kr/bridger-design-system/pull/53) [`80e5162`](https://github.com/bridger-kr/bridger-design-system/commit/80e5162ee7eef5f26b1367065730fcaf6638060d) Thanks [@happycastle114](https://github.com/happycastle114)! - Remove decoration-only v1 product exports (EDD-234, DESIGN.md §12 exit): `ProductCinematicBackdrop`, `ProductMotionField`, `ProductActionPill` (+ `PRODUCT_ACTION_PILL_*`, `productActionPillClassName`), `WindowChrome`, `WindowFrame`, and the `ProductShell` `tone`/`PRODUCT_SHELL_TONE` axis — `ProductShell` is now a flat composition panel (file renamed `ProductCinematic.tsx` → `ProductShell.tsx`). `AnnotationHotspot` keeps the static marker; the `dt-hotspot-pulse` animation is gone. Tokens: `--dt-chrome-dot-{1,2,3}` removed.

  Migration: `ProductActionPill` → `<Button variant="primary">`; `WindowFrame`/`WindowChrome` → `<Card>` or a plain bordered panel; `ProductShell tone="cinematic"|"console"` → `<ProductShell>` (flat); `ProductCinematicBackdrop`/`ProductMotionField` → remove (no replacement — decoration is prohibited under v2).

### Minor Changes

- [#34](https://github.com/bridger-kr/bridger-design-system/pull/34) [`afe74a9`](https://github.com/bridger-kr/bridger-design-system/commit/afe74a937c9995511d2c0afb71163fccdafbb514) Thanks [@happycastle114](https://github.com/happycastle114)! - Publish typed `SearchPill` tone/size variants and clearer first-use surfaces (`EmptyState`) for the Bridger product surfaces.

- [#72](https://github.com/bridger-kr/bridger-design-system/pull/72) [`ebaa9d0`](https://github.com/bridger-kr/bridger-design-system/commit/ebaa9d0aee9e18531a722bc1d92e2cfcafd76720) Thanks [@happycastle114](https://github.com/happycastle114)! - Font loading overhaul (DS v2 gap [#46](https://github.com/bridger-kr/bridger-design-system/issues/46)).

  - Pretendard Variable now ships as a 92-slice woff2 dynamic subset
    (`assets/fonts/pretendard/`, `unicode-range` per `@font-face`), cut from the
    shipped master by `scripts/subset-fonts.py` using the upstream
    `pretendard@1.3.9` slice definitions in `scripts/pretendard-ranges.json`.
    Pages download only the slices they render instead of the full 2MB font.
    The full `PretendardVariable.woff2` master stays published for offline
    documents and the Figma plugin, but `css/fonts.css` no longer references it.
  - JetBrains Mono is now actually shipped: a single ASCII/box-drawing subset
    (`assets/fonts/JetBrainsMono.subset.woff2`, OFL 1.1 in
    `OFL-JetBrainsMono.txt`) declared in `fonts.css` with a `unicode-range`, so
    it is only fetched when a page renders code.
  - `--dt-font-mono` (CSS and `typography.fontFamilies.mono`) is now
    `'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas,
'Pretendard Variable', monospace` — `'Geist Mono'` removed, and
    `'Pretendard Variable'` sits before the generic `monospace` so Korean
    glyphs inside code surfaces keep a consistent fallback width. The mono
    stack is ASCII-only by policy (DESIGN.md §4.3).

- [#70](https://github.com/bridger-kr/bridger-design-system/pull/70) [`b126d6f`](https://github.com/bridger-kr/bridger-design-system/commit/b126d6f354c0b27bd9d00733400eaf2792aa2f06) Thanks [@happycastle114](https://github.com/happycastle114)! - Icon policy standardization (DS [#47](https://github.com/bridger-kr/bridger-design-system/issues/47), DESIGN.md §6): `lucide-react` is now a required peer of `@bridger-kr/react` — consumers must install it (`^1.11.0`). All 20 hand-drawn inline SVGs across 15 components are replaced with named Lucide imports routed through a new internal `Icon` helper that pins the icon canon: sizes `--dt-icon-sm/md/lg` (14/16/20), fixed `stroke-width` 1.75, `currentColor`, `aria-hidden` for decorative glyphs and `role="img"` + `aria-label` for meaningful ones. The decorative line-tracks SVG inside the deprecated `ProductCinematicBackdrop` is removed (PR [#53](https://github.com/bridger-kr/bridger-design-system/issues/53) deletes the component wholesale). `Button` now requires `aria-label` at the type level when rendering an icon-only button. `scripts/slop-scan.mjs` (EDD-236 scaffold) fails lint on banned decorative "AI" icons (`Sparkles`, `Sparkle`, `WandSparkles`, `Wand`, `Wand2`, `Stars`, `Rocket`, `Zap`, `Flame`; `Bot` warns without `// slop-allow: Bot`) and on namespace/dynamic lucide imports. `@bridger-kr/tokens` gains `--dt-icon-sm`, `--dt-icon-md`, `--dt-icon-lg`, and `--dt-icon-stroke` in the contract plus matching TS mirrors — app-local token mirrors in `landing/` and `dashboard/` need the same four lines before `npm run check:tokens` passes there.

- [#36](https://github.com/bridger-kr/bridger-design-system/pull/36) [`6993bfb`](https://github.com/bridger-kr/bridger-design-system/commit/6993bfbb8ede033d162f5e4d4c2ff7f49ae9cbcc) Thanks [@happycastle114](https://github.com/happycastle114)! - Design-system hygiene (EDD-195): add `--dt-caption-size`/`--dt-caption-leading` (12px/16px) and `--dt-label-size`/`--dt-label-leading` (14px/20px) type steps, add px-named spacing fill steps `--dt-space-12` and `--dt-space-32`, and make `--dt-status-success` an alias of `--dt-success` so success text stays above 4.5:1 on surfaces. The semantic radius roles this change introduced (`--dt-radius-chip`/`--dt-radius-control`/`--dt-radius-card`) ship retargeted to the v2 4/6/8 scale — see the EDD-231 entry in this release.

### Patch Changes

- [#51](https://github.com/bridger-kr/bridger-design-system/pull/51) [`c44bbb5`](https://github.com/bridger-kr/bridger-design-system/commit/c44bbb5bf261025897f614f59929be2b8ccf0336) Thanks [@happycastle114](https://github.com/happycastle114)! - Focus and surface contract fixes (EDD-187): the keyboard focus indicator is a 3px `--dt-accent` outline that clears the 3:1 non-text contrast bar in both themes; light `--dt-surface-raised` is a value distinct from `--dt-surface` so raised planes and row hovers no longer render identical to the base surface; and `.dt-action-list-item-interactive` shows a muted hover fill plus the accent outline on keyboard focus instead of an invisible white-on-white hover.

## 0.2.0

### Minor Changes

- [#22](https://github.com/bridger-kr/bridger-design-system/pull/22) [`7736635`](https://github.com/bridger-kr/bridger-design-system/commit/77366358b49c802d75bd0cbbbdcffb66064247fa) Thanks [@happycastle114](https://github.com/happycastle114)! - Cut the Bridger cinematic redesign release. `@bridger-kr/react` now publishes 60 typed components across six families (core, forms, feedback, data, navigation, product) with the new `Panel`, `Chip`, `Section`, `CodePane`, `StatPanel`, `ActionList`, `AnnotationHotspot`, `ChatBubble`, `ProductActionPill`, `ProductShell`, `ProductCinematicBackdrop`, `ProductMotionField`, `ProductSideRail`, `ProductPageHeader`, `ProductTopbar`, `ProductTopbarMenu`, `SearchPill`, `WindowChrome`, and `WindowFrame` primitives. New product-side composition primitives (action list, annotation hotspot, chat bubble, motion field, side rail, topbar, window chrome, window frame) land alongside the existing core, forms, feedback, data, and navigation primitives. `@bridger-kr/tokens` keeps the persimmon `#ec5e1f` action color, Pretendard Variable, and JetBrains Mono roles; refines the dark parity contract, the focus and press scales, and the warm-paper light surface ladder. Hierarchy, density, and component state modeling were informed by Stripe marketing surfaces and the generated `getdesign` Stripe reference, but Bridger identity remains canonical: no Stripe palette, fonts, gradients, glows, marks, or copy are adopted (see `DESIGN.md` Section 10). Public API aliases (`ToggleSwitch`, `cx`) and token enums (`CardTone`, `SurfaceTone`, `MetricAccent`, `AlertTone`, `AlertMotion`, `CODE_PANE_TONE`, `PRODUCT_SHELL_TONE`, `PRODUCT_ACTION_PILL_VARIANT`, `PRODUCT_ACTION_PILL_SIZE`, `BRAND_LOGO_LANGUAGE`, `BRAND_LOGO_SIZE_NAME`) are exported as documented in `DESIGN.md` Section 9.1. `DESIGN.md` is updated with the accurate 60-component manifest, anatomy and state tables per family, an explicit accepted-debt section, provenance and reference discipline, and a release evidence checklist covering viewports (375 / 768 / 1280), themes (light / dark), and interaction states (rest, hover, focus visible, disabled, loading, press, reduced motion); the checklist is currently `Pending` and must be `Captured` before the version PR merges.

## 0.1.2

### Patch Changes

- [#19](https://github.com/bridger-kr/bridger-design-system/pull/19) [`86f7d42`](https://github.com/bridger-kr/bridger-design-system/commit/86f7d42eddf083d1f5b39f98ea270d35eeaa6509) Thanks [@happycastle114](https://github.com/happycastle114)! - Remove the external Google Fonts import from the token font stylesheet so apps can keep CSP font and style policies self-hosted.

## 0.1.1

### Patch Changes

- [#11](https://github.com/bridger-kr/bridger-design-system/pull/11) [`0e19cb4`](https://github.com/bridger-kr/bridger-design-system/commit/0e19cb480a379a3ff79bd5fcb842041518cc9b2f) Thanks [@happycastle114](https://github.com/happycastle114)! - Fix the status warning token to the Bridger product orange `#EC5E1F` so alert and app mirrors no longer introduce a second orange.

## 0.1.0

### Minor Changes

- [`f2d58a0`](https://github.com/bridger-kr/bridger-design-system/commit/f2d58a001cb0352008ed4d214a93c787dae602d8) - Initial public release of the Bridger Design System: design tokens (CSS + typed TS) and 40 typed React components.

### Patch Changes

- Move the Bridger web Figma token contract into the published token package and align React feedback components with the Figma Alert contract.
