'use client';
import { styled } from 'styled-components';
import { Tabs as AntTab, TabsProps } from 'antd';
import React from 'react';
import { Button } from '@/components';
import { IoArrowBack } from 'react-icons/io5';

export type TabItemType = {
  key: string;
  label: string | React.ReactNode;
  children: React.ReactNode;
};
type CustomTabsProps = TabsProps & {
  shadow?: boolean;
  rightIcon?: boolean;
  items: TabItemType[] | TabItemType;
};

const StyledTab = styled(AntTab)`
  &.shadow {
    .ant-tabs-nav {
      background: white;
      box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
      .ant-tabs-tab {
        border: none;
      }
    }
  }

  .ant-tabs-nav {
    background-color: #f1f2f6;
    padding: ${(props) => props.theme.spacing.xxs} !important;
    width: fit-content;
    border-radius: ${(props) => props.theme.borderRadius.md} !important;
    margin: 0 !important;
    .ant-tabs-nav-list {
      display: inline-flex;
      align-items: flex-start;
      gap: ${(props) => props.theme.spacing.xs} !important;

      .ant-tabs-tab {
        padding: 0;
        margin: 0 !important;
        background-color: transparent;
        border-color: transparent;
        .ant-btn {
          padding: 16px 4px !important;
          .ant-btn-icon {
            color: ${(props) => props.theme.textColor.brand} !important;
          }
        }
      }
      .ant-tabs-tab-active {
        border-bottom: none !important;
        .ant-btn {
          padding: 16px 12px !important;
          background-color: #1f2937;
          color: ${(props) => props.theme.colors.white} !important;
          .ant-btn-icon {
            color: ${(props) => props.theme.colors.white} !important;
          }
        }
      }
      .ant-tabs-ink-bar {
        display: none;
      }
    }
  }
  .ant-tabs-nav::before {
    border-bottom: none !important;
  }
`;

export function Tabs({
  items,
  className,
  shadow,
  rightIcon,
  ...props
}: CustomTabsProps) {
  if (shadow) className = className + ' shadow';
  return (
    <StyledTab
      {...props}
      className={className}
      items={items?.map((item) => {
        return {
          label: (
            <Button
              size="small"
              type="text"
              icon={rightIcon && <IoArrowBack />}
            >
              {item.label}
            </Button>
          ),
          key: item.key,
          children: item.children,
        };
      })}
    />
  );
}
