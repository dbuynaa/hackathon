"use client";

// import libraries
import React from "react";
import { Image } from "antd";
import {
  CardFeature,
  CardFeatureSkeleton,
  CardVerticalSkeleton,
  Typography,
  Button,
  SectionCategories,
  CardVertical,
} from "@/components";
import dayjs from "dayjs";
import { IoArrowForwardOutline } from "react-icons/io5";

// import utils
import {
  Category,
  Product,
  useCategoriesQuery,
  useProductsQuery,
} from "@/graphql/generated";

export default function Home() {
  const { data: category } = useCategoriesQuery();
  const {
    data: newPosts,
    loading: newPostLoading,
    refetch: refetchNew,
  } = useProductsQuery({
    fetchPolicy: "no-cache",
    variables: {
      take: parseInt("7"),
      skip: parseInt("0"),
    },
  });
  return (
    <main>
      <div className="flex px-sm md:px-lg flex-col p-md gap-md sm:gap-lg w-full max-w-screen-xl mx-auto">
        <div className="flex flex-row justify-between items-center  pb-xs2 border-b-2 border-brand">
          <Typography base="Subtitle" weight="bold" className="text-primary">
            新着記事一覧
          </Typography>
          <Button
            type="text"
            size="small"
            leftIcon={<IoArrowForwardOutline />}
            href="/more/new"
          >
            もっとみる
          </Button>
        </div>
        {newPostLoading ? (
          <div className="grid grid-cols-12 gap-sm md:gap-md xl:gap-lg">
            {[1, 2, 3, 4, 5, 6, 7]?.map((item, index) => {
              if (index === 0) {
                return (
                  <CardFeatureSkeleton
                    key={index}
                    className="col-span-12 lg:col-span-6"
                  />
                );
              } else {
                return (
                  <CardVerticalSkeleton
                    key={index}
                    className="col-span-6 md:col-span-4 lg:col-span-3"
                  />
                );
              }
            })}
          </div>
        ) : (newPosts?.products?.count || 0) > 0 ? (
          <div className="grid grid-cols-12 gap-sm md:gap-md xl:gap-lg">
            {(newPosts?.products?.data || [])?.map((item, index) => {
              if (index === 0) {
                return (
                  <CardFeature
                    key={item.id}
                    id={item.id}
                    className="col-span-12 lg:col-span-6"
                    image={item.image}
                  />
                );
              } else {
                return (
                  <CardVertical
                    key={item.id}
                    className="col-span-6 md:col-span-4 lg:col-span-3"
                    data={item as Product}
                    rank={
                      dayjs(item.createdAt).diff(dayjs(), "days") >= -1
                        ? "new"
                        : undefined
                    }
                  />
                );
              }
            })}
          </div>
        ) : (
          <div className="mb-xs2 flex justify-center items-center h-[200px] w-full bg-neutral-50 mx-auto">
            <Image
              alt="childcare logo"
              preview={false}
              width={120}
              height={120}
              className="logo"
              src={`/assets/images/empty/empty-inbox.png`}
            />
          </div>
        )}
      </div>

      <div className="flex px-sm md:px-lg flex-col p-md gap-md sm:gap-lg w-full max-w-screen-xl mx-auto">
        <div className="flex flex-row justify-between items-center pb-xs2 border-b-2 border-brand">
          <Typography base="Subtitle" weight="bold" className="text-primary">
            記事人気ランキング
          </Typography>
          <Button
            type="text"
            size="small"
            leftIcon={<IoArrowForwardOutline />}
            href="/more/rank"
          >
            もっとみる
          </Button>
        </div>
      </div>

      <div className="flex px-sm md:px-lg flex-col p-md gap-md sm:gap-lg w-full max-w-screen-xl mx-auto">
        <div className="flex flex-row justify-between items-center pb-xs2 border-b-2 border-brand">
          <Typography base="Subtitle" weight="bold" className="text-primary">
            特集記事
          </Typography>
          <Button
            type="text"
            size="small"
            leftIcon={<IoArrowForwardOutline />}
            href="/more/special"
          >
            もっとみる
          </Button>
        </div>
      </div>

      <SectionCategories categories={category?.categories as Category[]} />
    </main>
  );
}
