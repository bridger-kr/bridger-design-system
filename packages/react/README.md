# @bridger-kr/react

React component library for the Bridger Design System.

Exports 40 components across six categories (core, forms, feedback, data, navigation, product) plus the `cx` class-name helper, all consumable from the package root.

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
- `data` — Avatar, CodeBlock, KeyValue, LogRow, Pagination, StatTile, Table, UsageMeter
- `navigation` — Breadcrumb, CommandPalette, Menu, Sidebar, Stepper
- `product` — BrandLogo, SectionCard, ToolCard
