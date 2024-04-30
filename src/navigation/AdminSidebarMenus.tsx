"use client";

import { VerticalNavItemsType } from "@/layouts/types";
import { useRouter } from "next/navigation";
import {
  IoBusinessOutline,
  IoLockClosedOutline,
  IoNewspaperOutline,
} from "react-icons/io5";

export const AdminSidebarMenus = (): VerticalNavItemsType => {
  const router = useRouter();
  return [
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
      onClick: () => router.push("/admin"),
      auth: false,
    },
    {
      key: "validation",
      label: "Validation",
      icon: <IoLockClosedOutline />,
      onClick: () => router.push("/admin/validation"),
      auth: false,
    },
  ];
};
