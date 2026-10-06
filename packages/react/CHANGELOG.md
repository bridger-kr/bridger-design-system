# @bridger-kr/react

## 2.0.0

### Major Changes

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

- [#70](https://github.com/bridger-kr/bridger-design-system/pull/70) [`b126d6f`](https://github.com/bridger-kr/bridger-design-system/commit/b126d6f354c0b27bd9d00733400eaf2792aa2f06) Thanks [@happycastle114](https://github.com/happycastle114)! - Icon policy standardization (DS [#47](https://github.com/bridger-kr/bridger-design-system/issues/47), DESIGN.md §6): `lucide-react` is now a required peer of `@bridger-kr/react` — consumers must install it (`^1.11.0`). All 20 hand-drawn inline SVGs across 15 components are replaced with named Lucide imports routed through a new internal `Icon` helper that pins the icon canon: sizes `--dt-icon-sm/md/lg` (14/16/20), fixed `stroke-width` 1.75, `currentColor`, `aria-hidden` for decorative glyphs and `role="img"` + `aria-label` for meaningful ones. The decorative line-tracks SVG inside the deprecated `ProductCinematicBackdrop` is removed (PR [#53](https://github.com/bridger-kr/bridger-design-system/issues/53) deletes the component wholesale). `Button` now requires `aria-label` at the type level when rendering an icon-only button. `scripts/slop-scan.mjs` (EDD-236 scaffold) fails lint on banned decorative "AI" icons (`Sparkles`, `Sparkle`, `WandSparkles`, `Wand`, `Wand2`, `Stars`, `Rocket`, `Zap`, `Flame`; `Bot` warns without `// slop-allow: Bot`) and on namespace/dynamic lucide imports. `@bridger-kr/tokens` gains `--dt-icon-sm`, `--dt-icon-md`, `--dt-icon-lg`, and `--dt-icon-stroke` in the contract plus matching TS mirrors — app-local token mirrors in `landing/` and `dashboard/` need the same four lines before `npm run check:tokens` passes there.

- [#75](https://github.com/bridger-kr/bridger-design-system/pull/75) [`e48bc9d`](https://github.com/bridger-kr/bridger-design-system/commit/e48bc9da64a69fa6a66f82c89e8086a68acd7ded) Thanks [@happycastle114](https://github.com/happycastle114)! - Normalize the component API surface (issue [#42](https://github.com/bridger-kr/bridger-design-system/issues/42)).

  - Every DOM component is now a `forwardRef` component with `displayName` set. Form controls forward to the real control element (`Input`→`<input>`, `Textarea`→`<textarea>`, `Checkbox`/`Switch`/`Select`→`<button>`, `Combobox`→`<input>`), which unblocks `react-hook-form` registration, first-error focus, and overlay anchoring.
  - Variant naming is fixed to `variant` (visual shape), `tone` (semantic color), `size` (scale). Migrations: `Button` `primary`→`solid`, `secondary`→`outline`, `danger`→`solid` + `tone="danger"`; `Card` `default`/`raised`/`panel`→`plain`, `muted`→`sunken` (`tone` prop removed → deprecated alias); `Section` `band`/`proof`→`sunken`, `tone` removed → mapped alias; `Chip` `variant`→`tone`; `StatusPill` `status`→`tone` (alias kept); `Tabs` `pill`→`segmented`; `ProductActionPill` `default`/`accent` variants→`solid` + `tone`. All aliases warn once in development and are removed in v2.1.
  - Form control ids default to `useId()`; label-derived ids and the fixed `FileUpload` id are removed, so duplicate labels never collide.
  - `className`/`style` always target the component root. Inner elements take `slotProps` prop bags (`Input`, `Textarea`, `Select`, `Combobox`, `Slider`, `Checkbox`, `SectionCard`). **Breaking:** `Input`'s `className` no longer lands on the inner `<input>` — use `slotProps.input.className`.
  - `Button` accepts base-ui's `render` prop (`<Button render={<a href="…" />}>`), and icon-only buttons require `aria-label` at the type level.
  - `CodeBlock` is the single code-display component: it accepts a raw `code` string or pre-tokenized `lines`, and `copy`/`copyText` replace `copyable`. `CodePane` is a deprecated wrapper removed in v2.1.
  - Controlled/uncontrolled state is unified: `open`/`defaultOpen`/`onOpenChange` (Dialog, Drawer, CommandPalette, Select, Combobox, ProductTopbar menu) and `value`/`defaultValue`/`onValueChange` (Tabs, Select, Combobox). `onChange` remains a deprecated alias on Select/Combobox/Tabs/RadioGroup/SegmentedControl/Slider. `CommandPalette`'s `open` prop is now honored — the previous `useState(open)` semi-controlled behavior is gone; use `defaultOpen` for uncontrolled usage.
  - `Alert`'s `motion` prop and the `AlertMotion` export are removed; alerts are always static.
  - `SwitchProps`/`SelectProps`/`SliderProps`/`CheckboxProps` no longer inherit the full native-element attribute bag; DOM props that don't apply to the rendered root are dropped. Form attributes (`name`, `required`, `value`) are still forwarded where base-ui supports them.

  See `packages/react/README.md` → "Migrating to v2" for the full mapping table.

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

- [#76](https://github.com/bridger-kr/bridger-design-system/pull/76) [`7ce33b8`](https://github.com/bridger-kr/bridger-design-system/commit/7ce33b8dcddad747839d45c47d4392eee709bd87) Thanks [@happycastle114](https://github.com/happycastle114)! - New primitives (issue [#41](https://github.com/bridger-kr/bridger-design-system/issues/41), PR A scope for v2.0.0):

  - `CopyButton` — standalone copy-to-clipboard action with `idle`/`copied`/`failed` states announced through a `role="status"` live region. `CodeBlock` and `CodePane` now render `CopyButton` instead of two private copy implementations, and gain `copyLabel`/`copiedLabel`/`copyFailedLabel` props.
  - `Kbd`, `Separator` (base-ui), `Link` (external detection + `noopener`/`noreferrer` + router `render` prop), `Text`/`Heading` (the fixed 12/13/14/16 and 20/28/36 type scales, enforced at the type level).
  - `lucide-react` becomes a peer dependency for the new icon-bearing primitives (`CopyButton`, `Link`).

- [#54](https://github.com/bridger-kr/bridger-design-system/pull/54) [`fb04abc`](https://github.com/bridger-kr/bridger-design-system/commit/fb04abc7d357dc909d6a18eddccbd90578dd3b4b) Thanks [@happycastle114](https://github.com/happycastle114)! - Component hardening (EDD-237): move every hardcoded Korean default behind `DSLocaleProvider` (`ko` defaults, `en` parity via `useDSMessages`/`DS_MESSAGES_EN`), upgrade `@base-ui-components/react@1.0.0-rc.0` to stable `@base-ui/react@1.8.0`, and add `Field` (label/hint/error wired through `aria-describedby`), `ToastProvider` + `useToast` (queued toasts, 5s default timeout, live-region viewport), and `ConfirmDialog` (danger variant naming the target and its impact). Localized string props (`placeholder`, `copyLabel`, `closeLabel`, `confirmLabel`, …) still override the dictionary per call site.

- [#51](https://github.com/bridger-kr/bridger-design-system/pull/51) [`ecafd9b`](https://github.com/bridger-kr/bridger-design-system/commit/ecafd9b90c26b3448f323b88eee1e640c13096ea) Thanks [@happycastle114](https://github.com/happycastle114)! - Add `ThemeSwitch` (EDD-241): a three-state theme preference control (`system` / `light` / `dark`) that owns the `data-theme` contract shared by the Bridger apps. It resolves `system` through `prefers-color-scheme`, persists explicit `light`/`dark` choices to `localStorage` (`bridger-theme` by default, overridable via `storageKey`), clears the key when returning to `system`, and applies the resolved theme to `document.documentElement`. Options accept accessible labels plus optional icons, inactive options hover to `--dt-text-strong`, and the option transition collapses under `prefers-reduced-motion: reduce`.

- [#58](https://github.com/bridger-kr/bridger-design-system/pull/58) [`2a2adc9`](https://github.com/bridger-kr/bridger-design-system/commit/2a2adc95c495c43eecbaaf0e4e5a7a1bfc88fb12) Thanks [@devin-ai-integration](https://github.com/apps/devin-ai-integration)! - Add `ConsolePageHeader` (EDD-258): the flat console route header — a single 20px/600 `h1`, 14px subtle description, and right-aligned actions (keep to two or fewer) shared by every authenticated page. It intentionally has no eyebrow prop; console pages do not carry decorative kickers, and `ProductPageHeader` remains the landing-side hero.

  `Sidebar` contract updates for the console shell (EDD-258): default width is now 240px, rows are 32px tall on desktop and grow back to the 40px touch target inside the mobile drawer, group headings render at 12px, and the active item is a sunken row without the persimmon marker or accent icon. Items accept `external` for cross-host links (new tab + `noreferrer`) and `onNavigate` lets apps intercept plain clicks for client-side routing while modifier/middle clicks keep native behavior.

  Fix `Table` JSX usability under React 19 types: the inferred return union included `bigint`/other non-`ReactNode` members, so `<Table>` failed `tsc` in consumers. The empty-state early return is now wrapped in a fragment, so the component's inferred return stays a valid JSX element type (`react.JSX.Element` in the emitted declarations).

- [#57](https://github.com/bridger-kr/bridger-design-system/pull/57) [`ee6ba79`](https://github.com/bridger-kr/bridger-design-system/commit/ee6ba796e08f0b92687b3873a907d1ae332ab00c) Thanks [@devin-ai-integration](https://github.com/apps/devin-ai-integration)! - Require React 19 (`peerDependencies.react`/`react-dom`: `>=18` → `^19`) now that both Bridger apps run React 19.3. Development fixtures move to `react`/`react-dom`/`@types/react`/`@types/react-dom` 19.x. Consumers still on React 18 must upgrade before taking this version; this also removes the dual-React hazard that forced the landing `vite.config.js` alias workaround (EDD-303).

### Patch Changes

- [#69](https://github.com/bridger-kr/bridger-design-system/pull/69) [`d7b9080`](https://github.com/bridger-kr/bridger-design-system/commit/d7b9080321bdcc93dfcd3f63ebc52ca97c12b469) Thanks [@happycastle114](https://github.com/happycastle114)! - Accessibility fixes (DS [#43](https://github.com/bridger-kr/bridger-design-system/issues/43)):

  - `CommandPalette` now implements the WAI-ARIA combobox pattern: the search input is `role="combobox"` with `aria-expanded` / `aria-autocomplete="list"` / `aria-controls` / `aria-activedescendant`, the results pane is a separate `role="listbox"` (grouped via `role="group"` + `aria-labelledby`), and options are non-focusable `role="option"` rows driven by active-descendant instead of buttons that swallowed the focus ring. New `inputLabel`, `listboxLabel`, and `onOpenChange` props; `open` stays in sync for controlled consumers and Escape reports through `onOpenChange`.
  - `Slider` no longer sets inline `outline: 'none'`; the thumb names its hidden `input[type=range]` via `getAriaLabel` (previously the visible label pointed at a non-labelable wrapper, so the range input had no accessible name), and the thumb shows the accent focus ring through `:focus-within`.
  - `Tabs` now activates the focused tab on arrow-key navigation (`activateOnFocus`), matching the ARIA tabs pattern.
  - `CodeBlock` / `CodePane` announce copy results through a visually-hidden `role="status"` live region and show a failure state (`복사하지 못했어요`) instead of claiming success when `navigator.clipboard` rejects or is unavailable. New `copyLabel` / `copiedLabel` / `copyFailedLabel` props on `CodeBlock` and `copyFailedLabel` on `CodePane`.
  - `Spinner` accepts a `label` prop (default `로딩 중`) and forwards `aria-hidden` so spinners nested in `aria-busy` controls don't double-announce.
  - Focus-ring restoration in `styles.css`: `.dt-command-search:focus-within`, `.dt-command-option:focus-visible` fallback, `.dt-slider-thumb:focus-within`, and a shared `.dt-visually-hidden` utility.

- [#51](https://github.com/bridger-kr/bridger-design-system/pull/51) [`c44bbb5`](https://github.com/bridger-kr/bridger-design-system/commit/c44bbb5bf261025897f614f59929be2b8ccf0336) Thanks [@happycastle114](https://github.com/happycastle114)! - Focus and surface contract fixes (EDD-187): the keyboard focus indicator is a 3px `--dt-accent` outline that clears the 3:1 non-text contrast bar in both themes; light `--dt-surface-raised` is a value distinct from `--dt-surface` so raised planes and row hovers no longer render identical to the base surface; and `.dt-action-list-item-interactive` shows a muted hover fill plus the accent outline on keyboard focus instead of an invisible white-on-white hover.

- [#59](https://github.com/bridger-kr/bridger-design-system/pull/59) [`ce28af1`](https://github.com/bridger-kr/bridger-design-system/commit/ce28af19b26363e794b437a2edc471117f7ea8bc) Thanks [@devin-ai-integration](https://github.com/apps/devin-ai-integration)! - Fix `Checkbox` accessible naming (EDD-260): the wrapping `<label>` set `htmlFor` to an id that Base UI places on the hidden input, leaving the rendered `role="checkbox"` button with an empty accessible name. The control now receives `aria-labelledby` pointing at the label span (implicit label association restored), and `aria-label`/`aria-labelledby`/`aria-describedby` props are forwarded to the control so label-less call sites can still name it.

- [#59](https://github.com/bridger-kr/bridger-design-system/pull/59) [`ce28af1`](https://github.com/bridger-kr/bridger-design-system/commit/ce28af19b26363e794b437a2edc471117f7ea8bc) Thanks [@devin-ai-integration](https://github.com/apps/devin-ai-integration)! - Forward `aria-label`/`aria-labelledby`/`aria-describedby`/`aria-invalid`/`required` from `Select` props to the rendered trigger (EDD-260): the props were silently dropped before, so call sites passing `aria-label` lost the accessible name they asked for.

- [#63](https://github.com/bridger-kr/bridger-design-system/pull/63) [`d6a5e5a`](https://github.com/bridger-kr/bridger-design-system/commit/d6a5e5a867596eb69183658453739884bd29160a) Thanks [@devin-ai-integration](https://github.com/apps/devin-ai-integration)! - WCAG AA contrast + motion-hygiene fixes for the Slop Zero sign-off (EDD-268): `.dt-chip-accent` / `.dt-tool-card .dt-chip-accent` now use `--dt-accent-strong` (light ~7:1 vs the previous ~3.1:1 persimmon-on-tint), with a dark-scoped `color-mix` lift so the chip text stays AA when dark `--dt-accent-strong` aliases the raw accent; `.dt-code-pane-label` / `.dt-code-pane-copy` now use a pane-scoped `--dt-code-pane-muted` (code-ink 72%) instead of `--dt-syntax-comment` (42%), which stays dim by design for in-code comments; enter animations (`dt-alert-enter` consumer, `dt-toast-enter`, `dt-product-topbar-menu-reveal`) switch `fill-mode: both` to `backwards` so finished animations no longer linger in `document.getAnimations()`.

- Updated dependencies [[`afe74a9`](https://github.com/bridger-kr/bridger-design-system/commit/afe74a937c9995511d2c0afb71163fccdafbb514), [`354f9c4`](https://github.com/bridger-kr/bridger-design-system/commit/354f9c4e1325ffc4c9c0f87ec7f6a97ba11bdd1b), [`b020dab`](https://github.com/bridger-kr/bridger-design-system/commit/b020dab048c25e1175d6b10ed35060722408e2f9), [`ebaa9d0`](https://github.com/bridger-kr/bridger-design-system/commit/ebaa9d0aee9e18531a722bc1d92e2cfcafd76720), [`b126d6f`](https://github.com/bridger-kr/bridger-design-system/commit/b126d6f354c0b27bd9d00733400eaf2792aa2f06), [`c44bbb5`](https://github.com/bridger-kr/bridger-design-system/commit/c44bbb5bf261025897f614f59929be2b8ccf0336), [`6993bfb`](https://github.com/bridger-kr/bridger-design-system/commit/6993bfbb8ede033d162f5e4d4c2ff7f49ae9cbcc), [`9436c54`](https://github.com/bridger-kr/bridger-design-system/commit/9436c54c4c853e3033d4529a4f365093cc1ee9b4), [`9436c54`](https://github.com/bridger-kr/bridger-design-system/commit/9436c54c4c853e3033d4529a4f365093cc1ee9b4), [`80e5162`](https://github.com/bridger-kr/bridger-design-system/commit/80e5162ee7eef5f26b1367065730fcaf6638060d)]:
  - @bridger-kr/tokens@2.0.0

## 0.2.0

### Minor Changes

- [#22](https://github.com/bridger-kr/bridger-design-system/pull/22) [`7736635`](https://github.com/bridger-kr/bridger-design-system/commit/77366358b49c802d75bd0cbbbdcffb66064247fa) Thanks [@happycastle114](https://github.com/happycastle114)! - Cut the Bridger cinematic redesign release. `@bridger-kr/react` now publishes 60 typed components across six families (core, forms, feedback, data, navigation, product) with the new `Panel`, `Chip`, `Section`, `CodePane`, `StatPanel`, `ActionList`, `AnnotationHotspot`, `ChatBubble`, `ProductActionPill`, `ProductShell`, `ProductCinematicBackdrop`, `ProductMotionField`, `ProductSideRail`, `ProductPageHeader`, `ProductTopbar`, `ProductTopbarMenu`, `SearchPill`, `WindowChrome`, and `WindowFrame` primitives. New product-side composition primitives (action list, annotation hotspot, chat bubble, motion field, side rail, topbar, window chrome, window frame) land alongside the existing core, forms, feedback, data, and navigation primitives. `@bridger-kr/tokens` keeps the persimmon `#ec5e1f` action color, Pretendard Variable, and JetBrains Mono roles; refines the dark parity contract, the focus and press scales, and the warm-paper light surface ladder. Hierarchy, density, and component state modeling were informed by Stripe marketing surfaces and the generated `getdesign` Stripe reference, but Bridger identity remains canonical: no Stripe palette, fonts, gradients, glows, marks, or copy are adopted (see `DESIGN.md` Section 10). Public API aliases (`ToggleSwitch`, `cx`) and token enums (`CardTone`, `SurfaceTone`, `MetricAccent`, `AlertTone`, `AlertMotion`, `CODE_PANE_TONE`, `PRODUCT_SHELL_TONE`, `PRODUCT_ACTION_PILL_VARIANT`, `PRODUCT_ACTION_PILL_SIZE`, `BRAND_LOGO_LANGUAGE`, `BRAND_LOGO_SIZE_NAME`) are exported as documented in `DESIGN.md` Section 9.1. `DESIGN.md` is updated with the accurate 60-component manifest, anatomy and state tables per family, an explicit accepted-debt section, provenance and reference discipline, and a release evidence checklist covering viewports (375 / 768 / 1280), themes (light / dark), and interaction states (rest, hover, focus visible, disabled, loading, press, reduced motion); the checklist is currently `Pending` and must be `Captured` before the version PR merges.

- [#22](https://github.com/bridger-kr/bridger-design-system/pull/22) [`7736635`](https://github.com/bridger-kr/bridger-design-system/commit/77366358b49c802d75bd0cbbbdcffb66064247fa) Thanks [@happycastle114](https://github.com/happycastle114)! - Adopt native action semantics across core and data primitives. In this pre-1.0 migration, replace `Card interactive onClick` with `CardButton`, use `CardLink` for navigation, and replace `Table onRowClick` with the labeled `rowAction` button or link contract. `Chip` now renders a native button whenever `onClick` is supplied, while static chips remain spans. Static alerts and non-actionable table rows no longer expose hover or press motion.

### Patch Changes

- Updated dependencies [[`7736635`](https://github.com/bridger-kr/bridger-design-system/commit/77366358b49c802d75bd0cbbbdcffb66064247fa)]:
  - @bridger-kr/tokens@0.2.0

## 0.1.5

### Patch Changes

- [#20](https://github.com/bridger-kr/bridger-design-system/pull/20) [`1101760`](https://github.com/bridger-kr/bridger-design-system/commit/1101760c04e4dbe4b36748b02501ba20d8b8710c) Thanks [@happycastle114](https://github.com/happycastle114)! - Refine cinematic product primitives to match the latest Bridger landing direction: fixed side rail, larger action pills, no pale orange outline layer, and motion carried by the product motion field.

- Updated dependencies [[`86f7d42`](https://github.com/bridger-kr/bridger-design-system/commit/86f7d42eddf083d1f5b39f98ea270d35eeaa6509)]:
  - @bridger-kr/tokens@0.1.2

## 0.1.4

### Patch Changes

- [#17](https://github.com/bridger-kr/bridger-design-system/pull/17) [`e6f121b`](https://github.com/bridger-kr/bridger-design-system/commit/e6f121b8fc06a21455401dfe0f89fe0c752398bd) Thanks [@happycastle114](https://github.com/happycastle114)! - Add the ActionList product primitive for guide-first console workflows.

## 0.1.3

### Patch Changes

- [#15](https://github.com/bridger-kr/bridger-design-system/pull/15) [`76e6bfb`](https://github.com/bridger-kr/bridger-design-system/commit/76e6bfb13c770f9311820964ecf2b5d68522a198) Thanks [@happycastle114](https://github.com/happycastle114)! - Build React components against the React 18 JSX runtime so consumers on React 18 receive `react.element` output from core primitives.

## 0.1.2

### Patch Changes

- [#13](https://github.com/bridger-kr/bridger-design-system/pull/13) [`9ae6aa5`](https://github.com/bridger-kr/bridger-design-system/commit/9ae6aa5ea29153b148dae99f549f901099e4745d) Thanks [@happycastle114](https://github.com/happycastle114)! - Reduce the cinematic product backdrop wash so landing pages no longer render an orange glow behind the fixed question dock and motion field.

## 0.1.1

### Patch Changes

- Updated dependencies [[`0e19cb4`](https://github.com/bridger-kr/bridger-design-system/commit/0e19cb480a379a3ff79bd5fcb842041518cc9b2f)]:
  - @bridger-kr/tokens@0.1.1

## 0.1.0

### Minor Changes

- [`cc8a5a5`](https://github.com/bridger-kr/bridger-design-system/commit/cc8a5a55de94d6940fe6705d897efd79b4924ceb) - Unify the Bridger product logo around the bridge-line symbol and add app-facing surface primitive contracts.

- [`f2d58a0`](https://github.com/bridger-kr/bridger-design-system/commit/f2d58a001cb0352008ed4d214a93c787dae602d8) - Initial public release of the Bridger Design System: design tokens (CSS + typed TS) and 40 typed React components.

### Patch Changes

- Move the Bridger web Figma token contract into the published token package and align React feedback components with the Figma Alert contract.

- Updated dependencies [[`f2d58a0`](https://github.com/bridger-kr/bridger-design-system/commit/f2d58a001cb0352008ed4d214a93c787dae602d8)]:
  - @bridger-kr/tokens@0.1.0
