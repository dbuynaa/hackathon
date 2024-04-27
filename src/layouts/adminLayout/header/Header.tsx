"use client";

// import libraries
import React, { ReactNode, useState } from "react";
import { Layout } from "antd";
import { useRouter } from "next/navigation";

// import utils
import { Breadcrumb, ButtonIcon, Typography } from "@/components";
import { HeaderTopProfile } from "@/layouts/common";

const { Header } = Layout;

type Props = {
  title: string;
  icon: ReactNode;
};

export const AdminHeader = (props: Props) => {
  const router = useRouter();

  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <Header className="bg-neutral-100/0 h-[70px] p-none m-none flex items-center justify-between">
      <div className=" bg-brand h-[70px] rounded-b-lg flex items-center gap-xs2 px-md">
        <ButtonIcon
          icon={props.icon}
          type="primary"
          className="w-[40px] h-[40px] bg-primary-700"
        />
        <Typography base="H6" weight="bold" className="text-white">
          {props.title}
        </Typography>
      </div>
      <div className="bg-white h-[70px] rounded-b-lg flex items-center px-md gap-md">
        <HeaderTopProfile setCompanyUpdateModal={setIsModalVisible} />
      </div>
    </Header>
  );
};
