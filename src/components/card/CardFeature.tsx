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
import { Post } from '@/graphql/generated';
import dayjs from 'dayjs';
import Link from 'next/link';
import { sourceFile } from '@/utils/file/sourceFile';
import { getVideoDuration } from '@/utils/file/videoDuration';
import { Can } from '@/layouts/common';

// content = text, VIDEO, image => icon
// rank = default', 'new', 'gold', 'silver', 'bronze','other', 'special = icon => function
// size = large, middle, small

type CardFeatureProps = {
  className?: string;
  content?: 'TEXT' | 'VIDEO' | 'IMAGE';
  rank?: 'new' | 'gold' | 'silver' | 'bronze' | 'other' | 'special';
  data?: Post;
  refetch?: () => void;
};
export function CardFeature(props: CardFeatureProps) {
  const { className, content, rank, data, refetch } = props;
  const [isCollectionModal, setCollectionModal] = useState(false);
  const [duration, setDuration] = useState<any>('00:00');
  const [thumbnail, setThumbnail] = useState<any>('');

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
      className={`${className && className}`}
      key={data?.id}
      href={isCollectionModal ? {} : `/post/${data?.id || ''}`}
    >
      <div
        style={{
          background: `url("${
            thumbnail ||
            sourceFile({
              fileKey: data?.cover,
              type: 'IMAGE',
            })?.url?.toString() ||
            ''
          }"), lightgray 50% / cover no-repeat`,
        }}
        className={`flex flex-col justify-between bg-cover bg-center w-full h-min-[316px] lg:h-[100%] shadow-sm rounded-xxs`}
      >
        <div className={`flex ${rank ? 'justify-between' : 'justify-end'}`}>
          {rank ? (
            <div className={`inline-block mt-[20px] ml-[20px]`}>
              <Image
                className={`h-[64px] w-[64px]`}
                src={`/assets/images/card/rank_${rank}.png`}
                alt={''}
                preview={false}
              />
            </div>
          ) : null}
          <Can I="create" a="Landing_Collection">
            <div className={`inline-block mt-[20px] mr-[20px]`}>
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
              />
            </div>
          </Can>
        </div>

        <div className={` p-lg`}>
          <div className={`flex flex-col gap-xxs`}>
            {data?.categories && (
              <div className="flex gap-xxs items-center">
                {data?.categories?.[0]?.isPaid && (
                  <IoLockClosed className="text-warning text-h5" />
                )}
                <Tag size="medium" color="mint">
                  {data?.categories?.[0]?.name || ''}
                </Tag>
                {data?.categories?.[1] &&
                  data?.categories?.[0].code !== '1021' &&
                  data?.categories?.[0].code !== '1023' && (
                    <Tag size="medium" color="mint">
                      {data?.categories?.[1]?.name || ''}
                    </Tag>
                  )}
              </div>
            )}

            <p
              className={`line-clamp-2 text-h6 font-bold tracking-wider text-white`}
            >
              {data?.title || ''}
            </p>

            <div className="flex flex-row justify-between">
              <div className="flex items-center gap-xxs">
                <IoCalendarClearOutline
                  className=" text-neutral-200"
                  fontSize="22px'"
                />
                <Typography
                  className="text-neutral-200 font-normal"
                  base="Subtitle2"
                >
                  {`${dayjs(data?.publishDate).format('YYYY.MM.DD')}`}
                </Typography>
              </div>
              {content === 'VIDEO' && (
                <Button
                  className={`bg-neutral-800 flex justify-center rounded-sm h-[32px] shadow-sm `}
                  size="small"
                  type="primary"
                  icon={
                    <IoPlayOutline className="text-white" fontSize="18px" />
                  }
                >
                  <Typography className={`font-medium text-white text-caption`}>
                    {duration || '00:00'}
                  </Typography>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      {isCollectionModal ? (
        <CollectionModal
          getCollectionModal={isCollectionModal}
          setCollectionModal={setCollectionModal}
          refetch={refetch}
          post={data as Post}
        />
      ) : null}
    </Link>
  );
}
