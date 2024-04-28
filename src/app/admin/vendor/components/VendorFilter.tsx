"use client";

import React, { useEffect, useState } from "react";
import {
  IoAddCircleOutline,
  IoFilterOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { Input, Popover } from "antd";
import { Button, RadioGroupInput, Tag, Typography } from "@/components";
import { useSearchParams } from "next/navigation";
import { useSearch } from "@/utils/useSearchQuery";
import useDebounce from "@/utils/useDebounce";

export function VendorFilter() {
  const searchParams = useSearchParams();
  const onSearch = useSearch();
  const [text, setText] = useState(searchParams?.get("search"));
  const debouncedSearchTerm = useDebounce(text || "", 500);

  useEffect(() => {
    onSearch("search", debouncedSearchTerm);
  }, [debouncedSearchTerm]);
  return (
    <div className="flex flex-row items-center justify-between">
      <Input
        className="text-subtitle2 items-center text-secondary bg-neutral-100 border-none rounded-md w-auto [&>input]:bg-neutral-100"
        placeholder="Email - Name - ..."
        onChange={(e) => setText(e.target.value)}
        value={text || ""}
        prefix={<IoSearchOutline className="flex text-h5 text-brand" />}
      />
      <div className="flex flex-row gap-xs2">
        <div className=" flex flex-row gap-xs items-center px-xs  h-[46px] rounded-sm border-dark border-[1px]">
          <Typography base="Subtitle2" weight="medium">
            filter
          </Typography>
          <Popover
            placement="bottom"
            content={
              <div className="w-[260px]">
                {/* <div className=" pb-xxs border-b-[1px] border-b-brand">
                  <Typography></Typography>
                </div>
                <div>
                  <RadioGroupInput
                    className="flex flex-col gap-xs2 py-xs"
                    value={searchParams.get("status")}
                    onChange={(e) => {
                      onSearch("status", e.target.value);
                    }}
                    items={enums.companyStatus.list
                      .map((item) => ({
                        value: item.key,
                        label: item.value,
                      }))}
                  />
                </div> */}
                <div className="flex flex-row justify-between p-xs pb-none gap-xs border-t-[1px] border-t-brand">
                  <Button
                    onClick={() => onSearch("status")}
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
              icon={<IoFilterOutline />}
              size="small"
            >
              {searchParams.get("status") ? (
                <Tag className="ml-xxs" color="orange" size={"small"}>
                  Chosen
                </Tag>
              ) : (
                <Tag className="ml-xxs" color="brand" size={"small"}>
                  All
                </Tag>
              )}
            </Button>
          </Popover>
        </div>
        <Button
          href={"/admin/vendor/add"}
          type="primary"
          icon={<IoAddCircleOutline />}
        >
          Add Vendor
        </Button>
      </div>
    </div>
  );
}
