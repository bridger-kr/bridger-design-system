---
'@bridger-kr/tokens': minor
---

Add ambient motion tokens for landing decoration loops: `--dt-motion-ambient` (16000ms ease-in-out), `--dt-motion-ambient-slow` (24000ms ease-in-out), `--dt-motion-flow` (8000ms linear), and `--dt-motion-flow-slow` (32000ms linear). These support the bounded "alive" landing treatment from EDD-103; ambient loops must stop under `prefers-reduced-motion: reduce`.
