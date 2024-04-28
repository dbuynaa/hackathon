"use client";

import React, { useEffect, useState } from "react";
import { IoBusinessOutline } from "react-icons/io5";
import { AdminLayoutContainer } from "@/layouts/adminLayout/AdminLayoutContainer";

import { Table } from "@/components";
import { useProductsQuery, useValidationsQuery } from "@/graphql/generated";
import { ValidationColumns, ValidationFilter } from "./components";

type Props = {
  searchParams: {
    search?: string | null;
    take?: string;
    skip?: string;
    order?: string;
  };
};

export default function AdminValidationListPage(props: Props) {
  const { searchParams } = props;

  const { data, loading, refetch } = useValidationsQuery({
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
      title="Validation management"
      icon={<IoBusinessOutline />}
    >
      <div className="flex flex-col gap-md">
        {/* Filter */}
        <ValidationFilter />
        {/* Table */}
        <Table
          columns={ValidationColumns}
          dataSource={data?.Validations?.data || []}
          pagination={{
            total: data?.Validations?.count || 0,
            showSizeChanger: true,
          }}
          loading={loading}
          rowKey={"id"}
        />
      </div>
    </AdminLayoutContainer>
  );
}
