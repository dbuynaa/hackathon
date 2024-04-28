"use client";

import { VerticalNavItemsType } from "@/layouts/types";
import { useRouter } from "next/navigation";
import {
  IoBusinessOutline,
  IoLockClosed,
  IoNewspaperOutline,
  IoPersonAddOutline,
} from "react-icons/io5";

export const AdminSidebarMenus = (): VerticalNavItemsType => {
  const router = useRouter();
  return [
    // スタッフ管理
    {
      key: "admin",
      label: "admin",
      icon: <IoPersonAddOutline />,
      onClick: () => router.push("/admin"),
      auth: false,
    },
    {
      key: "vendor",
      label: "Vendor",
      icon: <IoBusinessOutline />,
      onClick: () => router.push("/admin/vendor"),
      auth: false,
    },
    {
      key: "product",
      label: "Product",
      icon: <IoNewspaperOutline />,
      onClick: () => router.push("/admin/product"),
      auth: false,
    },
    {
      key: "validation",
      label: "Validation",
      icon: <IoLockClosed />,
      onClick: () => router.push("/admin/validation"),
      auth: false,
    },
  ];
};
