import * as React from 'react';

export interface AvatarProps {
  name?: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg' | number;
  status?: 'online' | 'busy' | 'away' | 'offline';
  /** Rounded square (default) vs full circle. */
  square?: boolean;
  style?: React.CSSProperties;
}

/** Image-or-initials avatar with an optional presence dot. */
export function Avatar(props: AvatarProps): React.JSX.Element;
