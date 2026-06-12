# @bridger-ds/react

React component library for the Bridger Design System.

This package is scaffolded for Wave 4 component migration. No concrete components are exported yet.

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

Components will be exported from the package root by category once Wave 4 migrates them:

```tsx
import { Button } from '@bridger-ds/react';
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

Wave 4 will populate these source categories:

- `core`
- `forms`
- `feedback`
- `data`
- `navigation`
- `product`
