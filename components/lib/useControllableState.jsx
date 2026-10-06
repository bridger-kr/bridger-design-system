// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/lib/useControllableState.ts
// Regenerate: pnpm generate

import { useCallback, useRef, useState } from 'react';
/**
 * Implements the `value`/`defaultValue`/`onValueChange` contract: a component
 * is controlled when `value` is provided, uncontrolled otherwise.
 */
export function useControllableState({ value, defaultValue, onChange, }) {
    const [internal, setInternal] = useState(defaultValue);
    const isControlled = value !== undefined;
    const onChangeRef = useRef(onChange);
    onChangeRef.current = onChange;
    const valueRef = useRef(isControlled ? value : internal);
    valueRef.current = isControlled ? value : internal;
    const setValue = useCallback((next) => {
        const resolved = typeof next === 'function' ? next(valueRef.current) : next;
        if (!isControlled)
            setInternal(resolved);
        onChangeRef.current?.(resolved);
    }, [isControlled]);
    return [isControlled ? value : internal, setValue];
}
