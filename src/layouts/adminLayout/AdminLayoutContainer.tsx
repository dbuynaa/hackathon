"use client";

import React, { ReactNode } from "react";
import { Layout } from "antd";
import { AdminHeader } from ".";

const { Content } = Layout;

type props = {
  title: string;
  icon: ReactNode;
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

export function AdminLayoutContainer({ children, title, icon }: props) {
  return (
    <Layout className="px-md gap-lg pb-lg">
      <AdminHeader title={title} icon={icon} />
      <Content className=" bg-white p-md rounded-lg ">{children}</Content>
    </Layout>
  );
}
