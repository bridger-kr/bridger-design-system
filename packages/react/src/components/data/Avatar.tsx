import { forwardRef } from 'react';
import type { CSSProperties, HTMLAttributes } from 'react';
import { cx } from '../../lib/cx';

const SIZE = { sm: 26, md: 34, lg: 44 } as const;

export interface AvatarProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'style'> {
  name?: string;
  src?: string;
  size?: keyof typeof SIZE | number;
  status?: 'online' | 'busy' | 'away' | 'offline';
  /** Rounded square (default) vs full circle. */
  square?: boolean;
  style?: CSSProperties;
}

/**
 * Avatar — image or initials in a rounded square. Optional status dot.
 * Deterministic tint from the name when no image is given.
 */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { name = '', src, size = 'md', status, square = true, className, style, ...rest },
  ref,
) {
  const px = typeof size === 'number' ? size : (SIZE[size] ?? SIZE.md);
  const initials = name.trim().split(/\s+/).map((word) => word[0]).slice(0, 2).join('').toUpperCase() || '·';
  const radius = square ? Math.round(px * 0.28) : px;
  const statusColor = status ? { online: 'var(--dt-success)', busy: 'var(--dt-danger)', away: 'var(--dt-warning)', offline: 'var(--dt-text-muted)' }[status] ?? undefined : undefined;

  return (
    <span
      ref={ref}
      {...rest}
      className={cx('dt-avatar', className)}
      style={{
        '--dt-avatar-px': `${px}px`,
        '--dt-avatar-radius': `${radius}px`,
        '--dt-avatar-status-color': statusColor,
        ...style,
      } as CSSProperties}
    >
      {src ? (
        <img src={src} alt={name} width={px} height={px} className="dt-avatar-img" />
      ) : (
        <span className="dt-avatar-initials">{initials}</span>
      )}
      {statusColor ? <span className="dt-avatar-status" /> : null}
    </span>
  );
});
Avatar.displayName = 'Avatar';
