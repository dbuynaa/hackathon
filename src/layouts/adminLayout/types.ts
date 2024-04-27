import { MenuDividerType } from 'antd/es/menu/hooks/useItems';
import * as React from 'react';
import { Action, Subject } from '@/lib/casl/acl';

export type NavSectionTitle = {
  key: string;
  auth?: boolean;
  action?: Action;
  subject?: Subject;
  sectionTitle: string;
};

export type NavGroup = {
  key: string;
  label?: JSX.Element | string;
  icon?: React.ReactNode;
  action?: Action;
  subject?: Subject;
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
  action?: Action;
  subject?: Subject;
  auth?: boolean;
  disabled?: boolean;
  badgeContent?: string;
  externalLink?: boolean;
  openInNewTab?: boolean;
};

export type VerticalNavItemsType = (NavLink | NavGroup | NavSectionTitle)[];
