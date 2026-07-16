# @bridger-kr/react

## 0.2.0

### Minor Changes

- [#22](https://github.com/bridger-kr/bridger-design-system/pull/22) [`7736635`](https://github.com/bridger-kr/bridger-design-system/commit/77366358b49c802d75bd0cbbbdcffb66064247fa) Thanks [@happycastle114](https://github.com/happycastle114)! - Cut the Bridger cinematic redesign release. `@bridger-kr/react` now publishes 60 typed components across six families (core, forms, feedback, data, navigation, product) with the new `Panel`, `Chip`, `Section`, `CodePane`, `StatPanel`, `ActionList`, `AnnotationHotspot`, `ChatBubble`, `ProductActionPill`, `ProductShell`, `ProductCinematicBackdrop`, `ProductMotionField`, `ProductSideRail`, `ProductPageHeader`, `ProductTopbar`, `ProductTopbarMenu`, `SearchPill`, `WindowChrome`, and `WindowFrame` primitives. New product-side composition primitives (action list, annotation hotspot, chat bubble, motion field, side rail, topbar, window chrome, window frame) land alongside the existing core, forms, feedback, data, and navigation primitives. `@bridger-kr/tokens` keeps the persimmon `#ec5e1f` action color, Pretendard Variable, and JetBrains Mono roles; refines the dark parity contract, the focus and press scales, and the warm-paper light surface ladder. Hierarchy, density, and component state modeling were informed by Stripe marketing surfaces and the generated `getdesign` Stripe reference, but Bridger identity remains canonical: no Stripe palette, fonts, gradients, glows, marks, or copy are adopted (see `DESIGN.md` Section 10). Public API aliases (`ToggleSwitch`, `cx`) and token enums (`CardTone`, `SurfaceTone`, `MetricAccent`, `AlertTone`, `AlertMotion`, `CODE_PANE_TONE`, `PRODUCT_SHELL_TONE`, `PRODUCT_ACTION_PILL_VARIANT`, `PRODUCT_ACTION_PILL_SIZE`, `BRAND_LOGO_LANGUAGE`, `BRAND_LOGO_SIZE_NAME`) are exported as documented in `DESIGN.md` Section 9.1. `DESIGN.md` is updated with the accurate 60-component manifest, anatomy and state tables per family, an explicit accepted-debt section, provenance and reference discipline, and a release evidence checklist covering viewports (375 / 768 / 1280), themes (light / dark), and interaction states (rest, hover, focus visible, disabled, loading, press, reduced motion); the checklist is currently `Pending` and must be `Captured` before the version PR merges.

- [#22](https://github.com/bridger-kr/bridger-design-system/pull/22) [`7736635`](https://github.com/bridger-kr/bridger-design-system/commit/77366358b49c802d75bd0cbbbdcffb66064247fa) Thanks [@happycastle114](https://github.com/happycastle114)! - Adopt native action semantics across core and data primitives. In this pre-1.0 migration, replace `Card interactive onClick` with `CardButton`, use `CardLink` for navigation, and replace `Table onRowClick` with the labeled `rowAction` button or link contract. `Chip` now renders a native button whenever `onClick` is supplied, while static chips remain spans. Static alerts and non-actionable table rows no longer expose hover or press motion.

### Patch Changes

- Updated dependencies [[`7736635`](https://github.com/bridger-kr/bridger-design-system/commit/77366358b49c802d75bd0cbbbdcffb66064247fa)]:
  - @bridger-kr/tokens@0.2.0

## 0.1.5

### Patch Changes

- [#20](https://github.com/bridger-kr/bridger-design-system/pull/20) [`1101760`](https://github.com/bridger-kr/bridger-design-system/commit/1101760c04e4dbe4b36748b02501ba20d8b8710c) Thanks [@happycastle114](https://github.com/happycastle114)! - Refine cinematic product primitives to match the latest Bridger landing direction: fixed side rail, larger action pills, no pale orange outline layer, and motion carried by the product motion field.

- Updated dependencies [[`86f7d42`](https://github.com/bridger-kr/bridger-design-system/commit/86f7d42eddf083d1f5b39f98ea270d35eeaa6509)]:
  - @bridger-kr/tokens@0.1.2

## 0.1.4

### Patch Changes

- [#17](https://github.com/bridger-kr/bridger-design-system/pull/17) [`e6f121b`](https://github.com/bridger-kr/bridger-design-system/commit/e6f121b8fc06a21455401dfe0f89fe0c752398bd) Thanks [@happycastle114](https://github.com/happycastle114)! - Add the ActionList product primitive for guide-first console workflows.

## 0.1.3

### Patch Changes

- [#15](https://github.com/bridger-kr/bridger-design-system/pull/15) [`76e6bfb`](https://github.com/bridger-kr/bridger-design-system/commit/76e6bfb13c770f9311820964ecf2b5d68522a198) Thanks [@happycastle114](https://github.com/happycastle114)! - Build React components against the React 18 JSX runtime so consumers on React 18 receive `react.element` output from core primitives.

## 0.1.2

### Patch Changes

- [#13](https://github.com/bridger-kr/bridger-design-system/pull/13) [`9ae6aa5`](https://github.com/bridger-kr/bridger-design-system/commit/9ae6aa5ea29153b148dae99f549f901099e4745d) Thanks [@happycastle114](https://github.com/happycastle114)! - Reduce the cinematic product backdrop wash so landing pages no longer render an orange glow behind the fixed question dock and motion field.

## 0.1.1

### Patch Changes

- Updated dependencies [[`0e19cb4`](https://github.com/bridger-kr/bridger-design-system/commit/0e19cb480a379a3ff79bd5fcb842041518cc9b2f)]:
  - @bridger-kr/tokens@0.1.1

## 0.1.0

### Minor Changes

- [`cc8a5a5`](https://github.com/bridger-kr/bridger-design-system/commit/cc8a5a55de94d6940fe6705d897efd79b4924ceb) - Unify the Bridger product logo around the bridge-line symbol and add app-facing surface primitive contracts.

- [`f2d58a0`](https://github.com/bridger-kr/bridger-design-system/commit/f2d58a001cb0352008ed4d214a93c787dae602d8) - Initial public release of the Bridger Design System: design tokens (CSS + typed TS) and 40 typed React components.

### Patch Changes

- Move the Bridger web Figma token contract into the published token package and align React feedback components with the Figma Alert contract.

- Updated dependencies [[`f2d58a0`](https://github.com/bridger-kr/bridger-design-system/commit/f2d58a001cb0352008ed4d214a93c787dae602d8)]:
  - @bridger-kr/tokens@0.1.0
