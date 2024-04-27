'use client';

import { useState } from 'react';
import { ButtonIcon, Button } from '@/components';
import { IoAddOutline, IoSearchOutline } from 'react-icons/io5';

import { useRouter, usePathname } from 'next/navigation';

import { HeaderTopSearchModal } from './topSearch';
import { HeaderTopNotification, HeaderTopProfile, Can } from '@/layouts/common';
import { Routes } from '@/config/routes';
import { useSession } from 'next-auth/react';
import { HeaderTopNotificationNotLogin } from '@/layouts/common/topNotification/HeaderTopNotificationNotLogin';

type Props = {
  setVisibleWelcome: (e: boolean) => void;
};

export const HeaderTop = ({ setVisibleWelcome }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [getSearchModal, setSearchModal] = useState(false);

  const pathname = usePathname();
  const searchText = pathname?.includes('search')
    ? pathname?.split('/')?.[pathname?.split('/')?.length - 1] || ''
    : '';
  return (
    <div className="justify-end xs:gap-sm h-[86px] items-center flex flex-row">
      {/* <Input
        className="hidden md:flex text-subtitle2 items-center text-secondary bg-surface-secondary border-none [&>input]:bg-surface-secondary rounded-md"
        placeholder="気になるワードを入力してください"
        prefix={<IoSearchOutline className="flex text-h5 text-brand" />}
        onClick={() => setSearchModal(true)}
        value={decodeURIComponent(searchText || '')}
      /> */}
      <div className="gap-xs2 xs:gap-sm flex flex-row">
        <Can I="create" a="Landing_Post">
          <div className="hidden xs:block">
            <Button
              icon={<IoAddOutline className="text-brand" />}
              onClick={() => {
                router.push(`${Routes.Landing_Post.Create?.route}`);
              }}
            >
              投稿を作成
            </Button>
          </div>
        </Can>
        <div>
          <ButtonIcon
            className="rounded-md"
            icon={<IoSearchOutline />}
            onClick={() => setSearchModal(true)}
          />
        </div>
        <Can I="read" a="Admin_Header_Notification">
          <HeaderTopNotification />
        </Can>
        <Can I="read" a="Landing_Notification">
          <HeaderTopNotificationNotLogin />
        </Can>
        <Can I="read" a="Admin_Header">
          <div className="hidden xs:block">
            <Button
              onClick={() => router.push(Routes.Admin_Article.Index.route)}
            >
              管理画面
            </Button>
          </div>
        </Can>
        {session?.user?.id ? <HeaderTopProfile /> : null}
        {!session?.user?.id ? (
          <>
            <HeaderTopNotificationNotLogin />
            <Button
              type="primary"
              className="hidden xs:block"
              onClick={() => setVisibleWelcome(true)}
            >
              ログイン
            </Button>
          </>
        ) : null}
      </div>

      <HeaderTopSearchModal
        getSearchModal={getSearchModal}
        setSearchModal={setSearchModal}
        searchText={decodeURIComponent(searchText || '')}
      />
    </div>
  );
};
