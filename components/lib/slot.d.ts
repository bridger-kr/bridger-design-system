// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/lib/slot.ts
// Regenerate: pnpm generate

import type { ComponentPropsWithRef, ElementType } from 'react';
/**
 * Typed `slotProps` map. Each key names an inner element (e.g. `input`,
 * `label`, `hint`); each value is that element's prop bag, so consumers can
 * reach inner nodes without the component leaking a public className contract
 * for anything but the root.
 */
export type SlotPropsFor<Slots extends Record<string, ElementType>> = {
    [Slot in keyof Slots]?: ComponentPropsWithRef<Slots[Slot]>;
};
