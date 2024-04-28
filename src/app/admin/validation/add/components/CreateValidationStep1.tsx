"use client";

import { TextAreaInput, Button } from "@/components";
import { Rule } from "antd/es/form";
import { ValidationCreateInput } from "@/graphql/generated";
import { FormInstance } from "antd/lib";
type Props = {
  form: FormInstance<ValidationCreateInput>;
  yupSync: Rule;
};

export function CreateValidationStep1({ form, yupSync }: Props) {
  return (
    <div className="flex flex-col gap-lg">
      <TextAreaInput
        form={form}
        label="Тайлан"
        field="content"
        required
        rules={[yupSync]}
        placeholder="Бичих"
        className="xs:h-[480px]"
      />

      <div className="flex flex-row gap-sm justify-end pt-md border-t-2 border-t-brand">
        <Button {...form} type="primary" className="px-md" htmlType="submit">
          Next
        </Button>
      </div>
    </div>
  );
}
