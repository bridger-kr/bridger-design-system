---
"@bridger-kr/react": patch
---

Restore the `.dt-checkbox-control` base sizing rule dropped in the inline-style removal: the control collapsed from `--dt-space-5` (40px) to content size (~18px), shrinking the checkbox touch target below the 40px contract.
