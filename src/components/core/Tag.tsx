'use client';

import { styled } from 'styled-components';
import { Tag as AntTag, TagProps } from 'antd';

type Props = TagProps & {
  size: 'large' | 'medium' | 'small' | 'mini';
  color: 'brand' | 'default' | 'red' | 'green' | 'mint' | 'orange';
  border?: boolean;
  leftIcon?: React.ReactNode;
};

const StyledTag = styled(AntTag)`
  display: flex !important;
  align-items: center !important;
  font-size: ${(props) => props.theme.fontSize.body} !important;
  margin-right: 0 !important;
  width: fit-content !important;
  & > .left-icon {
    font-size: ${(props) => props.theme.fontSize.subtitle} !important;
  }
  &.large {
    font-size: ${(props) => props.theme.fontSize.body} !important;
    padding: 4px 6px;
  }
  &.medium {
    font-size: 14px !important;
    padding: 2px 6px;
  }
  &.small {
    font-size: ${(props) => props.theme.fontSize.body} !important;
    padding: 1px 6px;
  }
  &.mini {
    height: 16px !important;
    font-size: ${(props) => props.theme.fontSize.caption} !important;
    padding: 0px 6px !important;
  }
`;

export function Tag({
  children,
  className,
  size = 'small',
  color = 'default',
  border = false,
  leftIcon,
  ...props
}: Props) {
  if (size) className = className || '' + ` ${size}`;

  if (color === 'default')
    className =
      className +
      ' text-primary bg-primary-100' +
      `${border ? ' border-primary' : ' border-none'}`;
  if (color === 'brand')
    className =
      className +
      ' text-brand bg-primary-100' +
      `${border ? ' border-primary' : ' border-none'}`;
  if (color === 'red')
    className =
      className +
      ' text-error bg-error-100' +
      `${border ? ' border-error' : ' border-none'}`;
  if (color === 'green')
    className =
      className +
      ' text-success bg-success-100' +
      `${border ? ' border-success' : ' border-none'}`;
  if (color === 'mint')
    className =
      className +
      ' text-brand bg-brand-100' +
      `${border ? ' border-brand' : ' border-none'}`;
  if (color === 'orange')
    className =
      className +
      ' text-warning bg-warning-100' +
      `${border ? ' border-warning' : ' border-none'}`;

  if (leftIcon) className = className + ' left-icon gap-xxs';

  return (
    <StyledTag {...props} className={className}>
      {leftIcon && leftIcon}
      {children}
    </StyledTag>
  );
}
