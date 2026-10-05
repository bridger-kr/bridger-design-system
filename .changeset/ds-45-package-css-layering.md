---
'@bridger-kr/tokens': major
'@bridger-kr/react': major
---

Package build and CSS layering hardening (Issue #45). All shipped CSS now lives in explicit cascade layers (`@layer dt.reset, dt.tokens, dt.base, dt.components, dt.utilities;`), so unlayered consumer CSS always wins and DS `!important` drops to the three `prefers-reduced-motion` overrides.

**BREAKING**

- The public class vocabulary is `.dt-*` only. The unprefixed globals were removed from the default entrypoint:

  | Old | New |
  | --- | --- |
  | `.btn-primary` | `.dt-button-solid` |
  | `.btn-secondary` | `.dt-button-outline` |
  | `.btn-ghost` | `.dt-button-ghost` |
  | `.btn-danger` | `.dt-button-solid[data-tone='danger']` |
  | `.badge`, `.badge-<tone>` | `.dt-badge`, `.dt-badge-<tone>` |
  | `.card`, `.card-muted`, `.card-raised` | `.dt-card` + `.dt-card-default/.dt-card-muted/.dt-card-raised` (via `Card` component) |
  | `.tabular`, `.font-tabular` | `.dt-tabular` |

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
