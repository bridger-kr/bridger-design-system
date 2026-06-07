import type { CSSProperties, HTMLAttributes } from 'react';

type PageItem = number | '…';

export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange' | 'style'> {
  page?: number;
  pageCount?: number;
  onChange?: (page: number) => void;
  style?: CSSProperties;
}

/** Pagination — prev/next plus compact page numbers with an ellipsis. */
export function Pagination({ page = 1, pageCount = 1, onChange, style, ...rest }: PaginationProps) {
  const go = (targetPage: number) => { if (targetPage >= 1 && targetPage <= pageCount && targetPage !== page) onChange?.(targetPage); };
  const pages: PageItem[] = [];
  const add = (targetPage: PageItem) => pages.push(targetPage);

  if (pageCount <= 7) { for (let i = 1; i <= pageCount; i += 1) add(i); }
  else {
    add(1);
    if (page > 3) add('…');
    for (let i = Math.max(2, page - 1); i <= Math.min(pageCount - 1, page + 1); i += 1) add(i);
    if (page < pageCount - 2) add('…');
    add(pageCount);
  }

  const cell = (active: boolean): CSSProperties => ({
    minWidth: 32, height: 32, padding: '0 8px', borderRadius: 'var(--dt-radius-sm)', border: 'none', cursor: 'pointer',
    fontSize: 13, fontWeight: 600, fontVariantNumeric: 'tabular-nums',
    background: active ? 'var(--dt-accent)' : 'transparent',
    color: active ? 'var(--dt-accent-ink)' : 'var(--dt-muted-strong)',
  });
  const arrow = (disabled: boolean): CSSProperties => ({ ...cell(false), opacity: disabled ? 0.4 : 1, cursor: disabled ? 'not-allowed' : 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' });

  return (
    <nav {...rest} style={{ display: 'inline-flex', alignItems: 'center', gap: 2, ...style }} aria-label="페이지">
      <button style={arrow(page <= 1)} onClick={() => go(page - 1)} disabled={page <= 1} aria-label="이전">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      {pages.map((pageItem, index) => pageItem === '…'
        ? <span key={`e${index}`} style={{ minWidth: 22, textAlign: 'center', color: 'var(--dt-muted)' }}>…</span>
        : <button key={pageItem} style={cell(pageItem === page)} onClick={() => go(pageItem)} aria-current={pageItem === page ? 'page' : undefined}>{pageItem}</button>)}
      <button style={arrow(page >= pageCount)} onClick={() => go(page + 1)} disabled={page >= pageCount} aria-label="다음">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
    </nav>
  );
}
