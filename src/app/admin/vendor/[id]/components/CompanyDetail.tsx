"use client";

import { useState } from "react";
import { Avatar, Badge, Button, SelectInput, Typography } from "@/components";
import { IoCreateOutline, IoPersonOutline } from "react-icons/io5";

import { CompanyUpdateContainer } from "./CompanyUpdateContainer";
import dayjs from "dayjs";
import { Status, Vendor } from "@/graphql/generated";

const DataItemCom = ({
  data,
}: {
  data: { l: string; v?: string | React.ReactNode }[];
}) => {
  const render = data.map((item) => (
    <div key={item.l} className="flex gap-xs2 border-b border-b-dark pb-sm">
      <Typography base="Body" className="text-primary">
        {item.l}
      </Typography>
      <Typography weight="bold" className="text-primary">
        {item.v && item.v}
      </Typography>
    </div>
  ));
  return render;
};

export function CompanyDetail({ data }: { data: Vendor }) {
  const [isEdit, setEdit] = useState(false);

  if (isEdit) return <CompanyUpdateContainer data={data} setEdit={setEdit} />;

  return (
    <div className="col-span-12 lg:col-span-4 flex flex-col gap-lg lg:border-r border-r-dark lg:pr-lg">
      <div className="flex gap-md items-center">
        {/* <Avatar
          src="https://joeschmoe.io/api/v1/random"
          // src={
          //   sourceFile({
          //     fileKey: data?.image,
          //   })?.url
          // }
          icon={!data?.image && <IoPersonOutline />}
          shape="square"
          size="large"
          alt={data?.name}
          className="border-secondary"
          key={data?.id} //delete
        /> */}
        <div className="flex flex-col gap-xs">
          <Typography weight="bold" base="H5" className="text-primary">
            {data?.name}
          </Typography>
          <SelectInput
            defaultValue={data?.status || ""}
            className="w-fit h-[36px]"
            options={[
              { label: "Verified", value: Status.VERIFIED },
              { label: "Unverified", value: Status.UNVERIFIED },
              { label: "Pending", value: Status.PENDING },
            ]}
            autoClearSearchValue
            disabled
          />
        </div>
      </div>
      <div className="flex justify-between border-b-2 border-brand pb-xs2">
        <Typography base="Subtitle" weight="bold" className="text-primary">
          契約法人会員情報
        </Typography>

        <Button
          type="primary"
          icon={<IoCreateOutline />}
          size="small"
          className="px-md"
          onClick={() => setEdit(true)}
        >
          編集
        </Button>
      </div>
      <div className="flex flex-col gap-sm">
        <DataItemCom
          data={[
            { l: "Name", v: data?.name },
            { l: "Email", v: data?.email },
            { l: "Contact", v: data?.contact },
          ]}
        />
      </div>
    </div>
  );
}
