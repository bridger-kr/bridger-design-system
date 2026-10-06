---
'@bridger-kr/react': minor
---

Add `ThemeSwitch` (EDD-241): a three-state theme preference control (`system` / `light` / `dark`) that owns the `data-theme` contract shared by the Bridger apps. It resolves `system` through `prefers-color-scheme`, persists explicit `light`/`dark` choices to `localStorage` (`bridger-theme` by default, overridable via `storageKey`), clears the key when returning to `system`, and applies the resolved theme to `document.documentElement`. Options accept accessible labels plus optional icons, inactive options hover to `--dt-text-strong`, and the option transition collapses under `prefers-reduced-motion: reduce`.
