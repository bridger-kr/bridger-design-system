import { useCallback, useRef, useState } from 'react';

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
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: ControllableStateOptions<T>): [T | undefined, (next: T | ((prev: T | undefined) => T)) => void] {
  const [internal, setInternal] = useState<T | undefined>(defaultValue);
  const isControlled = value !== undefined;
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const valueRef = useRef<T | undefined>(isControlled ? value : internal);
  valueRef.current = isControlled ? value : internal;

  const setValue = useCallback(
    (next: T | ((prev: T | undefined) => T)) => {
      const resolved = typeof next === 'function' ? (next as (prev: T | undefined) => T)(valueRef.current) : next;
      if (!isControlled) setInternal(resolved);
      onChangeRef.current?.(resolved);
    },
    [isControlled],
  );

  return [isControlled ? value : internal, setValue];
}
