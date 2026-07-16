# Bridger Design System

Status: Canonical
Scope: `@bridger-kr/tokens`, `@bridger-kr/react`, `landing/`, `dashboard/`, and `bridger-figma-plugin`

Bridger connects difficult Korean public APIs through one managed service. The design system must make that work feel trustworthy, exact, and Korean-product native. This document defines the decisions that every token consumer, React component, product surface, and Figma asset must follow.

## 1. Governing principles

1. **Stripe-level precision, not Stripe visual imitation.** Use the reference only for useful quality principles such as clear hierarchy, careful spacing, strong states, and complete interaction details. Do not copy its visual identity, proprietary colors, proprietary fonts, gradients, or component styling.
2. **Bridger identity is the source.** Persimmon `#ec5e1f`, Pretendard Variable, JetBrains Mono, Korean-first content, quiet console density, and restrained technical confidence are non-negotiable.
3. **One contract, two surfaces.** Landing and console share tokens and primitives. Their density, composition, and decoration differ by purpose, not by an unrelated visual language.
4. **Structure before decoration.** Hairline borders, typography, spacing, and semantic state carry hierarchy. Shadows and decorative backgrounds are exceptions with named uses.
5. **Every rule is testable.** New design decisions must become a token, component state, test, or documented exception. Do not add page-local primitives when an existing package primitive can express the intent.

## 2. Source of truth and implementation boundary

- This document defines design intent, roles, prohibited treatments, surface rules, and acceptance criteria.
- `packages/tokens/css/contract.css` is the executable source for shared `--dt-*` token definitions. Its values and variable names are canonical for runtime CSS.
- `@bridger-kr/tokens` exposes those values as CSS and typed token objects. Use package tokens instead of raw color, spacing, radius, shadow, or type values in shared code.
- `@bridger-kr/react` is the reusable component boundary. New reusable UI belongs there before it is composed in `landing/` or `dashboard/`.
- `bridger-figma-plugin` generates Figma Variables, Styles, and Component Sets from the token and component contract. It must not invent a parallel palette or spacing scale.
- App-local token files and marked primitive sections are compatibility mirrors during migration. They must remain aligned with the package contract and must not become a new source of truth.
- The generated `getdesign` Stripe reference is inspiration only. It is not canonical tokens, typography, components, or brand guidance.

## 3. Brand and content contract

### 3.1 Naming

- The user-facing name is **Bridger** in English and **브릿저** in Korean.
- Use the `BrandLogo` component from `@bridger-kr/react`. Do not recreate the wordmark in page-local SVG, text, or CSS.
- `BrandLogo` supports `lg`, `md`, `symbol`, and `favicon` variants. Use `lg` and `md` for wordmarks, and `symbol` or `favicon` only where the available slot cannot hold the wordmark.
- Public product and marketing branding uses Bridger names and approved Bridger domains. Infrastructure or service endpoint identifiers may appear only where the user needs to copy, configure, or inspect an exact technical value. They must never replace the Bridger name in navigation, page titles, metadata, or primary calls to action.

### 3.2 Language and voice

- Korean is the default product language. English is a parity locale under the landing site's `/en` route.
- Apply `word-break: keep-all` to Korean copy so phrases do not break mid-word.
- Write tersely, operationally, and declaratively. Prefer short noun phrases, instructions, and recovery actions over sales copy or conversational filler.
- Buttons use bare verbs such as `재시도`, `로그 열기`, `키 등록`, and `원본 열기`.
- Section headings use noun phrases such as `연결 상태`, `최근 파이프라인`, and `첫 MCP 도구 만들기`.
- Keep technical identifiers in their exact casing, including `MCP`, `REST`, `GET`, `OpenAPI`, `data.go.kr`, and `service_key`. Use mono styling for compact technical chips and identifiers, not for decorative heading kickers.
- Error and empty states must state the condition and the next action in calm language. Never use alarmist wording without a recovery path.
- Do not use emoji. Product iconography is Lucide line iconography only.

## 4. Visual foundations

### 4.1 Theme

- **Light is the default.** New sessions render the light token set unless the user has explicitly selected and persisted dark mode.
- **Dark has full parity.** Every component, semantic state, contrast relationship, focus treatment, and surface hierarchy must have a deliberate dark treatment. Dark is not an afterthought or an inversion filter.
- Theme state must be explicit and persistent. Implementations may use the existing `:root[data-theme='dark']`, `:root[data-theme='light']`, or `.dark` selectors according to the consuming app, but they must resolve to the same token roles.
- Do not create a component that works only in one theme. Verify light and dark for shared components and console surfaces.

### 4.2 Color roles

The palette is warm, restrained, and semantic. Use the token variables, not copied literals.

