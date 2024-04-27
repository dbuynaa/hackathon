'use client';

// eslint-disable-next-line import/no-named-as-default
import styled from 'styled-components';
import { Badge as AntBadge, BadgeProps } from 'antd';

interface CustomBadgeProps extends BadgeProps {
  gray?: boolean;
}

const StyledBadge = styled(AntBadge)`
  .ant-badge-dot {
    width: 10px !important;
    height: 10px !important;
  }
  .ant-badge-status-text {
    margin-left: ${(props) => props.theme.spacing.xxs} !important;
    color: ${(props) => props.theme.textColor.primary} !important;
  }
  &.error {
    .ant-badge-status-text {
      color: ${(props) => props.theme.textColor.error} !important;
    }
  }
  &.warning {
    .ant-badge-status-text {
      color: ${(props) => props.theme.textColor.warning} !important;
    }
  }
  &.success {
    .ant-badge-status-text {
      color: ${(props) => props.theme.textColor.success} !important;
    }
  }
  &.processing {
    .ant-badge-status-text {
      color: ${(props) => props.theme.textColor.info} !important;
    }
  }
  &.default {
    .ant-badge-status-text {
      color: #d1d5db !important;
    }
  }
  .ant-badge-status-dot {
    width: 10px !important;
    height: 10px !important;
    &.ant-badge-status-error {
      background-color: #ff4949 !important;
    }
    &.ant-badge-status-success {
      background-color: #22c55e !important;
    }
    &.ant-badge-status-warning {
      background-color: #f59e0b !important;
    }
    &.ant-badge-status-processing {
      background-color: #0057ff !important;
    }
    &.ant-badge-status-default {
      background-color: #d1d5db !important;
    }
  }
  &.gray {
    .ant-badge-count {
      background-color: #e5e7eb !important;
      color: #9ca3af !important;
    }
  }
  .ant-badge-count {
    width: 22px !important;
    height: 22px !important;
    background-color: ${(props) => props.theme.textColor.error} !important;
  }
`;

export function Badge({
  children,
  count,
  dot,
  className,
  status,
  gray,
  ...props
}: CustomBadgeProps) {
  if (status) className = className + ' ' + `${status}`;
  if (gray) className = className + ' gray';

  return (
    <StyledBadge
      {...props}
      className={className}
      count={count}
      dot={dot}
      status={status}
    >
      {children}
    </StyledBadge>
  );
}
