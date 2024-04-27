/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import { Skeleton } from 'antd';

type CardVerticalSkeletonProps = {
  className?: string;
};
export const CardVerticalSkeleton = (props: CardVerticalSkeletonProps) => {
  const { className } = props;

  return (
    <div className={`inline-block ${className ? className : ''}`}>
      <Skeleton.Button
        active
        size="large"
        shape="round"
        className={`bg-cover bg-center rounded-xxs shadow-sm h-[192px] w-full`}
      />

      <div className={`mt-xs flex flex-col gap-xxs`}>
        <div className="flex">
          <Skeleton paragraph={{ rows: 2 }} active />
        </div>
      </div>
    </div>
  );
};
