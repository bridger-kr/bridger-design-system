---
'@bridger-kr/tokens': major
'@bridger-kr/react': major
---

Token v2 color system (EDD-230): achromatic neutrals, single accent, stable status hues.

- Neutral ramp is chroma-0 in both themes (no warm tint): `--dt-paper` → `--dt-bg` `#ffffff`/`oklch(.145)`, surfaces to `oklch` grays; borders become ink-alpha `oklch(... / .10/.18 | .08/.16)`.
- Text roles renamed to the `text-*` namespace: `--dt-ink*` → `--dt-text*` (`--dt-ink` → `--dt-text`, `--dt-ink-strong` → `--dt-text-strong`), `--dt-muted-strong` → `--dt-text-subtle`, `--dt-muted` → `--dt-text-muted`, `--dt-tint-muted`/`--dt-tint-ink-*` → `--dt-tint-text*`. New `--dt-text-placeholder`. `--dt-text-muted` is text-only (never a background role) and holds ≥4.5:1 on every surface.
- Accent split: `--dt-accent` is fill-only (light `#ec5e1f`, dark `#f07a45`); new `--dt-accent-text` (`#b83c0d` / `#f99566`) renders persimmon as text at AA. `a` links and `.badge-accent` now use `--dt-accent-text`.
- Status fixes: `--dt-cobalt` is one blue hue in both themes (`#1d4ed8`/`#7aa2ff`, `--dt-info` aliases it); dark `--dt-status-warning` no longer equals the brand color — warning is amber `#785800`/`#fbbf24`; success `#0d7233`/`#4ade80`; danger `#b91c1c`/`#f87171`; `--dt-status-*` aliases follow the base status tokens.
- Removed: `--dt-lime`, `--dt-alert-ink`, `--dt-status-danger` (duplicate of `--dt-danger`); light `--dt-surface-raised` is now distinct from `--dt-surface`.
- `tests/contrast.test.ts` adds a WCAG AA gate: every real text-on-surface pairing resolves ≥4.5:1, status hues are theme-stable (≤10°), neutrals are achromatic, and removed tokens stay removed.

Breaking: renamed/removed custom properties and the matching `colors.*` export keys (`paper`, `ink*`, `muted*`, `lime`, `statusDanger`, `alertInk`, `tintMuted`, `tintInk*`). Consumers must migrate to the `--dt-bg`/`--dt-text*` names.
