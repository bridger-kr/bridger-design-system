// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/product/ToolCard.tsx
// Regenerate: pnpm generate

import { forwardRef } from 'react';
import { cx } from '../lib/cx.jsx';
import { useDSMessages } from '../locale/DSLocaleProvider.jsx';
/**
 * An MCP tool as shown in the catalog and tool list.
 */
export const ToolCard = forwardRef(function ToolCard({ name, method = 'GET', category, description, path = '/', state = 'available', stateLabel, className, style, ...rest }, ref) {
    const cat = category ?? (name ? name.split('_')[0] : 'etc');
    const messages = useDSMessages();
    const labels = messages.toolCard.state;
    const resolvedDescription = description ?? messages.toolCard.emptyDescription;
    return (<article ref={ref} className={cx('dt-tool-card', className)} {...rest} style={style}>
      <div className="dt-tool-card-head">
        <div className="dt-tool-card-main">
          <div className="dt-tool-card-chips">
            <span className="dt-chip dt-chip-muted">{cat}</span>
            <span className="dt-chip dt-chip-accent">{method}</span>
          </div>
          <h4 className="dt-tool-card-name">{name}</h4>
        </div>
        <span className="dt-tool-card-state" data-state={state}>
          <span className="dt-tool-card-state-dot" aria-hidden="true"/>
          {stateLabel ?? labels[state]}
        </span>
      </div>
      <p className="dt-tool-card-desc">{resolvedDescription}</p>
      <div className="dt-tool-card-foot">
        <code className="dt-tool-card-path">{path}</code>
      </div>
    </article>);
});
ToolCard.displayName = 'ToolCard';
