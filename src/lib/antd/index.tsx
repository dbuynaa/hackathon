import React from "react";
import AntdComponentsRegistry from "@/lib/antd/AntdRegistry";
import theme from "@/utils/themeConfig";
import { App, ConfigProvider } from "antd";
import jaJP from "antd/lib/locale/ja_JP";
import UseAppAlertModal from "@/components/core/UseAlertModal";
import UseAntApp from "@/components/core/UseAntApp";
import { locale as dayjsLocale } from "dayjs";
import "dayjs/locale/ja";
dayjsLocale("ja");
export default function AntConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AntdComponentsRegistry>
      <ConfigProvider theme={theme} locale={jaJP}>
        <App>
          <UseAppAlertModal />
          <UseAntApp />
          {children}
        </App>
      </ConfigProvider>
    </AntdComponentsRegistry>
  );
}
