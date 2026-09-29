---
'@bridger-kr/tokens': patch
'@bridger-kr/react': patch
---

Focus and surface contract fixes (EDD-187): turn `--dt-shadow-focus` into a solid persimmon 3px ring on a 2px surface offset (`0 0 0 2px var(--dt-surface), 0 0 0 5px var(--dt-accent)`) in both themes so the focus indicator clears the 3:1 non-text contrast bar; give light `--dt-surface-raised` a real value (`#fbfbf9`) so raised planes and row hovers no longer render identical to `--dt-surface`; and make `.dt-action-list-item-interactive` show a muted hover fill plus an inset accent outline on keyboard focus instead of an invisible white-on-white hover.