| Role | Canonical token contract | Rule |
| --- | --- | --- |
| Paper | `--dt-paper` | Page canvas. Light is the warm paper surface; dark is the deep outer canvas. |
| Surface | `--dt-surface` | Default component plane. |
| Raised surface | `--dt-surface-raised` | Surface above the default plane, including selected controls and layers. |
| Sunken surface | `--dt-surface-sunken` | Code wells, recessed regions, and quiet data backgrounds. |
| Muted surface | `--dt-surface-muted` | Secondary grouping without a new accent. |
| Ink | `--dt-ink` | Default readable text. |
| Strong ink | `--dt-ink-strong` | Headings, primary values, and high-emphasis text. |
| Muted text | `--dt-muted`, `--dt-muted-strong` | Helper text and secondary labels. Maintain WCAG AA contrast. |
| Border | `--dt-border`, `--dt-border-strong` | Primary structure and stronger framing. |
| Brand action | `--dt-accent` | Persimmon `#ec5e1f`. Use for the primary action, active state, and focus. |
| Brand action strength | `--dt-accent-strong`, `--dt-accent-bright`, `--dt-accent-ink` | Theme-specific contrast and interaction roles. |
| Status | `--dt-success`, `--dt-warning`, `--dt-danger`, `--dt-info` | Status semantics only. Never use them as decoration. |
| Supporting status | `--dt-cobalt`, `--dt-lime`, and `--dt-status-*` | Valid only for the documented status or data meaning. Never turn them into a second brand palette. |
| Code | `--dt-code-bg`, `--dt-code-ink`, `--dt-code-border`, `--dt-syntax-*` | Dark, high-contrast technical surfaces in both themes. |
| Tints | `--dt-tint-*` | Low-opacity fills for badges, chips, and semantic state. Do not use tint as a substitute for readable text. |

Persimmon remains the only decorative brand accent. Cobalt, lime, success, warning, danger, and info colors communicate status or data meaning only. Purple and indigo are not Bridger brand replacements. Do not add a second decorative accent, glow, or color ramp without a new approved token role.

### 4.3 Typography

- Use `--dt-font-sans`: `'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif` for Korean and interface text.
- Use `--dt-font-mono`: `'JetBrains Mono', 'Geist Mono', SFMono-Regular, ui-monospace, Menlo, monospace` for code, API paths, request IDs, timestamps, methods, and other technical values.
- Pretendard Variable is the required Bridger UI font. Do not substitute a proprietary reference font or ship a reference brand font.
- Body and labels use `0` letter spacing. Negative tracking is limited to real H1 and H2 display headings.
- H1 uses `--dt-h1-size`, `--dt-h1-leading`, `--dt-h1-tracking`, and `--dt-h1-weight`. H2 uses the corresponding H2 tokens. H3 is `18px`, `1.3` line height, and weight `600` through the H3 tokens.
- H1 and H2 are reserved for actual page headings. H3 titles panels and sections. Do not skip heading levels to obtain a visual size.
- Body uses `--dt-body-size: 16px`, `--dt-body-leading: 1.6`, and `--dt-body-weight: 400`. Small text uses the small tokens. Mono text uses `--dt-mono-size: 13px` and `--dt-mono-leading: 1.55` unless a component defines a documented scale.
- Apply tabular figures to counts, prices, quotas, durations, timestamps, IDs, and table values with `font-variant-numeric: tabular-nums` or the `--dt-tabular` contract. Numeric alignment must not depend on a fallback font.
- Do not use decorative uppercase eyebrows. A section starts with its real heading. Short uppercase technical terms may appear in inline mono chips when they convey a real value.

### 4.4 Spacing and layout

Use only the shared spacing scale unless a component contract explicitly defines an exception:

| Token | Value |
| --- | --- |
| `--dt-space-1` | `4px` |
| `--dt-space-2` | `8px` |
| `--dt-space-3` | `16px` |
| `--dt-space-4` | `24px` |
| `--dt-space-5` | `40px` |
| `--dt-space-6` | `64px` |
| `--dt-space-7` | `96px` |
| `--dt-space-8` | `128px` |

- Use stable grid tracks and predictable alignment. Do not use arbitrary pixel gaps to repair one viewport.
- Console layouts favor compact controls, internal row dividers, and deliberate density. Landing layouts use larger section rhythm and readable line lengths without filling space with generic card grids.
- Use hairline borders to divide related content. Do not create visual separation by stacking nested cards.
- Responsive implementations must work at 375px, 768px, and 1280px. Content must remain readable and controls must remain operable at intermediate widths.

### 4.5 Radius and shape

Use the radius tokens according to semantic role:

| Token | Value | Allowed use |
| --- | --- | --- |
| `--dt-radius-sm` | `6px` | Compact controls, tags, and bordered planes. |
| `--dt-radius-inner` | `6px` | Inner component surfaces. |
| `--dt-radius-element` | `10px` | Larger standalone controls or elements where the component contract calls for it. |
| `--dt-radius-container` | `14px` | Large surface containers. |
| `--dt-radius-md` | `12px` | Medium surfaces. |
| `--dt-radius-lg` | `14px` | Large surfaces and composed product proof. |
| `--dt-radius-button` | `18px` | Button geometry when the component contract calls for a softer action control. |
| `--dt-radius-xl` | `14px` | Large overlays and palettes. |
| `--dt-radius-full` | `9999px` | True pills, avatars, status pills, and dots only. |

Radius must be paired with a border or a clear surface role. Avoid bubbly geometry. Classification badges are crisp tags, not rounded-full cushions. Status pills remain full because the shape communicates live state.

### 4.6 Elevation and borders

