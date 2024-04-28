"use client";

import {
  Typography,
  TextInput,
  SelectInput,
  TextAreaInput,
  Button,
} from "@/components";
import { Rule } from "antd/es/form";
import { Category, ProductCreateInput } from "@/graphql/generated";
import { Form, FormInstance } from "antd/lib";
import { useState } from "react";
import { orderBy } from "lodash";

type Props = {
  form: FormInstance<ProductCreateInput>;
  yupSync: Rule;
  categories?: Category[];
};

export function CreateProductStep1({ form, yupSync, categories }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-lg">
      {/* <CoverUpload
        loading={uploading}
        setLoading={setUploading}
        form={form}
        field="cover"
        required
        fileType={type}
        setType={setType}
      /> */}
      <TextInput
        label="Product Name"
        field="name"
        required
        rules={[yupSync]}
        placeholder="product name"
      />
      <TextAreaInput
        form={form}
        label="Дэлгэрэнгүй"
        field="description"
        required
        rules={[yupSync]}
        placeholder="Бичих"
        className="xs:h-[480px]"
      />

      {/* <div className={`flex flex-row border-b-2 border-brand pb-xs2`}>
        <Typography
          base="Subtitle"
          weight="bold"
          className="text-primary mt-xs2"
        >
          参考資料をダウンロード
        </Typography>
      </div> */}
      {/* <FileUpload
        loading={uploading}
        setLoading={setUploading}
        form={form}
        field="files"
        accept=".pdf"
      /> */}
      <div className="flex flex-row border-b-2 border-brand pb-xs2">
        <Typography base="H5" weight="bold" className="text-primary">
          Category
        </Typography>
      </div>
      <div className="grid grid-cols-2 gap-sm">
        <div className="col-span-2 sm:col-span-1">
          <SelectInput
            field="parent"
            rules={[yupSync]}
            label="Category"
            placeholder="Сонгох"
            required
            options={categories?.map((item) => ({
              value: item.code,
              label: item.name,
            }))}
            onChange={() => {
              form.setFieldValue("children", null);
            }}
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <Form.Item shouldUpdate>
            {({ getFieldValue }) => {
              const _parent = getFieldValue("parent");
              if (_parent) {
                const childrens = categories?.find(
                  (item) => item.code == _parent
                )?.children;

                const orderList = orderBy(childrens, "code", "asc");

                if (orderList && orderList.length > 0) {
                  return (
                    <SelectInput
                      field="children"
                      rules={[yupSync]}
                      label="дэд төрөл"
                      placeholder="Сонгох"
                      required
                      options={orderList?.map((item) => ({
                        value: item?.code,
                        label: item?.name,
                      }))}
                    />
                  );
                }
              } else {
                return null;
              }
            }}
          </Form.Item>
        </div>
      </div>
      <div className="flex flex-row gap-sm justify-end pt-md border-t-2 border-t-brand">
        <Button {...form} type="primary" className="px-md" htmlType="submit">
          Next
        </Button>
      </div>
    </div>
  );
}
