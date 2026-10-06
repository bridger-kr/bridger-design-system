---
'@bridger-kr/tokens': major
---

Dark-mode contract: system default, explicit choice wins (DS #44).

- The theme now follows the OS by default. `:root` carries `color-scheme: light dark` and every themed color token is a single `light-dark()` definition, so `prefers-color-scheme` resolves the correct theme with no JavaScript — including pre-paint and JS-free surfaces (docs embeds, e-mail previews, the Figma plugin preview).
- An explicit `:root[data-theme='light'|'dark']` (written by `ThemeSwitch` or the consumer's pre-paint script) pins `color-scheme` and overrides the OS.
- `.dark` remains functional as a deprecated alias for the dark scope; it will be removed in v2.1.
- The dark block no longer restates ~30 color tokens; only `--dt-shadow-overlay` (a non-color value `light-dark()` cannot express) is restated under the explicit dark selector and a `@media (prefers-color-scheme: dark)` block for `:root:not([data-theme='light'])`.
- `packages/tokens/src/theme-parity.test.ts` guards the contract: OS-dark and explicit-dark overrides stay identical, themed colors must be well-formed `light-dark()` pairs, and body/secondary/`--dt-accent-text` pairs hold ≥4.5:1 in both themes.
- `tests/e2e/theme.spec.ts` + `playwright.config.ts` verify in a real browser that `prefers-color-scheme: dark` renders dark tokens with JavaScript disabled, and that explicit `data-theme` pins win.

Breaking: the dark theme no longer activates on `.dark`-only consumers' expectation of a per-token override block — `.dark` still works via `color-scheme`, but apps that relied on dark custom-property values being *declared* on the `.dark` element itself should move to `:root[data-theme]`. Consuming apps should remove any hardcoded `data-theme="light"` from their HTML shells and mirror this contract file.