- The default card and panel treatment is a flat surface with a 1px border. Use `--dt-card-rest` or the equivalent `--dt-ring` role. There is no resting shadow.
- `--dt-ring-strong` frames a selected, focused, or elevated plane when a stronger border is needed.
- `--dt-shadow-xs` is reserved for the smallest transient hint. `--dt-shadow-sm` is for hover hints and interactive card hover. `--dt-shadow-md` is for genuinely floating menus, drawers, or raised transient surfaces. `--dt-shadow-lg` is for toasts and higher floating layers. `--dt-shadow-xl` is for dialogs and command palettes.
- Shadow use must correspond to actual separation from the document flow. Do not add a shadow merely to make a card feel premium.
- Tables, stat rows, and dense data surfaces use internal 1px borders. Cards are separated from the page by borders, not shadows.
- `--dt-shadow-focus` is the focus treatment and must remain visible in both themes.
- Never use card-in-card composition for ordinary content. If a nested region is necessary for code, data, or a form group, use a sunken or bordered region with a clear semantic purpose and no decorative stacking.

### 4.7 Z-index

Use the shared order. Do not introduce an arbitrary z-index that conflicts with this stack:

| Token | Value | Use |
| --- | --- | --- |
| `--dt-z-index-base` | `0` | Normal document content. |
| `--dt-z-index-raised` | `10` | Local raised content and sticky in-surface elements. |
| `--dt-z-index-overlay` | `40` | Scrims, mobile drawer backdrop, and non-modal overlays. |
| `--dt-z-index-modal` | `50` | Dialog and modal frame. |
| `--dt-z-index-popover` | `60` | Menu, tooltip, select, and command palette popover content. |
| `--dt-z-index-toast` | `80` | Toast and global transient feedback. |

### 4.8 Motion

- Use the shared easing `--dt-ease: cubic-bezier(0.23, 1, 0.32, 1)` and the duration tokens `120ms`, `200ms`, and `280ms` for normal interaction.
- Use `--dt-motion-fast`, `--dt-motion-base`, `--dt-motion`, `--dt-motion-slow`, and `--dt-motion-slower` rather than inventing transition strings.
- Motion must clarify a state change. Do not use bounce, spring overshoot, or infinite decorative loops.
- Entrances may use a short fade and upward movement. Landing hero decoration may use the static gradient mesh, but the mesh must not pulse or glow.
- All components must implement `prefers-reduced-motion: reduce`. Remove nonessential transforms and entrance motion, shorten transitions to an instant state change, and stop status pulses. Content and state must remain available.

### 4.9 Gradient mesh and transparency

- `--dt-gradient-mesh` is a restrained, persimmon-based radial mesh for landing hero context only. Apply it at low opacity and mask it so it reads as a warm wash, not as a glow or a color field competing with content.
- `--dt-shadow-gradient` is an ambient landing treatment only. It must not become a generic component background.
- The console does not use the landing mesh as decoration. Console backgrounds remain flat and scannable.
- `--dt-glass-bg` and `--dt-glass-blur` are limited to the landing navigation treatment and mobile drawer scrim where translucency improves continuity. Do not turn ordinary panels into glass.
- Do not use purple, indigo, rainbow, or multi-stop reference-brand gradients. Do not use glow, bloom, neon edge lighting, or gradient text.

## 5. Surface rules

### 5.1 Landing, `bridger.kr`

- The landing surface is Korean-first, confident, technical, and restrained. English is a parity locale under `/en`.
- Light paper is the default. Use the persimmon action color for the primary action and active navigation state, with one dominant action per meaningful band or decision point.
- A cinematic hero may use the low-opacity warm radial wash, dot grid, and `--dt-gradient-mesh`. Keep decoration behind the content and mask it with a radial fade.
- Explain the product with composed product proof, connector guides, tool categories, and real interface specimens. Do not use a generic SaaS hero, full-bleed stock photography, or decorative illustration in place of product evidence.
- Marketing sections may breathe more than console sections, but they still use the shared spacing scale, semantic headings, and package primitives.
- Landing navigation may use the glass token treatment. Other content remains flat or bordered by default.
- Code and API examples use the dark code surface tokens even on the light page so technical content has a stable, readable contrast.

### 5.2 Console, `portal.bridger.kr`

- The console is the authenticated operations surface for inspecting, comparing, activating, and operating public-data APIs.
- Use a quiet, dense, tabular layout with predictable navigation, stable grid tracks, compact controls, and explicit status semantics.
- Panels are flat bordered planes. Tables and log streams use internal dividers. Avoid promotional gradients, decorative hero treatments, and illustration.
- Use JetBrains Mono for API paths, methods, request IDs, timestamps, code, and other technical values. Apply tabular figures to numeric columns and quota values.
- Sidebar, breadcrumb, tabs, command palette, drawers, menus, dialogs, toasts, and tooltips follow the shared z-index and interaction contracts.
- Dark mode is a first-class console mode with full component parity. It must not change the meaning of status colors or remove focus visibility.

## 6. Iconography and imagery

- Lucide line icons are the only product icon set. Use approximately 1.85 to 2px stroke and 14px to 20px sizes according to component scale.
- Use `lucide-react` or the approved Lucide delivery path. Common product icons include dashboard, tools, boxes, library, keys, gauge, server, logs, settings, database, lock, shield, terminal, store, arrow right, check, copy, external link, and code.
- Third-party client marks may use approved Simple Icons assets. Korean agency marks use the local SVG assets in `assets/agency-logos/`.
- A status dot may use the semantic status token, but color must be paired with visible text or another non-color cue.
- Icons never carry meaning alone in navigation, buttons, or data rows. Pair them with a label or accessible name.
- Do not use emoji, unicode pictograms, emoji-like symbols, or decorative icon collections. Use a Lucide arrow in product chrome instead of a text arrow glyph.
- Product imagery is minimal. Prefer real product UI, agency marks, and technical examples over ornamental imagery.

