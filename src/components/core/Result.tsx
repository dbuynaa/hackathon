'use client';

import { styled } from 'styled-components';
import { Result as AntResult, ResultProps, Image } from 'antd';
import { ResultStatusType } from 'antd/es/result';
import { ReactElement } from 'react';

const StyledResult = styled(AntResult)`
  padding: ${(props) => props.theme.borderRadius.md} !important;
  .ant-result-icon {
    margin: 0 !important;
  }
  .ant-result-title {
    color: ${(props) => props.theme.textColor.primary} !important;
    font-size: ${(props) => props.theme.fontSize.h6} !important;
    font-weight: 700;
    margin: 0 !important;
  }
  .ant-result-subtitle {
    color: #6b7280;
    font-size: ${(props) => props.theme.fontSize.subtitle2} !important;
    font-weight: 500;
    margin-top: ${(props) => props.theme.fontSize.subtitle2} !important;
  }
  .ant-result-extra {
    display: flex;
    gap: ${(props) => props.theme.spacing.sm} !important;
    align-items: center;
    justify-content: center;
    margin-top: ${(props) => props.theme.spacing.lg} !important;
  }
`;

interface CustomResultProps extends ResultProps {
  type?: ResultStatusType | 'nodata';
  backBtn?: ReactElement;
  reloadBtn?: ReactElement;
}

export function Result({
  type,
  backBtn,
  reloadBtn,
  icon,
  ...props
}: CustomResultProps) {
  const status = type === 'nodata' ? undefined : type;

  const getIcon = () => {
    switch (type) {
      case 'success':
      case 'warning':
      case 'error':
      case 'nodata':
        return (
          <Image
            alt="Result icon"
            preview={false}
            width={250}
            height={200}
            className="flex items-center"
            src={`/assets/images/status/${type}.png`}
          />
        );
    }
  };
  const resultIcon = icon ? icon : getIcon();

  return (
    <StyledResult
      {...props}
      status={status}
      icon={resultIcon}
      extra={[backBtn && backBtn, reloadBtn && reloadBtn]}
    />
  );
}
