// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/data/CopyButton.tsx
// Regenerate: pnpm generate

import { forwardRef, useEffect, useRef, useState } from 'react';
import { Check, CircleAlert, Copy } from 'lucide-react';
import { Icon } from '../lib/icon.jsx';
import { cx } from '../lib/cx.jsx';
import { useDSMessages } from '../locale/DSLocaleProvider.jsx';
const RESET_DELAY_MS = 1500;
export const CopyButton = forwardRef(function CopyButton({ value, label, copiedLabel, failedLabel, iconOnly = false, onCopy, onClick, className, ...rest }, ref) {
    const messages = useDSMessages();
    const resolvedLabel = label ?? messages.code.copy;
    const resolvedCopiedLabel = copiedLabel ?? messages.code.copied;
    const resolvedFailedLabel = failedLabel ?? messages.code.failed;
    const [state, setState] = useState('idle');
    const resetTimer = useRef(null);
    useEffect(() => () => {
        if (resetTimer.current !== null)
            clearTimeout(resetTimer.current);
    }, []);
    const handleClick = async (event) => {
        onClick?.(event);
        if (event.defaultPrevented)
            return;
        let result;
        try {
            if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
                throw new Error('clipboard unavailable');
            }
            await navigator.clipboard.writeText(typeof value === 'function' ? value() : value);
            result = 'copied';
        }
        catch {
            result = 'failed';
        }
        setState(result);
        onCopy?.(result);
        if (resetTimer.current !== null)
            clearTimeout(resetTimer.current);
        resetTimer.current = setTimeout(() => setState('idle'), RESET_DELAY_MS);
    };
    const stateLabel = state === 'copied' ? resolvedCopiedLabel : state === 'failed' ? resolvedFailedLabel : null;
    const StateIcon = state === 'copied' ? Check : state === 'failed' ? CircleAlert : Copy;
    return (<>
      <button ref={ref} type="button" className={cx('dt-copy-button', className)} data-state={state === 'idle' ? undefined : state} onClick={handleClick} {...rest}>
        <Icon icon={StateIcon} size="sm" className="dt-copy-button-icon"/>
        {iconOnly ? null : <span className="dt-copy-button-label">{stateLabel ?? resolvedLabel}</span>}
      </button>
      <span className="dt-visually-hidden" role="status">
        {stateLabel ?? ''}
      </span>
    </>);
});
CopyButton.displayName = 'CopyButton';
