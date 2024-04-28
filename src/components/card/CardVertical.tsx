"use client";

import React, { useState, useEffect } from "react";
import { Image } from "antd";

import { Button, ButtonIcon, Typography, Tag } from "@/components";
import { IoCalendarClearOutline } from "react-icons/io5";
import { useBreakPoint } from "@/hooks";
import { Product } from "@/graphql/generated";
import dayjs from "dayjs";
import Link from "next/link";
import { useSession } from "next-auth/react";

type CardVerticalProps = {
  className?: string;
  rank?: "new" | "gold" | "silver" | "bronze" | "other" | "special";
  size?: "large" | "small";
  data?: Product;
  innerStyle?: boolean;
};
export const CardVertical = (props: CardVerticalProps) => {
  const point = useBreakPoint();
  const { className, rank, size, data, innerStyle } = props;

  const isLarge = size
    ? size === "large"
    : point && ["md", "lg", "xl", "2xl"].includes(point);

  const category = data?.categories?.find(
    (item) => !item?.order?.includes("/")
  );
  const subCategory = data?.categories?.find((item) =>
    item?.order?.includes("/")
  );

  return (
    <Link
      className={`inline-block ${className ? className : ""}`}
      key={data?.id}
      href={"/product/" + data?.id}
    >
      <div
        style={{
          background: `url('${data?.image}'), lightgray 50% / cover no-repeat`,
          marginRight: innerStyle ? 30 : undefined,
        }}
        className={`bg-cover bg-center rounded-xxs shadow-sm h-[134px] ${
          isLarge ? "h-[192px]" : "h-[134px]"
        }`}
      >
        <div className={`flex ${rank ? "justify-between" : "justify-end"} `}>
          {rank && (
            <div
              className={`inline-block ${
                isLarge ? "mt-xxs ml-xxs" : "mt-tiny ml-tiny"
              }`}
            >
              <Image
                className={`h-[64px] w-[64px]`}
                src={`/assets/images/card/rank_${rank}.png`}
                alt={""}
                preview={false}
              />
            </div>
          )}
        </div>
      </div>

      <div className={`mt-xs flex flex-col ${isLarge ? "gap-xs" : "gap-xxs"}`}>
        {data?.categories && (
          <div className="flex gap-xxs w-full flex-wrap 2xs:items-center xs:items-start md:items-start xs:justify-center md:justify-start 2xs:flex-row xs:flex-col md:flex-row ">
            <div
              className="flex gap-xxs items-center"
              style={{ overflow: "hidden", whiteSpace: "nowrap" }}
            >
              <Tag size={isLarge ? "small" : "mini"} color="mint">
                {category?.name || ""}
              </Tag>
            </div>

            {subCategory &&
              category?.code !== "1021" &&
              category?.code !== "1023" && (
                <Tag size={isLarge ? "small" : "mini"} color="mint">
                  {subCategory?.name}
                </Tag>
              )}
          </div>
        )}
        <p
          className={`line-clamp-2 whitespace-normal ${
            isLarge ? "text-subtitle2" : "text-body"
          } font-bold tracking-wider`}
        >
          {data?.name || ""}
        </p>

        <div className="flex flex-row items-center gap-xxs ">
          <IoCalendarClearOutline
            className=" text-secondary"
            fontSize={`${isLarge ? "18px" : "13px"}`}
          />
          <Typography
            className="text-secondary"
            base={`${isLarge ? "Body" : "Small"}`}
          >
            {`${dayjs(data?.createdAt).format("YYYY.MM.DD")}`}
          </Typography>
        </div>
      </div>
    </Link>
  );
};
