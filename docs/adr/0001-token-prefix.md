# ADR 0001: Token and class-name prefix

- Status: Accepted (2026-09-28)
- Context: DS v2 package hardening (Issue #45), ahead of the v2.0.0 major
  (EDD-239)

## Context

The design system's CSS custom properties (`--dt-*`) and public class names
(`.dt-*`) use the `dt-` prefix, a vestige of the pre-Bridger "datari" brand.
The v2.0.0 major release is the last cheap window to rename the prefix before
the contract freezes again.

The prefix is live in roughly 160 tokens across four surfaces:

- `packages/tokens/css/contract.css` and the TS token objects.
- The bridger-web mirrors and the Tailwind `--dt-*` preset (unified in
  EDD-240).
- Figma variables synced via `bridger-figma-plugin`.
- Consumer CSS and component class names.

## Decision

**Keep `dt-`. Its meaning is redefined as "design token".**

Every new token and class added under v2 uses `--dt-*` / `.dt-*` with that
meaning. The prefix is documented in `DESIGN.md` and the package READMEs so it
no longer reads as a brand abbreviation.

Rationale: renaming ~160 tokens across the DS source, web mirrors, Tailwind
preset, and Figma variables buys consumers nothing — the prefix is an internal
identifier, not user-facing branding. EDD-240 had just unified bridger-web on
`--dt-*`, so a rename would have invalidated that migration before it
stabilized.

## Alternatives considered

- **Rename to `--br-*` / `.br-*`** — rejected. It would require shipping alias
  pairs through 2.0, a codemod for consumers, and a coordinated
  token/mirror/Figma cutover, all for a change with no consumer-visible value.
  If a rename is ever revisited it needs that same alias-then-codemod plan; it
  is not a standing option.
- **Keep `dt-` meaning "datari"** — rejected implicitly; the abbreviation no
  longer refers to anything. Recording "design token" as the meaning closes
  the provenance question.

## Consequences

- New tokens and classes use `--dt-*` / `.dt-*` unconditionally.
- `DESIGN.md` §3.1 and the package READMEs state that `dt-` means "design
  token".
- The unprefixed global classes removed in this release are not reintroduced;
  the compatibility surface lives only in
  `packages/tokens/css/legacy-classes.css` and is deleted in 2.1.0.
