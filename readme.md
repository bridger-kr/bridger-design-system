# Bridger Design System

> 어려운 공공 API를 하나로 이어주는 서비스 — *Bridger connects scattered Korean public-data APIs into one.*

Bridger (브릿저, operated under the **datari** infrastructure brand) is a managed
gateway that connects Korean public-data OpenAPI services to Claude, ChatGPT,
MCP clients, and server-side REST callers through **one** managed endpoint. It
handles the hard parts of public data — service-key registration, response
normalization, selected-tool exposure, and audit logging — so a person can pick
a government API and have it answerable from an AI client or a server in minutes.

This project is the **design system** for Bridger: tokens, fonts, foundation
specimens, reusable React components, and full-screen UI-kit recreations of the
two product surfaces.

---

## Using the packages

This repo is a **pnpm monorepo** that ships two publishable packages plus a
private Figma plugin:

| Package | Public? | What it is |
| --- | --- | --- |
| [`@bridger-kr/tokens`](packages/tokens) | ✅ npm | Design tokens — CSS custom properties (`--dt-*`) + typed TS token objects + Pretendard webfont. |
| [`@bridger-kr/react`](packages/react) | ✅ npm | 40 typed React components (`.tsx`), tree-shakeable, ESM + CJS + `.d.ts`. |
| [`bridger-figma-plugin`](packages/figma-plugin) | 🔒 private | Figma Community plugin that builds Variables/Styles/40 Component Sets from the tokens. Not on npm. |

### Install

```sh
pnpm add @bridger-kr/react @bridger-kr/tokens react react-dom
```

### CSS setup

Import the token contract once, then the React component styles:

```ts
import '@bridger-kr/tokens/css';   // --dt-* variables, fonts, base classes
import '@bridger-kr/react/styles.css';
```

### React usage

```tsx
import { Button, Table, CommandPalette } from '@bridger-kr/react';
```

Per-component subpath imports for maximum tree-shaking:

```tsx
import { Button } from '@bridger-kr/react/components/core/Button';
```

### Tokens in TS/JS

```ts
import { colors, spacing, typography } from '@bridger-kr/tokens';
colors.light.accent; // "#ec5e1f"
```

### Figma plugin

Private — distributed via **Figma Community** (manual desktop submission, not
npm). See [`packages/figma-plugin/store-assets/PUBLISH.md`](packages/figma-plugin/store-assets/PUBLISH.md).

### Develop

```sh
pnpm install
pnpm build        # build all packages
pnpm typecheck
pnpm test
```

---

## The product, in one picture

Bridger should feel like a **quiet product console** for people who repeatedly
inspect, compare, activate, and operate public-data APIs. It is restrained,
dense, and work-focused — not illustrative or promotional. The UI should feel
trustworthy, exact, and Korean-product native.

Two surfaces share one token contract:

| Surface | What it is | Tone |
| --- | --- | --- |
| **Console / Portal** (`portal.datari.kr`) | The core product. Dashboard, government-API catalog, tool list, execution logs, API keys, usage. A dense, scannable operations console. | Quiet, tabular, work-focused |
| **Landing** (`datari.kr`) | Korean-first marketing site (English under `/en`). Cinematic hero, tool categories, examples, connector guides. | Confident, technical, still restrained |

Operational identifiers stay unchanged in copy: `datari.kr`, `api.datari.kr`,
`mcp.datari.kr/mcp`, `portal.datari.kr`. User-facing brand name is **Bridger**
or **브릿저**.

---

## Sources this system was built from

Store these even though the reader may not have access — they are the source of truth.

