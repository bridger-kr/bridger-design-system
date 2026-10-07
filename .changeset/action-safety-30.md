---
'@bridger-kr/react': patch
---

Action-safety contract (DS #30): `Button` gains `loading` — width-preserving spinner overlay, `aria-busy`, and duplicate-activation blocking; `ConfirmDialog` gains `pending` — confirm shows the loading state and keeps the dialog open while cancel stays safe; `Toast` maps `danger`/`warning` tones to `role="alert"` (other tones stay `status`) on both the standalone component and provider-rendered cards.
