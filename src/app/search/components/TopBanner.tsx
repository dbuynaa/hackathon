"use client";

import { Typography } from "@/components";
import React from "react";

type Props = {
  title: string;
  count: number;
};

export const TopBanner = ({ title, count }: Props) => {
  return (
    <div
      className="flex items-center justify-center bg-cover bg-center 
      w-full h-[135px] xs:h-[177px]
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
          {title || ""}
        </Typography>
        {/* <Typography base="Subtitle2" weight="medium" className="text-white/70">
          {`${title}${count}件紹介しています`}
        </Typography> */}
      </div>
    </div>
  );
};
