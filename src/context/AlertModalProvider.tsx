'use client';

import { ModalProps, Modal as AntModal, Image } from 'antd';
import React, { createContext, useContext, useState } from 'react';
import { Typography, Button } from '@/components';
import { styled } from 'styled-components';

const StyledAlert = styled(AntModal)`
  display: flex !important;
  & .ant-modal-content {
    padding: 0 !important;
    border-radius: 24px !important;
  }
  & .ant-modal-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${(props) => props.theme.spacing.lg} !important;
    padding: 24px 48px 32px 48px !important;
  }
  & .ant-modal-footer {
    margin: 0 !important;
  }
`;

export interface AlertContextType extends ModalProps {
  hrefOk?: string;
  hrefCancel?: string;
  base?: 'success' | 'error' | 'warning';
  description?: string | React.ReactNode;
}

export const AlertContext = createContext<{
  alert: AlertContextType;
  setAlert: React.Dispatch<React.SetStateAction<AlertContextType>>;
}>({
  alert: {
    base: 'warning',
  },
  setAlert: () => undefined,
});

export const useAlertStore = () => useContext(AlertContext);

export default function AlertContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [alert, setAlert] = useState<AlertContextType>({ base: 'warning' });
  const {
    base = 'warning',
    title,
    description,
    onOk,
    hrefOk,
    okText,
    onCancel,
    hrefCancel,
    cancelText,
    ...props
  } = alert;
  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
      <StyledAlert
        {...props}
        footer={false}
        onCancel={() => setAlert({ open: false })}
        closable={true}
      >
        <div className="flex flex-col gap-none items-center">
          <Image
            alt="Alert icon"
            preview={false}
            width={250}
            height={200}
            className="flex items-center"
            src={`/assets/images/status/${base}.png`}
          />
          <div className="flex flex-col items-center">
            <Typography base="H6" weight="bold">
              {title}
            </Typography>
            <Typography
              base="Subtitle2"
              weight="medium"
              className="text-secondary"
            >
              {description}
            </Typography>
          </div>
        </div>

        <div className="flex flex-row gap-sm w-full">
          {cancelText && (
            <Button
              size="middle"
              onClick={() => {
                if (!hrefCancel) onCancel;
                setAlert({ open: false });
              }}
              className="w-full"
              href={hrefCancel}
            >
              {cancelText}
            </Button>
          )}
          {okText && (
            <Button
              size="middle"
              onClick={() => {
                if (!hrefOk) onOk;
                setAlert({ open: false });
              }}
              className="w-full  bg-brand [&>span]:text-white"
              href={hrefOk}
            >
              {okText}
            </Button>
          )}
        </div>
      </StyledAlert>
    </AlertContext.Provider>
  );
}
