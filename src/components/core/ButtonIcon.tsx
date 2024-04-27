'use client';

import { styled } from 'styled-components';
import { Button as AntButton, ButtonProps } from 'antd';

type Props = ButtonProps & {
  color?: 'neutral' | 'success' | 'warning' | 'error' | 'info';
};

const StyledButton = styled(AntButton)`
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-size: ${(props) => props.theme.fontSize.subtitle2} !important;
  font-weight: 500 !important;
  border-radius: ${(props) => props.theme.borderRadius.md} !important;

  & > .ant-btn-icon,
  > svg {
    font-size: 22px;
    color: ${(props) => props.theme.colors.brand[600]};
  }

  &.small {
    border-radius: ${(props) => props.theme.borderRadius.sm} !important;
    & > .ant-btn-icon,
    > svg {
      font-size: 20px;
    }
  }

  &.ant-btn-default {
    background-color: ${(props) => props.theme.colors.white};
    border: 1px solid ${(props) => props.theme.borderColor.primary};
    > svg {
      color: ${(props) => props.theme.colors.brand[600]};
    }
    &:hover {
      background-color: ${(props) => props.theme.colors.white} !important;
      border-color: ${(props) => props.theme.stroke.dark} !important;
    }
    &.disabled {
      background-color: ${(props) => props.theme.colors.white};
      color: ${(props) => props.theme.colors.neutral[400]} !important;
      > svg {
        color: ${(props) => props.theme.colors.neutral[400]} !important;
      }
      & > .ant-btn-icon {
        color: ${(props) => props.theme.colors.neutral[400]} !important;
      }
    }
    &.error {
      color: ${(props) => props.theme.colors.error[600]} !important;
      &:hover {
        color: ${(props) => props.theme.colors.error[500]};
        background-color: ${(props) => props.theme.colors.error[100]};
      }
    }
    &.neutral {
      color: ${(props) => props.theme.colors.neutral[600]} !important;
      &:hover {
        color: ${(props) => props.theme.colors.neutral[500]};
        background-color: ${(props) => props.theme.colors.neutral[100]};
      }
    }
    &.success {
      color: ${(props) => props.theme.colors.success[600]} !important;
      &:hover {
        color: ${(props) => props.theme.colors.success[500]};
        background-color: ${(props) => props.theme.colors.success[100]};
      }
    }
    &.warning {
      color: ${(props) => props.theme.colors.warning[600]} !important;
      &:hover {
        color: ${(props) => props.theme.colors.warning[500]};
        background-color: ${(props) => props.theme.colors.warning[100]};
      }
    }
    &.info {
      color: ${(props) => props.theme.colors.info[600]} !important;
      &:hover {
        color: ${(props) => props.theme.colors.info[500]};
        background-color: ${(props) => props.theme.colors.info[100]};
      }
    }
  }
  &.ant-btn-text {
    background-color: transparent; //${(props) => props.theme.colors.white};
    border: none;
    &:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }
    &.disabled {
      background-color: ${(props) => props.theme.colors.white};
      color: ${(props) => props.theme.colors.neutral[400]} !important;
      > svg {
        color: ${(props) => props.theme.colors.neutral[400]} !important;
      }
      & > .ant-btn-icon {
        color: ${(props) => props.theme.colors.neutral[400]} !important;
      }
    }
  }
  &.ant-btn-primary {
    background-color: ${(props) => props.theme.colors.brand[600]};
    border: none !important;
    & > .ant-btn-icon,
    > svg {
      color: ${(props) => props.theme.colors.white};
    }
    &.disabled {
      background-color: #e0e0e0;
      color: ${(props) => props.theme.colors.neutral[300]} !important;
    }
    &.error {
      background-color: ${(props) => props.theme.colors.error[600]} !important;
      &:hover {
        background-color: ${(props) =>
          props.theme.colors.error[500]} !important;
      }
    }
    &.neutral {
      background-color: ${(props) =>
        props.theme.colors.neutral[800]} !important;
      &:hover {
        background-color: ${(props) =>
          props.theme.colors.neutral[600]} !important;
      }
    }
    &.success {
      background-color: ${(props) =>
        props.theme.colors.success[600]} !important;
      &:hover {
        background-color: ${(props) =>
          props.theme.colors.success[500]} !important;
      }
    }
    &.warning {
      background-color: ${(props) =>
        props.theme.colors.warning[600]} !important;
      &:hover {
        background-color: ${(props) =>
          props.theme.colors.warning[500]} !important;
      }
    }
    &.info {
      background-color: ${(props) => props.theme.colors.info[600]} !important;
      &:hover {
        background-color: ${(props) => props.theme.colors.info[500]} !important;
      }
    }
  }
`;

export function ButtonIcon({
  className,
  size,
  type,
  color,
  disabled,
  ...props
}: Props) {
  // className = className + ' text-h5 text-brand';
  if (size) className = className + ` ${size}`;
  if (color) className = className + ` ${color}`;
  if (disabled) className = className + ' disabled';

  return (
    <StyledButton
      {...props}
      className={className}
      type={type}
      // color={color}
      size={size}
    />
  );
}
