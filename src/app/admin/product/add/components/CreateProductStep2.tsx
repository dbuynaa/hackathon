"use client";

import { Button, Typography } from "@/components";
import { Divider, Form } from "antd";
import { Category, ProductCreateInput } from "@/graphql/generated";

type Props = {
  prev: () => void;
  product: ProductCreateInput;
  submitText?: string;
  categories?: Category[];
  loading?: boolean;
};
export function CreateProductStep2({
  prev,
  product,
  categories,
  submitText,
  loading,
}: Props) {
  const form = Form.useFormInstance();

  return (
    <div className="flex flex-col gap-lg">
      {/* <PostDetailImage post={post as product} paid={true} /> */}

      <div className="flex flex-row border-b-2 border-brand pb-xs2">
        <Typography base="Subtitle" weight="bold" className="text-primary">
          Product Name
        </Typography>
      </div>
      <div className="flex flex-col gap-md">
        <Divider className="m-[0]" />
        <div className="flex gap-sm overflow-x-auto">
          <Typography base="Subtitle2" className="text-primary w-[240px] ">
            カテゴリー
          </Typography>
          <Typography
            base="Subtitle2"
            weight="bold"
            className="text-primary w-full"
          >
            {
              categories?.find((e) => e.code === form.getFieldValue("parent"))
                ?.name
            }
            {" > "}
            {
              categories
                ?.find((e) => e.code === form.getFieldValue('parent'))
                ?.children?.find(
                  (c) => c?.code === form.getFieldValue('children'),
                )?.name
            }
          </Typography>
        </div>
        <Divider className="m-[0]" />
        <div className="flex gap-sm overflow-x-auto">
          <Typography base="Subtitle2" className="text-primary w-[240px]">
            投稿時間
          </Typography>
        </div>
        <div className="pt-md flex justify-end gap-sm">
          <Button
            className="px-md"
            disabled={loading}
            onClick={() => {
              prev();
            }}
          >
            戻る
          </Button>
          <Button
            type="primary"
            className=" px-md"
            htmlType="submit"
            disabled={loading}
            loading={loading}
          >
            {submitText || "投稿"}
          </Button>
        </div>
      </div>
    </div>
  );
}
