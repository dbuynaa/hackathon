'use client';

import { styled } from 'styled-components';
import { Alert as AntAlert, AlertProps } from 'antd';

type Props = AlertProps;

const StyledAlert = styled(AntAlert)`
  padding: 12px 16px;
  border: none;
  border-radius: 14px;
  display: flex;
  gap: 12px;
  align-items: start;
  &.ant-alert-warning {
    background-color: #fef5e7;
    .anticon {
      color: ${(props) => props.theme.textColor.warning} !important;
    }
  }
  &.ant-alert-info {
    background-color: #e5eeff;
    .anticon {
      color: ${(props) => props.theme.textColor.info} !important;
    }
  }
  &.ant-alert-error {
    background-color: #ffeded;
    .anticon {
      color: ${(props) => props.theme.textColor.error} !important;
    }
  }
  &.ant-alert-success {
    background-color: #e9f9ef;
    .anticon {
      color: ${(props) => props.theme.textColor.success} !important;
    }
  }
  .anticon {
    font-size: ${(props) => props.theme.fontSize.h6} !important;
    margin: 0 !important;
    &.anticon-close {
      color: ${(props) => props.theme.textColor.primary} !important;
    }
  }
  .ant-alert-message {
    margin-bottom: ${(props) => props.theme.spacing.xxs} !important;
    color: ${(props) => props.theme.textColor.primary} !important;
    font-weight: 500;
  }
  .ant-alert-description {
    color: #374151;
  }
`;

export function Alert({ ...props }: Props) {
  return <StyledAlert {...props} />;
}
