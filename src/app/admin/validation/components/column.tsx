import { Avatar, ButtonIcon, Typography, alertModal } from "@/components";
import { Validation } from "@/graphql/generated";
import dayjs from "dayjs";
import {
  IoArrowForwardCircleOutline,
  IoMailOutline,
  IoTrashOutline,
} from "react-icons/io5";

export const ValidationColumns = [
  {
    title: "#",
    key: "sort",
    render: (_t: Validation, _r: unknown, index: number) => <div>{index}</div>,
  },
  {
    title: "Name",
    key: "name",
    render: (item: Validation) => (
      <div className="flex gap-xs pl-lg items-center">
        <Avatar
          shape="square"
          size="default"
          src={item.image || "https://i.imgur.com/9fE4n5m.png"}
          className="border-secondary"
        />
        <Typography weight="medium" className="text-secondary">
          {item.product?.[0]?.Vendor?.name}
        </Typography>
      </div>
    ),
    sorter: true,
  },
  {
    title: "CreatedAt",
    key: "createdAt",
    render: (item: Validation) => (
      <Typography weight="medium" className="text-secondary">
        {dayjs(item.createdAt).format("YYYY/MM/DD HH:mm")}{" "}
      </Typography>
    ),
  },

  {
    title: "product",
    key: "product",
    render: (item: Validation) => (
      <div className="flex gap-xs pl-lg text-h6 items-center justify-center">
        <Typography className="text-primary">
          {item.product?.map((item) => item?.name).join(", ")}
        </Typography>
      </div>
    ),
  },
  {
    title: "author",
    key: "author",
    render: (item: Validation) => (
      <div className="flex gap-xs pl-lg text-h6 items-center justify-center">
        <IoMailOutline />

        <Typography className="text-primary">{item.author?.email}</Typography>
      </div>
    ),
  },

  {
    title: "",
    key: "action",
    render: (item: Validation) => (
      <div className=" pl-sm flex gap-xs items-center justify-center">
        <ButtonIcon
          size="small"
          type="primary"
          icon={<IoArrowForwardCircleOutline />}
          href={"/admin/validation/" + item.id}
        />
        <ButtonIcon
          onClick={() => {
            if (item.id) {
              alertModal.confirm({
                base: "warning",
                title: `Are you sure you want to delete?`,
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
