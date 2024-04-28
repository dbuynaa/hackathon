'use client';

import React from 'react';
import { styled } from 'styled-components';
import { Image, Modal as AntModal, ModalProps, Divider } from 'antd';
import { Typography, Button } from '..';
import { IoClose } from 'react-icons/io5';
import Link from 'next/link';

type Props = ModalProps & {
  handleLogin: () => void;
  onCancel: () => void;
};

const StyledModal = styled(AntModal)`
  & .ant-modal-content {
    .ant-modal-close {
      background-color: ${(props) =>
        props.theme.colors.neutral[700]} !important;
      border-radius: ${(props) => props.theme.borderRadius.xs} !important;
      width: 36px !important;
      height: 36px !important;
      color: white !important;
      svg {
        width: 20px !important;
        height: 20px !important;
      }
    }
  }
`;

export function WelcomeModal(props: Props) {
  const { handleLogin, onCancel, ..._props } = props;
  return (
    <StyledModal
      {..._props}
      className="w-[424px] md:w-[880px] [&>div.ant-modal-content]:bg-surface-invert [&>div.ant-modal-content]:rounded-lg [&>div.ant-modal-content]:py-md  "
      footer={null}
      closable={true}
      closeIcon={<IoClose />}
      onCancel={() => onCancel()}
    >
      <div className="flex flex-col md:flex-row md:h-[592px] items-center">
        <div className="flex flex-col md:hidden w-full gap-md items-center justify-center mt-lg">
          <Image
            alt="Child lab welcome modal"
            preview={false}
            className="welcome"
            src="/assets/images/welcome.png"
          />
          <div className="flex gap-md">
            <Image
              alt="Child lab logo"
              preview={false}
              src="/assets/images/logo_A2.svg"
            />
            <Divider
              type="vertical"
              className="h-[38px] bg-neutral-600 m-[0]"
            />
            <Typography className="font-bold text-white text-subtitle">
              育児x保育x療育
              <br />
              総合情報メディア
            </Typography>
          </div>
        </div>
        <div className="flex flex-col gap-md items-center py-sm px-none lg:p-lg ">
          <div className="flex flex-col items-center w-full gap-sm bg-neutral-700 rounded-md p-sm lg:p-md">
            <Typography className="text-white font-bold text-center">
              メールアドレス・パスワードをお持ちでない
              <br />
              Хэрэглэгч эсэх?
            </Typography>
            <Link
              href="/"
              onClick={() => {
                onCancel();
              }}
            >
              <Button className="w-[237px] bg-white" type="text">
                ログインせずに始める
              </Button>
            </Link>
          </div>
          <div className="flex flex-col items-center w-full gap-sm bg-neutral-700 rounded-md p-sm lg:p-md">
            <Typography className="font-bold text-white text-center">
              Хэрэв шинэ хэрэглэгч бол 
              <br /> Энд дарна уу
            </Typography>
            <Button
              type="primary"
              className="w-full"
              onClick={() => {
                handleLogin();
              }}
            >
              ログイン
            </Button>
          </div>
        </div>
        <div className="hidden md:flex flex-col gap-md w-auto justify-center items-center mx-auto">
          <Image
            alt="Child lab welcome modal"
            preview={false}
            className="welcome"
            src="/assets/images/welcome.png"
          />
          <div className="flex w-full gap-md items-center justify-center">
            <Image
              alt="Child lab logo"
              preview={false}
              src="/assets/images/logo_A2.svg"
            />
            <Divider
              type="vertical"
              className="h-[38px] bg-neutral-600 m-[0]"
            />
            <Typography className="font-bold text-white text-subtitle">
              Certify
              <br />
              By codeX
            </Typography>
          </div>
        </div>
      </div>
    </StyledModal>
  );
}
