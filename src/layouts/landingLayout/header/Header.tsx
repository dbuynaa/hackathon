"use client";

import React, { useEffect, useState } from "react";
import { Row, Col, Modal } from "antd";

import { HeaderLogo, HeaderMenu, HeaderTop } from "./components";
import { useBreakPoint } from "@/hooks";
import { AlertModal, Button } from "@/components";
import { IoClose, IoArrowBack } from "react-icons/io5";
import { WelcomeModal } from "@/components/auth/WelcomeModal";
import { AuthModal } from "@/components/auth/AuthModal";
import { AuthType } from "@/components/auth/type";
import { useSession } from "next-auth/react";
import { Category } from "@/graphql/generated";

export const LandingHeader = ({ categories }: { categories: Category[] }) => {
  const point = useBreakPoint();
  const { data: session } = useSession();

  const [isScrolled, setScrolled] = useState(false);
  const onScroll = () => {
    if (window.pageYOffset > 86) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
  }, []);

  const [visibleWelcome, setVisibleWelcome] = useState(false);
  const [visibleLogin, setVisibleLogin] = useState<AuthType | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const handleClickLogin = () => {
    setVisibleWelcome(false);
    setVisibleLogin(AuthType.Login);
  };
  const handleBack = () => {
    if (visibleLogin === AuthType.Login) {
      setVisibleLogin(null);
      setVisibleWelcome(true);
    } else {
      switch (visibleLogin) {
        case AuthType.Forget:
          setVisibleLogin(AuthType.Login);
          break;
        case AuthType.Confirmation:
          setVisibleLogin(AuthType.Forget);
          break;
        case AuthType.NewPassword:
          setVisibleLogin(AuthType.Confirmation);
          break;
      }
    }
  };

  return (
    <header className="mb-[0px] xs:mb-[-11px] shadow-sm">
      <Row className="px-sm xs:gap-sm md:px-lg max-w-screen-xl mx-auto">
        <Col className="h-[86px] xs:h-[142px] flex-[0_0_76px] xs:flex-[0_0_110px] lg:flex-[0_0_140px] z-10">
          <HeaderLogo />
        </Col>
        <Col flex="auto" className="w-[calc(100%-204px)]">
          <HeaderTop setVisibleWelcome={setVisibleWelcome} />
          <HeaderMenu
            className={`${
              (!point || point === "xs") && isScrolled
                ? " fixed top-none w-screen z-10 shadow-brandSm"
                : ""
            }`}
            categories={categories || []}
          />
        </Col>
      </Row>

      {!session?.user?.id && visibleWelcome && (
        <WelcomeModal
          open={!!visibleWelcome}
          handleLogin={handleClickLogin}
          onCancel={() => {
            setVisibleWelcome(false);
          }}
        />
      )}
      {!session?.user?.id && visibleLogin && (
        <Modal
          className="[&>div.ant-modal-content]:rounded-lg [&>div.ant-modal-content]:py-md"
          open={!!visibleLogin}
          width={450}
          footer={null}
          closeIcon={
            <Button
              className="bg-neutral-100 rounded-sm border-none"
              icon={<IoClose />}
              size="small"
            />
          }
          onCancel={() => {
            setVisibleLogin(null);
          }}
        >
          <Button
            type="text"
            className="bg-neutral-100 w-fit rounded-sm"
            icon={<IoArrowBack />}
            size="small"
            onClick={handleBack}
          />
          <AuthModal
            authType={visibleLogin}
            setAuthType={setVisibleLogin}
            setEmail={setEmail}
            email={email}
          />
        </Modal>
      )}

      <AlertModal
        base="success"
        open={visibleLogin === AuthType.Complete}
        closeIcon={false}
        title="パスワードが変更されました"
        onOk={() => setVisibleLogin(AuthType.Login)}
        okText="ログインする"
      />
    </header>
  );
};
