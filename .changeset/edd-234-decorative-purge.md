---
'@bridger-kr/react': major
'@bridger-kr/tokens': major
---

Remove decoration-only v1 product exports (EDD-234, DESIGN.md §12 exit): `ProductCinematicBackdrop`, `ProductMotionField`, `ProductActionPill` (+ `PRODUCT_ACTION_PILL_*`, `productActionPillClassName`), `WindowChrome`, `WindowFrame`, and the `ProductShell` `tone`/`PRODUCT_SHELL_TONE` axis — `ProductShell` is now a flat composition panel (file renamed `ProductCinematic.tsx` → `ProductShell.tsx`). `AnnotationHotspot` keeps the static marker; the `dt-hotspot-pulse` animation is gone. Tokens: `--dt-chrome-dot-{1,2,3}` removed.

Migration: `ProductActionPill` → `<Button variant="primary">`; `WindowFrame`/`WindowChrome` → `<Card>` or a plain bordered panel; `ProductShell tone="cinematic"|"console"` → `<ProductShell>` (flat); `ProductCinematicBackdrop`/`ProductMotionField` → remove (no replacement — decoration is prohibited under v2).
