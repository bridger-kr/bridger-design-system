// Type-level contract tests for the v2 component API conventions (issue #42).
// Run via `pnpm test` — vitest typecheck picks up *.test-d.ts files.
import { describe, expectTypeOf, it } from 'vitest';
import type { ComponentPropsWithRef } from 'react';

import { Button } from './components/core/Button';
import type { ButtonProps } from './components/core/Button';
import type { CardProps } from './components/core/Card';
import type { ChipProps } from './components/core/Chip';
import { Section } from './components/core/Section';
import { StatusPill } from './components/core/StatusPill';
import type { StatusPillProps } from './components/core/StatusPill';
import type { TabsProps } from './components/core/Tabs';
import { Input } from './components/core/Input';
import type { InputProps } from './components/core/Input';
import { Select } from './components/forms/Select';
import type { SelectProps } from './components/forms/Select';
import type { ComboboxProps } from './components/forms/Combobox';
import type { DialogProps } from './components/feedback/Dialog';
import type { DrawerProps } from './components/feedback/Drawer';
import type { CommandPaletteProps } from './components/navigation/CommandPalette';
import { CodeBlock } from './components/data/CodeBlock';
import type { CodeBlockProps } from './components/data/CodeBlock';
import { CodePane } from './components/data/CodePane';
import type { CodePaneProps } from './components/data/CodePane';
import type { SlotPropsFor } from './lib/slot';

describe('variant / tone / size naming', () => {
  it('Button uses variant (shape) + tone (semantic color)', () => {
    expectTypeOf<ButtonProps['variant']>().toEqualTypeOf<
      'solid' | 'outline' | 'ghost' | 'primary' | 'secondary' | 'danger' | undefined
    >();
    expectTypeOf<ButtonProps['tone']>().toEqualTypeOf<'neutral' | 'danger' | undefined>();
    expectTypeOf<ButtonProps['size']>().toEqualTypeOf<'sm' | 'md' | 'lg' | undefined>();
  });

  it('Card keeps only variant (plain | sunken); tone is a deprecated alias', () => {
    expectTypeOf<CardProps['variant']>().toEqualTypeOf<
      'plain' | 'sunken' | 'default' | 'muted' | 'raised' | 'panel' | undefined
    >();
    expectTypeOf<CardProps['tone']>().toEqualTypeOf<'default' | 'muted' | 'raised' | 'panel' | undefined>();
  });

  it('Chip colors live on tone; variant is a deprecated alias', () => {
    expectTypeOf<ChipProps['tone']>().toEqualTypeOf<
      'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'accent' | undefined
    >();
  });

  it('StatusPill uses tone; status stays a deprecated data-state alias', () => {
    expectTypeOf<StatusPillProps['tone']>().toEqualTypeOf<
      'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info' | undefined
    >();
    expectTypeOf<StatusPillProps['status']>().not.toBeUnknown();
  });

  it('Tabs uses underline | segmented with pill as a deprecated alias', () => {
    expectTypeOf<TabsProps['variant']>().toEqualTypeOf<'underline' | 'segmented' | 'pill' | undefined>();
  });
});

describe('icon-only Button', () => {
  it('requires aria-label when there is no visible label', () => {
    // @ts-expect-error icon-only buttons must declare aria-label
    void (<Button icon={<span />} />);
    // @ts-expect-error children-free buttons must declare aria-label
    void (<Button />);
    void (<Button icon={<span />} aria-label="닫기" />);
    void (<Button>레이블</Button>);
  });
});

describe('controlled / uncontrolled contract', () => {
  it('exposes value/defaultValue/onValueChange on selection controls', () => {
    expectTypeOf<SelectProps['value']>().toEqualTypeOf<string | undefined>();
    expectTypeOf<SelectProps['defaultValue']>().toEqualTypeOf<string | undefined>();
    expectTypeOf<SelectProps['onValueChange']>().toEqualTypeOf<((value: string) => void) | undefined>();
    expectTypeOf<ComboboxProps['onValueChange']>().toEqualTypeOf<((value: string) => void) | undefined>();
    expectTypeOf<TabsProps['onValueChange']>().toEqualTypeOf<((id: string) => void) | undefined>();
  });

  it('exposes open/defaultOpen/onOpenChange on overlays and palette', () => {
    for (const props of [] as Array<DialogProps | DrawerProps | CommandPaletteProps | SelectProps | ComboboxProps>) {
      expectTypeOf(props.open).toEqualTypeOf<boolean | undefined>();
      expectTypeOf(props.defaultOpen).toEqualTypeOf<boolean | undefined>();
      expectTypeOf(props.onOpenChange).toEqualTypeOf<((open: boolean) => void) | undefined>();
    }
  });
});

describe('CodeBlock / CodePane consolidation', () => {
  it('CodeBlock accepts raw code or pre-tokenized lines', () => {
    expectTypeOf<CodeBlockProps['code']>().toEqualTypeOf<string | undefined>();
    expectTypeOf<CodeBlockProps['lines']>().not.toBeUnknown();
    expectTypeOf<CodeBlockProps['copy']>().not.toBeUnknown();
    expectTypeOf<CodePaneProps['lines']>().not.toBeUnknown();
    void CodeBlock;
    void CodePane;
  });
});

describe('slotProps convention', () => {
  it('Input exposes inner element prop bags', () => {
    type Slots = NonNullable<InputProps['slotProps']>;
    expectTypeOf<Slots['input']>().toEqualTypeOf<ComponentPropsWithRef<'input'> | undefined>();
    expectTypeOf<Slots['label']>().toEqualTypeOf<ComponentPropsWithRef<'label'> | undefined>();
    expectTypeOf<Slots['hint']>().toEqualTypeOf<ComponentPropsWithRef<'span'> | undefined>();
  });

  it('SlotPropsFor maps slot names to element prop bags', () => {
    expectTypeOf<SlotPropsFor<{ trigger: 'button' }>['trigger']>().toEqualTypeOf<
      ComponentPropsWithRef<'button'> | undefined
    >();
  });
});

describe('ref targets', () => {
  it('forwards element refs on every public DOM component', () => {
    void (null as unknown as Parameters<typeof Input>[0]);
    expectTypeOf<Parameters<typeof Input>[0]['ref']>().not.toBeUnknown();
    expectTypeOf<Parameters<typeof Select>[0]['ref']>().not.toBeUnknown();
    expectTypeOf<Parameters<typeof Section>[0]['ref']>().not.toBeUnknown();
    expectTypeOf<Parameters<typeof StatusPill>[0]['ref']>().not.toBeUnknown();
  });
});
