import { MenuDividerType } from 'antd/es/menu/hooks/useItems';
import * as React from 'react';

export type NavSectionTitle = {
  key: string;
  auth?: boolean;
  sectionTitle: string;
};

export type NavGroup = {
  key: string;
  label?: JSX.Element | string;
  icon?: React.ReactNode;
  auth?: boolean;
  isOpen?: boolean;
  badgeContent?: string;
  type?: MenuDividerType;
  onClick?: () => void;
  children?: (NavGroup | NavLink)[];
};

export type NavLink = {
  key: string;
  label: JSX.Element | string;
  icon?: React.ReactNode;
  onClick: () => void;
  path?: string;
  auth?: boolean;
  disabled?: boolean;
  badgeContent?: string;
  externalLink?: boolean;
  openInNewTab?: boolean;
};

export type VerticalNavItemsType = (NavLink | NavGroup | NavSectionTitle)[];
