import * as React from 'react';

export interface SidebarItem {
  label: string;
  icon?: React.ReactNode;
  href?: string;
  active?: boolean;
  /** Trailing count (e.g. tool count), rendered tabular-mono. */
  badge?: React.ReactNode;
}
export interface SidebarSection {
  heading?: string;
  items: SidebarItem[];
}
export interface SidebarProps {
  /** Brand block for the header (e.g. <BrandLogo/>). */
  brand?: React.ReactNode;
  sections: SidebarSection[];
  footer?: React.ReactNode;
  width?: number;
  style?: React.CSSProperties;
}

/**
 * Console primary nav — flat column, active item marked by a persimmon left bar.
 * @startingPoint section="Navigation" subtitle="Console nav rail" viewport="260x440"
 */
export function Sidebar(props: SidebarProps): React.JSX.Element;
