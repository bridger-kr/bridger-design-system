# @bridger-kr/react

React component library for the Bridger Design System.

Exports 60 components across six categories (core, forms, feedback, data, navigation, product) plus the `cx` class-name helper, all consumable from the package root.

## Install

```sh
pnpm add @bridger-kr/react @bridger-kr/tokens react react-dom
```

## Peer Dependencies

`@bridger-kr/react` expects React, React DOM 18 or newer, and `@bridger-kr/tokens`:

```json
{
  "react": ">=18",
  "react-dom": ">=18"
}
```

## Usage

Components are exported from the package root by category:

```tsx
import { Button, Card, CardTone, Badge, Input } from '@bridger-kr/react';
```

Per-component subpath imports are reserved for tree-shaking-friendly usage:

```tsx
import { Button } from '@bridger-kr/react/components/core/Button';
```

## CSS Setup

Import the token contract once before React component styles:

```ts
import '@bridger-kr/tokens/css';
import '@bridger-kr/react/styles.css';
```

The React stylesheet currently imports `@bridger-kr/tokens/css` too, so bundlers that preserve package CSS imports can load a single stylesheet:

```ts
import '@bridger-kr/react/styles.css';
```

If your bundler does not resolve package `@import` statements in CSS, import both `@bridger-kr/tokens/css` and `@bridger-kr/react/styles.css` in that order.

## Component Categories

- `core` — Badge, Button, Card, FilterChip, Input, Panel/Surface, StatusPill, Tabs
- `forms` — Checkbox, Combobox, FileUpload, RadioGroup, SegmentedControl, Select, Slider, Switch/ToggleSwitch, Textarea
- `feedback` — Alert, Dialog, Drawer, EmptyState, Skeleton, Spinner, Toast, Tooltip
- `data` — Avatar, CodeBlock, CodePane (deprecated → CodeBlock), KeyValue, LogRow, Pagination, StatTile, Table, UsageMeter
- `navigation` — Breadcrumb, CommandPalette, Menu, Sidebar, Stepper
- `product` — BrandLogo, SectionCard, ToolCard

## Component API conventions

Every component that renders a DOM element is a `forwardRef` component with `displayName` set. Form controls forward to the real control (`<input>`/`<textarea>`/trigger `<button>`); everything else forwards to its root.

**Variant-prop naming** — one prop name per meaning:

| Prop | Meaning | Allowed values |
| --- | --- | --- |
| `variant` | Visual shape / emphasis | `Button`: `solid \| outline \| ghost` · `Card`: `plain \| sunken` · `Tabs`: `underline \| segmented` |
| `tone` | Semantic color | `neutral \| accent \| success \| warning \| danger \| info` (per-component subsets) |
| `size` | Scale | `sm \| md \| lg` |
| `status` | Data state only | `loading \| ok \| error \| na` — never a visual alias |

Old prop names remain as deprecated aliases for one minor release and warn once in development (`Removed in v2.1`).

**Other rules**

- Control ids default to `useId()` — label-derived ids are gone, so duplicate labels never collide. `id` can still be overridden.
- `className`/`style` always target the root. Inner elements take `slotProps` prop bags (e.g. `slotProps.input.className` on `Input`, `slotProps.control` on `Checkbox`).
- `Button` supports base-ui's `render` prop: `<Button render={<a href="/pricing" />}>요금</Button>` renders a link with button styling.
- Icon-only `Button`s require `aria-label` at the type level.
- Stateful components are controlled via `open`/`defaultOpen`/`onOpenChange` or `value`/`defaultValue`/`onValueChange`.
- `CodeBlock` is the single code-display component (`code` string or pre-tokenized `lines`); `CodePane` is a deprecated wrapper.

## Migrating to v2

| Before | After |
| --- | --- |
| `<Button variant="primary">` | `<Button variant="solid">` |
| `<Button variant="secondary">` | `<Button variant="outline">` |
| `<Button variant="danger">` | `<Button variant="solid" tone="danger">` |
| `<Card tone="muted">` / `variant="muted"` | `<Card variant="sunken">` |
| `<Card variant="default" \| "raised" \| "panel">` | `<Card variant="plain">` |
| `<Section variant="band" \| "proof">` | `<Section variant="sunken">` |
| `<Section tone="soft">` / `"accent-wash"` / `"grid"` | `<Section variant="plain">` / `"sunken"` |
| `<Chip variant="…">` | `<Chip tone="…">` (same values) |
| `<StatusPill status="connected">` | `<StatusPill tone="success">` (`reconnecting`→`warning`, `disconnected`→`danger`, `idle`→`neutral`) |
| `<Tabs variant="pill">` | `<Tabs variant="segmented">` |
| `<Alert motion="pulse">` | removed — alerts are always static |
| `<Input className="…">` (hit the `<input>`) | `className` now hits the root; use `slotProps={{ input: { className } }}` for the control |
| `<Select onChange>` / `<Combobox onChange>` / `<Tabs onChange>` / `<RadioGroup onChange>` / `<SegmentedControl onChange>` / `<Slider onChange>` | `onValueChange` (`onChange` kept as deprecated alias) |
| `<CommandPalette open={bool}>` uncontrolled bug | now a real controlled prop; use `defaultOpen` for uncontrolled |
| `<CodePane lines>` | `<CodeBlock lines>` (`copyable`→`copy`) |

Deprecated aliases emit a single dev-mode `console.warn` and are removed in v2.1.
