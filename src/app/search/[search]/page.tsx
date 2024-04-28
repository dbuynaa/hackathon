"use client";

// import libraries
import React from "react";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { Image } from "antd";

// import utils
import {
  Breadcrumb,
  CardVertical,
  Pagination,
  Typography,
  CardVerticalSkeleton,
  CardHorizontal,
  CardHorizontalSkeleton,
} from "@/components";
import { TopBanner } from "../components";
import { useSearchArray } from "@/utils/useSearchQuery";
import {
  Product,
  Vendor,
  useProductsQuery,
  useVendorsQuery,
} from "@/graphql/generated";

type Props = {
  params: { search: string };
};

export default function Search({ params }: Props) {
  const searchParams = useSearchParams();
  const onSearch = useSearchArray();
  const {
    data: specialPosts,
    loading: specialPostsLoading,
    refetch: refetchSpecial,
  } = useVendorsQuery({
    fetchPolicy: "no-cache",
    variables: {
      take: parseInt("4"),
      skip: parseInt("0"),
    },
  });
  const { data, loading, refetch } = useProductsQuery({
    fetchPolicy: "no-cache",
    variables: {
      where: {
        search: (decodeURIComponent(params?.search) as string) || "",
      },
      take: +(searchParams?.get("take") || 20),
      skip: +(searchParams?.get("current") || 0),
    },
  });

  const onPageChange = (page: number, size: number) => {
    onSearch({ current: page, take: size });
  };

  return (
    <main>
      <TopBanner
        title={(decodeURIComponent(params?.search) as string) || ""}
        count={data?.products?.count || 0}
      />
      <div className="flex flex-col w-full bg-surface-secondary py-xxs">
        <Breadcrumb
          title={(decodeURIComponent(params?.search) as string) || ""}
          className="px-sm md:px-lg  w-full max-w-screen-xl mx-auto"
        />
      </div>

      {/* Section === 特集記事 */}
      <div className="flex flex-col p-sm xs:p-lg xl:py-xxl w-full max-w-screen-xl mx-auto">
        <div className="grid grid-cols-12 gap-md md:gap-lg lg:gap-md xl:gap-xl">
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-md xl:gap-lg lg:border-r lg:border-primary  lg:pr-md xl:pr-xl">
            {loading ? (
              <div className="grid grid-cols-12 gap-md xs:gap-lg">
                {[1, 2, 3, 4, 5, 6, 7, 8]?.map((_, index) => (
                  <CardVerticalSkeleton
                    key={index}
                    className="col-span-6 xs:col-span-4 lg:col-span-3"
                  />
                ))}
              </div>
            ) : (data?.products?.count || 0) > 0 ? (
              <div className="grid grid-cols-12 gap-md xs:gap-lg">
                {(data?.products?.data || [])?.map((item, index) => (
                  <CardVertical
                    key={index}
                    className="col-span-6 xs:col-span-4 lg:col-span-3"
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
            {loading ? null : (
              <Pagination
                total={data?.products?.count || 0}
                showSizeChanger
                onChange={onPageChange}
                current={+(searchParams?.get("current") || 1)}
                pageSize={+(searchParams?.get("take") || 20)}
              />
            )}
          </div>
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-md xl:gap-lg">
            {/* 特集記事 */}
            <div>
              <div className="flex flex-row justify-between  mb-sm border-b-2 border-brand">
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
                  : (specialPosts?.vendors?.data || [])?.map((item, index) => (
                      <CardHorizontal
                        key={index}
                        refetch={refetchSpecial}
                        className="col-span-12 sm:col-span-6 lg:col-span-12"
                        name={item.email || ""}
                        id={item.email}
                      />
                    ))}
              </div>
            </div>
            <div>
              <div className="flex flex-row justify-between  mb-sm border-b-2 border-brand">
                <Typography
                  base="Subtitle"
                  weight="bold"
                  className="text-primary"
                >
                  Зэрэглэл
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
