import * as React from 'react';

export interface MenuItem {
  label?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
  divider?: boolean;
}
export interface MenuProps {
  trigger: React.ReactNode;
  items: MenuItem[];
  align?: 'left' | 'right';
  width?: number;
}

/** Dropdown menu — floating raised list with icons, dividers, danger items. */
export function Menu(props: MenuProps): React.JSX.Element;
