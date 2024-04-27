"use client";

import { VerticalNavItemsType } from "@/layouts/types";
import { useRouter } from "next/navigation";
import { IoPersonAddOutline } from "react-icons/io5";

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
  ];
};
