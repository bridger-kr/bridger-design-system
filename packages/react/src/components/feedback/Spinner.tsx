import { forwardRef } from 'react';
import { LoaderCircle } from 'lucide-react';
import type { CSSProperties, HTMLAttributes } from 'react';
import { useDSMessages } from '../../locale/DSLocaleProvider';

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: number;
  stroke?: number;
  color?: string;
  /** Accessible name announced through the status role. Pass `aria-hidden` instead when a parent (e.g. a busy button) already conveys the loading state. */
  label?: string;
  style?: CSSProperties;
}

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  { size = 18, stroke = 1.75, color = 'var(--dt-accent)', label, className, style, ...rest },
  ref,
) {
  const messages = useDSMessages();
  const resolvedLabel = label ?? messages.common.loading;
  const hidden = rest['aria-hidden'] === true || rest['aria-hidden'] === 'true';
  return (
    <span
      ref={ref}
      {...rest}
      className={className}
      style={{ display: 'inline-flex', ...style }}
      role={hidden ? undefined : 'status'}
      aria-label={hidden ? undefined : resolvedLabel}
    >
      <LoaderCircle className="dt-spinner-svg" size={size} strokeWidth={stroke} color={color} aria-hidden="true" />
    </span>
  );
});
Spinner.displayName = 'Spinner';
