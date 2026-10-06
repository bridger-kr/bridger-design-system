// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/forms/Field.tsx
// Regenerate: pnpm generate

import type { CSSProperties, HTMLAttributes, ReactElement, ReactNode } from 'react';
/** Props injected into the wrapped control so label/hint/error associate. */
export interface FieldControlProps {
    id: string;
    'aria-describedby'?: string;
    'aria-invalid'?: true;
    'aria-required'?: true;
    disabled?: boolean;
    required?: boolean;
}
export interface FieldProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    /** Visible label bound to the control via `htmlFor`. */
    label?: ReactNode;
    /** Supporting copy under the control, linked via `aria-describedby`. */
    hint?: ReactNode;
    /** Validation message; sets `aria-invalid` and joins `aria-describedby`. */
    error?: ReactNode;
    required?: boolean;
    disabled?: boolean;
    /** Control id override; defaults to a generated id. */
    id?: string;
    /**
     * The control. Either a single element (injected with `id`,
     * `aria-describedby`, `aria-invalid`) or a render function receiving those
     * props for composition with non-input children.
     */
    children: ReactElement | ((control: FieldControlProps) => ReactNode);
    style?: CSSProperties;
}
/**
 * Field — label + control + hint + error with `aria-describedby` wiring.
 * Wraps any Bridger control; keeps validation off color alone by pairing the
 * error text with the invalid state.
 */
export declare function Field({ label, hint, error, required, disabled, id, children, className, style, ...rest }: FieldProps): import("react").JSX.Element;
