---
'@bridger-kr/react': major
---

Normalize the component API surface (issue #42).

- Every DOM component is now a `forwardRef` component with `displayName` set. Form controls forward to the real control element (`Input`→`<input>`, `Textarea`→`<textarea>`, `Checkbox`/`Switch`/`Select`→`<button>`, `Combobox`→`<input>`), which unblocks `react-hook-form` registration, first-error focus, and overlay anchoring.
- Variant naming is fixed to `variant` (visual shape), `tone` (semantic color), `size` (scale). Migrations: `Button` `primary`→`solid`, `secondary`→`outline`, `danger`→`solid` + `tone="danger"`; `Card` `default`/`raised`/`panel`→`plain`, `muted`→`sunken` (`tone` prop removed → deprecated alias); `Section` `band`/`proof`→`sunken`, `tone` removed → mapped alias; `Chip` `variant`→`tone`; `StatusPill` `status`→`tone` (alias kept); `Tabs` `pill`→`segmented`; `ProductActionPill` `default`/`accent` variants→`solid` + `tone`. All aliases warn once in development and are removed in v2.1.
- Form control ids default to `useId()`; label-derived ids and the fixed `FileUpload` id are removed, so duplicate labels never collide.
- `className`/`style` always target the component root. Inner elements take `slotProps` prop bags (`Input`, `Textarea`, `Select`, `Combobox`, `Slider`, `Checkbox`, `SectionCard`). **Breaking:** `Input`'s `className` no longer lands on the inner `<input>` — use `slotProps.input.className`.
- `Button` accepts base-ui's `render` prop (`<Button render={<a href="…" />}>`), and icon-only buttons require `aria-label` at the type level.
- `CodeBlock` is the single code-display component: it accepts a raw `code` string or pre-tokenized `lines`, and `copy`/`copyText` replace `copyable`. `CodePane` is a deprecated wrapper removed in v2.1.
- Controlled/uncontrolled state is unified: `open`/`defaultOpen`/`onOpenChange` (Dialog, Drawer, CommandPalette, Select, Combobox, ProductTopbar menu) and `value`/`defaultValue`/`onValueChange` (Tabs, Select, Combobox). `onChange` remains a deprecated alias on Select/Combobox/Tabs/RadioGroup/SegmentedControl/Slider. `CommandPalette`'s `open` prop is now honored — the previous `useState(open)` semi-controlled behavior is gone; use `defaultOpen` for uncontrolled usage.
- `Alert`'s `motion` prop and the `AlertMotion` export are removed; alerts are always static.
- `SwitchProps`/`SelectProps`/`SliderProps`/`CheckboxProps` no longer inherit the full native-element attribute bag; DOM props that don't apply to the rendered root are dropped. Form attributes (`name`, `required`, `value`) are still forwarded where base-ui supports them.

See `packages/react/README.md` → "Migrating to v2" for the full mapping table.
