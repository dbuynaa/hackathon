'use client';

import React, { useState, useEffect } from 'react';
import { Popover } from 'antd';
import dayjs from 'dayjs';
import { Avatar, Typography } from '@/components';
import {
  IoBookmark,
  IoChevronDownOutline,
  IoChevronForward,
  IoLogOut,
  IoPerson,
  IoPersonOutline,
  IoBriefcase,
  IoHome,
} from 'react-icons/io5';
import Link from 'next/link';
import { Routes } from '@/config/routes';
import { Can } from '@/layouts/common/acl/Can';
import { usePathname } from 'next/navigation';
import { sourceFile } from '@/utils/file/sourceFile';
import { useSession, signOut } from 'next-auth/react';
import { MdPostAdd } from 'react-icons/md';

type Props = {
  setCompanyUpdateModal?: (_e: boolean) => void;
};

export const HeaderTopProfile = (props: Props) => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [dateTimeDisplay, setDateTimeDisplay] = useState('');

  const { setCompanyUpdateModal } = props;

  const pathName = usePathname();
  const isAdmin = pathName.startsWith('/admin');
  useEffect(() => {
    const today = dayjs();
    const curHr = today.hour();
    if (4 < curHr && curHr < 12) {
      setDateTimeDisplay('おはようございます ☀️');
    } else if (12 <= curHr && curHr < 18) {
      setDateTimeDisplay('こんにちは ☀️');
    } else if ((18 <= curHr && curHr < 24) || (0 <= curHr && curHr < 4)) {
      setDateTimeDisplay('こんばんは ☾');
    }
  }, []);

  return (
    <Popover
      placement="bottomRight"
      content={
        <div
          onClick={() => setIsOpen(false)}
          className="w-[264px] flex flex-col p-tiny gap-sm"
        >
          <div className="flex flex-row gap-sm items-center">
            <Avatar
              shape="circle"
              src={
                sourceFile({
                  fileKey: session?.user?.image,
                })?.url
              }
              icon={!session?.user?.image && <IoPersonOutline />}
              className="bg-brand "
              size="large"
            />
            <div className="flex flex-col gap-xxs">
              <Typography className="text-secondary" base="Caption">
                {dateTimeDisplay || 'おはようございます ☀️'}
              </Typography>
              <Typography
                className=" text-primary"
                base="Subtitle2"
                weight="bold"
              >
                {session?.user.name}
              </Typography>
            </div>
          </div>
          <div className="border-t border-secondary"></div>
          {/* トップページ */}
          {isAdmin && (
            <>
              <Link
                href={`${Routes.Landing_Home.Index.route}`}
                className="flex flex-row items-center justify-between "
              >
                <div className="flex flex-row gap-xs2 items-center">
                  <div className="w-[36px] h-[36px] bg-primary-100 rounded-xl grid place-content-center">
                    <IoHome size="18px" className="text-brand" />
                  </div>
                  <Typography
                    className="inline-block"
                    base="Body"
                    weight="medium"
                  >
                    トップページ
                  </Typography>
                </div>
                <IoChevronForward
                  size="16px"
                  className="inline-block text-secondary"
                />
              </Link>
              <div className="border-t border-secondary "></div>
            </>
          )}
          {/* プロフィール */}
          <Link
            href={Routes.Landing_Profile.Index.route}
            className="flex flex-row items-center justify-between"
          >
            <div className="flex flex-row gap-xs2 items-center">
              <div className="w-[36px] h-[36px] bg-primary-100 rounded-xl grid place-content-center">
                <IoPerson size="18px" className="text-brand" />
              </div>
              <Typography className="inline-block" base="Body" weight="medium">
                プロフィール
              </Typography>
            </div>
            <IoChevronForward
              size="16px"
              className="inline-block text-secondary"
            />
          </Link>
          <div className="border-t border-secondary"></div>
          {/* 企業情報 */}
          {setCompanyUpdateModal && (
            <Can I="read" an="Admin_Staff">
              <Link
                href={{}}
                className="flex flex-row items-center justify-between"
                onClick={() => {
                  setCompanyUpdateModal && setCompanyUpdateModal(true);
                }}
              >
                <div className="flex flex-row gap-xs2 items-center">
                  <div className="w-[36px] h-[36px] bg-primary-100 rounded-xl grid place-content-center">
                    <IoPerson size="18px" className="text-brand" />
                  </div>
                  <Typography
                    className="inline-block"
                    base="Body"
                    weight="medium"
                  >
                    企業情報
                  </Typography>
                </div>
                <IoChevronForward
                  size="16px"
                  className="inline-block text-secondary"
                />
              </Link>
              <div className="border-t border-secondary"></div>
            </Can>
          )}
          {/* {setCompanyUpdateModal && (
            <div className="border-t border-secondary"></div>
          )} */}

          {/* 管理画面 */}
          {!isAdmin && (
            <Can I="read" a="Admin_Header">
              <Link
                href={Routes.Admin_Article.Index.route}
                className="flex flex-row items-center justify-between xs:hidden"
              >
                <div className="flex flex-row gap-xs2 items-center">
                  <div className="w-[36px] h-[36px] bg-primary-100 rounded-xl grid place-content-center">
                    <IoBriefcase size="18px" className="text-brand" />
                  </div>
                  <Typography
                    className="inline-block"
                    base="Body"
                    weight="medium"
                  >
                    管理画面
                  </Typography>
                </div>
                <IoChevronForward
                  size="16px"
                  className="inline-block text-secondary"
                />
              </Link>
              <div className="border-t border-secondary xs:hidden"></div>
            </Can>
          )}
          {/* 投稿を作成 */}
          {!isAdmin && (
            <Can I="create" a="Landing_Post">
              <Link
                href={`${Routes.Landing_Post.Create?.route}`}
                className="flex flex-row items-center justify-between xs:hidden"
              >
                <div className="flex flex-row gap-xs2 items-center">
                  <div className="w-[36px] h-[36px] bg-primary-100 rounded-xl grid place-content-center">
                    <MdPostAdd size="18px" className="text-brand" />
                  </div>
                  <Typography
                    className="inline-block"
                    base="Body"
                    weight="medium"
                  >
                    投稿を作成
                  </Typography>
                </div>
                <IoChevronForward
                  size="16px"
                  className="inline-block text-secondary"
                />
              </Link>
              <div className="border-t border-secondary xs:hidden"></div>
            </Can>
          )}
          {/* お気に入り */}
          <Link
            href={Routes.Landing_Collection.Index.route}
            className="flex flex-row items-center justify-between"
          >
            <div className="flex flex-row gap-xs2 items-center">
              <div className="w-[36px] h-[36px] bg-primary-100 rounded-xl grid place-content-center">
                <IoBookmark size="18px" className="text-brand" />
              </div>
              <Typography className="inline-block" base="Body" weight="medium">
                お気に入り
              </Typography>
            </div>
            <IoChevronForward
              size="16px"
              className="inline-block text-secondary"
            />
          </Link>
          <div className="border-t border-secondary"></div>
          {/* ログアウト */}
          <Link
            href={Routes.Landing_Home.Index.route}
            className="flex flex-row items-center justify-between"
            onClick={() => signOut({ callbackUrl: '/', redirect: true })}
          >
            <div className="flex flex-row gap-xs2 items-center">
              <div className="w-[36px] h-[36px] bg-error-100 rounded-xl grid place-content-center">
                <IoLogOut size="18px" className="text-error" />
              </div>
              <Typography className="inline-block" base="Body" weight="medium">
                ログアウト
              </Typography>
            </div>
            <IoChevronForward
              size="16px"
              className="inline-block text-secondary"
            />
          </Link>
        </div>
      }
      arrowContent={<>a</>}
      rootClassName="[&>.ant-popover-arrow]:left-[236px]"
      trigger={['click', 'contextMenu']}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <div className="flex gap-xxs items-center">
        <Avatar
          shape="square"
          src={
            sourceFile({
              fileKey: session?.user?.image,
            })?.url
          }
          icon={!session?.user?.image && <IoPersonOutline />}
          className="bg-brand "
          size="default"
        />
        {isAdmin && (
          <Typography base="Subtitle2" weight="medium" className="text-primary">
            {session?.user?.name}
          </Typography>
        )}
        <IoChevronDownOutline className="flex text-subtitle2 text-secondary" />
      </div>
    </Popover>
  );
};
