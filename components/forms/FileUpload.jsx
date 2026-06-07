import React from 'react';

function fmtSize(bytes) {
  if (bytes == null) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

/**
 * Drop area for uploading an OpenAPI spec (or any file). A dashed hairline well —
 * never a soft-shadow card. Idle / drag-over / filled states. Calls onFiles with
 * the FileList. In the filled state, shows name + size with a remove control.
 */
export function FileUpload({
  label, accept = '.json,.yaml,.yml', hint = 'OpenAPI 스펙 · JSON 또는 YAML', file, onFiles, onRemove, id, style,
}) {
  const [drag, setDrag] = React.useState(false);
  const inputRef = React.useRef(null);
  const fId = id || 'fu';

  const handle = (files) => { if (files && files.length) onFiles?.(files); };

  return (
    <div style={{ display: 'grid', gap: 7, ...style }}>
      {label ? <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--dt-muted-strong)' }}>{label}</span> : null}

      {file ? (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
          background: 'var(--dt-surface)', border: '1px solid var(--dt-border-strong)', borderRadius: 'var(--dt-radius-lg)',
        }}>
          <span style={{
            width: 34, height: 34, flex: '0 0 auto', display: 'grid', placeItems: 'center',
            borderRadius: 'var(--dt-radius-md)', background: 'var(--dt-tint-accent)', color: 'var(--dt-accent)',
          }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="M14 2v6h6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: 'var(--dt-font-mono)', fontSize: 13, fontWeight: 600, color: 'var(--dt-ink-strong)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</div>
            <div style={{ fontFamily: 'var(--dt-font-mono)', fontSize: 11, color: 'var(--dt-muted)', marginTop: 2 }}>{fmtSize(file.size)} · 업로드 완료</div>
          </div>
          <button
            type="button"
            onClick={onRemove}
            aria-label="제거"
            style={{ flex: '0 0 auto', width: 30, height: 30, display: 'grid', placeItems: 'center', border: 'none', background: 'var(--dt-surface-sunken)', borderRadius: 'var(--dt-radius-sm)', color: 'var(--dt-muted-strong)', cursor: 'pointer' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </button>
        </div>
      ) : (
        <label
          htmlFor={fId}
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => { e.preventDefault(); setDrag(false); handle(e.dataTransfer.files); }}
          style={{
            display: 'grid', placeItems: 'center', gap: 8, padding: '26px 20px', textAlign: 'center', cursor: 'pointer',
            borderRadius: 'var(--dt-radius-lg)',
            border: `1.5px dashed ${drag ? 'var(--dt-accent)' : 'var(--dt-border-strong)'}`,
            background: drag ? 'var(--dt-tint-accent)' : 'var(--dt-surface-sunken)',
            transition: 'background-color var(--dt-motion-fast), border-color var(--dt-motion-fast)',
          }}
        >
          <span style={{ color: drag ? 'var(--dt-accent)' : 'var(--dt-muted)' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 16V4m0 0L7 9m5-5l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </span>
          <span style={{ fontSize: 13.5, color: 'var(--dt-ink-strong)' }}>
            <span style={{ fontWeight: 600, color: 'var(--dt-accent)' }}>파일 선택</span> 또는 끌어다 놓기
          </span>
          <span style={{ fontFamily: 'var(--dt-font-mono)', fontSize: 11, color: 'var(--dt-muted)' }}>{hint}</span>
          <input ref={inputRef} id={fId} type="file" accept={accept} onChange={(e) => handle(e.target.files)} style={{ display: 'none' }} />
        </label>
      )}
    </div>
  );
}