## 7. Component interaction contract

Every interactive component must expose and verify these states where applicable.

| State | Required behavior |
| --- | --- |
| Rest | Use the component's tokenized surface, border, typography, and semantic color. Do not add a resting shadow. |
| Hover | Brighten or strengthen the border and move the surface one tonal step when the component supports hover. Interactive cards may translate up by `2px` and use `--dt-shadow-sm`. Do not rely on hover alone to convey information. |
| Press | Apply `transform: scale(var(--dt-press-scale))`, where `--dt-press-scale` is `0.97`, for pressable controls. Restore the resting size after release. Do not make layout reflow. |
| Focus visible | Show a clearly visible 3px accent focus ring using `--dt-shadow-focus` or an equivalent tokenized outline. Never remove the browser focus indicator without replacing it. Focus must work in light and dark themes. |
| Disabled | Use the disabled semantic treatment, prevent activation, suppress hover and press changes, preserve readable contrast, and expose the state to assistive technology. Use the native `disabled` attribute where the element supports it. |
| Loading | Preserve the component's dimensions and position. Show a package spinner or skeleton with an accessible busy state, keep a meaningful label when possible, and prevent duplicate submission or activation. |
| Reduced motion | Honor `prefers-reduced-motion: reduce` by removing nonessential transform and entrance motion and stopping decorative pulses. State changes must remain clear without animation. |

Additional interaction rules:

- Keyboard activation must produce the same result as pointer activation.
- Interactive controls must have an accessible name and a target size of at least `40px` by `40px`; use `44px` targets for primary touch controls when the layout permits.
- Tooltips supplement a visible label. They do not replace an accessible name or essential instructions.
- Destructive or irreversible actions require a clear label and confirmation pattern appropriate to the risk. Do not communicate risk by color alone.
- Form validation identifies the field, states the problem in text, and gives the next action. Do not wait for color or an icon to explain the error.

## 8. Accessibility and semantic contract

The minimum target is WCAG 2.2 AA for all published surfaces and component examples.

- Use semantic landmarks: one `header`, one primary `nav` where appropriate, one `main`, and `footer` where the page has footer content. Label repeated or multiple navigation regions.
- Use one meaningful `h1` per page. Descend through `h2` and `h3` in document order. Do not use heading elements only for visual size.
- Every input, select, textarea, checkbox, radio, and slider has a visible label or an explicit accessible name. Error and helper text are programmatically associated with the field.
- Every button describes its action. Icon-only buttons require an accessible label. Links describe their destination and do not pretend to be buttons.
- All functionality is available with a keyboard. Maintain logical tab order, visible focus, escape behavior for dismissible layers, and focus return after dialogs or drawers close.
- Dialogs, drawers, menus, command palettes, and popovers must expose the correct semantic role, contain focus while open when appropriate, close by the documented keyboard action, and return focus to the invoking control.
- Tables use real table semantics when the content is tabular. Header cells identify their columns or rows. Do not use a grid of generic divs for data that users must compare.
- Status is not color-only. Pair status color with text, an icon with an accessible label, a shape, or another visible cue.
- Maintain at least WCAG AA contrast for text, controls, borders needed to identify components, and focus indicators in both themes. Test actual rendered states, not only token swatches.
- Use `aria-live` or an equivalent announcement strategy for asynchronous toast, validation, and execution status updates when users need to know about them.
- Apply `prefers-reduced-motion` and preserve all content and task completion paths when motion is reduced.

## 9. Component manifest and package boundary

The `@bridger-kr/react` package exports **60 typed React components** across six families (core, forms, feedback, data, navigation, product), plus the `cx` class-name helper and a small set of token enums, class-name helpers, and type-only exports. The full public API is enumerated below from `packages/react/src/index.ts` and the per-family barrels; that barrel chain is the source of truth, not this table.

Aliases, helpers, and constants are listed alongside each family and are not counted as separate components:

- `ToggleSwitch` is a legacy alias of `Switch` and resolves to the same component.
- `cx` is a class-name helper re-exported from the package root.
- Token enums: `CardTone`, `SurfaceTone`, `MetricAccent`, `AlertTone`, `AlertMotion`, `CODE_PANE_TONE`, `PRODUCT_SHELL_TONE`, `PRODUCT_ACTION_PILL_VARIANT`, `PRODUCT_ACTION_PILL_SIZE`, `BRAND_LOGO_LANGUAGE`, `BRAND_LOGO_SIZE_NAME`.
- Class-name helpers: `metricAccentColor`, `actionListClassName`, `actionListItemClassName`, `productActionPillClassName`.
- Companion types only (no runtime export): `BrandLogoHandle`, `BrandLogoLanguage`, `BrandLogoSize`, and the per-component `*Props` / option types in each file.

### 9.1 Family overview

