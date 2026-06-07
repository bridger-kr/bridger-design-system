import React from 'react';

const STATE_COLOR = {
  available: 'var(--dt-success)',
  managed: 'var(--dt-success)',
  locked: 'var(--dt-warning)',
};

/**
 * MCP tool card — the catalog/list unit. Category + method chips, tool name,
 * description, mono path, and a status affordance (available / managed / locked).
 */
export function ToolCard({
  name,
  method = 'GET',
  category,
  description = '설명 없음',
  path = '/',
  state = 'available',
  stateLabel,
  style,
}) {
  const cat = category ?? (name ? name.split('_')[0] : 'etc');
  const labels = { available: '사용 가능', managed: '관리형 키', locked: '키 등록' };
  return (
    <article
      className="dt-tool-card"
      style={{
        borderRadius: 'var(--dt-radius-md)',
        background: 'var(--dt-surface)',
        boxShadow: 'var(--dt-ring), var(--dt-shadow-xs)',
        padding: '16px 18px',
        transition: 'box-shadow var(--dt-motion), background-color var(--dt-motion)',
        ...style,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <span className="dt-chip dt-chip-muted">{cat}</span>
            <span className="dt-chip dt-chip-accent">{method}</span>
          </div>
          <h4 style={{ marginTop: 11, fontSize: 15, fontWeight: 650, letterSpacing: '-0.01em', color: 'var(--dt-ink-strong)', wordBreak: 'break-all' }}>
            {name}
          </h4>
        </div>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, flex: '0 0 auto', fontSize: 12, fontWeight: 600, color: STATE_COLOR[state] }}>
          <span style={{ width: 6, height: 6, borderRadius: '9999px', background: STATE_COLOR[state] }} />
          {stateLabel ?? labels[state]}
        </span>
      </div>
      <p style={{
        marginTop: 12, fontSize: 13, lineHeight: 1.5, color: 'var(--dt-muted-strong)',
        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
      }}>
        {description}
      </p>
      <div style={{ marginTop: 14, paddingTop: 13, borderTop: '1px solid var(--dt-divider)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <code style={{ fontFamily: 'var(--dt-font-mono)', fontSize: 12, color: 'var(--dt-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {path}
        </code>
      </div>
      <style>{'.dt-tool-card:hover{box-shadow:var(--dt-ring), var(--dt-shadow-md)}.dt-chip{font-family:var(--dt-font-mono);font-size:11px;font-weight:600;letter-spacing:.02em;padding:3px 8px;border-radius:var(--dt-radius-sm);background:var(--dt-surface-sunken)}.dt-chip-muted{color:var(--dt-muted-strong)}.dt-chip-accent{color:var(--dt-accent)}'}</style>
    </article>
  );
}
