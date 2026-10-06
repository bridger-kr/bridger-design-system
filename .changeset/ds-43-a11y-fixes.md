---
'@bridger-kr/react': patch
---

Accessibility fixes (DS #43):

- `CommandPalette` now implements the WAI-ARIA combobox pattern: the search input is `role="combobox"` with `aria-expanded` / `aria-autocomplete="list"` / `aria-controls` / `aria-activedescendant`, the results pane is a separate `role="listbox"` (grouped via `role="group"` + `aria-labelledby`), and options are non-focusable `role="option"` rows driven by active-descendant instead of buttons that swallowed the focus ring. New `inputLabel`, `listboxLabel`, and `onOpenChange` props; `open` stays in sync for controlled consumers and Escape reports through `onOpenChange`.
- `Slider` no longer sets inline `outline: 'none'`; the thumb names its hidden `input[type=range]` via `getAriaLabel` (previously the visible label pointed at a non-labelable wrapper, so the range input had no accessible name), and the thumb shows the accent focus ring through `:focus-within`.
- `Tabs` now activates the focused tab on arrow-key navigation (`activateOnFocus`), matching the ARIA tabs pattern.
- `CodeBlock` / `CodePane` announce copy results through a visually-hidden `role="status"` live region and show a failure state (`복사하지 못했어요`) instead of claiming success when `navigator.clipboard` rejects or is unavailable. New `copyLabel` / `copiedLabel` / `copyFailedLabel` props on `CodeBlock` and `copyFailedLabel` on `CodePane`.
- `Spinner` accepts a `label` prop (default `로딩 중`) and forwards `aria-hidden` so spinners nested in `aria-busy` controls don't double-announce.
- Focus-ring restoration in `styles.css`: `.dt-command-search:focus-within`, `.dt-command-option:focus-visible` fallback, `.dt-slider-thumb:focus-within`, and a shared `.dt-visually-hidden` utility.
