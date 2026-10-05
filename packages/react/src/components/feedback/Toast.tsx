import { X } from 'lucide-react';
import type { CSSProperties, ReactNode } from 'react';
import { Icon } from '../../lib/icon';

const DOT = { info: 'var(--dt-cobalt)', success: 'var(--dt-success)', warning: 'var(--dt-warning)', danger: 'var(--dt-danger)' };

export interface ToastProps {
  tone?: keyof typeof DOT;
  title?: ReactNode;
  message?: ReactNode;
  action?: ReactNode;
  onDismiss?: () => void;
  style?: CSSProperties;
}

export function Toast({ tone = 'success', title, message, action, onDismiss, style }: ToastProps) {
  return (
    <div role="status" className="dt-toast" style={{
      display: 'flex', alignItems: 'flex-start', gap: 11, width: 340, maxWidth: '90vw',
      padding: '13px 15px', background: 'var(--dt-surface)',
      borderRadius: 'var(--dt-radius-card)', boxShadow: 'var(--dt-shadow-overlay)',
      ...style,
    }}>
      <span style={{ width: 8, height: 8, borderRadius: 'var(--dt-radius-pill)', marginTop: 5, flex: '0 0 auto', background: DOT[tone] ?? DOT.success }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        {title ? <div style={{ fontSize: 14, fontWeight: 650, color: 'var(--dt-text-strong)' }}>{title}</div> : null}
        {message ? <div style={{ marginTop: title ? 2 : 0, fontSize: 13, lineHeight: 1.5, color: 'var(--dt-text-subtle)' }}>{message}</div> : null}
      </div>
      {action ? <div style={{ flex: '0 0 auto' }}>{action}</div> : null}
      {onDismiss ? (
        <button onClick={onDismiss} aria-label="닫기" style={{ flex: '0 0 auto', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--dt-text-muted)', padding: 2, lineHeight: 0 }}>
          <Icon icon={X} size="sm" />
        </button>
      ) : null}
    </div>
  );
}
