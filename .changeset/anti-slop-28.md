---
'@bridger-kr/react': patch
'@bridger-kr/tokens': patch
---

Anti-slop burn-down (DS #28): every raw color literal in shipped source is replaced with a semantic token — new `--dt-syntax-danger` (fixed bright danger for dark code wells), `--dt-brand-ink-light`/`--dt-brand-ink-dark` (§15.3 pinned wordmark inks), and `var(--dt-surface)` blends for product topbar chrome. slop-scan gains `slop/no-raw-color` (packages scope; palette sources, BrandLogo, and tests exempt) and `slop/no-infinite-animation` now covers shipped packages too (functional `dt-spin` spinner exempt).
