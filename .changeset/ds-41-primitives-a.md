---
'@bridger-kr/react': minor
---

New primitives (issue #41, PR A scope for v2.0.0):

- `CopyButton` — standalone copy-to-clipboard action with `idle`/`copied`/`failed` states announced through a `role="status"` live region. `CodeBlock` and `CodePane` now render `CopyButton` instead of two private copy implementations, and gain `copyLabel`/`copiedLabel`/`copyFailedLabel` props.
- `Kbd`, `Separator` (base-ui), `Link` (external detection + `noopener`/`noreferrer` + router `render` prop), `Text`/`Heading` (the fixed 12/13/14/16 and 20/28/36 type scales, enforced at the type level).
- `lucide-react` becomes a peer dependency for the new icon-bearing primitives (`CopyButton`, `Link`).
