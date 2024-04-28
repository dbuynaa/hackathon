"use client";

import React, { useEffect, useState } from "react";
import { IoBusinessOutline } from "react-icons/io5";
import { AdminLayoutContainer } from "@/layouts/adminLayout/AdminLayoutContainer";

import { Table } from "@/components";
import { useProductsQuery } from "@/graphql/generated";
import { ProductColumns, ProductFilter } from "./components";

type Props = {
  searchParams: {
    search?: string | null;
    take?: string;
    skip?: string;
    order?: string;
  };
};

export default function AdminProductListPage(props: Props) {
  const { searchParams } = props;

  const { data, loading, refetch } = useProductsQuery({
    fetchPolicy: "no-cache",
    variables: {
      take: parseInt(searchParams.take || "20"),
      skip: parseInt(searchParams.skip || "0"),
      // where: { search: searchParams.search, status: searchParams.status },
      // orderBy: searchParams.order,
    },
  });
  useEffect(() => {
    refetch();
  }, [searchParams, refetch]);

  return (
    <AdminLayoutContainer
      title="Vendor management"
      icon={<IoBusinessOutline />}
    >
      <div className="flex flex-col gap-md">
        {/* Filter */}
        <ProductFilter />
        {/* Table */}
        <Table
          columns={ProductColumns}
          dataSource={data?.products?.data || []}
          pagination={{
            total: data?.products?.count || 0,
            showSizeChanger: true,
          }}
          loading={loading}
          rowKey={"id"}
        />
      </div>
    </AdminLayoutContainer>
  );
}
