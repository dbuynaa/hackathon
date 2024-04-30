import React from "react";
import { Metadata } from "next";
import { AdminLayoutContainer } from "@/layouts/adminLayout/AdminLayoutContainer";
import { IoArrowBackOutline } from "react-icons/io5";
import { VendorCreateContainer } from "./components";

export default function AdminVendorCreatePage() {
  return (
    <AdminLayoutContainer title="Байгууллага" icon={<IoArrowBackOutline />}>
      <VendorCreateContainer />
    </AdminLayoutContainer>
  );
}
