import type { CSSProperties } from 'react';

export interface BrandLogoProps {
  /** Named size or explicit px. */
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  /** Show the persimmon period (the brand detail). */
  period?: boolean;
  lang?: 'ko' | 'en';
  style?: CSSProperties;
}

/**
 * Bridger wordmark. Mark-only (no symbol) — the brand detail is a single
 * persimmon period. Set in Pretendard heavy with tight tracking.
 */
export function BrandLogo({ size = 'md', period = true, lang = 'ko', style }: BrandLogoProps) {
  const fontSize = typeof size === 'number' ? size : (SIZE[size] ?? SIZE.md);
  return (
    <span
      aria-label={lang === 'ko' ? '브릿저' : 'Bridger'}
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        fontFamily: 'var(--dt-font-sans)',
        fontWeight: 780,
        fontSize,
        letterSpacing: '-0.025em',
        lineHeight: 1,
        color: 'var(--dt-ink-strong)',
        userSelect: 'none',
        ...style,
      }}
    >
      Bridger
      {period ? <span style={{ color: 'var(--dt-accent)' }}>.</span> : null}
    </span>
  );
}

const SIZE = { sm: 18, md: 22, lg: 40, xl: 64 };
