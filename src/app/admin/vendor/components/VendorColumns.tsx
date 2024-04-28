"use client";

import {
  Avatar,
  Badge,
  ButtonIcon,
  SelectInput,
  Typography,
  alertModal,
} from "@/components";
import { Status, Vendor } from "@/graphql/generated";
import { message } from "antd";
import dayjs from "dayjs";
import {
  IoArrowForwardCircleOutline,
  IoMailOutline,
  IoTrashOutline,
} from "react-icons/io5";

export const VendorColumns = ({ refetch }: { refetch: () => void }) => {
  return [
    {
      title: "#",
      key: "sort",
      render: (_t: Vendor, _r: unknown, index: number) => <div>{index}</div>,
    },
    {
      title: "Name",
      key: "name",
      render: (item: Vendor) => (
        <div className="flex gap-xs pl-lg items-center">
          <Typography weight="medium" className="text-primary">
            {item.name}
          </Typography>
        </div>
      ),
      sorter: true,
    },
    // {
    //   title: "",
    //   key: "endDate",
    //   render: (item: Vendor) => (
    //     <Typography weight="medium" className="text-secondary">
    //       {dayjs(item.).format("YYYY/MM/DD HH:mm")}{" "}
    //     </Typography>
    //   ),
    // },
    {
      title: "Email",
      key: "email",
      render: (item: Vendor) => (
        <div className="flex gap-xs pl-lg text-h6 items-center justify-center">
          <IoMailOutline />

          <Typography className="text-primary">{item.email}</Typography>
        </div>
      ),
    },
    // {
    //   title: '利用人数上限',
    //   key: 'staffLimit',
    //   render: (item: Vendor) => (
    //     <Typography weight="bold" className="text-primary">
    //       <span className="text-brand font-bold">
    //         {item._count.countStaff || 0}
    //       </span>{' '}
    //       / {item.staffLimit}
    //     </Typography>
    //   ),
    // },
    {
      title: "Status",
      key: "status",
      render: (item: Vendor) => (
        <div className="px-sm">
          <SelectInput
            defaultValue={Status.VERIFIED}
            onSelect={() => {}}
            options={[
              { label: "PENDING", value: Status.PENDING },
              {
                label: "Verified",
                value: Status.VERIFIED,
              },
              {
                label: "Verified",
                value: Status.UNVERIFIED,
              },
            ]}
            disabled
            size="small"
            autoClearSearchValue
          />
        </div>
      ),
    },
    {
      title: "",
      key: "action",
      render: (item: Vendor) => (
        <div className=" pl-sm flex gap-xs items-center justify-center">
          <ButtonIcon
            size="small"
            type="primary"
            icon={<IoArrowForwardCircleOutline />}
            href={"/admin/vendor/" + item.id}
          />
          <ButtonIcon
            onClick={() => {
              if (item.id) {
                alertModal.confirm({
                  base: "warning",
                  title: `do you want to delete ${item.name}?`,
                  okText: "削除",
                  onOk: () => {},
                });
              }
            }}
            size="small"
            className=" rounded-sm text-primary"
            icon={<IoTrashOutline />}
          />
        </div>
      ),
    },
  ];
};
