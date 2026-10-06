---
"@bridger-kr/tokens": major
"@bridger-kr/react": major
---

Token scale retarget to the DESIGN.md v2 flat canon (EDD-231, token v2 ③).

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
