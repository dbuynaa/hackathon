'use client';

import React, { ReactNode } from 'react';
import { Layout } from 'antd';
import { AdminHeader } from '.';
import { Route } from '@/config/routes';
import AclPageGuard from '@/components/casl/AclPageGuard';

const { Content } = Layout;

type props = {
  title: string;
  icon: ReactNode;
  parent?: Route;
  children: React.ReactNode;
  acl?: {
    authGuard?: boolean;
    guestGuard?: boolean;
    ability:
      | {
          action?: string;
          subject?: string;
        }
      | undefined;
  };
};

export function AdminLayoutContainer({
  children,
  title,
  icon,
  parent,
  acl,
}: props) {
  return (
    <AclPageGuard
      guestGuard={acl?.guestGuard}
      authGuard={acl?.authGuard}
      aclAbilities={acl?.ability}
    >
      <Layout className="px-md gap-lg pb-lg">
        <AdminHeader title={title} icon={icon} parent={parent} />
        <Content className=" bg-white p-md rounded-lg ">{children}</Content>
      </Layout>
    </AclPageGuard>
  );
}