| Family | Count | Components |
| --- | --- | --- |
| core | 10 | `Badge`, `Button`, `Card`, `Chip`, `FilterChip`, `Input`, `Panel`, `Section`, `StatusPill`, `Tabs` |
| forms | 9 | `Checkbox`, `Combobox`, `FileUpload`, `RadioGroup`, `SegmentedControl`, `Select`, `Slider`, `Switch` (+ `ToggleSwitch` alias), `Textarea` |
| feedback | 8 | `Alert`, `Dialog`, `Drawer`, `EmptyState`, `Skeleton`, `Spinner`, `Toast`, `Tooltip` |
| data | 10 | `Avatar`, `CodeBlock`, `CodePane`, `KeyValue`, `LogRow`, `Pagination`, `StatPanel`, `StatTile`, `Table`, `UsageMeter` |
| navigation | 5 | `Breadcrumb`, `CommandPalette`, `Menu`, `Sidebar`, `Stepper` |
| product | 18 | `ActionList` (+ `ActionListIndex`), `AnnotationHotspot`, `BrandLogo`, `ChatBubble`, `ProductActionPill`, `ProductShell` (+ `ProductCinematicBackdrop`, `ProductMotionField`, `ProductSideRail`), `ProductPageHeader`, `ProductTopbar` (+ `ProductTopbarMenu`), `SearchPill`, `SectionCard`, `ToolCard`, `WindowChrome` (+ `WindowFrame`) |
| **Total** | **60** | |

Naming note: `Panel` is the React component exported from `packages/react/src/components/core/Surface.tsx`; the file name is a vestige and will be renamed to match the export. Consumers should import `Panel`.

### 9.2 Core family

Resting on the canonical persimmon-led border plane. Every component supports rest, hover, press, focus-visible, disabled, loading, and reduced-motion.

| Component | Anatomy | Variant axes | Notes |
| --- | --- | --- | --- |
| `Button` | label, optional leading/trailing icon, press scale `0.97`, 3px focus ring | size (`sm`, `md`, `lg`), tone (`primary`, `secondary`, `ghost`, `danger`) | One primary `Button` per meaningful decision point. |
| `Badge` | text node, optional dot, hairline border | tone (`neutral`, `info`, `success`, `warning`, `danger`, `accent`) | Crisp tag, not a rounded-full cushion. |
| `Chip` | text, optional close affordance | tone (`neutral`, `info`, `success`, `warning`, `danger`, `accent`), size (`sm`, `md`) | Inline status and tag role. |
| `StatusPill` | status dot + label, optional pulse | status (`idle`, `pending`, `success`, `warning`, `danger`) | Shape communicates live state; do not turn into a tag. |
| `Card` | bordered plane with title, body, optional footer | tone (`default`, `muted`, `raised`, `sunken`) | No resting shadow; hover strengthens border + `--dt-shadow-sm`. |
| `Panel` | flat section plane (`SurfaceTone`, `MetricAccent`) | tone, metric accent | Bordered, structured, no resting shadow. |
| `Section` | semantic `<section>` band | variant (`band`, `proof`, `plain`), tone (`soft`, `accent-wash`, `grid`) | Anchor for landing bands and console panels. |
| `Input` | label, field, hint, error | size, validation tone | Visible label; error associates with the field. |
| `Tabs` | tab list + tab panels | variant (`underline`, `pill`) | Roving tabindex, arrow-key navigation. |
| `FilterChip` | label, optional count, optional close | active state, removable state | Catalog filter; toggles between rest and selected. |

### 9.3 Forms family

Each form control owns its label, hint, error message, and focus ring. Disabled state must preserve readable contrast. Loading state must keep the control's dimensions.

| Component | Anatomy | Variant axes | Notes |
| --- | --- | --- | --- |
| `Checkbox` | box + label, indeterminate state | checked, indeterminate, disabled | Native semantics, custom paint only on top. |
| `RadioGroup` | labelled group of radios | orientation, error | Arrow-key navigation across the group. |
| `Switch` | track + thumb + label | checked, disabled, loading | `ToggleSwitch` is the legacy alias. |
| `Select` | trigger + menu | size, error, placeholder | Single-select with search affordance on long lists. |
| `Combobox` | input + popover list | size, error | Searchable single-select; option list virtualization expected. |
| `SegmentedControl` | segmented button group | size, error | Roving tabindex; arrow keys move between segments. |
| `Slider` | track + thumb, value bubble | range, min/max/step | Numeric range; arrow keys nudge, `Home`/`End` jump. |
| `Textarea` | multi-line input with label, hint, mono toggle | rows, mono | Mono toggle is for technical content. |
| `FileUpload` | dropzone + file list | size, accept list | OpenAPI-spec dropzone role. |

### 9.4 Feedback family

Layered on the shared z-index stack. Motion collapses to an instant state change under `prefers-reduced-motion: reduce`.

| Component | Anatomy | Variant axes | Notes |
| --- | --- | --- | --- |
| `Alert` | icon + title + body + optional action | tone (`info`, `success`, `warning`, `danger`), motion (`fade`, `slide`) | Status color paired with icon and label, never color-only. |
| `Toast` | icon + title + message + optional action | tone (`info`, `success`, `warning`, `danger`) | Stack at `--dt-z-index-toast`. |
| `Dialog` | modal frame with title, body, footer | width, destructive flag | Focus trap, escape closes, focus returns to trigger. |
| `Drawer` | side sheet, scrim, optional footer | side (`left`, `right`), width | Mobile drawer uses `--dt-glass-blur` scrim. |
| `Tooltip` | label popover | position (`top`, `right`, `bottom`, `left`) | Supplements a visible label; not the only label. |
| `EmptyState` | icon + title + description + action | tone | Calm copy; pairs a condition with a next action. |
| `Spinner` | animated indicator | size, stroke, color | Pauses under reduced motion; preserves layout box. |
| `Skeleton` | placeholder plane | width, height, radius | Used while content loads; replaces content when ready. |

