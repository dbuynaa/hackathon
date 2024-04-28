"use client";

import { Table, Typography } from "@/components";
import { useProductsQuery } from "@/graphql/generated";
import { useSearchParams } from "next/navigation";

import { useState } from "react";

export function CompanyPostContainer({ companyId }: { companyId: string }) {
  const searchParams = useSearchParams();

  const { data, loading } = useProductsQuery({
    variables: {
      skip: parseInt(searchParams.get("skip") || "0"),
      take: parseInt(searchParams.get("take") || "5"),
      // where: {
      //   companyId: companyId,
      //   orderBy: searchParams.get("order"),
      // },
    },
  });
  return (
    <div className="flex flex-col gap-sm">
      <Typography
        weight="bold"
        base="Subtitle"
        className="text-primary border-b-2 border-b-brand pb-xs2"
      >
        Total ({data?.products?.count || 0})
      </Typography>
      <Table
        columns={CompanyPostColumns}
        dataSource={data?.products?.data || []}
        loading={loading}
        pagination={{
          total: data?.products?.count || 0,
          showSizeChanger: true,
          pageSize: parseInt(searchParams.get("take") || "5"),
          current: parseInt(searchParams.get("skip") || "1"),
          pageSizeOptions: ["5", "10", "20"],
        }}
      />
    </div>
  );
}
