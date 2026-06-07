import * as React from 'react';

export interface BreadcrumbItem { label: React.ReactNode; href?: string; }
export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  style?: React.CSSProperties;
}

/** Breadcrumb trail — last item is the current page. */
export function Breadcrumb(props: BreadcrumbProps): React.JSX.Element;
