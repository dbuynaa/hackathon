"use client";

import React from "react";
import { Image } from "antd";

import {} from "@/graphql/generated";
import Link from "next/link";

type CardFeatureProps = {
  className?: string;
  image?: string;
  id?: string;
};
export function CardFeature(props: CardFeatureProps) {
  const { className, image, id } = props;

  return (
    <Link
      className={`${className && className}`}
      // key={data?.id}
      href={`/product/${id || ""}`}
    >
      <div
        style={{
          background: `url("${image}"), lightgray 50% / cover no-repeat`,
        }}
        className={`flex flex-col justify-between bg-cover bg-center w-full h-min-[316px] lg:h-[100%] shadow-sm rounded-xxs`}
      >
        <div className={` p-lg`}>
          {/* <div className={`flex flex-col gap-xxs`}>
            {data?.categories && (
              <div className="flex gap-xxs items-center">
                {data?.categories?.[0]?.isPaid && (
                  <IoLockClosed className="text-warning text-h5" />
                )}
                <Tag size="medium" color="mint">
                  {data?.categories?.[0]?.name || ""}
                </Tag>
                {data?.categories?.[1] &&
                  data?.categories?.[0].code !== "1021" &&
                  data?.categories?.[0].code !== "1023" && (
                    <Tag size="medium" color="mint">
                      {data?.categories?.[1]?.name || ""}
                    </Tag>
                  )}
              </div>
            )}

            <p
              className={`line-clamp-2 text-h6 font-bold tracking-wider text-white`}
            >
              {data?.title || ""}
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
                  {`${dayjs(data?.publishDate).format("YYYY.MM.DD")}`}
                </Typography>
              </div>
              {content === "VIDEO" && (
                <Button
                  className={`bg-neutral-800 flex justify-center rounded-sm h-[32px] shadow-sm `}
                  size="small"
                  type="primary"
                  icon={
                    <IoPlayOutline className="text-white" fontSize="18px" />
                  }
                >
                  <Typography className={`font-medium text-white text-caption`}>
                    {duration || "00:00"}
                  </Typography>
                </Button>
              )}
            </div>
          </div> */}
        </div>
      </div>
    </Link>
  );
}
