---
"@bridger-kr/react": patch
---

Fix `Select` and `Combobox` popups painting under in-page stacking contexts. Their
`z-index: var(--dt-z-index-popover)` sat on the static popup element where it is
ignored; it now lives on the positioned Base UI `Positioner` (same pattern as
`Tooltip`), so listboxes layer correctly above app-level contexts such as
`.dashboard-page { z-index: 1 }`.
