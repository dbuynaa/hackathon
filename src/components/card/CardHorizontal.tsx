/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect } from 'react';
import { Image } from 'antd';

import { ButtonIcon, Typography, Tag } from '@/components';
import {
  IoBookmarkSharp,
  IoBookmarkOutline,
  IoCalendarClearOutline,
  IoLockClosed,
} from 'react-icons/io5';
import { CollectionModal } from '@/app/collection/components';
import Link from 'next/link';
import { Post } from '@/graphql/generated';
import dayjs from 'dayjs';
import { sourceFile } from '@/utils/file/sourceFile';
import { Can } from '@/layouts/common';

type CardHorizontalProps = {
  className?: string;
  content?: 'TEXT' | 'VIDEO' | 'IMAGE';
  rank?: 'new' | 'gold' | 'silver' | 'bronze' | 'other' | 'special';
  size?: 'large' | 'middle' | 'small';
  data?: Post;
  bookmarkDisabled?: boolean;
  collectionCount?: number;
  refetch?: () => void;
};
export const CardHorizontal = (props: CardHorizontalProps) => {
  const { data, className, rank, bookmarkDisabled, collectionCount, refetch } =
    props;

  const [thumbnail, setThumbnail] = useState<any>('');
  const [isCollectionModal, setCollectionModal] = useState(false);

  const category = data?.categories?.find(
    (item) => !item?.order?.includes('/'),
  );
  const subCategory = data?.categories?.find(
    (item) => item?.order?.includes('/'),
  );

  useEffect(() => {
    if (data?.type === 'VIDEO') {
      setThumbnail(
        sourceFile({
          fileKey: data?.thumbnail,
          type: 'IMAGE',
        })?.url?.toString() || '',
      );
    }
  }, [data]);

  return (
    <Link
      key={data?.id}
      href={
        bookmarkDisabled
          ? {}
          : isCollectionModal
          ? {}
          : `/post/${data?.id || ''}`
      }
      className={`flex flex-col gap-xs w-full ${className ? className : ''}`}
    >
      <div className="grid grid-flow-col gap-sm justify-between">
        <div className="flex flex-col gap-xs">
          <div className="flex gap-xxs items-center">
            {category?.isPaid && (
              <IoLockClosed className="text-warning text-subtitle2" />
            )}
            <Tag size="mini" color="mint">
              {category?.name || ''}
            </Tag>
            {subCategory &&
              category?.code !== '1021' &&
              category?.code !== '1023' && (
                <Tag size="mini" color="mint">
                  {subCategory?.name}
                </Tag>
              )}
          </div>
          <p className=" line-clamp-3 whitespace-normal text-subtitle2 font-bold tracking-wider min-w-[200px] max-w-[200px]">
            {data?.title || ''}
          </p>
        </div>
        <div
          className="bg-cover bg-center rounded-xxs h-[100px] w-[124px]  shadow-sm"
          style={{
            background: `url('${
              thumbnail ||
              sourceFile({
                fileKey: data?.cover,
                type: 'IMAGE',
              })?.url?.toString() ||
              ''
            }'), lightgray 50% / cover no-repeat`,
          }}
        >
          {rank && (
            <div className={`inline-block ${'mt-tiny ml-tiny'}`}>
              <Image
                className={`${'h-[38px] w-[38px]'}`}
                src={`/assets/images/card/rank_${rank}.png`}
                alt={''}
                preview={false}
              />
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-flow-col justify-between">
        <div className="flex items-center gap-xxs ">
          <IoCalendarClearOutline className=" text-secondary" fontSize="13px" />
          <Typography className="text-secondary" base="Caption">
            {`${dayjs(data?.publishDate).format('YYYY.MM.DD')}`}
          </Typography>
        </div>
        <div>
          <Can I="create" a="Landing_Collection">
            <ButtonIcon
              className="h-md w-md rounded-xxs shadow-sm"
              size="small"
              type="text"
              disabled={bookmarkDisabled}
              icon={
                collectionCount ? (
                  <IoBookmarkSharp className="text-primary" />
                ) : (
                  <IoBookmarkOutline className="text-primary" />
                )
              }
              onClick={(e) => {
                if (!bookmarkDisabled) {
                  e.preventDefault();
                  e.stopPropagation();
                  setCollectionModal(true);
                }
              }}
            />
          </Can>
        </div>
      </div>
      {isCollectionModal ? (
        <CollectionModal
          getCollectionModal={isCollectionModal}
          setCollectionModal={setCollectionModal}
          post={data as Post}
          refetch={refetch}
        />
      ) : null}
    </Link>
  );
};
