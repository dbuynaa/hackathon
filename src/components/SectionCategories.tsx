"use client";

import React from "react";
import { Image } from "antd";
import { Typography } from "@/components";
import Link from "next/link";
import { Category } from "@/graphql/generated";

export const SectionCategories = ({
  categories,
}: {
  categories: Category[];
}) => {
  return (
    <div className="flex px-sm md:px-lg flex-col p-md gap-md sm:gap-lg w-full max-w-screen-xl mx-auto">
      <div className="flex flex-row justify-between items-center pb-xs2 border-b-2 border-brand">
        <Typography base="Subtitle" weight="bold" className="text-primary">
          カテゴリー
        </Typography>
      </div>
      <div className="w-full overflow-x-auto whitespace-nowrap [&>a]:mr-md [&>a]:lg:mr-lg">
        {categories?.slice(1).map((category) => (
          <Link
            key={category.name}
            className="inline-block py-md w-[152px] h-[177px] rounded-md bg-surface-secondary text-center"
            href={`/category/${category.name}`}
          >
            {/* <div className="mb-xs2 flex justify-center items-center w-[92px] h-[92px] rounded-[9999px] bg-neutral-50 mx-auto">
              <Image
                alt="childcare logo"
                preview={false}
                width={58}
                height={58}
                className="logo"
                src={`/assets/images/category/${category.name}.png`}
              />
            </div> */}
            <Typography base="Subtitle2" weight="bold" className="text-primary">
              {category.name}
            </Typography>
          </Link>
        ))}
      </div>
    </div>
  );
};
