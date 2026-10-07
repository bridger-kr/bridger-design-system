import { forwardRef, useId } from 'react';
import type { CSSProperties, TextareaHTMLAttributes } from 'react';
import { cx } from '../../lib/cx';
import type { SlotPropsFor } from '../../lib/slot';

export type TextareaSlotProps = SlotPropsFor<{
  textarea: 'textarea';
  label: 'label';
  hint: 'span';
}>;

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className' | 'style'> {
  label?: string;
  hint?: string;
  rows?: number;
  /** Render in the mono stack (ASCII: JSON, payloads). */
  mono?: boolean;
  /** Root `<div>` class. Style the inner `<textarea>` via `slotProps.textarea`. */
  className?: string;
  /** Root `<div>` style. */
  style?: CSSProperties;
  /** Prop bags for inner elements (`textarea`, `label`, `hint`). */
  slotProps?: TextareaSlotProps;
}

/** Multi-line text field with a persimmon focus ring. */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, hint, rows = 4, mono = false, id, className, style, slotProps, 'aria-describedby': ariaDescribedBy, ...rest },
  ref,
) {
  const autoId = useId();
  const taId = id ?? autoId;
  const hintId = hint ? `${taId}-hint` : undefined;
  const describedBy = [hintId, ariaDescribedBy].filter(Boolean).join(' ') || undefined;
  const { className: textareaClassName, style: textareaStyle, ...textareaRest } = slotProps?.textarea ?? {};
  const { className: labelClassName, ...labelRest } = slotProps?.label ?? {};
  const { className: hintClassName, ...hintRest } = slotProps?.hint ?? {};

  return (
    <div className={cx('dt-textarea', className)} style={style}>
      {label ? (
        <label htmlFor={taId} className={cx('dt-textarea-label', labelClassName)} {...labelRest}>
          {label}
        </label>
      ) : null}
      <textarea
        id={taId}
        ref={ref}
        rows={rows}
        className={cx('dt-field', 'dt-textarea-control', textareaClassName)}
        data-mono={mono ? '' : undefined}
        aria-describedby={describedBy}
        style={textareaStyle}
        {...rest}
        {...textareaRest}
      />
      {hint ? (
        <span id={hintId} className={cx('dt-textarea-hint', hintClassName)} {...hintRest}>
          {hint}
        </span>
      ) : null}
    </div>
  );
});
Textarea.displayName = 'Textarea';
