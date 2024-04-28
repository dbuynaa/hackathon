"use client";

import React, { useEffect, useState } from "react";
import { AlertModal, Steps, alertModal } from "@/components";
import { Form } from "antd";

import { Rule } from "antd/es/form";
import { Yup } from "@/lib/yup";
import { useAlertStore } from "@/context/AlertModalProvider";

import { useRouter } from "next/navigation";
import {
  VendorCreateInput,
  useVendorCreateMutation,
  useVendorLazyQuery,
  useVendorUpdateMutation,
} from "@/graphql/generated";
import { CompanyCreateStep1 } from "./CompanyCreateStep1";
import { CompanyCreateStep2 } from "./CompanyCreateStep2";
export function VendorCreateContainer({
  vendorId,
}: {
  vendorId?: string | null;
}) {
  const [form] = Form.useForm();
  const router = useRouter();

  const yupSync: Rule = () => ({
    async validator({ field }: any, value) {
      const validationSchema = { [field]: value };
      await Yup.vendorCreate.validateSyncAt(field, validationSchema);
    },
  });

  const [current, setCurrent] = useState(0);
  const [getVendor, setVendor] = useState<VendorCreateInput | null>(null);

  const { setAlert } = useAlertStore();

  const [onVendorAdminLazyQuery] = useVendorLazyQuery({
    fetchPolicy: "no-cache",
    onCompleted: async (_data) => {
      const { vendor } = _data;
      const _input: VendorCreateInput = {
        contact: vendor?.contact || "",
        email: vendor?.email || "",
        name: vendor?.name || "",
      };

      setVendor(_input as VendorCreateInput);
      form.setFieldsValue({
        ..._input,
      });
    },
  });

  const [onVendorCreateMutation] = useVendorCreateMutation({
    onCompleted: () => {
      alertModal.confirm({
        base: "success",
        open: true,
        title: "Success",
        okText: "Close",
        closeIcon: false,
        onOk: () => {
          router.push(`/admin/vendor`);
        },
      });
    },
    onError: (error) => {
      setAlert({
        base: "error",
        open: true,
        title: "エラーを確認してください",
        description: error?.message ? error.message : "",
        cancelText: "戻る",
      });
    },
  });

  const [onVendorUpdateMutation] = useVendorUpdateMutation({
    onCompleted: () => {
      alertModal.confirm({
        base: "success",
        open: true,
        title: "Success",
        okText: "Close",
        closeIcon: false,
        onOk: () => {
          router.push(`/admin/vendor`);
        },
      });
    },
    onError: (error) => {
      setAlert({
        base: "error",
        open: true,
        title: "エラーを確認してください",
        description: error?.message ? error.message : "",
        cancelText: "戻る",
      });
    },
  });

  const next = () => {
    if (current === 0) {
      const result = form.getFieldsError().filter((e) => e.errors.length > 0);
      if (result.length > 0) {
        form.scrollToField(result?.[0]?.name, { block: "center" });
      } else {
        setCurrent(current + 1);
      }
    }
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "Step 1",
      content: <CompanyCreateStep1 form={form} yupSync={yupSync} />,
    },
    {
      title: "Step 2",
      content: (
        <CompanyCreateStep2
          prev={prev}
          vendor={getVendor}
          submitText="Confirm"
        />
      ),
    },
  ];

  const onFinish = (values: VendorCreateInput) => {
    if (current === 0) {
      setVendor(values);
      next();
    } else if (current === 1) {
      console.log("values", values);
      if (vendorId)
        onVendorUpdateMutation({
          variables: { vendorUpdateId: vendorId, input: { ...values } },
        });
      else
        onVendorCreateMutation({ variables: { input: getVendor || values } });
    }
  };
  useEffect(() => {
    if (vendorId) {
      onVendorAdminLazyQuery({
        variables: { where: { id: vendorId } },
      });
    }
  }, [vendorId]);

  return (
    <div className="mx-auto">
      <Form
        form={form}
        name="CompanyCreate"
        layout="vertical"
        initialValues={{
          image: null,
          name: null,
          email: null,
        }}
        onFinish={onFinish}
        onFinishFailed={(errorInfo) => {
          console.log("errorInfo", errorInfo);
        }}
        autoComplete="on"
        className="flex flex-col gap-lg"
      >
        <Steps
          current={current}
          prev={prev}
          steps={steps}
          submitText="Submit"
          className="company"
        />
        <div className={current != 2 ? "mx-auto w-[600px]" : ""}>
          {steps[current].content}
        </div>
        <AlertModal open={false} closeIcon={false} />
      </Form>
    </div>
  );
}
