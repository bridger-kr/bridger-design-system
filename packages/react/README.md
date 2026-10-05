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

- `core` — Badge, Button, Card, FilterChip, Input, Panel/Surface, StatusPill, Tabs
- `forms` — Checkbox, Combobox, FileUpload, RadioGroup, SegmentedControl, Select, Slider, Switch/ToggleSwitch, Textarea
- `feedback` — Alert, Dialog, Drawer, EmptyState, Skeleton, Spinner, Toast, Tooltip
- `data` — Avatar, CodeBlock, KeyValue, LogRow, Pagination, StatTile, Table, UsageMeter
- `navigation` — Breadcrumb, CommandPalette, Menu, Sidebar, Stepper
- `product` — BrandLogo, SectionCard, ToolCard
