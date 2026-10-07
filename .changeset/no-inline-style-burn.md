---
'@bridger-kr/react': patch
---

Remove all `style={{...}}` literals from shipped components (#37 #38 #39).

Statics moved to `.dt-*` classes in `packages/react/src/styles.css`; dynamic
values now flow through scoped CSS custom properties (`--dt-slider-pct`,
`--dt-drawer-width`, `--dt-menu-width`, `--dt-sidebar-width`,
`--dt-brand-logo-*`, `--dt-annotation-*`, `--dt-usage-pct`, `--dt-avatar-*`,
`--dt-skeleton-*`, `--dt-step-*`). State styling moved to `data-*` attributes.

Also adds a `style/no-inline-style-literal` rule to `scripts/slop-scan.mjs`
(error in `packages/*/src` + `examples/`; test fixtures exempt) so the pattern
cannot regress, and drops the decorative uppercase treatment from
`StatTile`/`SectionCard` eyebrows per §11.
