import { forwardRef, useEffect, useRef, useState } from 'react';
import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';
import { Check, CircleAlert, Copy } from 'lucide-react';
import { Icon } from '../../lib/icon';
import { cx } from '../../lib/cx';
import { useDSMessages } from '../../locale/DSLocaleProvider';

export type CopyButtonState = 'idle' | 'copied' | 'failed';
export type CopyButtonResult = Exclude<CopyButtonState, 'idle'>;

const RESET_DELAY_MS = 1500;

type CopyButtonBase = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onCopy' | 'type' | 'value'> & {
  /** Text to write to the clipboard. A function is evaluated on click. */
  value: string | (() => string);
  /** Idle-state label. */
  label?: ReactNode;
  /** Label after a successful copy; also announced via the live region. */
  copiedLabel?: ReactNode;
  /** Label after a failed copy; also announced via the live region. */
  failedLabel?: ReactNode;
  /** Called with the copy outcome after every activation. */
  onCopy?: (result: CopyButtonResult) => void;
};

/**
 * Copy-to-clipboard button with an announced result state. The outcome is
 * reported three ways — icon swap, label text, and a `role="status"` live
 * region — so success or failure never depends on color or icon alone
 * (DESIGN.md §8). An icon-only button has no visible text, so `aria-label`
 * is required at the type level.
 */
export type CopyButtonProps = CopyButtonBase &
  (
    | { iconOnly?: false; 'aria-label'?: string }
    | { iconOnly: true; 'aria-label': string }
  );

export const CopyButton = forwardRef<HTMLButtonElement, CopyButtonProps>(function CopyButton(
  {
    value,
    label,
    copiedLabel,
    failedLabel,
    iconOnly = false,
    onCopy,
    onClick,
    className,
    ...rest
  },
  ref,
) {
  const messages = useDSMessages();
  const resolvedLabel = label ?? messages.code.copy;
  const resolvedCopiedLabel = copiedLabel ?? messages.code.copied;
  const resolvedFailedLabel = failedLabel ?? messages.code.failed;
  const [state, setState] = useState<CopyButtonState>('idle');
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (resetTimer.current !== null) clearTimeout(resetTimer.current);
    },
    [],
  );

  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    let result: CopyButtonResult;
    try {
      if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
        throw new Error('clipboard unavailable');
      }
      await navigator.clipboard.writeText(typeof value === 'function' ? value() : value);
      result = 'copied';
    } catch {
      result = 'failed';
    }

    setState(result);
    onCopy?.(result);
    if (resetTimer.current !== null) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setState('idle'), RESET_DELAY_MS);
  };

  const stateLabel = state === 'copied' ? resolvedCopiedLabel : state === 'failed' ? resolvedFailedLabel : null;
  const StateIcon = state === 'copied' ? Check : state === 'failed' ? CircleAlert : Copy;

  return (
    <>
      <button
        ref={ref}
        type="button"
        className={cx('dt-copy-button', className)}
        data-state={state === 'idle' ? undefined : state}
        onClick={handleClick}
        {...rest}
      >
        <Icon icon={StateIcon} size="sm" className="dt-copy-button-icon" />
        {iconOnly ? null : <span className="dt-copy-button-label">{stateLabel ?? resolvedLabel}</span>}
      </button>
      <span className="dt-visually-hidden" role="status">
        {stateLabel ?? ''}
      </span>
    </>
  );
});
CopyButton.displayName = 'CopyButton';
