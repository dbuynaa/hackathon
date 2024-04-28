"use client";

import { useEffect, useState } from "react";
import { Steps, Typography, alertModal } from "@/components";
import { Form } from "antd";
import {
  Product,
  ValidationCreateInput,
  useProductsQuery,
  useValidationCreateMutation,
  useValidationLazyQuery,
  useValidationUpdateMutation,
} from "@/graphql/generated";
import { Yup } from "@/lib/yup";
import { Rule } from "antd/es/form";

import { CreateValidationStep1 } from "./CreateValidationStep1";
import { CreateValidationStep2 } from "./CreateValidationStep2";
import { CreateValidationStep3 } from "./CreateValidationStep3";
import { useRouter } from "next/navigation";

export default function ValidationCreateContainer({ id }: { id?: string }) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [selectedProducts, setSelectedProducts] = useState<Product[]>();

  const [current, setCurrent] = useState(0);
  const [getValidationInput, setValidationInput] =
    useState<ValidationCreateInput | null>(null);

  const [formTitle, setFormTitle] = useState("create Validation");

  const yupSync: Rule = {
    async validator({ field }: any, value) {
      await Yup.validationCreate.validateSyncAt(field, { [field]: value });
    },
  };

  const [onValidationLazyQuery] = useValidationLazyQuery();

  const { data: products } = useProductsQuery({
    fetchPolicy: "no-cache",
    variables: {
      take: 5,
      skip: 0,
    },
  });

  const [onValidationCreateMutation, { loading: ValidationCreateLoading }] =
    useValidationCreateMutation({
      onCompleted: () => {
        alertModal.confirm({
          base: "success",
          title: "successfully created",
          okText: "OK",
          onOk: () => {
            router.push("/admin/validation");
          },
        });
      },
    });
  const [onValidationUpdateMutation, { loading: ValidationUpdateLoading }] =
    useValidationUpdateMutation({
      onCompleted: () => {
        alertModal.confirm({
          base: "success",
          title: "successfully Updated",
          okText: "OK",
          onOk: () => {
            router.push("/admin/Validation");
          },
        });
      },
    });

  const prev = () => {
    setCurrent(current - 1);
    setFormTitle("create Validation");
  };
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
  const steps = [
    {
      title: "Алхам 1",
      content: <CreateValidationStep1 form={form} yupSync={yupSync} />,
    },
    {
      title: "Алхам 2",
      content: (
        <CreateValidationStep2
          prev={prev}
          next={next}
          setSelectedProducts={setSelectedProducts}
          selectedProducts={selectedProducts as Product[]}
          validation={getValidationInput as ValidationCreateInput}
          count={products?.products?.count || 0}
          products={products?.products?.data as Product[]}
          loading={ValidationCreateLoading}
        />
      ),
    },
    {
      title: "Алхам 3",
      content: (
        <CreateValidationStep3
          prev={prev}
          Validation={getValidationInput as ValidationCreateInput}
          submitText={"submit"}
          loading={ValidationCreateLoading}
          products={selectedProducts || []}
        />
      ),
    },
  ];

  const onFinish = (values: ValidationCreateInput) => {
    if (current === 0) {
      setValidationInput(values);
      next();
    }
    if (current === 1) {
      const selectedPostIds = selectedProducts?.map((item) => item.id);
      form.setFieldValue("products", selectedProducts);
      setValidationInput({
        ...getValidationInput,
        ...values,
        productsId: selectedPostIds || [],
      });
      next();
    } else {
      if (getValidationInput) {
        if (id) {
          onValidationUpdateMutation({
            variables: {
              validationUpdateId: id,
              input: {
                ...getValidationInput,
              },
            },
          });
        } else
          onValidationCreateMutation({
            variables: {
              input: getValidationInput,
            },
          });
      }
    }
  };

  useEffect(() => {
    if (id) {
      onValidationLazyQuery({
        variables: { where: { id: id } },
      });
    }
  }, [id]);

  return (
    <div className="mx-auto">
      <Form
        form={form}
        name="CreateValidation"
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
        autoComplete="on"
        className="flex flex-col gap-lg"
      >
        <Steps
          submitText={"Submit"}
          current={current}
          prev={prev}
          steps={steps}
          uploading={ValidationCreateLoading}
        />
        <div className={current == 0 ? "mx-auto w-[650px]" : ""}>
          {steps[current].content}
        </div>{" "}
      </Form>
    </div>
  );
}
