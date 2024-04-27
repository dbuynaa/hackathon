'use client';

import React from 'react';
import { styled } from 'styled-components';
import { Image, Modal as AntModal, ModalProps } from 'antd';
import { Typography, Button } from '@/components';

type Props = ModalProps & {
  base?: 'success' | 'error' | 'warning';
  description?: string | React.ReactNode;
};

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
    padding: 24px 64px 48px 64px !important;
  }
  & .ant-modal-footer {
    margin: 0 !important;
  }
`;

export function AlertModal({
  base = 'warning',
  title,
  description,
  onOk,
  okText,
  onCancel,
  cancelText,
  closable,
  ...props
}: Props) {
  return (
    <StyledAlert {...props} footer={false} closable={closable}>
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
          {title ? (
            <Typography base="H6" weight="bold">
              {title}
            </Typography>
          ) : null}
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
          <Button size="middle" onClick={onCancel} className="w-full">
            {cancelText}
          </Button>
        )}
        {okText && (
          <Button
            size="middle"
            onClick={onOk}
            className="w-full  bg-brand [&>span]:text-white"
          >
            {okText}
          </Button>
        )}
      </div>
    </StyledAlert>
  );
}
