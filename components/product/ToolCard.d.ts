import * as React from 'react';

export interface ToolCardProps {
  /** Tool name, e.g. "weather_getForecast". */
  name: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | string;
  /** Category chip; defaults to the name prefix before the first underscore. */
  category?: string;
  description?: string;
  /** Mono API path shown in the footer. */
  path?: string;
  /** Usability state — drives the status dot/label. */
  state?: 'available' | 'managed' | 'locked';
  stateLabel?: string;
  style?: React.CSSProperties;
}

/**
 * An MCP tool as shown in the catalog and tool list.
 * @startingPoint section="Console" subtitle="MCP tool catalog card" viewport="420x220"
 */
export function ToolCard(props: ToolCardProps): React.JSX.Element;
