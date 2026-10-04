// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/feedback/Spinner.tsx
// Regenerate: pnpm generate

import { useId } from 'react';
export function Spinner({ size = 18, stroke = 2, color = 'var(--dt-accent)', style }) {
    useId();
    return (<span style={{ display: 'inline-flex', ...style }} role="status" aria-label="로딩 중">
      <svg className="dt-spinner-svg" width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={stroke} style={{ color: 'var(--dt-border-strong)', opacity: 0.5 }}/>
        <path d="M12 3a9 9 0 0 1 9 9" stroke={color} strokeWidth={stroke} strokeLinecap="round"/>
      </svg>
    </span>);
}
