---
'@bridger-kr/tokens': major
'@bridger-kr/react': major
---

Token v2 step 1 (EDD-229): delete decorative tokens from the canonical contract. `contract.css`, `packages/tokens/src/index.ts`, `base.css`, `styles.css`, the figma token generator, and all examples are aligned; the legacy radius aliases are gone.

**Removed tokens → replacement**

| Removed | Replacement |
| --- | --- |
| `--dt-brand-gradient` | `--dt-accent` (it was a single-hue gradient in name only) |
| `--dt-shadow-gradient`, `--dt-gradient-mesh` | Removed, no replacement (radial-wash decoration) |
| `--dt-ambient-01` | `--dt-shadow-sm` |
| `--dt-ambient-02` | `--dt-shadow-lg` |
| `--dt-ambient-03`, `--dt-ambient-04` | `--dt-shadow-xl` |
| `--dt-glass-bg` | `--dt-surface` (surfaces are opaque) |
| `--dt-glass-blur` | Removed, no replacement (no backdrop blur) |
| `--dt-motion-ambient`, `--dt-motion-ambient-slow`, `--dt-motion-flow`, `--dt-motion-flow-slow` | Removed, no replacement (infinite decorative motion is banned) |
| `--dt-eyebrow-size` | `--dt-caption-size` |
| `--dt-eyebrow-tracking`, `--dt-eyebrow-weight` | Removed, no replacement (decorative uppercase eyebrow pattern) |
| `--dt-moon-standard`, `--dt-moon-enter` | `--dt-ease` |
| `--dt-moon-exit` | `--dt-ease-in` |
| `--dt-shadow-subtle`, `--dt-shadow-elevated` | `--dt-shadow-overlay` (new single elevation for menus/dialogs/popovers) |
| `--dt-radius-sm`, `--dt-radius-inner` | `--dt-radius-chip` |
| `--dt-radius-element`, `--dt-radius-button` | `--dt-radius-control` |
| `--dt-radius-container`, `--dt-radius-lg`, `--dt-radius-xl` | `--dt-radius-card` |
| `--dt-radius-md` | `--dt-radius-card` (containers) or `--dt-radius-control` (interactive items) |
| `--dt-radius-full` | `--dt-radius-pill` |

The `@bridger-kr/react` barrel is unchanged, but the shared stylesheet and several components now render with the role-based radii and flat shadows above — a visible (breaking) change. `.glass-card` keeps its name for compatibility and now renders as an opaque bordered card.

App-side mirrors (`landing/` and `dashboard/` token mirrors, tailwind configs, and remaining `var(--dt-…)` call sites) move in the paired bridger-web PR; `npm run check:tokens` is part of this release's gate.
