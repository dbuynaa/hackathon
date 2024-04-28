"use client";

// import libraries
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Image } from "antd";
import dayjs from "dayjs";

// import utils
import {
  CardVertical,
  CardVerticalSkeleton,
  Typography,
  TopSearchBanner,
  Breadcrumb,
  CardHorizontal,
  CardHorizontalSkeleton,
  Pagination,
  CheckboxStatus,
} from "@/components";
import {
  Product,
  Vendor,
  useCategoriesQuery,
  useProductsQuery,
  useValidationsQuery,
  useVendorsQuery,
} from "@/graphql/generated";
import { useSearchArray } from "@/utils/useSearchQuery";
import { orderBy } from "lodash";

type Props = {
  params: { cid: string };
};

export default function Category({ params }: Props) {
  const key = params.cid;
  const searchParams = useSearchParams();
  const onSearch = useSearchArray();
  // const [data, setData] = useState<Posts>({});
  const { data: categories, loading: categoriesLoading } = useCategoriesQuery();
  const category = categories?.categories
    ?.filter((e) => e?.code !== "1001")
    ?.find((e) => e.nameEn === key);
  const [subCategory, setSubCategory] = useState([category?.name]);
  const _textCategories = searchParams?.get("categories")?.split(",") || [];
  const {
    data: specialPosts,
    loading: specialPostsLoading,
    refetch: refetchSpecial,
  } = useVendorsQuery({
    variables: {
      take: parseInt("4"),
      skip: parseInt("0"),
    },
  });
  const { data: rankingPosts, loading: rankingPostsLoading } =
    useValidationsQuery({
      variables: {
        take: parseInt("4"),
        skip: parseInt("0"),
      },
    });
  const {
    data: newPosts,
    loading: postsLoading,
    refetch: refetchPosts,
  } = useProductsQuery({
    fetchPolicy: "no-cache",
    variables: {
      where: {
        parent: category?.code,
        child: _textCategories,
        search: searchParams?.get("search"),
      },
      take: parseInt(searchParams?.get("take") || "20"),
      skip: parseInt(searchParams?.get("current") || "1"),
    },
  });

  const onPageChange = (page: number, size: number) => {
    onSearch({ current: page, take: size });
  };

  return (
    <main>
      <TopSearchBanner
        title={category?.name || ""}
        subCategory={subCategory?.map((e) => e).join("/")}
        count={newPosts?.products?.count || 0}
      />
      <div className="flex flex-col w-full bg-surface-secondary py-xxs">
        <Breadcrumb
          title={category?.name || ""}
          className="px-sm md:px-lg  w-full max-w-screen-xl mx-auto"
        />
      </div>

      {/* Section === 特集記事 */}
      <div className="flex flex-col p-sm xs:p-lg xl:py-xxl w-full max-w-screen-xl mx-auto">
        <div className="grid grid-cols-12 gap-md md:gap-lg lg:gap-md xl:gap-xl">
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-md xl:gap-lg lg:border-r lg:border-primary  lg:pr-md xl:pr-xl">
            <div className="flex flex-row gap-sm overflow-x-auto">
              {(category?.children
                ? category?.code === "1009"
                  ? orderBy(category?.children, "code", "asc")
                  : category?.children
                : []
              )?.map((item, index) => (
                <CheckboxStatus
                  key={index}
                  orientation="horizontal"
                  type="icon"
                  noIcon
                  onChange={() => {
                    const categories = [...subCategory];
                    const searchIndex = _textCategories.findIndex(
                      (code) => code === item?.code?.toString()
                    );
                    const removeIndex = categories.findIndex(
                      (name) => name === item?.name?.toString()
                    );
                    if (searchIndex > -1) {
                      _textCategories.splice(searchIndex, 1);
                      // delete item from categories
                      categories.splice(removeIndex, 1);
                    } else {
                      _textCategories.push(item?.code || "");
                      categories.push(item?.name || "");
                    }
                    setSubCategory(categories);

                    onSearch({
                      categories:
                        _textCategories.length > 0
                          ? _textCategories
                          : undefined,
                    });
                  }}
                  defaultChecked={
                    !!_textCategories.find(
                      (code) => code === item?.code?.toString()
                    )
                  }
                >
                  {item?.name}
                </CheckboxStatus>
              ))}
            </div>

            <div className="border-b-2 border-brand"></div>
            {categoriesLoading || postsLoading ? (
              <div className="grid grid-cols-12 gap-md md:gap-lg">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9]?.map((_, index) => (
                  <CardVerticalSkeleton
                    key={index}
                    className="col-span-6 xs:col-span-4 lg:col-span-6 xl:col-span-4"
                  />
                ))}
              </div>
            ) : (newPosts?.products?.count || 0) > 0 ? (
              <div className="grid grid-cols-12 gap-md md:gap-lg">
                {(newPosts?.products?.data || [])?.map((item) => (
                  <CardVertical
                    key={item.id}
                    className="col-span-6 xs:col-span-4 lg:col-span-6 xl:col-span-4"
                    data={item as Product}
                    rank={
                      dayjs(item.createdAt).diff(dayjs(), "days") >= -1
                        ? "new"
                        : undefined
                    }
                  />
                ))}
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
            <div className="border-b-2 border-brand"></div>
            {categoriesLoading ? null : (
              <Pagination
                total={newPosts?.products?.count || 0}
                showSizeChanger
                onChange={onPageChange}
                current={parseInt(searchParams?.get("current") || "1")}
                pageSize={parseInt(searchParams?.get("take") || "20")}
              />
            )}
          </div>
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-md xl:gap-lg">
            {/* 特集記事 */}
            <div>
              <div className="flex flex-row justify-between pb-xs2  mb-sm border-b-2 border-brand">
                <Typography
                  base="Subtitle"
                  weight="bold"
                  className="text-primary"
                >
                  特集記事
                </Typography>
              </div>
              <div className="grid grid-cols-12 gap-sm w-full">
                {specialPostsLoading
                  ? [1, 2, 3, 4]?.map((_, index) => (
                      <CardHorizontalSkeleton
                        key={index}
                        className="col-span-12 sm:col-span-6 lg:col-span-12"
                      />
                    ))
                  : (specialPosts?.vendors?.data || [])?.map((item) => (
                      <CardHorizontal
                        key={item.email}
                        refetch={refetchSpecial}
                        className="col-span-12 sm:col-span-6 lg:col-span-12"
                        name={item.name || ""}
                      />
                    ))}
              </div>
            </div>
            {/* ランキング */}
            <div>
              <div className="flex flex-row justify-between pb-xs2  mb-sm border-b-2 border-brand">
                <Typography
                  base="Subtitle"
                  weight="bold"
                  className="text-primary"
                >
                  ランキング
                </Typography>
              </div>
              <div className="grid grid-cols-12 gap-sm w-full">
                {rankingPostsLoading
                  ? [1, 2, 3, 4]?.map((_, index) => (
                      <CardHorizontalSkeleton
                        key={index}
                        className="col-span-12 sm:col-span-6 lg:col-span-12"
                      />
                    ))
                  : (rankingPosts?.Validations?.data || [])?.map(
                      (item, index) => (
                        <CardHorizontal
                          key={item.id}
                          className="col-span-12 sm:col-span-6 lg:col-span-12"
                          name={item.author?.name || ""}
                        />
                      )
                    )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
