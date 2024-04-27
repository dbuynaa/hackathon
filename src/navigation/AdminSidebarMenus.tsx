"use client";

import { VerticalNavItemsType } from "@/layouts/types";
import { useRouter } from "next/navigation";
import {
  IoBookmarkOutline,
  IoBusinessOutline,
  IoNewspaperOutline,
  IoNotificationsOutline,
  IoPersonAddOutline,
  IoStorefrontOutline,
  IoVideocamOutline,
} from "react-icons/io5";
import { Routes } from "@/config/routes";

export const AdminSidebarMenus = (): VerticalNavItemsType => {
  const router = useRouter();
  return [
    // 管理者管理
    {
      key: Routes.Admin_Member.key,
      label: Routes.Admin_Member.Index.title,
      icon: <IoPersonAddOutline />,
      onClick: () => router.push(Routes.Admin_Member.Index.route),
      auth: Routes.Admin_Member.Index.shouldBeAuthenticated,
    },
    // 契約法人会員管理
    {
      key: Routes.Admin_Company.key,
      label: Routes.Admin_Company.Index.title,
      icon: <IoBusinessOutline />,
      onClick: () => router.push(Routes.Admin_Company.Index.route),
      auth: Routes.Admin_Company.Index.shouldBeAuthenticated,
    },
    // スタッフ管理
    {
      key: Routes.Admin_Staff.key,
      label: Routes.Admin_Staff.Index.title,
      icon: <IoPersonAddOutline />,
      onClick: () => router.push(Routes.Admin_Staff.Index.route),
      auth: Routes.Admin_Staff.Index.shouldBeAuthenticated,
    },
  ];
};
