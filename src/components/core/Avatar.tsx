'use client';

import { styled } from 'styled-components';
import { Avatar as AntAvatar, AvatarProps } from 'antd';
import { IoCameraOutline } from 'react-icons/io5';
import { ButtonIcon, Badge } from '.';

interface IAvatarProps extends AvatarProps {
  type?: 'badge' | 'count' | undefined;
  interact?: 'mask' | 'none' | 'default';
  mini?: boolean;
  count?: number;
}

const StyledAvatar = styled(AntAvatar)`
  display: flex !important;
  align-items: center;
  justify-content: center;
  &.ant-avatar-square {
    border-radius: ${(props) => props.theme.borderRadius.md} !important;
    &.ant-avatar-sm {
      width: 32px;
      height: 32px;
      border-radius: ${(props) => props.theme.borderRadius.xxs} !important;
    }
    &.mini {
      width: 24px;
      height: 24px;
      border-radius: ${(props) => props.theme.borderRadius.tiny} !important;
    }
  }
  &.ant-avatar-lg {
    height: 64px;
    width: 64px;
    .ant-avatar-string {
      font-size: 34px;
    }
  }
  &.ant-avatar-circle {
    &.ant-avatar-sm {
      width: 32px;
      height: 32px;
    }
    &.mini {
      width: 24px;
      height: 24px;
    }
  }
  &.ant-avatar-icon {
    padding: 13px;
    svg {
      font-size: ${(props) => props.theme.fontSize.h6} !important;
    }
    &.ant-avatar-lg {
      padding: ${(props) => props.theme.spacing.sm} !important;
      svg {
        font-size: 32px;
      }
    }
    &.ant-avatar-sm {
      padding: 8px;
      svg {
        font-size: ${(props) => props.theme.fontSize.subtitle2} !important;
      }
    }
    &.mini {
      padding: ${(props) => props.theme.spacing.xxs} !important;
      svg {
        font-size: ${(props) => props.theme.fontSize.caption} !important;
      }
    }
  }
  .ant-avatar-string {
    font-weight: 700;
  }
`;

export function Avatar({
  children,
  mini,
  className,
  interact,
  size,
  type,
  count,
  ...props
}: IAvatarProps) {
  if (mini) className = className + ' mini';
  const btnClassName =
    size === 'large'
      ? `w-[25px] h-[25px] p-xxs left-[35px]`
      : `w-[20px] h-[20px] p-tiny left-[25px]`;
  return (
    <>
      {type === undefined ? (
        <div>
          <StyledAvatar {...props} className={className} size={size}>
            {interact !== 'mask' && children}
            {interact === 'mask' && (
              <IoCameraOutline className="flex items-center text-subtitle2" />
            )}
          </StyledAvatar>
          {interact === 'default' && (
            <ButtonIcon
              type="text"
              className={
                ' top-[-15px]  bg-neutral-800 rounded-xl border-2 border-solid border-[#fff] ' +
                `${btnClassName}`
              }
              icon={
                <IoCameraOutline className="flex items-center text-caption text-white " />
              }
            />
          )}
        </div>
      ) : (
        <Badge
          count={count}
          dot={type === 'badge'}
          className="[&>.ant-badge-dot]:top-[5px]"
        >
          <StyledAvatar {...props} className={className} size={size}>
            {children}
          </StyledAvatar>
        </Badge>
      )}
    </>
  );
}
