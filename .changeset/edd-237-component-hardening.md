---
'@bridger-kr/react': minor
---

Component hardening (EDD-237): move every hardcoded Korean default behind `DSLocaleProvider` (`ko` defaults, `en` parity via `useDSMessages`/`DS_MESSAGES_EN`), upgrade `@base-ui-components/react@1.0.0-rc.0` to stable `@base-ui/react@1.8.0`, and add `Field` (label/hint/error wired through `aria-describedby`), `ToastProvider` + `useToast` (queued toasts, 5s default timeout, live-region viewport), and `ConfirmDialog` (danger variant naming the target and its impact). Localized string props (`placeholder`, `copyLabel`, `closeLabel`, `confirmLabel`, …) still override the dictionary per call site.