**GitHub (org `bridger-kr`)** — explore these to build better Bridger designs:
- [`bridger-kr/bridger-web`](https://github.com/bridger-kr/bridger-web) — frontend monorepo: `landing/` (Vite marketing app) and `dashboard/` (Vite console app). It consumes this repo through `@bridger-kr/react` and `@bridger-kr/tokens`.
- [`bridger-kr/bridger-ops-bot`](https://github.com/bridger-kr/bridger-ops-bot) — ops automation bot.
- [`bridger-kr/bridger-spec`](https://github.com/bridger-kr/bridger-spec) — OpenAPI presets + codegen (mcp-gen, openapi-gen).

Key files lifted into this system: the original Bridger web token contract,
`colors_and_type.css`, `dashboard/src/styles.css`, `dashboard/tailwind.config.ts`,
`landing/src/components/BrandLogo.jsx`, plus agency logos and the Pretendard webfont.

**Figma** — `제목 없음.fig` (mounted). An **early brand exploration** (Page-1, Page-2)
that predates the production token contract: it uses Figtree / Funnel Display /
Bitcount Single type and a hotter orange (`#fd4900`) + cobalt (`#1158fe`). The
production system has since standardized on **Pretendard + JetBrains Mono** and
persimmon `#ec5e1f` per `packages/tokens/css/contract.css` and `DESIGN.md`. We build on the
**codebase contract**, not the Figma exploration — but the Figma's bridging-line
brand mark concept carries through to the live logo.

**`DESIGN.md`** (provided) — the brand's written design canon. Its rules are
encoded throughout this system.

---

## Brand mark (v3)

The logo is the **bridge-line symbol plus the Bridger wordmark**. The symbol is a
compact two-line route mark in persimmon over a muted track; the visible wordmark
is always `Bridger` across locales. Korean/English only change the accessible
label (`브릿저` / `Bridger`) and surrounding product copy. Render it with the
`BrandLogo` component from `@bridger-kr/react`; do not recreate a plain
`Bridger.` text mark in product surfaces.

---

## CONTENT FUNDAMENTALS — how Bridger writes

**Language.** Korean-first. The console UI is almost entirely Korean; English is a
parity locale under `/en`. Korean copy uses `word-break: keep-all` so phrases
don't break mid-word.

**Voice.** Terse, operational, declarative. Copy reads like a competent console,
not a salesperson. Sentences are short and often verb-final fragments:
"OpenAPI 스펙을 MCP 도구로 변환." / "키는 게이트웨이에서 보호." / "selected/configured 도구 상태 점검."

**Person.** Mostly impersonal/imperative — instructions and states, not "you"/"we"
chatter. Buttons are bare verbs: `재시도`, `로그 열기`, `키 등록`, `원본 열기`,
`지금 재시도`. Section titles are noun phrases: `연결 상태`, `최근 파이프라인`, `첫 MCP 도구 만들기`.

**Casing.** Korean has no case. For Latin, short technical tokens stay UPPERCASE
(`MCP`, `REST`, `GET`) and live inside mono chips/badges — never as a decorative
kicker above a heading. Technical identifiers keep their exact casing
(`datari.kr`, `data.go.kr`, `service_key`). Numbers use tabular figures.

**Mixed script.** Korean labels routinely embed English technical terms inline:
"MCP 도입 전 API 운영 계층", "OpenAPI 스펙", "서비스키 테스트". This is correct and native — do not translate the technical terms.

**Tone of status.** Error messages are calm and recovery-oriented, never alarmist:
"게이트웨이 응답 지연. 네트워크 또는 서버 상태 확인 필요." Always pairs a problem with a next action.

**Emoji.** None. Ever. Iconography is Lucide line icons only.

**Examples to emulate:**
- Hero idea: "어려운 공공 API를 하나로 이어주는 서비스"
- Onboarding step: "API 등록 — OpenAPI 스펙을 MCP 도구로 변환."
- Catalog category: "날씨 · 36" / "부동산 · 27"
- Free tier hint: "무료 한도 100회/일"

---

## VISUAL FOUNDATIONS

**Theme (v2).** **Light is the default** and the design lead — premium, bright,
crafted (the bar is flex.team / channel.io / stripe.com, *never* generic Tailwind
AI-slop or dark-glow dev-SaaS like doppler/starburst). **Dark is a full-parity
alternate** (`:root[data-theme='dark']` / `.dark`) — the console-native mode. Both
are designed deliberately.

**Color (v2).** Warm near-white surfaces (`#fbfaf8` paper → `#ffffff` card →
`#f4f3ef` sunken), warm near-black ink (`#1b1a16`, strong `#0c0b08`), and a single
**persimmon** action color (`#ec5e1f`, hover `#ec5e1f`, highlight `#ec5e1f`) used
for *one* main action per screen plus active/focus. Cobalt, lime, success,
warning, danger are **status-semantic only** — never decoration. No second
decorative accent, no purple/indigo gradients, no glow.

**Type.** Pretendard Variable for all Korean + UI; JetBrains Mono for code, API
paths, request IDs, timestamps, methods. Letter-spacing stays 0em for body/labels
(tight negative tracking only on large H1/H2 display). H1/H2 are reserved for real
page headings; H3 (18px/600) titles panels and sections. **No eyebrow kickers** —
a section leads with its noun-phrase title, not an uppercase mono label above it.

**Spacing.** 4 / 8 / 16 / 24 / 40 / 64 / 96 / 128. Console layouts are dense but
organized — stable grid tracks, compact controls, predictable navigation. Panels
share hairline 1px borders rather than gaps; rows divide with internal borders.

**Backgrounds.** Flat, light surfaces. Decoration is sparing: a soft warm **radial
wash** + low-opacity **dot grid** behind the hero, masked with a radial fade. No
gradient blobs, no full-bleed photography in product, no illustration, no glow.
Code blocks are kept **dark on the light page** (Stripe-style) for contrast.

**Elevation & depth (v3 — de-slopped).** Structure reads from **hairline borders**,
not float. A card at rest is a bordered plane on a 1px `--dt-ring` (= `--dt-border`)
with **no resting shadow** — soft layered "float on warm light" shadows were the
biggest AI-slop tell and have been retired. Shadows are reserved for layers that
*genuinely* float: hover hint (`--dt-shadow-sm`), dropdown/menu (`md`), toast (`lg`),
modal/palette (`xl`) — each kept tight. Dense data UIs divide with internal 1px
borders. Focus = 3px accent ring. **Never card-in-card.**

**Shape / radius (v3).** Crisp, barely-there softening — slightly rounded, never
bubbly. Small controls/tags 3–4px, panels 6px, large surfaces/palette 8–10px,
true pills/avatars/dots full. Radius is paired with a **hairline**, not a shadow:
a bordered plane reads as structure, a rounded box floating on shadow reads as slop.

**Borders.** Hairlines are the primary structural device. `--dt-border #eceae3`
for dividers/planes; `--dt-border-strong #ddd9cf` for framing a surface against
the page. Cards are separated from the page by their **border**, not a shadow;
tables and stat rows divide with internal 1px borders.

**Motion.** Calm and fast. Ease `cubic-bezier(0.23,1,0.32,1)`, durations 120–280ms.
Hover = border brightens + surface lifts one tonal step (and cards translateY(-2px)).
Press = `scale(0.97)`. Entrances are short fade-ups (`opacity 0→1, y 22→0`, ~0.5s).
No bounce, no infinite decorative loops (except the deliberate logo line-draw and
status pulses). All of it collapses under `prefers-reduced-motion`.

**Transparency / blur.** Used sparingly: glassy navbar (`--dt-glass-bg` +
`saturate(180%) blur(16px)`) and mobile drawer scrims. Tints (`color-mix … 14%`)
fill badges and chips.

**Cards.** `background: surface`, 1px border, 6px radius, **no resting shadow**;
on hover the border strengthens to `--dt-border-strong` and a tight `sm` shadow
appears. `card-muted` = sunken well, `card-raised` = bordered plane that floats
(`md`). Console panels are flat bordered planes.

**Badges & chips.** Classification badges are **crisp small-radius tags** with a
hairline (`.badge` = 3px radius + inset border), never rounded-full tint cushions.
Status *pills* (`StatusPill`) stay pill-shaped — they read as live state, not tags.

**Imagery vibe.** Essentially none in product. Agency logos render monochrome /
as-is on dark surfaces. The aesthetic is terminal-adjacent: mono type, status dots,
tabular numbers.

---

## ICONOGRAPHY

- **System:** [**Lucide**](https://lucide.dev) line icons, ~1.85–2px stroke,
  used at 14–20px. This is the *only* product icon set. Load from CDN
  (`lucide` or `lucide-react`). Common glyphs in use: `LayoutDashboard`,
  `Wrench`, `Boxes`, `LibraryBig`, `KeyRound`, `Gauge`, `Server`, `FileClock`,
  `Settings`, `Database`, `LockKeyhole`, `ShieldCheck`, `Terminal`, `Store`,
  `ArrowRight`, `CheckCircle2`, `Copy`, `ExternalLink`, `Code2`.
- **Brand / third-party logos:** [simple-icons](https://simpleicons.org) via CDN
  for client logos (Claude, OpenAI). Korean agency logos are local SVGs in
  `assets/agency-logos/` (`kma`, `molit`, `bok`, `seoul`, `gov`).
- **Status dots:** small `0.5rem` filled circles in semantic colors (success /
  warning / danger / info) — the most-used "icon" of all.
- **Emoji / unicode icons:** never. Arrows are Lucide `ArrowRight`, not `→` glyphs
  in product chrome (though `→` appears acceptably inside dense link labels).

Icons never carry meaning alone — they pair with a text label in nav, buttons, and rows.

---

## Index / manifest

**`packages/`** — the monorepo workspaces (the publishable surface):
- **`tokens/`** (`@bridger-kr/tokens`) — `css/` (`fonts`, `colors`, `typography`, `spacing`, `base`) + `src/index.ts` (typed token objects) + the Pretendard webfont. Built with tsup → ESM + CJS + `.d.ts`.
- **`react/`** (`@bridger-kr/react`) — 40 typed `.tsx` primitives under `src/components/{core,forms,feedback,data,navigation,product}/`. Per-component subpath exports for tree-shaking.
- **`figma-plugin/`** (`bridger-figma-plugin`, private) — `plugin/` (manifest, QuickJS-safe `code.js`, UI), `scripts/` (token/spec generators, validator, headless e2e), `store-assets/`.

**Root sources** (still consumed by the Figma plugin + examples):
- `styles.css` — global CSS entrypoint (`@import` list of the token files).
- `tokens/*.css` — the source-of-truth token CSS. The Figma plugin's `gen-tokens.mjs` reads these.
- `components/*.jsx` — the original component sources (the published `.tsx` live in `packages/react`).
- `assets/` — `brand/` (logos, favicon), `agency-logos/` (KMA, MOLIT, BOK, Seoul, data.go.kr), `fonts/` (Pretendard Variable woff2).
- `readme.md` — this guide. `SKILL.md` — Agent Skill wrapper.

**The 40 components**, grouped:
- **core** — Button, Badge, StatusPill, Card, Input, Tabs, **FilterChip** (toggleable catalog filter).
- **forms** — Select, Checkbox, RadioGroup, Switch, Textarea, SegmentedControl, **Combobox** (searchable select), **Slider** (numeric range), **FileUpload** (OpenAPI-spec dropzone).
- **feedback** — Alert, Toast, Dialog, Tooltip, EmptyState, Spinner, Skeleton, **Drawer** (side sheet).
- **data** — Table, StatTile, Avatar, Pagination, **CodeBlock** (dark code surface), **KeyValue** (spec metadata list), **LogRow** (execution-log stream), **UsageMeter** (quota bar).
- **navigation** — Breadcrumb, Menu, **Sidebar** (console nav rail), **CommandPalette** (⌘K), **Stepper** (onboarding progress).
- **product** — BrandLogo (bridge-line mark + wordmark), SectionCard, ToolCard.

Every primitive is flat-by-default: a card at rest is a **bordered plane with no shadow**; shadows are for genuinely floating layers only (menus, toasts, drawers, dialogs, the palette). Inline controls use hairlines or fills, radius stays crisp (3–6px), classification badges are crisp tags (not rounded-full cushions), and color is restrained to the one persimmon + status semantics. No eyebrow kickers.

**`examples/`** — standalone demos (not part of the published library; see [`examples/README.md`](examples/README.md)):
- `ui_kits/console/` — the Bridger portal console (dashboard, catalog, logs).
- `ui_kits/landing/` — the marketing site recreation.
- `foundations/` — 13 specimen cards (color, type, spacing, brand).
- `design-canvas.jsx` — Figma-like composition canvas.
