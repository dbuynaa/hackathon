'use client';

import React from 'react';
import { Skeleton } from 'antd';

type CardHorizontalSkeletonProps = {
  className?: string;
};
export const CardHorizontalSkeleton = (props: CardHorizontalSkeletonProps) => {
  const { className } = props;

  return (
    <div
      className={`flex flex-col gap-xs w-full ${className ? className : ''}`}
    >
      <div className="grid grid-flow-col gap-sm justify-between">
        <div className="flex flex-col gap-xs">
          <div className="flex">
            <Skeleton.Input active size="small" />
          </div>
          <div className="flex">
            <Skeleton.Input active />
          </div>
        </div>
        <Skeleton.Button
          active
          size="large"
          shape="round"
          className="bg-cover bg-center rounded-xxs h-[100px] w-[124px]  shadow-sm"
        />
      </div>
    </div>
  );
};
