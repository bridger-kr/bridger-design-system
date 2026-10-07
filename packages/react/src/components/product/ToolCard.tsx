import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cx } from '../../lib/cx';
import { useDSMessages } from '../../locale/DSLocaleProvider';

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
export const ToolCard = forwardRef<HTMLElement, ToolCardProps>(function ToolCard(
  {
    name,
    method = 'GET',
    category,
    description,
    path = '/',
    state = 'available',
    stateLabel,
    className,
    style,
    ...rest
  },
  ref,
) {
  const cat = category ?? (name ? name.split('_')[0] : 'etc');
  const messages = useDSMessages();
  const labels = messages.toolCard.state;
  const resolvedDescription = description ?? messages.toolCard.emptyDescription;
  return (
    <article
      ref={ref}
      className={cx('dt-tool-card', className)}
      {...rest}
      style={style}
    >
      <div className="dt-tool-card-head">
        <div className="dt-tool-card-main">
          <div className="dt-tool-card-chips">
            <span className="dt-chip dt-chip-muted">{cat}</span>
            <span className="dt-chip dt-chip-accent">{method}</span>
          </div>
          <h4 className="dt-tool-card-name">{name}</h4>
        </div>
        <span className="dt-tool-card-state" data-state={state}>
          <span className="dt-tool-card-state-dot" aria-hidden="true" />
          {stateLabel ?? labels[state]}
        </span>
      </div>
      <p className="dt-tool-card-desc">{resolvedDescription}</p>
      <div className="dt-tool-card-foot">
        <code className="dt-tool-card-path">{path}</code>
      </div>
    </article>
  );
});
ToolCard.displayName = 'ToolCard';
