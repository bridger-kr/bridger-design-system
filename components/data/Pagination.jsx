// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/data/Pagination.tsx
// Regenerate: pnpm generate

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { forwardRef } from 'react';
import { cx } from '../lib/cx.jsx';
import { Icon } from '../lib/icon.jsx';
import { useDSMessages } from '../locale/DSLocaleProvider.jsx';
/** Pagination — prev/next plus compact page numbers with an ellipsis. */
export const Pagination = forwardRef(function Pagination({ page = 1, pageCount = 1, onChange, navLabel, previousLabel, nextLabel, className, style, ...rest }, ref) {
    const messages = useDSMessages();
    const go = (targetPage) => { if (targetPage >= 1 && targetPage <= pageCount && targetPage !== page)
        onChange?.(targetPage); };
    const pages = [];
    const add = (targetPage) => pages.push(targetPage);
    if (pageCount <= 7) {
        for (let i = 1; i <= pageCount; i += 1)
            add(i);
    }
    else {
        add(1);
        if (page > 3)
            add('…');
        for (let i = Math.max(2, page - 1); i <= Math.min(pageCount - 1, page + 1); i += 1)
            add(i);
        if (page < pageCount - 2)
            add('…');
        add(pageCount);
    }
    return (<nav ref={ref} {...rest} className={cx('dt-pagination', className)} style={style} aria-label={navLabel ?? messages.pagination.nav}>
      <button className="dt-pagination-arrow" onClick={() => go(page - 1)} disabled={page <= 1} aria-label={previousLabel ?? messages.pagination.previous}>
        <Icon icon={ChevronLeft}/>
      </button>
      {pages.map((pageItem, index) => pageItem === '…'
            ? <span key={`e${index}`} className="dt-pagination-ellipsis">…</span>
            : <button key={pageItem} className="dt-pagination-cell" onClick={() => go(pageItem)} aria-current={pageItem === page ? 'page' : undefined}>{pageItem}</button>)}
      <button className="dt-pagination-arrow" onClick={() => go(page + 1)} disabled={page >= pageCount} aria-label={nextLabel ?? messages.pagination.next}>
        <Icon icon={ChevronRight}/>
      </button>
    </nav>);
});
Pagination.displayName = 'Pagination';
