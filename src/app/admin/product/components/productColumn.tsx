import {
  Avatar,
  ButtonIcon,
  SelectInput,
  Typography,
  alertModal,
} from "@/components";
import { Product, Status } from "@/graphql/generated";
import dayjs from "dayjs";
import {
  IoArrowForwardCircleOutline,
  IoMailOutline,
  IoTrashOutline,
} from "react-icons/io5";

export const ProductColumns = [
  {
    title: "#",
    key: "sort",
    render: (_t: Product, _r: unknown, index: number) => <div>{index}</div>,
  },
  {
    title: "Name",
    key: "name",
    render: (item: Product) => (
      <div className="flex gap-xs pl-lg items-center">
        <Avatar
          shape="square"
          size="small"
          src={item.image || "https://i.imgur.com/9fE4n5m.png"}
          className="border-secondary"
        />
        <Typography weight="medium" className="text-primary">
          {item.name}
        </Typography>
      </div>
    ),
    sorter: true,
  },
  {
    title: "CreatedAt",
    key: "createdAt",
    render: (item: Product) => (
      <Typography weight="medium" className="text-secondary">
        {dayjs(item.createdAt).format("YYYY/MM/DD HH:mm")}{" "}
      </Typography>
    ),
  },

  {
    title: "Category",
    key: "category",
    render: (item: Product) => (
      <div className="flex gap-xs pl-lg text-h6 items-center justify-center">
        <Typography className="text-primary">
          {item.categories?.map((c) => c?.name)?.join(",")}
        </Typography>
      </div>
    ),
  },
  {
    title: "Status",
    key: "status",
    render: (item: Product) => (
      <SelectInput
        value={item.status}
        onSelect={(value) => {}}
        placeholder="Төлөв"
        options={[
          {
            label: "Баталгаажсан",
            value: Status.VERIFIED,
          },
          {
            label: "Хүлээгдэж буй",
            value: Status.PENDING,
          },
          {
            label: "Баталгаажаагүй",
            value: Status.UNVERIFIED,
          },
        ]}
        size="small"
        disabled={false}
      />
    ),
  },
  {
    title: "Auditer",
    key: "email",
    render: (item: Product) => (
      <div className="flex gap-xs pl-lg text-h6 items-center justify-center">
        <IoMailOutline />

        <Typography className="text-primary">{item.auditer?.email}</Typography>
      </div>
    ),
  },

  {
    title: "",
    key: "action",
    render: (item: Product) => (
      <div className=" pl-sm flex gap-xs items-center justify-center">
        <ButtonIcon
          size="small"
          type="primary"
          icon={<IoArrowForwardCircleOutline />}
          href={"/admin/Product/" + item.id}
        />
        <ButtonIcon
          onClick={() => {
            if (item.id) {
              alertModal.confirm({
                base: "warning",
                title: `do you want to delete ${item.name}?`,
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