### 9.5 Data family

Quiet, tabular, scannable. Use tabular figures and mono styling where required by Section 3.

| Component | Anatomy | Variant axes | Notes |
| --- | --- | --- | --- |
| `Table` | header + body rows | column alignment, empty state, row click | Real `<table>` semantics; header cells identify columns. |
| `StatTile` | label + value + optional delta + hint | delta tone (`up`, `down`, `neutral`) | Tabular figures on the value. |
| `StatPanel` | array of `StatPanelItem` | variant (`card`, `row`) | Multi-stat plane. |
| `CodeBlock` | dark code surface with line numbers, optional copy | language, line numbers, copyable | Dark code surface in both themes. |
| `CodePane` | tokenized code pane | tone (`CODE_PANE_TONE`), segments, lines | For composed code specimens with per-segment styling. |
| `KeyValue` | definition list of `KeyValueItem` | columns (`1`, `2`) | Spec metadata and configuration rows. |
| `LogRow` | stream entry with timestamp, level, message | level (`info`, `success`, `warning`, `danger`) | Monospace timestamps and IDs. |
| `UsageMeter` | label + value + max + unit + hint | tone (`default`, `warning`, `danger`) | Quota bar; values use tabular figures. |
| `Avatar` | image or initials | size, status, square | Square default; rounded variants reserved for personal profile. |
| `Pagination` | page controls | sibling count, boundary count | Keyboard navigation across page numbers. |

### 9.6 Navigation family

Persistent structures. Sidebar and command palette must expose correct landmarks and roles.

| Component | Anatomy | Variant axes | Notes |
| --- | --- | --- | --- |
| `Breadcrumb` | linked trail of items, current page | separator | `aria-current="page"` on the current item. |
| `Sidebar` | brand + sections + footer | width | Console navigation rail; landmark role `navigation`. |
| `Menu` | trigger + popover list | align (`left`, `right`), width | Roving focus inside the menu, escape closes. |
| `CommandPalette` | search input + grouped results + footer hint | open, query, groups | `⌘K` invocation; keyboard-first navigation. |
| `Stepper` | ordered steps + current indicator | orientation (`horizontal`, `vertical`) | Onboarding progress. |

### 9.7 Product family

Brand and marketing composites. These are the landing-side primitives that depend on the full token and component contract.

| Component | Anatomy | Variant axes | Notes |
| --- | --- | --- | --- |
| `BrandLogo` | wordmark or symbol | size (`lg`, `md`, `symbol`, `favicon`), language (`Korean`, `English`) | Persimmon wordmark + persimmon period. Single source of brand identity. |
| `SectionCard` | bordered card with header, body, optional action | tone | Landing section anchor. |
| `ToolCard` | tool surface with title, description, status | tone, status | Console tool list and onboarding cards. |
| `ActionList` | numbered, clickable guide list with optional `ActionListIndex` | interactive, density | Guide-first console workflows. |
| `ActionListIndex` | numbered marker rendered inside `ActionList` | size | Companion to `ActionList`. |
| `AnnotationHotspot` | positioned dot + label + popover | x/y position | Annotated product proof. |
| `ChatBubble` | chat role bubble | role (`user`, `assistant`, `system`) | Compose-on-bubble used in landing proof. |
| `SearchPill` | search input rendered as a pill | size, tone | Topbar search. |
| `ProductActionPill` | pill-shaped call to action | size (`sm`, `md`, `lg`), variant (`primary`, `secondary`, `ghost`) | Product page CTAs. |
| `ProductPageHeader` | page hero with title and supporting copy | tone | Landing sub-page hero. |
| `ProductShell` | composed shell with side rail, topbar, main, motion field | tone (`cinematic`, `flat`) | Landing composition host. |
| `ProductSideRail` | persistent rail of items | items | Used inside `ProductShell`. |
| `ProductCinematicBackdrop` | masked radial wash | tone | Landing hero decoration only; not a generic background. |
| `ProductMotionField` | interactive motion layer | tone | Hosts composable product chrome. |
| `ProductTopbar` | landing topbar with optional menu | tone | Hosts `ProductTopbarMenu`. |
| `ProductTopbarMenu` | menu drawer anchored to `ProductTopbar` | tone | Mobile drawer behaviour. |
| `WindowChrome` | browser chrome wrapper | trailing slot | Wraps a `WindowFrame` for product mockups. |
| `WindowFrame` | window-shaped content frame | tone | Hosts the demo surface. |

### 9.8 Shared component requirements

- Components consume `@bridger-kr/tokens` roles and `@bridger-kr/react` styles. Do not hardcode environment-specific values or create parallel design-system packages.
- Each component documents its supported variants, semantic purpose, keyboard behavior, focus behavior, loading and disabled behavior, and light and dark rendering.
- Component variants must preserve the surface rules. A raised or featured variant is an explicit exception with a named role, not a license for resting shadows or arbitrary color.
- Examples and Figma Component Sets must use the same names and state vocabulary as the React package.
- Subpath imports (`@bridger-kr/react/components/<family>/<Component>`) are reserved for tree-shaking; the package root barrel is the supported public entry.
- Components that own motion must implement `prefers-reduced-motion: reduce` per Section 7.

