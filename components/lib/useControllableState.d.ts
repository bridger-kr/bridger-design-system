// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/lib/useControllableState.ts
// Regenerate: pnpm generate

export interface ControllableStateOptions<T> {
    /** Controlled value. When provided the component does not own the state. */
    value?: T;
    /** Initial value for the uncontrolled case. */
    defaultValue?: T;
    /** Called with the next value on every committed change. */
    onChange?: (value: T) => void;
}
/**
 * Implements the `value`/`defaultValue`/`onValueChange` contract: a component
 * is controlled when `value` is provided, uncontrolled otherwise.
 */
export declare function useControllableState<T>({ value, defaultValue, onChange, }: ControllableStateOptions<T>): [T | undefined, (next: T | ((prev: T | undefined) => T)) => void];
