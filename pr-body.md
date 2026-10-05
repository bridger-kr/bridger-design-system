## Summary

Implements EDD-230 (토큰 v2 ② color system): the palette is now achromatic neutrals + a single persimmon accent + stable status hues, fixing every named bug in the issue.

**Token contract** (`packages/tokens/css/contract.css`):
- Neutrals are chroma-0 oklch (`--dt-bg #ffffff`, `--dt-surface oklch(.9875)`, `--dt-surface-sunken oklch(.97)` …) — the warm paper/sunken/border tints are gone. Borders are ink-alpha (`oklch(.145 0 0 / .10|.18)` light, `white /.08|.16` dark), so `--dt-border` stays a real color on any tint.
- `--dt-cobalt` is one blue hue in both themes (`#1d4ed8` / `#7aa2ff`) and `--dt-info` aliases it — no more teal-in-light flip. Dark `--dt-status-warning` is amber `#fbbf24` instead of the brand `#ec5e1f`; all `--dt-status-*` aliases track their base token. `--dt-lime`, `--dt-alert-ink`, `--dt-status-danger` deleted.
- **Breaking:** the `ink/paper/muted` role names are replaced by the text namespace — `--dt-paper`→`--dt-bg`, `--dt-ink`→`--dt-text`, `--dt-ink-strong`→`--dt-text-strong`, `--dt-muted-strong`→`--dt-text-subtle`, `--dt-muted`→`--dt-text-muted`, `--dt-tint-muted`/`--dt-tint-ink-*`→`--dt-tint-text*`. The name makes the text-only role explicit (muted-as-background is the 1:1-contrast bug; a slop-scan rule for it ships app-side in bridger-web EDD-239). Major changeset for both published packages.
- `#ec5e1f` is a **fill-only** token (3.16:1 on paper, fails AA as text). New `--dt-accent-text` (`#b83c0d` / `#f99566`, ≥4.5:1) owns the glyph role — links, `.badge-accent`, chips, eyebrows, icons migrated to it; brand-mark persimmon periods keep `--dt-accent`.
- `--dt-text-muted` sits at oklch `.54` (darker than `text-subtle .556`) specifically to hold 4.5:1 on every surface token including sunken `.97`; `text-subtle` is the bounded exception documented in the test.

**New AA gate** — `tests/contrast.test.ts` parses contract.css per theme and asserts every text token ≥4.5:1 on every surface, accent-text/accent-strong ≥4.5 everywhere, status text ≥4.5 on its own tint, cross-theme hue parity ≤10° per status, neutral ramp achromatic, and the deleted tokens gone.

**Tooling/docs** — `gen-tokens.mjs` now resolves `oklch()` (incl. alpha + inside `color-mix`) so the figma palette regenerates; `components.spec.json` token paths renamed; swatch docs rewritten (`colors-ink.html`→`colors-text.html`, surfaces/status/accent/tints re-mocked); `DESIGN.md` §4.2 role table + readme + SKILL.md updated to the new names.

## Verification

- `pnpm build` / `pnpm typecheck` / `pnpm test` (112) / `pnpm lint` — green; figma-plugin `gen`, `validate`, `e2e` — green
- `grep -nE 'lime|alert-ink|#256b5a' packages/tokens` → 0 matches
- Swatch pages rendered below (light theme): neutral ramp is pure gray, warning reads amber — clearly not brand persimmon

![status swatches: green success, amber warning, red danger, blue cobalt](/home/ubuntu/screenshots/ss_9d9f348e.png)
![accent roles: persimmon fill plus accent-text, accent-strong, accent-bright, accent-soft](/home/ubuntu/screenshots/ss_f5e5f0a9.png)
