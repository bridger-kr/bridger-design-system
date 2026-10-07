---
'@bridger-kr/react': patch
---

Per-component build entries (bridger-web budgets gate): tsup now emits one dist module per component file in addition to the root and family barrels. Consumer bundlers tree-shake at component granularity — `import { Alert }` resolves to Alert's module graph alone instead of a family bundle that dragged positioned components' `usePositioner` runtime into app entry chunks (dashboard /login initial JS −52 KiB gzip, landing initial JS −72 KiB gzip).