## 10. Provenance and reference discipline

Bridger identity is canonical. External references may inform hierarchy, density, spacing rhythm, and the seriousness of state modeling, but they do not provide tokens, type, components, or brand guidance. The references below are recorded for traceability; copying from any of them is invalid.

### 10.1 Canonical sources

| Source | Role | Stable link |
| --- | --- | --- |
| `packages/tokens/css/contract.css` | Canonical CSS custom-property token contract | `https://github.com/bridger-kr/bridger-design-system/blob/main/packages/tokens/css/contract.css` |
| `packages/tokens/src/index.ts` | Frozen TS token objects mirrored from the contract | `https://github.com/bridger-kr/bridger-design-system/blob/main/packages/tokens/src/index.ts` |
| `packages/react/src/index.ts` | Public React barrel (60 components + helpers) | `https://github.com/bridger-kr/bridger-design-system/blob/main/packages/react/src/index.ts` |
| `DESIGN.md` (this file) | Brand and component canon | `https://github.com/bridger-kr/bridger-design-system/blob/main/DESIGN.md` |
| `bridger-web` consuming repo | App integration, mirror checks | `https://github.com/bridger-kr/bridger-web/blob/main/README.md` |
| Figma component library | Brand assets and Component Sets | Figma file `DXAVhKo8uCGJ4HSQYAq9dY` |

### 10.2 Informational references (inspiration only)

| Reference | What was learned | What was not adopted |
| --- | --- | --- |
| Stripe marketing surfaces | Clear hero hierarchy, controlled state vocabulary, single primary action per band | Stripe brand palette, Stripe wordmark, Stripe gradient system, Stripe proprietary fonts |
| `getdesign` generated Stripe mock | Layout grammar and spacing rhythm for cinematic hero composition | Generated reference visual identity, decorative gradients, glow effects |
| `flex.team`, `channel.io` | Korean-product-native tone, restrained decoration | Their respective brand marks, palettes, or proprietary imagery |
| Linear, Vercel, Notion | Console density and tabular discipline | Their respective brand marks, palettes, or signature component treatments |

### 10.3 Do-not-copy rules

The following are explicitly forbidden in Bridger surfaces even when the reference uses them well:

- Stripe's brand palette (indigo, magenta, gradient stacks), wordmark, and signature component treatment.
- Stripe's proprietary fonts (Soehne, Stripe's display fonts, proprietary mono fonts).
- Stripe's gradient text, neon edge lighting, or glow-based emphasis.
- Multi-stop rainbow, purple, or indigo gradients in any Bridger surface.
- Reference logos, third-party client marks rendered in their proprietary palette when a Bridger monochrome treatment exists.
- Reference marketing copy, taglines, or sentence structures. Bridger copy is Korean-first and follows the voice rules in Section 3.2.

When a reference informs a decision, the decision lands in this document as a Bridger rule, never as a borrowed artifact. A new "stripe-like" or "getdesign-like" surface must be re-authored against the Bridger tokens, components, and surface rules before it ships.

## 11. Anti-slop prohibitions

The following are invalid Bridger design decisions and must be rejected in review:

- Replacing persimmon with a purple or indigo brand palette.
- Copying another product's proprietary colors, fonts, visual marks, or signature component treatment.
- Adding glows, bloom, neon edges, gradient text, or dark-glow developer SaaS decoration.
- Adding resting shadows to cards or panels.
- Nesting card-in-card structures without a clear code, data, or form-group semantic role.
- Using emoji, unicode pictograms, or decorative icon sets in product UI.
- Adding decorative uppercase eyebrows above ordinary headings.
- Using full-bleed photography or illustration where a real product specimen or clear content would be more useful.
- Using color as the only status, error, success, or selection cue.
- Adding arbitrary spacing, radius, z-index, transition, or color literals when a shared token exists.
- Making a dark-only component or treating light mode as an inversion of dark mode.
- Naming public user-facing surfaces with infrastructure identifiers when an approved Bridger name exists.

## 12. Accepted debt

A design system carries known compromises. Each accepted debt item names the trade-off, the reason it exists, the surface it touches, and the exit condition that would let it be removed. Concrete debt must be tracked here; the absence of an entry is also a valid state and means "no known debt".

Current accepted debt (tracked until exit conditions are met):

| Item | Trade-off | Why it exists | Surface | Exit condition |
| --- | --- | --- | --- | --- |
| `Panel` is exported from `packages/react/src/components/core/Surface.tsx` | The file name (`Surface.tsx`) does not match the exported component (`Panel`), which makes the import path less self-explanatory than other core primitives. | Vestige from an earlier consolidation; renaming requires touching every consumer in `landing/` and `dashboard/` simultaneously to avoid a broken window. | core | Rename the file to `Panel.tsx` and migrate consumers in a single batched change. The barrel and the type aliases keep the public API stable. |
| `ToggleSwitch` is a public alias of `Switch` | Two names describe the same component, increasing the surface area for documentation and code search. | Existing dashboards and one earlier product import path used `ToggleSwitch`; keeping the alias avoids a breaking change before the major surface migration completes. | forms | Once `ToggleSwitch` callers are migrated, mark the export `@deprecated` for one minor cycle, then remove in a subsequent major. |

