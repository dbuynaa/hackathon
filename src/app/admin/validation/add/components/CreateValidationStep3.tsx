"use client";

import { Button, Table, Typography } from "@/components";
import { Divider, Form } from "antd";
import { Category, Product, ValidationCreateInput } from "@/graphql/generated";
import { ProductColumns } from "@/app/admin/product/components";

type Props = {
  prev: () => void;
  Validation: ValidationCreateInput;
  submitText?: string;
  products: Product[];
  loading?: boolean;
};
export function CreateValidationStep3({
  prev,
  Validation,
  submitText,
  products,
  loading,
}: Props) {
  const form = Form.useFormInstance();

  return (
    <div className="flex flex-col gap-lg">
      {/* <PostDetailImage post={post as Validation} paid={true} /> */}
      <div className="flex flex-col gap-md">
        <div className="flex gap-sm overflow-x-auto">
          <Typography base="Subtitle2" className="text-primary w-[240px]">
            {Validation.content}
          </Typography>
        </div>

        <Typography
          base="Subtitle"
          weight="bold"
          className="text-primary border-b-2 border-b-brand pb-xs2"
        >
          Бүтээгдэхүүн
        </Typography>
        <Table
          columns={ProductColumns}
          dataSource={products || []}
          pagination={{
            total: products?.length || 0,
            showSizeChanger: true,
          }}
          loading={loading}
          rowKey={"id"}
        />
        <div className="pt-md flex justify-end gap-sm">
          <Button
            className="px-md"
            disabled={loading}
            onClick={() => {
              prev();
            }}
          >
            Back
          </Button>
          <Button
            type="primary"
            className=" px-md"
            htmlType="submit"
            disabled={loading}
            loading={loading}
          >
            {submitText || "Back"}
          </Button>
        </div>
      </div>
    </div>
  );
}
