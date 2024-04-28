"use client";
import Card from "@/components/card/card";
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
  useVendorsQuery,
} from "@/graphql/generated";

export default function Home() {
  const { data: newPosts, loading: newPostLoading } = useProductsQuery({
    fetchPolicy: "no-cache",
    variables: {
      take: parseInt("7"),
      skip: parseInt("0"),
    },
  });
  const { data: newVendors, loading: newVendorLoading } = useVendorsQuery({
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
            Компани
          </Typography>
          <Button
            type="text"
            size="small"
            leftIcon={<IoArrowForwardOutline />}
            href="/more/new"
          >
            Дэлгэрэнгүй
          </Button>
        </div>
        {newVendorLoading ? (
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
                    image={item.image || "https://picsum.photos/200/300"}
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
            <Typography base="Subtitle" weight="bold" className="text-primary">
              Бүтээгдэхүүн олдсонгүй
            </Typography>
          </div>
        )}
      </div>

      <div className="flex px-sm md:px-lg flex-col p-md gap-md sm:gap-lg w-full max-w-screen-xl mx-auto">
        <div className="flex flex-row justify-between items-center  pb-xs2 border-b-2 border-brand">
          <Typography base="Subtitle" weight="bold" className="text-primary">
            Бүтээгдэхүүн
          </Typography>
          <Button
            type="text"
            size="small"
            leftIcon={<IoArrowForwardOutline />}
            href="/more/new"
          >
            Дэлгэрэнгүй
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
        ) : (newVendors?.vendors?.count || 0) > 0 ? (
          <div className="grid grid-cols-12 gap-sm md:gap-md xl:gap-lg">
            {(newVendors?.vendors?.data || [])?.map((item, index) => {
              return (
                <CardFeature
                  key={item.contact}
                  id={item.name}
                  className="col-span-12 lg:col-span-6"
                  image={"https://picsum.photos/200/300"}
                />
              );
            })}
          </div>
        ) : (
          <div className="wrapper style1 container special">
            <div className="row">
              <div className="4u 12u(narrower)">
                <Card
                  title="Гацуурт"
                  content="Sed tristique purus vitae volutpat ultrices. Aliquam eu elit eget arcu commodo suscipit dolor nec nibh. Proin a ullamcorper elit, et sagittis turpis. Integer ut fermentum."
                />
              </div>
              <div className="4u 12u(narrower)">
                <Card
                  title="Bagro"
                  content="Sed tristique purus vitae volutpat ultrices. Aliquam eu elit eget arcu commodo suscipit dolor nec nibh. Proin a ullamcorper elit, et sagittis turpis. Integer ut fermentum."
                />
              </div>
              <div className="4u 12u(narrower)">
                <Card
                  title="Дэвшил трейд"
                  content="Sed tristique purus vitae volutpat ultrices. Aliquam eu elit eget arcu commodo suscipit dolor nec nibh. Proin a ullamcorper elit, et sagittis turpis. Integer ut fermentum."
                />
              </div>
            </div>
          </div>
        )}
      </div>
      {/* 
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
      </div> */}

      {/* <SectionCategories categories={category?.categories as Category[]} /> */}
      <div>
        <div className="mb-xs2 flex justify-center items-center h-[200px] w-full bg-neutral-50 mx-auto">
          {/* Comment: djfjsldajl */}
        </div>
      </div>
    </main>
  );
}
