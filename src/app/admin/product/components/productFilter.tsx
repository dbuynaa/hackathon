"use client";

import React, { useEffect, useState } from "react";
import {
  IoAddCircleOutline,
  IoAppsOutline,
  IoCalendarOutline,
  IoCheckmarkCircleOutline,
  IoSearchOutline,
  IoSparklesOutline,
} from "react-icons/io5";
import { Calendar, Input, Popover, Select } from "antd";
import { Button, RadioGroupInput, Tag, Typography } from "@/components";
import { useSearch, useSearchArray } from "@/utils/useSearchQuery";
import { useSearchParams, usePathname } from "next/navigation";
import { useCategoriesQuery } from "@/graphql/generated";
import dayjs from "dayjs";
import useDebounce from "@/utils/useDebounce";

export function ProductFilter() {
  const searchParams = useSearchParams();
  const onSearch = useSearch();
  const onSearchObject = useSearchArray();
  const pathname = usePathname();
  const { data: categories } = useCategoriesQuery();
  const [text, setText] = useState(searchParams?.get("search"));

  const debouncedSearchTerm = useDebounce(text || "", 500);

  useEffect(() => {
    onSearch("search", debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <div className="flex flex-row items-center justify-between">
      <Input
        className="text-subtitle2 items-center text-secondary bg-neutral-100 border-none [&>input]:bg-neutral-100 rounded-md w-auto"
        placeholder="Email - Name - ..."
        onChange={(e) => setText(e.target.value)}
        value={text || ""}
        prefix={<IoSearchOutline className="flex text-h5 text-brand" />}
      />
      <div className="flex flex-row gap-xs2">
        <div className=" flex flex-row gap-xs items-center px-xs  h-[46px] rounded-sm border-dark border-[1px]">
          <Typography base="Subtitle2" weight="medium">
            Filter
          </Typography>
          <Popover
            placement="bottom"
            arrow
            content={
              <div className="w-[260px]">
                <div className="h-[460px] overflow-x-auto">
                  <div className=" pb-xxs border-b-[1px] border-b-brand">
                    <Typography>Category</Typography>
                  </div>
                  <div>
                    <RadioGroupInput
                      className="flex flex-col gap-xs2 py-xs"
                      value={searchParams.get("parent")}
                      onChange={(e) => {
                        onSearchObject({
                          parent: e.target.value,
                          child: null,
                        });
                      }}
                      items={(categories?.categories || []).map((category) => ({
                        label: category?.name,
                        value: category?.code,
                      }))}
                    />
                  </div>
                  {/* {searchParams.get("parent") && (
                    <div>
                      <div className=" pb-xxs border-b border-b-brand">
                        <Typography>サブカテゴリーを選択</Typography>
                      </div>
                      <RadioGroupInput
                        className="flex flex-col gap-xs2 py-xs"
                        value={searchParams.get("child")}
                        onChange={(e) => {
                          onSearch("child", e.target.value);
                        }}
                        items={
                          (
                            categories?.categories?.find(
                              (c) => c.code === searchParams.get("parent")
                            )?.children || []
                          ).map((item) => ({
                            label: item?.name || "",
                            value: item?.code || "",
                          })) || []
                        }
                      />
                    </div>
                  )} */}
                </div>
                <div className="flex flex-row justify-between p-xs pb-none gap-xs border-t-[1px] border-t-brand">
                  <Button
                    size="small"
                    className="w-[100%]"
                    onClick={() => {
                      onSearchObject({
                        parent: null,
                        child: null,
                      });
                    }}
                  >
                    clear
                  </Button>
                </div>
              </div>
            }
            trigger={["click"]}
          >
            <Button
              className="flex flex-row items-center bg-neutral-100 border-none px-xs text-primary font-medium"
              icon={<IoAppsOutline />}
              size="small"
            >
              Хайх
              {searchParams.get("parent") ? (
                <Tag className="ml-xxs" color="orange" size={"small"}>
                  Сонгосон
                </Tag>
              ) : (
                <Tag className="ml-xxs" color="brand" size={"small"}>
                  Бүгд
                </Tag>
              )}
            </Button>
          </Popover>

          {/* 投稿日を選択 */}
          {/* <DatePicker
            className="text-subtitle2 bg-neutral-100 border-none
             [&_.ant-picker-input>input]:placeholder:text-primary md"
            presets={[
              { label: '今日', value: dayjs() },
              { label: '昨日', value: dayjs().add(-1, 'd') },
              { label: '先週  ', value: dayjs().add(-7, 'd') },
              { label: '先月', value: dayjs().add(-1, 'month') },
              { label: '過去３ヶ月', value: dayjs().add(-3, 'month') },
            ]}
            onPanelChange={(value) => {
              console.log(value?.format('YYYY-MM-DD'));
              onSearch('dateGroup', value?.format('YYYY-MM-DD'));
            }}
            onContextMenu={(e) => {
              console.log(e);
            }}
            size="small"
            placeholder="投稿日"
            rootClassName="rounded-md bg-neutral-100"
            popupClassName="[&_.ant-picker-today-btn]:hidden min-w-[400px] md:max-h-[320px] max-h-[350px]"
            allowClear
            data-flip="false"
            format="YYYY/MM/DD"
            suffixIcon={<IoCalendarOutline className="!text-brand w-md h-md" />}
            aria-label="投稿日を選択"
            onChange={(value) => onSearch('date', value?.format('YYYY-MM-DD'))}
            placement="bottomLeft"
          /> */}

          <Popover
            placement="bottom"
            content={
              <div className="w-fit">
                <div className="pb-xxs border-b-[1px] border-b-brand flex gap-xs justify-between items-center">
                  <Typography>Он сар</Typography>
                  <Select
                    options={[
                      { label: "今日", value: dayjs().toString() },
                      { label: "昨日", value: dayjs().add(-1, "d").toString() },
                      {
                        label: "先週  ",
                        value: dayjs().add(-7, "d").toString(),
                      },
                      {
                        label: "先月",
                        value: dayjs().add(-1, "month").toString(),
                      },
                      {
                        label: "過去３ヶ月",
                        value: dayjs().add(-3, "month").toString(),
                      },
                    ]}
                    onSelect={(value) => {
                      onSearch("dateRange", dayjs(value).format("YYYY-MM-DD"));
                    }}
                    allowClear
                    onClear={() => onSearch("dateRange")}
                    size="small"
                    placeholder="公開日"
                    className="min-w-[120px]"
                  />
                </div>
                <div className="w-[400px] max-h-[400px] flex">
                  <Calendar
                    fullscreen={false}
                    onSelect={(value) => {
                      onSearch("date", value.format("YYYY.MM.DD"));
                    }}
                  />
                </div>
                <div className="flex flex-row justify-between p-xs pb-none gap-xs border-t-[1px] border-t-brand">
                  <Button
                    onClick={() => onSearch("date")}
                    size="small"
                    className="w-[100%]"
                  >
                    clear
                  </Button>
                </div>
              </div>
            }
            trigger={["click"]}
          >
            <Button
              className="flex flex-row items-center bg-neutral-100 border-none px-xs"
              icon={<IoCalendarOutline />}
              size="small"
            >
              Calendar
            </Button>
          </Popover>
        </div>
      </div>
    </div>
  );
}
