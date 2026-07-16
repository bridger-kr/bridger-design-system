# @bridger-kr/tokens

## 0.2.0

### Minor Changes

- [#22](https://github.com/bridger-kr/bridger-design-system/pull/22) [`7736635`](https://github.com/bridger-kr/bridger-design-system/commit/77366358b49c802d75bd0cbbbdcffb66064247fa) Thanks [@happycastle114](https://github.com/happycastle114)! - Cut the Bridger cinematic redesign release. `@bridger-kr/react` now publishes 60 typed components across six families (core, forms, feedback, data, navigation, product) with the new `Panel`, `Chip`, `Section`, `CodePane`, `StatPanel`, `ActionList`, `AnnotationHotspot`, `ChatBubble`, `ProductActionPill`, `ProductShell`, `ProductCinematicBackdrop`, `ProductMotionField`, `ProductSideRail`, `ProductPageHeader`, `ProductTopbar`, `ProductTopbarMenu`, `SearchPill`, `WindowChrome`, and `WindowFrame` primitives. New product-side composition primitives (action list, annotation hotspot, chat bubble, motion field, side rail, topbar, window chrome, window frame) land alongside the existing core, forms, feedback, data, and navigation primitives. `@bridger-kr/tokens` keeps the persimmon `#ec5e1f` action color, Pretendard Variable, and JetBrains Mono roles; refines the dark parity contract, the focus and press scales, and the warm-paper light surface ladder. Hierarchy, density, and component state modeling were informed by Stripe marketing surfaces and the generated `getdesign` Stripe reference, but Bridger identity remains canonical: no Stripe palette, fonts, gradients, glows, marks, or copy are adopted (see `DESIGN.md` Section 10). Public API aliases (`ToggleSwitch`, `cx`) and token enums (`CardTone`, `SurfaceTone`, `MetricAccent`, `AlertTone`, `AlertMotion`, `CODE_PANE_TONE`, `PRODUCT_SHELL_TONE`, `PRODUCT_ACTION_PILL_VARIANT`, `PRODUCT_ACTION_PILL_SIZE`, `BRAND_LOGO_LANGUAGE`, `BRAND_LOGO_SIZE_NAME`) are exported as documented in `DESIGN.md` Section 9.1. `DESIGN.md` is updated with the accurate 60-component manifest, anatomy and state tables per family, an explicit accepted-debt section, provenance and reference discipline, and a release evidence checklist covering viewports (375 / 768 / 1280), themes (light / dark), and interaction states (rest, hover, focus visible, disabled, loading, press, reduced motion); the checklist is currently `Pending` and must be `Captured` before the version PR merges.

## 0.1.2

### Patch Changes

- [#19](https://github.com/bridger-kr/bridger-design-system/pull/19) [`86f7d42`](https://github.com/bridger-kr/bridger-design-system/commit/86f7d42eddf083d1f5b39f98ea270d35eeaa6509) Thanks [@happycastle114](https://github.com/happycastle114)! - Remove the external Google Fonts import from the token font stylesheet so apps can keep CSP font and style policies self-hosted.

## 0.1.1

### Patch Changes

- [#11](https://github.com/bridger-kr/bridger-design-system/pull/11) [`0e19cb4`](https://github.com/bridger-kr/bridger-design-system/commit/0e19cb480a379a3ff79bd5fcb842041518cc9b2f) Thanks [@happycastle114](https://github.com/happycastle114)! - Fix the status warning token to the Bridger product orange `#EC5E1F` so alert and app mirrors no longer introduce a second orange.

## 0.1.0

### Minor Changes

- [`f2d58a0`](https://github.com/bridger-kr/bridger-design-system/commit/f2d58a001cb0352008ed4d214a93c787dae602d8) - Initial public release of the Bridger Design System: design tokens (CSS + typed TS) and 40 typed React components.

### Patch Changes

- Move the Bridger web Figma token contract into the published token package and align React feedback components with the Figma Alert contract.
