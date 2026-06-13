---
name: bridger-design
description: Use this skill to generate well-branded interfaces and assets for Bridger (브릿저 / datari), the managed gateway that connects Korean public-data APIs to Claude, ChatGPT, MCP, and REST — for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI-kit components for prototyping a dense, dark, Korean-product-native console and a cinematic marketing site.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Fast orientation
- **`readme.md`** — the full design guide: product context, CONTENT FUNDAMENTALS, VISUAL FOUNDATIONS, ICONOGRAPHY, and the file index. Read this first.
- **`styles.css`** — the single global CSS entrypoint. Link it and you get every token + the Pretendard webfont + the shared `.btn-*`/`.card`/`.badge`/`.dt-*` vocabulary.
- **`tokens/`** — `colors.css`, `typography.css`, `spacing.css`, `fonts.css`, `base.css`. Canonical `--dt-*` tokens, ported from `bridger-web/packages/design-system/contract.css`.
- **`components/`** — React primitives (Button, Badge, StatusPill, Card, Input, Tabs, BrandLogo, SectionCard, ToolCard) with `.d.ts` + `.prompt.md`.
- **`ui_kits/console/`** — the Bridger portal console (dashboard, government-API catalog, execution logs). The core product surface.
- **`ui_kits/landing/`** — the cinematic marketing site (hero, convergence, MCP/REST code block, catalog, examples).
- **`foundations/`** — specimen cards for color/type/spacing/brand.
- **`assets/`** — brand logos + favicon, Korean agency logos (KMA, MOLIT, BOK, Seoul, data.go.kr), Pretendard webfont.

## Non-negotiables (see readme for the full set)
- **Light is the default** and the design lead; **dark is a full-parity alternate** (`:root[data-theme='dark']` / `.dark`), the console-native mode. Both are designed deliberately.
- **One persimmon action per screen** (`#ec5e1f` light / hover `#d24e13` / highlight `#fb923c`). Cobalt/lime/status hues are semantic only — never decoration.
- **Pretendard** for Korean + UI; **JetBrains Mono** for code/API/paths/IDs/timestamps. Tracking 0em (negative only on large display headings).
- **Korean-first, terse, operational copy.** No emoji. Lucide line icons only.
- **Quiet depth:** tonal surfaces + hairline 1px borders, no resting shadow (shadows only for genuinely floating layers), crisp restrained radii (3–4px controls/tags · 6px panels · 8–10px large surfaces · full pills). No gradient blobs, no glow, no card-in-card.
- Build cinematic, detailed surfaces (Stripe / channel.io level of craft) — never generic AI-slop Tailwind.
