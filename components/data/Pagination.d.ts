import * as React from 'react';

export interface PaginationProps {
  page?: number;
  pageCount?: number;
  onChange?: (page: number) => void;
  style?: React.CSSProperties;
}

/** Page navigation — prev/next + compact numbers with ellipsis. */
export function Pagination(props: PaginationProps): React.JSX.Element;
