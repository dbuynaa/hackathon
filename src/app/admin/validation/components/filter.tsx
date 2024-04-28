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

export function ValidationFilter() {
  const searchParams = useSearchParams();
  const onSearch = useSearch();
  const onSearchObject = useSearchArray();
  const [text, setText] = useState(searchParams?.get("search"));

  const debouncedSearchTerm = useDebounce(text || "", 500);

  useEffect(() => {
    onSearch("search", debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <div className="flex flex-row items-center justify-between">
      <Input
        className="text-subtitle2 items-center text-secondary bg-neutral-100 border-none [&>input]:bg-neutral-100 rounded-md w-auto"
        placeholder="search"
        onChange={(e) => setText(e.target.value)}
        value={text || ""}
        prefix={<IoSearchOutline className="flex text-h5 text-brand" />}
      />
      <div className="flex flex-row gap-xs2">
        <div className=" flex flex-row gap-xs items-center px-xs  h-[46px] rounded-sm border-dark border-[1px]">
          <Popover
            placement="bottom"
            content={
              <div className="w-fit">
                <div className="pb-xxs border-b-[1px] border-b-brand flex gap-xs justify-between items-center">
                  <Typography>Filter</Typography>
                  <Select
                    options={[
                      { label: "өнөөдөр", value: dayjs().toString() },
                      {
                        label: "өчигдөр",
                        value: dayjs().add(-1, "d").toString(),
                      },
                      {
                        label: "өнгөрсөн долоо хоногт  ",
                        value: dayjs().add(-7, "d").toString(),
                      },
                      {
                        label: "өнгөрсөн сар",
                        value: dayjs().add(-1, "month").toString(),
                      },
                      {
                        label: "сүүлийн 3 сар",
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
                    цэвэрлэх
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
