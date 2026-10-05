---
'@bridger-kr/tokens': patch
'@bridger-kr/react': patch
---

Focus and surface contract fixes (EDD-187): the keyboard focus indicator is a 3px `--dt-accent` outline that clears the 3:1 non-text contrast bar in both themes; light `--dt-surface-raised` is a value distinct from `--dt-surface` so raised planes and row hovers no longer render identical to the base surface; and `.dt-action-list-item-interactive` shows a muted hover fill plus the accent outline on keyboard focus instead of an invisible white-on-white hover.
