import * as React from 'react';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Empty state for lists/tables — quiet icon, title, guidance, action. */
export function EmptyState(props: EmptyStateProps): React.JSX.Element;
