# @bridger-ds/react

React component library for the Bridger Design System.

Exports 40 components across six categories (core, forms, feedback, data, navigation, product) plus the `cx` class-name helper, all consumable from the package root.

## Install

```sh
pnpm add @bridger-ds/react @bridger-ds/tokens react react-dom
```

## Peer Dependencies

`@bridger-ds/react` expects React, React DOM 18 or newer, and `@bridger-ds/tokens`:

```json
{
  "react": ">=18",
  "react-dom": ">=18"
}
```

## Usage

Components are exported from the package root by category:

```tsx
import { Button, Card, CardTone, Badge, Input } from '@bridger-ds/react';
```

Per-component subpath imports are reserved for tree-shaking-friendly usage:

```tsx
import { Button } from '@bridger-ds/react/components/core/Button';
```

## CSS Setup

Import the token contract once before React component styles:

```ts
import '@bridger-ds/tokens/css';
import '@bridger-ds/react/styles.css';
```

The React stylesheet currently imports `@bridger-ds/tokens/css` too, so bundlers that preserve package CSS imports can load a single stylesheet:

```ts
import '@bridger-ds/react/styles.css';
```

If your bundler does not resolve package `@import` statements in CSS, import both `@bridger-ds/tokens/css` and `@bridger-ds/react/styles.css` in that order.

## Component Categories

- `core` — Badge, Button, Card, FilterChip, Input, Panel/Surface, StatusPill, Tabs
- `forms` — Checkbox, Combobox, FileUpload, RadioGroup, SegmentedControl, Select, Slider, Switch/ToggleSwitch, Textarea
- `feedback` — Alert, Dialog, Drawer, EmptyState, Skeleton, Spinner, Toast, Tooltip
- `data` — Avatar, CodeBlock, KeyValue, LogRow, Pagination, StatTile, Table, UsageMeter
- `navigation` — Breadcrumb, CommandPalette, Menu, Sidebar, Stepper
- `product` — BrandLogo, SectionCard, ToolCard
