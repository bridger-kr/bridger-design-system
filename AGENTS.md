# Bridger Design System: scoped agent rules

This file is the closest-scope AGENTS.md for `vendor/bridger-design-system`.
Repo-wide rules live in `bridger-web/AGENTS.md` and `bridger-api/AGENTS.md`; this
file only adds what is specific to this package boundary.

Scope:

<!-- rule:ds:scope:package owner:bridger-kr since:2026-07 source:DESIGN.md#9-component-manifest-and-package-boundary -->
- This repo owns `@bridger-kr/tokens`, `@bridger-kr/react`, and the private
  `bridger-figma-plugin`. App code in `landing/` and `dashboard/` consumes the
  published packages; it does not import from this directory directly.

Canonical sources:

<!-- rule:ds:source:design-md owner:bridger-kr since:2026-07 source:DESIGN.md -->
- `DESIGN.md` is the canonical design canon. Every token, primitive, surface
  rule, anti-slop rule, and release gate defined there applies here. This file
  links specific sections rather than restating them.

<!-- rule:ds:source:tokens-contract owner:bridger-kr since:2026-07 source:packages/tokens/css/contract.css -->
- `packages/tokens/css/contract.css` is the canonical CSS custom-property token
  contract. Edit it there first, then mirror to app-local files, then run
  `npm run check:tokens` from the `bridger-web` repo root.

Package commands:

<!-- rule:ds:packages:commands owner:bridger-kr since:2026-07 source:package.json#scripts -->
- Build, typecheck, test, and lint through the pnpm workspace:

  ```sh
  pnpm install
  pnpm build        # pnpm -r --filter './packages/**' run build
  pnpm typecheck    # pnpm -r run typecheck
  pnpm test         # vitest run
  pnpm lint         # oxlint -c _adherence.oxlintrc.json .
  pnpm pack:dry-run # npm pack --dry-run for tokens + react
  ```

  From `bridger-web`, run `npm run build:bridger-design-system` instead so the
  vendor copy is rebuilt into the consuming apps.

Component and token rules (pointers, not restatements):

<!-- rule:ds:tokens:source-of-truth owner:bridger-kr since:2026-07 source:DESIGN.md#2-source-of-truth-and-implementation-boundary -->
- Tokens live in `packages/tokens/css/*.css` and are exposed to TypeScript
  consumers via `packages/tokens/src/index.ts`. App code consumes the package,
  not the raw CSS files.

<!-- rule:ds:react:60-components owner:bridger-kr since:2026-07 source:DESIGN.md#9-component-manifest-and-package-boundary -->
- `@bridger-kr/react` ships 60 typed components across `core`, `forms`,
  `feedback`, `data`, `navigation`, and `product` families. The barrel at
  `packages/react/src/index.ts` is the public API; subpath imports exist for
  tree-shaking only. Renaming, adding, or removing a primitive is a breaking
  change that requires a changeset and an ADR-style note.

<!-- rule:ds:figma:plugin-owner owner:bridger-kr since:2026-07 source:DESIGN.md#10-provenance-and-reference-discipline -->
- The `bridger-figma-plugin` workspace is private and ships through the Figma
  Community, not npm. It reads token CSS through `gen-tokens.mjs` and must not
  invent a parallel palette, spacing scale, or component vocabulary.

Release flow:

<!-- rule:ds:release:changeset owner:bridger-kr since:2026-07 source:package.json#scripts.release -->
- Add a Changeset entry under `.changeset/` for any user-visible change to a
  published package. Run `pnpm build`, `pnpm typecheck`, `pnpm test`, and
  `npm run check:tokens` from `bridger-web` before opening the PR. The release
  script owns the npm publish step: `pnpm build && changeset publish`.

<!-- rule:ds:release:gates owner:bridger-kr since:2026-07 source:DESIGN.md#13-release-and-verification-gates -->
- A package change is not mergeable until the package gates in
  `DESIGN.md#13.1`, the app gates in `DESIGN.md#13.2`, and the browser/visual
  gates in `DESIGN.md#13.3` all pass for every touched surface. The release
  evidence checklist in `DESIGN.md#13.4` carries `Captured`, `Pending`, or
  `Not applicable` for every dimension.

Anti-slop (pointer):

<!-- rule:ds:antislop owner:bridger-kr since:2026-07 source:DESIGN.md#11-anti-slop-prohibitions -->
- The prohibitions in `DESIGN.md#11` apply to every package, example, and
  Figma asset shipped from this repo. Reviewers reject PRs that introduce
  glows, resting shadows, indigo/rainbow gradients, decorative uppercase
  eyebrows, emoji, or reference-brand visual identity.

Provenance:

<!-- rule:meta:provenance owner:bridger-kr since:2026-07 source:https://agents.md/ -->
- Last reviewed: 2026-07-15 against the current `DESIGN.md` and the published
  `@bridger-kr/react` barrel. Re-verify whenever `DESIGN.md` or the package
  barrel changes.

Scope precedence:

<!-- rule:meta:closest-scope-wins owner:bridger-kr since:2026-07 source:https://agents.md/ -->
- When a rule here conflicts with a rule in a closer scope (for example, a
  per-package README or a per-family sub-AGENTS file), the closer scope wins
  for that topic. Repo-wide rules in `bridger-web/AGENTS.md` only apply when
  no closer scope covers the situation.
