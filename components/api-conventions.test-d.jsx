// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/api-conventions.test-d.tsx
// Regenerate: pnpm generate

// Type-level contract tests for the v2 component API conventions (issue #42).
// Run via `pnpm test` — vitest typecheck picks up *.test-d.ts files.
import { describe, expectTypeOf, it } from 'vitest';
import { Button } from './core/Button.jsx';
import { CodeBlock } from './data/CodeBlock.jsx';
import { CodePane } from './data/CodePane.jsx';
describe('variant / tone / size naming', () => {
    it('Button uses variant (shape) + tone (semantic color)', () => {
        expectTypeOf().toEqualTypeOf();
        expectTypeOf().toEqualTypeOf();
        expectTypeOf().toEqualTypeOf();
    });
    it('Card keeps only variant (plain | sunken); tone is a deprecated alias', () => {
        expectTypeOf().toEqualTypeOf();
        expectTypeOf().toEqualTypeOf();
    });
    it('Chip colors live on tone; variant is a deprecated alias', () => {
        expectTypeOf().toEqualTypeOf();
    });
    it('StatusPill uses tone; status stays a deprecated data-state alias', () => {
        expectTypeOf().toEqualTypeOf();
        expectTypeOf().not.toBeUnknown();
    });
    it('Tabs uses underline | segmented with pill as a deprecated alias', () => {
        expectTypeOf().toEqualTypeOf();
    });
});
describe('icon-only Button', () => {
    it('requires aria-label when there is no visible label', () => {
        // @ts-expect-error icon-only buttons must declare aria-label
        void (<Button icon={<span />}/>);
        // @ts-expect-error children-free buttons must declare aria-label
        void (<Button />);
        void (<Button icon={<span />} aria-label="닫기"/>);
        void (<Button>레이블</Button>);
    });
});
describe('controlled / uncontrolled contract', () => {
    it('exposes value/defaultValue/onValueChange on selection controls', () => {
        expectTypeOf().toEqualTypeOf();
        expectTypeOf().toEqualTypeOf();
        expectTypeOf().toEqualTypeOf();
        expectTypeOf().toEqualTypeOf();
        expectTypeOf().toEqualTypeOf();
    });
    it('exposes open/defaultOpen/onOpenChange on overlays and palette', () => {
        for (const props of []) {
            expectTypeOf(props.open).toEqualTypeOf();
            expectTypeOf(props.defaultOpen).toEqualTypeOf();
            expectTypeOf(props.onOpenChange).toEqualTypeOf();
        }
    });
});
describe('CodeBlock / CodePane consolidation', () => {
    it('CodeBlock accepts raw code or pre-tokenized lines', () => {
        expectTypeOf().toEqualTypeOf();
        expectTypeOf().not.toBeUnknown();
        expectTypeOf().not.toBeUnknown();
        expectTypeOf().not.toBeUnknown();
        void CodeBlock;
        void CodePane;
    });
});
describe('slotProps convention', () => {
    it('Input exposes inner element prop bags', () => {
        expectTypeOf().toEqualTypeOf();
        expectTypeOf().toEqualTypeOf();
        expectTypeOf().toEqualTypeOf();
    });
    it('SlotPropsFor maps slot names to element prop bags', () => {
        expectTypeOf().toEqualTypeOf();
    });
});
describe('ref targets', () => {
    it('forwards element refs on every public DOM component', () => {
        void null;
        expectTypeOf().not.toBeUnknown();
        expectTypeOf().not.toBeUnknown();
        expectTypeOf().not.toBeUnknown();
        expectTypeOf().not.toBeUnknown();
    });
});
