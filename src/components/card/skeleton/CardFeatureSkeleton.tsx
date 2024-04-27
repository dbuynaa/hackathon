'use client';

import React from 'react';
import { Skeleton } from 'antd';

type CardFeatureSkeletonProps = {
  className?: string;
};
export function CardFeatureSkeleton(props: CardFeatureSkeletonProps) {
  const { className } = props;

  return (
    <div className={`${className && className}`}>
      <Skeleton.Button
        className={`flex flex-col justify-between bg-cover bg-center w-full h-min-[316px] lg:h-[100%] shadow-sm rounded-xxs`}
        active
        size="large"
        shape="default"
      />
    </div>
  );
}
