import { ChevronLeft, ChevronRight } from 'lucide-react';
import { forwardRef } from 'react';
import type { CSSProperties, HTMLAttributes } from 'react';
import { Icon } from '../../lib/icon';
import { useDSMessages } from '../../locale/DSLocaleProvider';

type PageItem = number | '…';

export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange' | 'style'> {
  page?: number;
  pageCount?: number;
  onChange?: (page: number) => void;
  /** Accessible names; default to the ambient locale. */
  navLabel?: string;
  previousLabel?: string;
  nextLabel?: string;
  style?: CSSProperties;
}

/** Pagination — prev/next plus compact page numbers with an ellipsis. */
export const Pagination = forwardRef<HTMLElement, PaginationProps>(function Pagination(
  { page = 1, pageCount = 1, onChange,
    navLabel,
    previousLabel,
    nextLabel, style, ...rest },
  ref,
) {  const messages = useDSMessages();

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
    minWidth: 32, height: 32, padding: '0 8px', borderRadius: 'var(--dt-radius-control)', border: 'none', cursor: 'pointer',
    fontSize: 13, fontWeight: 600, fontVariantNumeric: 'tabular-nums',
    background: active ? 'var(--dt-accent)' : 'transparent',
    color: active ? 'var(--dt-accent-ink)' : 'var(--dt-text-subtle)',
  });
  const arrow = (disabled: boolean): CSSProperties => ({ ...cell(false), opacity: disabled ? 0.4 : 1, cursor: disabled ? 'not-allowed' : 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' });

  return (
    <nav ref={ref} {...rest} style={{ display: 'inline-flex', alignItems: 'center', gap: 2, ...style }} aria-label={navLabel ?? messages.pagination.nav}>
      <button style={arrow(page <= 1)} onClick={() => go(page - 1)} disabled={page <= 1} aria-label={previousLabel ?? messages.pagination.previous}>
        <Icon icon={ChevronLeft} />
      </button>
      {pages.map((pageItem, index) => pageItem === '…'
        ? <span key={`e${index}`} style={{ minWidth: 22, textAlign: 'center', color: 'var(--dt-text-muted)' }}>…</span>
        : <button key={pageItem} style={cell(pageItem === page)} onClick={() => go(pageItem)} aria-current={pageItem === page ? 'page' : undefined}>{pageItem}</button>)}
      <button style={arrow(page >= pageCount)} onClick={() => go(page + 1)} disabled={page >= pageCount} aria-label={nextLabel ?? messages.pagination.next}>
        <Icon icon={ChevronRight} />
      </button>
    </nav>
  );
});
Pagination.displayName = 'Pagination';
