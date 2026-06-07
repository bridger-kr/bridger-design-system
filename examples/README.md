# examples/

Standalone demos and specimens for the Bridger Design System. **These are not
part of the published npm library** — they are zero-build, in-browser references
that load React + Babel from a CDN.

| Path | What it is |
| --- | --- |
| `ui_kits/console/` | Full-page recreation of the Bridger portal console (`portal.datari.kr`). Open `index.html` in a browser. |
| `ui_kits/landing/` | Marketing-site recreation (`datari.kr`). `app.jsx` / `app2.jsx` / `app3.jsx` are iteration variants. |
| `foundations/` | 13 specimen cards (color, type, spacing, brand) — design-system documentation visuals. |
| `design-canvas.jsx` | A Figma-like pan/zoom design canvas used to compose specimens. |

## Running

These files use Babel-standalone and React UMD from `unpkg`, and reference the
repo-root token CSS. Open any `index.html` directly in a browser, or serve the
repo root statically:

```sh
npx serve .
# then open http://localhost:3000/examples/ui_kits/console/
```

The demos link the **source** token CSS at the repo root (`styles.css` →
`tokens/*.css`). For production consumption, use the published packages instead:

```ts
import '@bridger-ds/tokens/css';
import '@bridger-ds/react/styles.css';
import { Button } from '@bridger-ds/react';
```

See the root `readme.md` and each package's `README.md` for library usage.
