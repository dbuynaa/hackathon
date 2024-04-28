"use client";

import React from "react";
import Link from "next/link";
import { Vendor } from "@/graphql/generated";

type CardHorizontalProps = {
  className?: string;
  size?: "large" | "middle" | "small";
  name?: string;
  id?: string;
  refetch?: () => void;
};
export const CardHorizontal = (props: CardHorizontalProps) => {
  const { id, name, className, refetch } = props;

  return (
    <Link
      key={id}
      href={`/vendor/${id}`}
      className={`flex flex-col gap-xs w-full ${className ? className : ""}`}
    >
      <div className="grid grid-flow-col gap-sm justify-between">
        <div className="flex flex-col gap-xs">
          <p className=" line-clamp-3 whitespace-normal text-subtitle2 font-bold tracking-wider min-w-[200px] max-w-[200px]">
            {id || ""}
          </p>
        </div>
        <div
          className="bg-cover bg-center rounded-xxs h-[100px] w-[124px]  shadow-sm"
          style={{
            background: `url('https://picsum.photos/124/100'), lightgray 50% / cover no-repeat`,
          }}
        ></div>
      </div>
    </Link>
  );
};
