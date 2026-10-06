---
'@bridger-kr/react': minor
---

Require React 19 (`peerDependencies.react`/`react-dom`: `>=18` → `^19`) now that both Bridger apps run React 19.3. Development fixtures move to `react`/`react-dom`/`@types/react`/`@types/react-dom` 19.x. Consumers still on React 18 must upgrade before taking this version; this also removes the dual-React hazard that forced the landing `vite.config.js` alias workaround (EDD-303).
