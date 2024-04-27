/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect } from 'react';
import { Image } from 'antd';

import { Button, ButtonIcon, Typography, Tag } from '@/components';
import { CollectionModal } from '@/app/collection/components';
import {
  IoBookmarkOutline,
  IoCalendarClearOutline,
  IoPlayOutline,
  IoBookmarkSharp,
  IoLockClosed,
} from 'react-icons/io5';
import { useBreakPoint } from '@/hooks';
import { Post } from '@/graphql/generated';
import dayjs from 'dayjs';
import Link from 'next/link';
import { sourceFile } from '@/utils/file/sourceFile';
import { getVideoDuration } from '@/utils/file/videoDuration';
import { useSession } from 'next-auth/react';
import { Can } from '@/layouts/common';

// content = text, VIDEO, image => icon
// rank = default', 'new', 'gold', 'silver', 'bronze','other', 'special = icon => function
// size = large,'middle', small

type CardVerticalProps = {
  // origin?: 'horizontal' | 'vertical' | 'feature';
  className?: string;
  content?: 'TEXT' | 'VIDEO' | 'IMAGE';
  rank?: 'new' | 'gold' | 'silver' | 'bronze' | 'other' | 'special';
  size?: 'large' | 'small';
  data?: Post;
  bookmark?: boolean;
  bookmarkDisabled?: boolean;
  innerStyle?: boolean;
  refetch?: () => void;
};
export const CardVertical = (props: CardVerticalProps) => {
  const point = useBreakPoint();
  const { data: session } = useSession();

  const {
    className,
    rank,
    size,
    content,
    data,
    bookmark,
    innerStyle,
    bookmarkDisabled,
    refetch,
  } = props;
  const [isCollectionModal, setCollectionModal] = useState(false);
  const [duration, setDuration] = useState<any>('00:00');
  const [thumbnail, setThumbnail] = useState<any>('');

  const isLarge = size
    ? size === 'large'
    : point && ['md', 'lg', 'xl', '2xl'].includes(point);

  const category = data?.categories?.find(
    (item) => !item?.order?.includes('/'),
  );
  const subCategory = data?.categories?.find(
    (item) => item?.order?.includes('/'),
  );

  useEffect(() => {
    if (content === 'VIDEO') {
      getVideoDuration(
        sourceFile({
          fileKey: data?.cover,
          type: 'VIDEO',
        })?.url?.toString() || '',
      )
        .then((seconds) => {
          setDuration(seconds || '');
        })
        .catch((error) => {
          console.error(error);
        });
      setThumbnail(
        sourceFile({
          fileKey: data?.thumbnail,
          type: 'IMAGE',
        })?.url?.toString() || '',
      );
    }
  }, [content, data]);

  return (
    <Link
      className={`inline-block ${className ? className : ''}`}
      key={data?.id}
      href={isCollectionModal ? {} : `/post/${data?.id || ''}`}
    >
      <div
        style={{
          background: `url('${
            thumbnail ||
            sourceFile({
              fileKey: data?.cover,
              type: 'IMAGE',
            })?.url?.toString() ||
            ''
          }'), lightgray 50% / cover no-repeat`,
          marginRight: innerStyle ? 30 : undefined,
        }}
        className={`bg-cover bg-center rounded-xxs shadow-sm ${
          isLarge ? 'h-[192px]' : 'h-[134px]'
        }`}
      >
        <div className={`flex ${rank ? 'justify-between' : 'justify-end'} `}>
          {rank && (
            <div
              className={`inline-block ${
                isLarge ? 'mt-xxs ml-xxs' : 'mt-tiny ml-tiny'
              }`}
            >
              <Image
                className={`${
                  isLarge ? 'h-[64px] w-[64px]' : 'h-[38px] w-[38px]'
                }`}
                src={`/assets/images/card/rank_${rank}.png`}
                alt={''}
                preview={false}
              />
            </div>
          )}
          {bookmark && (
            <div className={`inline-block mt-xs mr-xs`}>
              <Can I="create" a="Landing_Collection">
                <ButtonIcon
                  className={`rounded-sm shadow-sm bg-brand`}
                  size="small"
                  type="primary"
                  icon={
                    data?.collections?.length ? (
                      <IoBookmarkSharp className="text-white" />
                    ) : (
                      <IoBookmarkOutline className="text-white" />
                    )
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCollectionModal(true);
                  }}
                  disabled={bookmarkDisabled}
                />
              </Can>
            </div>
          )}
        </div>
        {content === 'VIDEO' && (
          <div
            className={`flex justify-end ${
              session?.user.id
                ? isLarge
                  ? rank
                    ? `mr-xs mt-[65px]`
                    : bookmark
                    ? `mr-xs mt-[90px]`
                    : `mr-xs mt-[140px]`
                  : 'mt-[20px] mr-xs'
                : isLarge
                ? rank
                  ? `mr-xs mt-[95px]`
                  : bookmark
                  ? `mr-xs mt-[120px]`
                  : `mr-xs mt-[170px]`
                : 'mt-[50px] mr-xs'
            }`}
          >
            <Button
              className={`inline-block bg-neutral-800 shadow-sm ${
                isLarge ? 'rounded-sm h-[32px]' : 'rounded-xs h-[24px]'
              }`}
              size="small"
              type="primary"
              icon={
                <IoPlayOutline
                  className="text-white"
                  fontSize={`${isLarge ? '18px' : '13px'}`}
                />
              }
            >
              <Typography
                className={`font-medium  ${
                  isLarge ? 'text-white text-caption' : 'text-white text-small'
                }`}
              >
                {duration || '00:00'}
              </Typography>
            </Button>
          </div>
        )}
      </div>

      <div className={`mt-xs flex flex-col ${isLarge ? 'gap-xs' : 'gap-xxs'}`}>
        {data?.categories && (
          <div className="flex gap-xxs w-full flex-wrap 2xs:items-center xs:items-start md:items-start xs:justify-center md:justify-start 2xs:flex-row xs:flex-col md:flex-row ">
            <div
              className="flex gap-xxs items-center"
              style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
            >
              {category?.isPaid && (
                <IoLockClosed className="text-warning text-h5" />
              )}
              <Tag size={isLarge ? 'small' : 'mini'} color="mint">
                {category?.name || ''}
              </Tag>
            </div>

            {subCategory &&
              category?.code !== '1021' &&
              category?.code !== '1023' && (
                <Tag size={isLarge ? 'small' : 'mini'} color="mint">
                  {subCategory?.name}
                </Tag>
              )}
          </div>
        )}
        <p
          className={`line-clamp-2 whitespace-normal ${
            isLarge ? 'text-subtitle2' : 'text-body'
          } font-bold tracking-wider`}
        >
          {data?.title || ''}
        </p>

        <div className="flex flex-row items-center gap-xxs ">
          <IoCalendarClearOutline
            className=" text-secondary"
            fontSize={`${isLarge ? '18px' : '13px'}`}
          />
          <Typography
            className="text-secondary"
            base={`${isLarge ? 'Body' : 'Small'}`}
          >
            {`${dayjs(data?.publishDate).format('YYYY.MM.DD')}`}
          </Typography>
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
