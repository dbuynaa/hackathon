"use client";

import React, { useState, useEffect } from "react";
import { Image } from "antd";

import { Typography, Tag } from "@/components";
import Link from "next/link";
import { Product } from "@/graphql/generated";
import dayjs from "dayjs";
import { IoCalendarClearOutline } from "react-icons/io5";

type CardHorizontalProps = {
  className?: string;
  content?: "TEXT" | "VIDEO" | "IMAGE";
  rank?: "new" | "gold" | "silver" | "bronze" | "other" | "special";
  size?: "large" | "middle" | "small";
  data?: Product;
  bookmarkDisabled?: boolean;
  collectionCount?: number;
  refetch?: () => void;
};
export const CardHorizontal = (props: CardHorizontalProps) => {
  const { data, className, rank, bookmarkDisabled, collectionCount, refetch } =
    props;

  const [thumbnail, setThumbnail] = useState<any>("");
  const [isCollectionModal, setCollectionModal] = useState(false);

  const category = data?.categories?.find(
    (item) => !item?.order?.includes("/")
  );
  const subCategory = data?.categories?.find((item) =>
    item?.order?.includes("/")
  );
  return (
    <Link
      key={data?.id}
      href={
        bookmarkDisabled
          ? {}
          : isCollectionModal
          ? {}
          : `/post/${data?.id || ""}`
      }
      className={`flex flex-col gap-xs w-full ${className ? className : ""}`}
    >
      <div className="grid grid-flow-col gap-sm justify-between">
        <div className="flex flex-col gap-xs">
          <div className="flex gap-xxs items-center">
            <Tag size="mini" color="mint">
              {category?.name || ""}
            </Tag>
            {subCategory &&
              category?.code !== "1021" &&
              category?.code !== "1023" && (
                <Tag size="mini" color="mint">
                  {subCategory?.name}
                </Tag>
              )}
          </div>
          <p className=" line-clamp-3 whitespace-normal text-subtitle2 font-bold tracking-wider min-w-[200px] max-w-[200px]">
            {data?.name || ""}
          </p>
        </div>
        <div
          className="bg-cover bg-center rounded-xxs h-[100px] w-[124px]  shadow-sm"
          style={{
            background: `url('${thumbnail}'), lightgray 50% / cover no-repeat`,
          }}
        >
          {rank && (
            <div className={`inline-block ${"mt-tiny ml-tiny"}`}>
              <Image
                className={`${"h-[38px] w-[38px]"}`}
                src={`/assets/images/card/rank_${rank}.png`}
                alt={""}
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
            {`${dayjs(data?.createdAt).format("YYYY.MM.DD")}`}
          </Typography>
        </div>
        <div></div>
      </div>
    </Link>
  );
};
