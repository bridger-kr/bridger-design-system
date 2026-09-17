# examples/

Standalone demos and specimens for the Bridger Design System. These are not
part of the published npm library. The primitive example is a Vite React runtime
that imports the public package barrel; older specimens remain static references.

| Path | What it is |
| --- | --- |
| `ui_kits/console/` | Full-page recreation of the Bridger portal console (`portal.datari.kr`). Open `index.html` in a browser. |
| `ui_kits/landing/` | Marketing-site recreation (`datari.kr`). `app.jsx` / `app2.jsx` / `app3.jsx` are iteration variants. |
| `ui_kits/primitives/` | Vite-mounted first-use primitive example using the public `@bridger-kr/react` and `@bridger-kr/tokens` exports. It includes light/dark, keyboard focus, hover/press, disabled, and 40/44/48px Button states. |
| `foundations/` | 13 specimen cards (color, type, spacing, brand) — design-system documentation visuals. |
| `design-canvas.jsx` | A Figma-like pan/zoom design canvas used to compose specimens. |

## Running

The static specimens use Babel-standalone and React UMD from `unpkg`. Build the
mounted primitive example after building the packages:

```sh
pnpm build
pnpm build:example:primitives
pnpm dev:example:primitives
```

Then open the local Vite URL printed by the command. The example imports only
the public package contract:

```ts
import '@bridger-kr/tokens/css';
import '@bridger-kr/react/styles.css';
import { Button } from '@bridger-kr/react';
```

See the root `readme.md` and each package's `README.md` for library usage.
