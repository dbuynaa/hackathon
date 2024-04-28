import React from "react";
import AntdComponentsRegistry from "@/lib/antd/AntdRegistry";
import theme from "@/utils/themeConfig";
import { App, ConfigProvider } from "antd";
import locale from "antd/lib/locale/mn_MN";
import UseAppAlertModal from "@/components/core/UseAlertModal";
import UseAntApp from "@/components/core/UseAntApp";
import { locale as dayjsLocale } from "dayjs";
import "dayjs/locale/mn";
dayjsLocale("mn");
export default function AntConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AntdComponentsRegistry>
      <ConfigProvider theme={theme} locale={locale}>
        <App>
          <UseAppAlertModal />
          <UseAntApp />
          {children}
        </App>
      </ConfigProvider>
    </AntdComponentsRegistry>
  );
}
