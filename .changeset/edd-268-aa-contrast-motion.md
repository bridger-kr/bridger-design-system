---
'@bridger-kr/react': patch
---

WCAG AA contrast + motion-hygiene fixes for the Slop Zero sign-off (EDD-268): `.dt-chip-accent` / `.dt-tool-card .dt-chip-accent` now use `--dt-accent-strong` (light ~7:1 vs the previous ~3.1:1 persimmon-on-tint), with a dark-scoped `color-mix` lift so the chip text stays AA when dark `--dt-accent-strong` aliases the raw accent; `.dt-code-pane-label` / `.dt-code-pane-copy` now use a pane-scoped `--dt-code-pane-muted` (code-ink 72%) instead of `--dt-syntax-comment` (42%), which stays dim by design for in-code comments; enter animations (`dt-alert-enter` consumer, `dt-toast-enter`, `dt-product-topbar-menu-reveal`) switch `fill-mode: both` to `backwards` so finished animations no longer linger in `document.getAnimations()`.
