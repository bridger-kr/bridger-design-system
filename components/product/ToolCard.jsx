// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/product/ToolCard.tsx
// Regenerate: pnpm generate

import { forwardRef } from 'react';
import { useDSMessages } from '../locale/DSLocaleProvider.jsx';
const STATE_COLOR = {
    available: 'var(--dt-success)',
    managed: 'var(--dt-success)',
    locked: 'var(--dt-warning)',
};
/**
 * An MCP tool as shown in the catalog and tool list.
 */
export const ToolCard = forwardRef(function ToolCard({ name, method = 'GET', category, description, path = '/', state = 'available', stateLabel, className, style, ...rest }, ref) {
    const cat = category ?? (name ? name.split('_')[0] : 'etc');
    const messages = useDSMessages();
    const labels = messages.toolCard.state;
    const resolvedDescription = description ?? messages.toolCard.emptyDescription;
    return (<article ref={ref} className={className ? `dt-tool-card ${className}` : 'dt-tool-card'} {...rest} style={style}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <span className="dt-chip dt-chip-muted">{cat}</span>
            <span className="dt-chip dt-chip-accent">{method}</span>
          </div>
          <h4 style={{ marginTop: 11, fontSize: 15, fontWeight: 650, letterSpacing: '-0.01em', color: 'var(--dt-text-strong)', wordBreak: 'break-all' }}>
            {name}
          </h4>
        </div>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, flex: '0 0 auto', fontSize: 12, fontWeight: 600, color: STATE_COLOR[state] }}>
          <span style={{ width: 6, height: 6, borderRadius: 'var(--dt-radius-pill)', background: STATE_COLOR[state] }}/>
          {stateLabel ?? labels[state]}
        </span>
      </div>
      <p style={{
            marginTop: 12, fontSize: 13, lineHeight: 1.5, color: 'var(--dt-text-subtle)',
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
        {resolvedDescription}
      </p>
      <div style={{ marginTop: 14, paddingTop: 13, borderTop: '1px solid var(--dt-divider)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <code style={{ fontFamily: 'var(--dt-font-mono)', fontSize: 12, color: 'var(--dt-text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {path}
        </code>
      </div>
    </article>);
});
ToolCard.displayName = 'ToolCard';
