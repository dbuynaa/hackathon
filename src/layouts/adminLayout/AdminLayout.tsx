'use client';

import React, { useState } from 'react';
import { Layout } from 'antd';
import { AdminSidebar } from '.';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout className="bg-neutral-100 min-w-[1280px] min-h-screen">
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      {children}
    </Layout>
  );
}
