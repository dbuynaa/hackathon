"use client";

import { TextInput, Button, Typography, RadioGroupInput } from "@/components";
import { VendorCreateInput } from "@/graphql/generated";

import { Rule } from "antd/es/form";
import { FormInstance } from "antd/lib";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

type Props = {
  form: FormInstance<VendorCreateInput>;
  yupSync: Rule;
};

export function CompanyCreateStep1({ yupSync }: Props) {
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex flex-col gap-lg">
      <div className="flex justify-between"></div>
      <TextInput
        label="Company Name"
        required
        field="name"
        allowClear={{
          clearIcon: <IoClose className="w-[18px] h-[18px] text-neutral-500" />,
        }}
        placeholder="ひまわり幼稚園"
      />

      <div className="flex gap-sm ">
        <TextInput
          label="Company Email"
          field={"email"}
          required
          rules={[yupSync]}
          allowClear={{
            clearIcon: (
              <IoClose className="w-[18px] h-[18px] text-neutral-500" />
            ),
          }}
          placeholder="Email"
        />
        <TextInput
          label="Address"
          field="contact"
          required
          rules={[yupSync]}
          allowClear={{
            clearIcon: (
              <IoClose className="w-[18px] h-[18px] text-neutral-500" />
            ),
          }}
          placeholder="Company Address"
        />
      </div>

      <div className="flex flex-row gap-sm justify-end pt-md border-t-2 border-t-brand">
        <Button
          loading={loading}
          disabled={loading}
          type="primary"
          className="px-md"
          htmlType="submit"
        >
          プレビュー
        </Button>
      </div>
    </div>
  );
}
