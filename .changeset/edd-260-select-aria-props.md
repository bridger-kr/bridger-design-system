---
'@bridger-kr/react': patch
---

Forward `aria-label`/`aria-labelledby`/`aria-describedby`/`aria-invalid`/`required` from `Select` props to the rendered trigger (EDD-260): the props were silently dropped before, so call sites passing `aria-label` lost the accessible name they asked for.
