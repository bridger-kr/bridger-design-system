---
"@bridger-kr/react": minor
---

Adopt native action semantics across core and data primitives. In this pre-1.0 migration, replace `Card interactive onClick` with `CardButton`, use `CardLink` for navigation, and replace `Table onRowClick` with the labeled `rowAction` button or link contract. `Chip` now renders a native button whenever `onClick` is supplied, while static chips remain spans. Static alerts and non-actionable table rows no longer expose hover or press motion.