If new accepted debt emerges, add a row here with the same shape. Do not bury debt in PR descriptions or component comments; this section is the only place it is allowed to live.

## 13. Release and verification gates

A design-system or shared primitive change is not complete until all applicable checks pass. Each gate has a measurable signal; a gate marked "pending" must be cleared by the named command or evidence capture before the change is merged.

### 13.1 Package and token gates

Run from the design-system workspace or repository root as supported by the package setup:

```sh
pnpm typecheck
pnpm test
pnpm build
npm run check:tokens
```

`npm run check:tokens` must pass after any token or marked primitive change. It verifies the app mirrors against the canonical contract.

### 13.2 App gates

Run the tests, typecheck, and production builds for every touched surface:

```sh
npm test --workspace=landing
npm test --workspace=dashboard
npm run typecheck --workspace=dashboard
npm run build --workspace=landing
npm run build --workspace=dashboard
```

The landing locale check is required when landing copy or locale behavior changes:

```sh
npm run check:i18n --workspace=landing
```

### 13.3 Browser and visual gates

Use Playwright against the real running surface and capture screenshots at exactly these viewport widths:

- `375px`, mobile layout and keyboard-relevant compact controls.
- `768px`, tablet transition and navigation collapse.
- `1280px`, desktop layout, console density, and landing composition.

For each changed surface, verify light default and dark parity where supported. Check the console for runtime errors, inspect focus-visible states, exercise keyboard navigation, verify loading and disabled states, and confirm that reduced-motion mode removes nonessential animation. A screenshot is evidence of the rendered result, not a substitute for semantic and interaction checks.

### 13.4 Release evidence checklist

This checklist is the explicit, reproducible record for each release. Every row must carry a status of `Captured`, `Pending`, or `Not applicable` along with the artifact path or command output that justifies the status. A release is not ready until every applicable row is `Captured`.

| Dimension | Sub-axis | Required evidence | Status |
| --- | --- | --- | --- |
| Viewport width | `375px` mobile | Playwright screenshot per changed surface at `375x812` viewport | Pending |
| Viewport width | `768px` tablet | Playwright screenshot per changed surface at `768x1024` viewport | Pending |
| Viewport width | `1280px` desktop | Playwright screenshot per changed surface at `1280x800` viewport | Pending |
| Theme | Light (default) | Screenshot in light theme per changed surface | Pending |
| Theme | Dark | Screenshot in dark theme per changed surface (`:root[data-theme='dark']` or `.dark`) | Pending |
| Interaction state | Rest | Default screenshot for the surface | Pending |
| Interaction state | Hover | Playwright hover screenshot on the primary interactive element | Pending |
| Interaction state | Focus visible | Playwright focus screenshot showing the 3px accent ring | Pending |
| Interaction state | Disabled | Screenshot of an intentionally disabled control on the surface | Pending |
| Interaction state | Loading | Screenshot of the loading state (spinner or skeleton) | Pending |
| Interaction state | Press | Playwright pressed-state screenshot (`scale(0.97)`) | Pending |
| Motion | Reduced motion | Screenshot with `prefers-reduced-motion: reduce` emulated; confirm transforms are removed | Pending |
| CJK content | Korean label rendering | Korean copy renders without mid-word breaks (`word-break: keep-all`) | Pending |
| Contrast | WCAG AA text | Automated contrast check (axe / Playwright `toHaveAccessibleName` and contrast assertion) | Pending |
| Contrast | WCAG AA non-text | Border, focus, and interactive control contrast against their surface | Pending |
| Layering | Z-index stack | Verify dialogs, menus, toasts, drawers use the shared `--dt-z-index-*` tokens | Pending |
| Layering | Focus return | Open and dismiss a dialog/menu/drawer, confirm focus returns to the trigger | Pending |
| Layering | Focus trap | Tab inside an open dialog and confirm focus does not escape | Pending |
| Component contract | 60-component parity | `pnpm build` regenerates `dist/` and the public API matches Section 9 | Pending |
| Component contract | Aliases present | `ToggleSwitch`, `cx`, and token enums from Section 9.1 are present in `dist/index.d.ts` | Pending |

Update this table on every release. The `Pending` markers above are placeholders for the next release; the actual release will replace them with `Captured` and link the artifact path or run the command that produced the evidence.

## 14. Change checklist

Before merging a design-system change, confirm every item below. Items that depend on Section 13 are not yet captured for the current release and remain `Pending` until the release evidence checklist is filled in.

- The change uses `--dt-*` tokens and existing package boundaries.
- The change preserves persimmon `#ec5e1f`, Pretendard Variable, and JetBrains Mono roles.
- Light is the default and dark has deliberate parity.
- Hover, press scale `0.97`, 3px focus, disabled, loading, and reduced-motion behavior are implemented where relevant.
- The landing and console surface rules are still distinct and correct.
- WCAG AA semantics, labels, landmarks, heading order, keyboard behavior, and non-color cues are present.
- No anti-slop prohibition in Section 11 is violated.
- No "do not copy" rule in Section 10.3 is violated.
- The component touched is documented in Section 9, and any new primitive lands there before merge.
- Accepted debt (Section 12) is either unchanged or has a new row that names the exit condition.
- Package gates (Section 13.1), app gates (Section 13.2), and the release evidence checklist (Section 13.4) are `Captured` or `Not applicable` with a linked artifact. `Pending` items block the release.
