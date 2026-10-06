# examples/ — Bridger showcases

Static specimens and a Vite showcase implementing the **Bridger** design canon
(`DESIGN.md` v2) for the portal/console product — bridger.kr, portal.bridger.kr,
mcp.bridger.kr.

```
ui_kits/
  primitives/   Vite + React showcase — @bridger-kr/react + @bridger-kr/tokens
                through the public package entry points only.
                Build check: `pnpm build:example:primitives`
foundations/    hand-authored HTML specimens for tokens/typography/brand/spacing
```

## Serving

- `ui_kits/primitives/` — `pnpm --filter @ds/example-primitives dev`
- `foundations/` — `npx serve examples` then open a specimen file, or use any
  static server / `file://` (no build step; they import `../../styles.css`).

No example loads React/Babel from a CDN at runtime — `ui_kits/primitives` is
bundled by Vite against the workspace packages.
