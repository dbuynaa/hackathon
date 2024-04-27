import { AdminLayoutContainer } from "@/layouts/adminLayout/AdminLayoutContainer";
import React from "react";
import { IoPersonAddOutline } from "react-icons/io5";

export default async function AdminPage() {
  return (
    <AdminLayoutContainer title="管理者管理" icon={<IoPersonAddOutline />}>
      <h4>Admin page</h4>
    </AdminLayoutContainer>
  );
}
