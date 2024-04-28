import React from "react";
import { Metadata } from "next";
import { AdminLayoutContainer } from "@/layouts/adminLayout/AdminLayoutContainer";
import { IoArrowBackOutline } from "react-icons/io5";
import ProductCreateContainer from "./components/productCreateContainer";

export const metadata: Metadata = {
  title: `投稿を作成 - チャイルド ラボ`,
  description: "育児x保育x療育情報総合アプリ",
};

export default async function AdminArticleCreatePage() {
  return (
    <AdminLayoutContainer title="投稿を作成" icon={<IoArrowBackOutline />}>
      <ProductCreateContainer />
    </AdminLayoutContainer>
  );
}
