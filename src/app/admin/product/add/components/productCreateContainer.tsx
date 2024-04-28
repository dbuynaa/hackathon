"use client";

import { useDeferredValue, useEffect, useState } from "react";
import { Steps, Typography, alertModal } from "@/components";
import { Form } from "antd";
import {
  Category,
  ProductCreateInput,
  useCategoriesQuery,
  useProductCreateMutation,
  useProductLazyQuery,
} from "@/graphql/generated";
import { Yup } from "@/lib/yup";
import { Rule } from "antd/es/form";

import Router from "next/navigation";
import { CreateProductStep1 } from "./CreateProductStep1";
import { CreateProductStep2 } from "./CreateProductStep2";
import { useRouter } from "next/router";

export default function ProductCreateContainer({ id }: { id?: string }) {
  const [form] = Form.useForm();
  const { data: categoryList } = useCategoriesQuery();
  const router = useRouter();

  const [current, setCurrent] = useState(0);
  const [getProductInput, setProductInput] =
    useState<ProductCreateInput | null>(null);

  const [formTitle, setFormTitle] = useState("create product");

  const prev = () => {
    setCurrent(current - 1);
    setFormTitle("create product");
  };

  const yupSync: Rule = {
    async validator({ field }: any, value) {
      await Yup.productCreate.validateSyncAt(field, { [field]: value });
    },
  };

  const [onProductLazyQuery] = useProductLazyQuery();

  const [onProductCreateMutation, { loading: ProductCreateLoading }] =
    useProductCreateMutation({
      onCompleted: () => {
        alertModal.confirm({
          base: "success",
          title: "successfully created",
          okText: "OK",
          onOk: () => {
            router.push("/admin/product");
          },
        });
      },
    });

  const steps = [
    {
      title: "Алхам 1",
      content: (
        <CreateProductStep1
          form={form}
          yupSync={yupSync}
          categories={categoryList?.categories as Category[]}
        />
      ),
    },
    {
      title: "Алхам 2",
      content: (
        <CreateProductStep2
          prev={prev}
          product={getProductInput as ProductCreateInput}
          categories={categoryList?.categories as Category[]}
          submitText={"submit"}
          loading={ProductCreateLoading}
        />
      ),
    },
  ];

  const next = () => {
    const result = form.getFieldsError().filter((e) => e.errors.length > 0);
    if (result.length > 0) {
      form.scrollToField(result?.[0]?.name, { block: "center" });
    } else {
      setCurrent(current + 1);
      setFormTitle("preview");
      window.scrollTo(0, 0);
    }
  };
  const onFinish = (values: ProductCreateInput) => {
    if (current === 0) {
      setProductInput(values);
      next();
    } else {
      if (getProductInput)
        onProductCreateMutation({
          variables: {
            input: getProductInput,
          },
        });
    }
  };

  useEffect(() => {
    if (id) {
      onProductLazyQuery({
        variables: { where: { id: id } },
      });
    }
  }, [id]);

  return (
    <main className="py-xxl">
      {/* Section === 投稿を作成 */}
      <div className="flex flex-col gap-sm lg:gap-md  w-full max-w-[720px] px-sm md:px-[0] mx-auto">
        <Typography
          base="H5"
          weight="bold"
          className="text-primary border-b-2 border-brand pb-xs2"
        >
          {formTitle}
        </Typography>
        <div>
          <Form
            form={form}
            name="CreatePost"
            layout="vertical"
            initialValues={{
              cover: null,
              title: null,
              content: null,
            }}
            onFinish={onFinish}
            onFinishFailed={(errorInfo) => {
              console.log("Failed:", errorInfo);
            }}
            scrollToFirstError={true}
            className="flex flex-col gap-lg"
          >
            <Steps
              submitText={"Submit"}
              current={current}
              prev={prev}
              steps={steps}
              uploading={ProductCreateLoading}
            />
            {steps[current].content}
          </Form>
        </div>
      </div>
    </main>
  );
}
