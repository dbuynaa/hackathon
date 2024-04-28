"use client";

import { Button, Typography } from "@/components";
import { VendorCreateInput } from "@/graphql/generated";
import { ConfirmFieldStep2 } from "./ConfirmFieldStep2";

type Props = {
  vendor: VendorCreateInput | null;
  prev: () => void;
  submitText?: string;
  loading?: boolean;
};

export function CompanyCreateStep2({
  vendor,
  prev,
  submitText,
  loading,
}: Props) {
  return (
    <div className="flex flex-col gap-lg">
      <div className="flex flex-row gap-sm items-center">
        <Typography base="H5" weight="bold">
          {vendor?.name}
        </Typography>
      </div>
      <ConfirmFieldStep2
        fieds={[
          {
            l: "Company Email",
            v: vendor?.email,
          },
          { l: "Company Contact", v: vendor?.contact },
        ]}
      />
      <div className="flex flex-row gap-sm justify-end pt-md border-t-2 border-t-brand">
        <Button className="px-md" onClick={() => prev()} disabled={loading}>
          Back
        </Button>
        <Button
          className="px-md"
          type="primary"
          htmlType="submit"
          disabled={loading}
          loading={loading}
        >
          {submitText}
        </Button>
      </div>
    </div>
  );
}
