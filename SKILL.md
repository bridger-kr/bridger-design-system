---
name: bridger-design
description: Use this skill to generate on-brand interfaces and assets for Bridger (브릿저), the managed gateway that connects Korean public-data APIs to Claude, ChatGPT, MCP, and REST — for production code or throwaway prototypes/mocks. Contains the design canon (DESIGN.md v2), shared tokens, fonts, assets, and React primitives for a flat, neutral, Korean-product-native console and marketing surface. Light theme is the default.
user-invocable: true
---

Before generating anything, internalize the prohibited list below — reviewers
reject these treatments on sight. `DESIGN.md` §11 is the canonical, complete
version of this list.

## Do not (v2 prohibitions)

- Gradient fills of any kind — multi-stop, single-hue, radial washes, conic, gradient text
- Translucency, `backdrop-filter`, or `filter: blur()` on any surface, navigation, or scrim (scrims are flat translucent ink only)
- Bloom, neon edges, `text-shadow`, or dark-SaaS decoration of any kind
- Resting or hover shadows on anything in normal document flow — shadows exist only on floating overlays (menus, popovers, dialogs, drawers, toasts)
- Fake browser chrome (traffic-light dots, fake URL bars, fake tab strips) or fake terminal/CLI windows
- Simulated realtime: LIVE/DEMO badges, fake streaming or typing indicators, fake activity feeds, invented metrics or response times
- Decorative or looping motion: idle pulses, breathing elements, drifting fields, tickers, marquees, scroll-reveal, staggered entrances, or any transition outside the 120–180ms band
- Card-in-card stacking without a real code, data, or form-group reason
- Emoji or unicode pictograms in product UI — Lucide line icons only
- Decorative uppercase eyebrows above headings, or accent-colored periods in headings (the persimmon period belongs to `BrandLogo` only)
- Full-bleed photography or illustration where a real product specimen serves better
- Centered headlines, paragraphs, or hero copy — composition is left-aligned; only numeric columns right-align
- Color as the only status/error/selection cue
- Warm or cool tints in neutral roles — paper, surface, ink, muted, and border are chroma-0
- Arbitrary color, spacing, radius, z-index, or transition literals where a `--dt-*` token exists
- Dark-only components — light is the default theme and dark is deliberate full parity
- A second decorative accent — persimmon `#ec5e1f` is the only one
- Copying another product's proprietary colors, fonts, marks, or signature component treatments

## Canon (DESIGN.md v2)

Quality bar: Kumo (`@cloudflare/kumo`) and Open WebUI — dense legible surfaces,
complete state coverage, restrained type rhythm, zero decorative chrome.

- Flat chroma-0 neutrals separated by 1px hairline borders; depth is stacking order
- One accent: persimmon `#ec5e1f`, on the brand mark, focus ring, selection, one primary action per surface, and status emphasis — never in body copy or headings
- Radius scale `4/6/8px` plus `9999px` for true pills only
- Type fixed steps `12–36px`, weights `400/500/600`; Pretendard Variable for UI/Korean, JetBrains Mono for code and identifiers
- Motion `120–180ms` via `--dt-motion-*` tokens; `prefers-reduced-motion` removes nonessential animation
- Korean-first, terse, operational copy with `word-break: keep-all`; English is a parity locale under `/en`
- Interactive targets ≥ 40px (44px primary), visible 3px accent focus ring in both themes

## Fast orientation

- **`DESIGN.md`** — the canonical design canon. Read §11 (prohibitions) and §14 (change checklist) before any UI work.
- **`readme.md`** — repo guide: product context, package table, file index.
- **`styles.css`** — single global CSS entrypoint for prototypes: tokens + Pretendard webfont + shared `.btn-*`/`.card`/`.badge` vocabulary.
- **`packages/tokens/css/contract.css`** — canonical `--dt-*` token source. Edit here, never in a mirror file.
- **`packages/react/`** — `@bridger-kr/react`, the typed component boundary (Button, Card, Input, Tabs, BrandLogo, SectionCard, ToolCard, …). New reusable UI lands here before apps compose it.
- **`tokens/`, `components/`** — legacy drifted mirrors scheduled for removal (tracked as DS repo issue 24 / EDD-235). Do not copy from them.
- **`examples/`** — `ui_kits/primitives` (Vite showcase on the public packages) and `foundations/` (color/type/spacing specimen cards) for reference.
- **`assets/`** — brand logos + favicon, Korean agency logos (KMA, MOLIT, BOK, Seoul, data.go.kr), Pretendard webfont.

## Non-negotiables (see readme for the full set)
- **Light is the default theme** and dark is a full-parity alternate (`:root[data-theme='dark']` / `.dark`). Both are designed deliberately.
- **One persimmon action per screen** (fill `#ec5e1f` light / `#f07a45` dark; text role `--dt-accent-text`). Cobalt/status hues are semantic only — never decoration.
- **Pretendard** for Korean + UI; **JetBrains Mono** for code/API/paths/IDs/timestamps. Tracking 0em (negative only on large display headings).
- **Korean-first, terse, operational copy.** No emoji. Lucide line icons only.
- **Quiet depth:** tonal surfaces + hairline 1px borders, no resting shadow (shadows only for genuinely floating layers), restrained radii (4px chips/tags · 6px controls · 8px cards/overlays · full pills). No gradient blobs, no glow, no card-in-card.
- Build cinematic, detailed surfaces (Stripe / channel.io level of craft) — never generic AI-slop Tailwind.

## Working rules

- Production surfaces consume `@bridger-kr/tokens` and `@bridger-kr/react`; for visual artifacts (slides, mocks, throwaway prototypes) link `styles.css` and copy `assets/` into a static HTML file for the user to view.
- If the user invokes this skill without other guidance, ask what they want to build, ask a few questions, then act as an expert designer who outputs HTML artifacts or production code depending on the need.
- Every UI PR carries an anti-slop pass: run the repo's slop-scan/stylelint gate when present, otherwise self-check against the Do-not list above and `DESIGN.md` §11.
