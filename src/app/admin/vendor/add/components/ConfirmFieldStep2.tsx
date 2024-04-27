"use client";

import { Typography } from "@/components";

export function ConfirmFieldStep2({
  fieds,
}: {
  fieds: { l: string; v?: string | React.ReactNode }[];
}) {
  const DataItemCom = ({
    data,
  }: {
    data: { l: string; v?: string | React.ReactNode }[];
  }) => {
    const render = data.map((item) => (
      <div key={item.l} className="grid grid-cols-3 items-center">
        <Typography className="col-span-1" base="Subtitle2">
          {item.l}
        </Typography>
        <Typography className="col-span-2" base="Subtitle" weight="medium">
          {item.v && item.v}
        </Typography>
      </div>
    ));
    return render;
  };

  return (
    <div className="[&>div]:py-md last:[&>div]:pb-none [&>div]:border-t-[1px] [&>div]:border-t-dark">
      <DataItemCom data={fieds} />
    </div>
  );
}
