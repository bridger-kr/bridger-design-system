# @bridger-kr/react

React component library for the Bridger Design System.

Exports 61 components across six categories (core, forms, feedback, data, navigation, product) plus the `cx` class-name helper, all consumable from the package root.

## Install

```sh
pnpm add @bridger-kr/react @bridger-kr/tokens react react-dom
```

## Peer Dependencies

`@bridger-kr/react` expects React and React DOM 19, and `@bridger-kr/tokens`:

```json
{
  "react": "^19",
  "react-dom": "^19"
}
```

## Usage

Components are exported from the package root by category:

```tsx
import { Button, Card, CardTone, Badge, Input } from '@bridger-kr/react';
```

Category-level subpath imports are reserved for tree-shaking-friendly usage:

```tsx
import { Button } from '@bridger-kr/react/components/core';
import { Checkbox } from '@bridger-kr/react/components/forms';
```

Every published entry — root and category — is a client module (`"use client"`), so all exports are safe to import from Next.js App Router server components.

## CSS Setup

Import the token contract once before React component styles:

```ts
import '@bridger-kr/tokens/css';
import '@bridger-kr/react/styles.css';
```

`styles.css` declares the same layer order as `@bridger-kr/tokens/css` (`@layer dt.reset, dt.tokens, dt.base, dt.components, dt.utilities;`) and places every rule in `dt.components` or `dt.utilities`, so the two files may be imported in either order. All DS rules live inside `dt.*` layers — unlayered app CSS always wins over them with normal specificity, never `!important`.

Element defaults (`body`, headings, `code`) are **not** loaded by the default tokens entrypoint. Opt in explicitly if you want them:

```ts
import '@bridger-kr/tokens/css/base';
```

The public class vocabulary is `.dt-*` only. The pre-v2 unprefixed classes (`.btn-*`, `.badge`, `.card-*`) are available as deprecated aliases via `@bridger-kr/tokens/css/legacy-classes` until 2.1.0.

### Tailwind v3 consumers

Tailwind's `preflight` is unlayered CSS and therefore wins over every DS layer — buttons lose their background, for example. Either disable it (the DS `dt.reset` layer owns the reset):

```js
// tailwind.config.js
module.exports = { corePlugins: { preflight: false } };
```

or wrap `@tailwind base` in a later `@layer` in your app CSS after verifying the result locally. Unlayered app CSS can then override DS styles without `!important`.

## Component Categories

- `core` — Badge, Button, Card, FilterChip, Heading, Input, Kbd, Link, Panel/Surface, Separator, StatusPill, Tabs, Text
- `forms` — Checkbox, Combobox, FileUpload, RadioGroup, SegmentedControl, Select, Slider, Switch/ToggleSwitch, Textarea
- `feedback` — Alert, Dialog, Drawer, EmptyState, Skeleton, Spinner, Toast, Tooltip
- `data` — Avatar, CodeBlock, CodePane (deprecated → CodeBlock), CopyButton, KeyValue, LogRow, Pagination, StatTile, Table, UsageMeter
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
