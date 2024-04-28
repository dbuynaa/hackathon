"use client";

import { Button, Table, Typography } from "@/components";
import { Image } from "antd";
import { Product, ValidationCreateInput } from "@/graphql/generated";
import { ProductColumns, ProductFilter } from "@/app/admin/product/components";

type Props = {
  validation: ValidationCreateInput | null;
  products: Product[];
  selectedProducts: Product[];
  setSelectedProducts: (values: Product[]) => void;
  count: number;
  loading?: boolean;
  prev: () => void;
  next: () => void;
};

export function CreateValidationStep2({
  validation,
  setSelectedProducts,
  selectedProducts,
  products,
  loading,
  count,
  prev,
}: Props) {
  return (
    <div className={"grid grid-cols-12 gap-lg "}>
      <div className="col-span-12 lg:col-span-4 flex flex-col gap-lg border-r border-r-primary pr-lg">
        <div className="flex gap-md items-center">
          <Image
            src="/assets/images/bookmarks_plus.png"
            alt="createValidation"
            className="w-[98px] h-[98px] rounded-sm bg-brand"
            preview={false}
          />
        </div>
        {validation?.content}
      </div>
      <div className="col-span-12 lg:col-span-8 flex flex-col gap-lg w-full">
        <Typography
          base="Subtitle"
          weight="bold"
          className="text-primary border-b-2 border-b-brand pb-xs2"
        >
          Барааны жагсаалт
        </Typography>
        {/* <ProductFilter /> */}
        {/* Table */}
        <Table
          columns={ProductColumns}
          dataSource={products || []}
          pagination={{
            total: count || 0,
            showSizeChanger: true,
          }}
          rowSelection={{
            type: "checkbox",
            onSelect: (record, selected) => {
              if (!setSelectedProducts) return;
              if (selected) {
                setSelectedProducts([
                  ...(selectedProducts || []),
                  record as Product,
                ]);
              } else {
                setSelectedProducts(
                  (selectedProducts || []).filter(
                    (item) => item.id !== record.id
                  )
                );
              }
            },
            selectedRowKeys: selectedProducts?.map((item) => item.id),
          }}
          loading={loading}
          rowKey={"id"}
        />
        <div className="flex gap-[16px] justify-end border-t-2 border-t-brand pt-md">
          <Button onClick={prev}>Back</Button>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
