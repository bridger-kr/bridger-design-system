// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/product/ToolCard.tsx
// Regenerate: pnpm generate

import type { HTMLAttributes } from 'react';
export interface ToolCardProps extends HTMLAttributes<HTMLElement> {
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
}
/**
 * An MCP tool as shown in the catalog and tool list.
 */
export declare function ToolCard({ name, method, category, description, path, state, stateLabel, style, ...rest }: ToolCardProps): import("react").JSX.Element;
