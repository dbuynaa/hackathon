'use client';

import React from 'react';
import {
  Avatar,
  ReactQuillCustomView,
  Result,
  Tag,
  Typography,
} from '@/components';
import { Button, Divider, Image } from 'antd';
import { IoCalendarClearOutline, IoPerson } from 'react-icons/io5';
import { FileSizeEnum, Post } from '@/graphql/generated';
import { useSession } from 'next-auth/react';
import { sourceFile } from '@/utils/file/sourceFile';
import Link from 'next/link';
import dayjs from 'dayjs';

type Props = {
  post: Post;
  paid: boolean;
};

export function PostDetailImage({ post, paid }: Props) {
  const { data: session } = useSession();

  return (
    <>
      <div className="w-full flex justify-center">
        <Image
          className="w-fit max-h-[318px]"
          src={
            sourceFile({
              fileKey: post?.cover,
              size: FileSizeEnum.MEDIUM,
            })?.url
          }
          alt={''}
          preview={false}
        />
      </div>
      {/*  pb-sm */}
      <div className="flex flex-col gap-sm ">
        <Typography base="H4" weight="bold" className="text-primary">
          {post?.title}
        </Typography>
        {(post?.categories || [])?.map(
          (item) =>
            item.parentCode !== '1021' &&
            item.parentCode !== '1023' && (
              <Tag
                key={item?.id}
                color={'mint'}
                size={'large'}
                className="w-fit"
              >
                {item?.name || ''}
              </Tag>
            ),
        )}
      </div>
      <div className="flex gap-lg border-b-2 border-brand pb-md">
        <Avatar
          src={post?.author?.image && post.author?.image}
          icon={!post?.author?.image && <IoPerson />}
          size="default"
        />
        <div className="flex gap-sm items-center">
          <Typography weight="bold" base="Subtitle2" className="text-primary">
            {post.author?.publishName || post?.author?.name}
          </Typography>
          <Divider className="m-[0] border-primary" type="vertical" />
          <Typography className="flex gap-xxs items-center text-secondary">
            <IoCalendarClearOutline />
            {post?.publishDate
              ? `${dayjs(post?.publishDate).format('YYYY.MM.DD')}`
              : ''}
          </Typography>
        </div>
      </div>
      <div className="flex flex-col gap-lg max-w-[1440px] ">
        <ReactQuillCustomView
          value={post?.content}
          height={paid ? (session?.user?.id ? undefined : 50) : undefined}
          className={`[&_.ql-editor]:p-none ${
            paid
              ? session?.user?.id
                ? ''
                : 'absolute h-[280px]  lg:max-w-[60%] xl:max-w-[780px] [&>.ql-container>.ql-editor]:overflow-hidden'
              : ''
          }`}
        />
        <Result
          className={
            paid
              ? session?.user?.id
                ? 'hidden'
                : 'relative bg-gradient-to-t from-white via-white  w-full h-[523px] flex flex-col  justify-center top-[-20px]'
              : 'hidden'
          }
          icon={
            <Image
              alt="Result icon"
              preview={false}
              width={250}
              height={200}
              className="flex items-center"
              src={`/assets/images/empty/no-connection.png`}
            />
          }
          type="success"
          reloadBtn={
            <Link href={'/contact'}>
              <Button className="m-[0]">お問い合わせ</Button>
            </Link>
          }
          title="この記事は有料会員限定です。"
          subTitle="有料会員になると会員限定の有料記事もお読みいただけます。"
        />
      </div>
    </>
  );
}
