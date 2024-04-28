"use client";

import React from "react";
// eslint-disable-next-line import/no-named-as-default
import styled from "styled-components";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu as AntMenu, Image } from "antd";
import { ButtonIcon } from "@/components";
import { NavLink } from "@/layouts/types";

import { IoCloseOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { AdminSidebarMenus } from "@/navigation/AdminSidebarMenus";

const { Sider } = Layout;

type Props = {
  className?: string;
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
};

const Menu = styled(AntMenu)`
  display: flex;
  /* padding: 20px 0px; */
  flex-direction: column;
  align-items: center;
  gap: 15px;
  border: none !important;
  .ant-menu-item {
    display: flex;
    margin: 0;
    width: 100%;
    height: 50px;
    padding: 11px;
    padding-right: 13px !important;
    padding-left: 13px !important;
    justify-content: center;
    align-items: start;
    gap: 12px;
    border-radius: var(--sizes-radius-md, 14px);
    background-color: var(--neutral-100, #f1f2f6);

    svg {
      color: ${(props) => props.theme.textColor.neutral[800]} !important;
      width: 24px;
      height: 24px;
    }
    .ant-menu-title-content {
      display: block;
      margin-left: 0 !important;
      font-size: ${(props) => props.theme.fontSize.body};
      font-weight: normal;
    }
  }
  .ant-menu-item-selected {
    background-color: var(--primary-600, #00b1e1) !important;
    box-shadow: 0px 4px 20px 0px rgba(0, 177, 225, 0.1);
    svg {
      color: ${(props) => props.theme.textColor.white} !important;
    }
    .ant-menu-title-content {
      display: block;
      margin-left: 0 !important;
      font-size: ${(props) => props.theme.fontSize.body};
      font-weight: bold;
      color: ${(props) => props.theme.textColor.white};
    }
  }
  &.collapsed {
    .ant-menu-item {
      display: flex;
      width: 50px;
      height: 50px;
      padding: 11px;
      /* justify-content: center;
      align-items: center; */
      /* gap: 12px; */
      border-radius: var(--sizes-radius-md, 14px);
      background-color: var(--neutral-100, #f1f2f6);

      svg {
        color: ${(props) => props.theme.textColor.neutral[800]} !important;
        width: 24px;
        height: 24px;
      }
      .ant-menu-title-content {
        display: none;
      }
    }
    .ant-menu-item-selected {
      background-color: var(--primary-600, #00b1e1) !important;
      box-shadow: 0px 4px 20px 0px rgba(0, 177, 225, 0.1);
      svg {
        color: ${(props) => props.theme.textColor.white} !important;
      }
    }
  }
`;

export function AdminSidebar({ className, collapsed, setCollapsed }: Props) {
  const pathname = usePathname();

  const _split = pathname.split("/");
  const _pathname = _split.length > 2 ? `/${_split[1]}/${_split[2]}` : pathname;
  const sidebarMenus = AdminSidebarMenus();
  const adminNavItems = sidebarMenus;

  return (
    <Sider
      trigger={null}
      className={`${className ? className : ""} bg-white px-[15px]`}
      width="250px"
      collapsible
      collapsed={collapsed}
      collapsedWidth="80px"
    >
      <div className="  flex items-center justify-start h-[82px] border-b-[1px] border-secondary">
        {collapsed ? (
          <ButtonIcon
            className="border-none bg-neutral-100 [&>span.ant-btn-icon]:text-neutral-800 rounded-md"
            icon={<MenuUnfoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
        ) : (
          <div className="flex flex-row justify-between w-[100%]">
            <Image
              className="w-[130px] h-[40px]"
              alt="Certyfy"
              preview={false}
              src="/assets/images/vercel.svg"
            />
            <ButtonIcon
              // type="primary"
              className="border-none bg-primary [&>span.ant-btn-icon]:text-white rounded-md"
              icon={<IoCloseOutline />}
              onClick={() => setCollapsed(!collapsed)}
            />
          </div>
        )}
      </div>
      <Menu
        mode="inline"
        // defaultSelectedKeys={['1']}
        className={`${collapsed ? "collapsed" : ""}`}
        selectedKeys={[pathname, _pathname]}
        items={adminNavItems}
      />
    </Sider>
  );
}
