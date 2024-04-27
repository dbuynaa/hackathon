'use client';

import React, { useEffect, useState } from 'react';
import { Typography } from '@/components';
import { Input } from 'antd';
import { IoSearchOutline } from 'react-icons/io5';
import { useSearchArray } from '@/utils/useSearchQuery';
import { useSearchParams } from 'next/navigation';
import useDebounce from '@/utils/useDebounce';

type Props = {
  title: string;
  count: number;
  subCategory?: string;
};

export const TopSearchBanner = ({ title, count, subCategory }: Props) => {
  const onSearch = useSearchArray();
  const searchParams = useSearchParams();
  const [text, setText] = useState(searchParams?.get('search'));
  const debouncedSearchTerm = useDebounce(text || '', 500);

  useEffect(() => {
    onSearch({
      search: text,
      current: searchParams?.get('current'),
      take: searchParams?.get('take'),
    });
  }, [debouncedSearchTerm]);
  return (
    <div
      className="flex items-center justify-center bg-cover bg-center 
      w-full h-[205px] xs:h-[247px]
      p-lg xs:px-xl
      "
      style={{
        background: `url("/assets/images/landing-top-search-bg.png"), lightgray 50% / cover no-repeat`,
      }}
    >
      <div
        className={`flex flex-col items-center max-w-screen-xl mx-auto gap-sm w-full`}
      >
        <Typography base="H5" weight="bold" className="text-white">
          {title || ''}
        </Typography>
        <Typography base="Subtitle2" weight="medium" className="text-white/70">
          {`${
            text || subCategory || title
          }に関する情報を${count}件紹介しています`}
        </Typography>
        <Input
          className="w-full flex text-subtitle2 items-center rounded-md  text-secondary  border-none max-w-[780px]"
          placeholder="気になるワードを入力してください"
          prefix={<IoSearchOutline className="flex text-h5 text-brand" />}
          onChange={(e) => setText(e.target.value)}
          value={text || ''}
        />
      </div>
    </div>
  );
};
