'use client';

import React from 'react';
import { MenuProps, Menu } from 'antd';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { Category } from '@/graphql/generated';

type Props = {
  className?: string;
  signed?: boolean;
  categories?: Category[] | undefined;
};
export const HeaderMenu = (props: Props) => {
  const { className } = props;
  const router = useRouter();
  const params = useParams<{ cid: string }>();
  const pathname = usePathname();

  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'top') {
      router.push('/');
    } else {
      router.push(`/category/${e.key}`);
    }
  };

  return (
    <div className={`ml-[-92px] xs:ml-none  ${className}`}>
      <Menu
        className="overflow-x-auto overflow-y-hidden whitespace-nowrap leading-none border-none divide-dashed divide-primary divide-x items-center"
        onClick={onClick}
        selectedKeys={[
          params?.cid ? params?.cid : pathname === '/' ? 'top' : '',
        ]}
        mode="horizontal"
        items={(props?.categories || []).map((item) => ({
          className:
            'text-subtitle2 font-medium text-secondary p-sm h-[46px] leading-none [&.ant-menu-item-selected]:after:border-b-8 [&.ant-menu-item-selected]:after:border-b-brand',
          key: item.key,
          label: item.name,
        }))}
        disabledOverflow
      />
    </div>
  );
};
