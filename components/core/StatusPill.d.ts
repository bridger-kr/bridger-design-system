import * as React from 'react';

export interface StatusPillProps {
  /** Semantic state — drives the dot color. */
  status?: 'connected' | 'success' | 'reconnecting' | 'warning' | 'disconnected' | 'danger' | 'info' | 'idle';
  children?: React.ReactNode;
  /** Pulse the dot (use for transient states like reconnecting). */
  pulse?: boolean;
  style?: React.CSSProperties;
}

/** Dot + label status pill — the console's core live-state affordance. */
export function StatusPill(props: StatusPillProps): React.JSX.Element;
