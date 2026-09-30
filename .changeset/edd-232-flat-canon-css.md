---
'@bridger-kr/react': minor
'@bridger-kr/tokens': minor
---

Flat-canon CSS cleanup (EDD-232): remove ambient shadows, backdrop blur, decorative loops, and gradient washes from the component stylesheet; raise all text to the 12px floor; compact Buttons to radius 6 and heights 32/36/40 (`--dt-radius-control` 6px, `--dt-radius-card` 8px, `--dt-eyebrow-size` 12px / weight 600); Tabs default to underline variant (pill remains opt-in); Spinner drives its loop via Web Animations with `prefers-reduced-motion` gating; `!important` reduced to a single documented reduced-motion override.
