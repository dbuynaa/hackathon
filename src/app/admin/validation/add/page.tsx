import React from "react";
import { Metadata } from "next";
import { AdminLayoutContainer } from "@/layouts/adminLayout/AdminLayoutContainer";
import { IoArrowBackOutline } from "react-icons/io5";
import ProductCreateContainer from "./components/CreateContainer";

export default async function AdminArticleCreatePage() {
  return (
    <AdminLayoutContainer title="Validation" icon={<IoArrowBackOutline />}>
      <ProductCreateContainer />
    </AdminLayoutContainer>
  );
}
