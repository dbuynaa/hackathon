'use client';

import React, { useEffect, useState } from 'react';
import { Typography as AntTypography } from 'antd';
import { styled } from 'styled-components';
import { config } from '@/config';

const StyledTypography = styled(AntTypography.Text)`
  -webkit-text-stroke-width: 1.2px;
  -webkit-text-stroke-color: #83c8df;
`;

export const CardFullBanner = () => {
  const [isScrolled, setScrolled] = useState(false);
  const onScroll = () => {
    if (window.pageYOffset > 86) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="w-full">
      <div className="relative">
        <div
          className={`absolute bottom-xxl  w-full z-10 right-[5px] ${
            isScrolled ? 'hidden' : 'block'
          }`}
        >
          <div className={`max-w-screen-xl mx-auto`}>
            <StyledTypography className="line-clamp-3 sm:text-h8 text-h8 lg:text-h5 font-bold tracking-wider text-white text-right">
              全ての子供たちの健やかな成長を支える
              <br />
              育児x保育x療育の
              <br />
              総合情報メディア
            </StyledTypography>
          </div>
        </div>

        <video
          className="flex items-end pb-lg object-fill w-full max-h-[85.8vh] opacity-95"
          autoPlay
          loop
          muted
          playsInline
          preload="yes"
          controls={false}
          src={`${config.BUCKET_IMAGE_URL}/static/%E3%82%B9%E3%82%BF%E3%82%B7%E3%82%99%E3%82%AA%E3%81%9D%E3%82%89_30s_2%20(1080p).mp4`}
        >
          <source
            src={`${config.BUCKET_IMAGE_URL}/static/%E3%82%B9%E3%82%BF%E3%82%B7%E3%82%99%E3%82%AA%E3%81%9D%E3%82%89_30s_2%20(1080p).mp4`}
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  );
};
