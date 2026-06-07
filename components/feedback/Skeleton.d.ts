import * as React from 'react';

export interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  radius?: string;
  style?: React.CSSProperties;
}

/** Pulsing placeholder block for loading states. */
export function Skeleton(props: SkeletonProps): React.JSX.Element;
