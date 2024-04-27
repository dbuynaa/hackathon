'use client';

import React from 'react';
import { styled } from 'styled-components';
import { Steps as AntSteps, StepProps, StepsProps } from 'antd';
import { Button } from '@/components';

const StyledSteps = styled(AntSteps)`
  line-height: 0 !important;
  .ant-steps-item:first-of-type {
    padding-left: 0 !important;
  }
  .ant-steps-item:last-of-type {
    padding-right: 0 !important;
  }
  .ant-steps-item {
    padding: 0 24px !important;
    max-height: 46px;
    .ant-steps-item-container {
      display: flex !important;
      width: 100% !important;
      align-items: center;
      gap: 15px !important;
      padding: 0 !important;
      margin-inline-start: 0 !important;

      .ant-steps-item-icon {
        width: 30px !important;
        height: 30px !important;
        line-height: 30px !important;
        border: none;
        .ant-steps-icon {
          color: ${(props) => props.theme.colors.white} !important;
        }
      }
      .ant-steps-item-content {
        font-size: ${(props) => props.theme.fontSize.subtitle2} !important;
        font-weight: bold !important;
        min-height: 46px !important;
      }
    }
  }
  .ant-steps-item::after {
    top: 22px !important;
    color: #6b7280 !important;
  }

  .ant-steps-item-process {
    .ant-steps-item-icon {
      background-color: ${(props) => props.theme.textColor.success} !important;
    }
  }
  .ant-steps-item-finish {
    .ant-steps-item-icon {
      background-color: ${(props) => props.theme.textColor.success} !important;
    }
  }
  .ant-steps-item-wait {
    .ant-steps-item-icon {
      background-color: #6b7280 !important;
    }
  }
  .ant-steps-item-active::before {
    display: none !important;
  }

  @media (max-width: 576px) {
    &.landing {
      max-width: 320px !important;
      .ant-steps-item {
        padding: 0 !important;
        .ant-steps-item-container {
          .ant-steps-item-icon {
            margin: 0 !important;
          }
        }
      }
      .ant-steps-item::after {
        display: none !important;
      }
    }
    .ant-steps-item::after {
      display: none !important;
    }
  }
`;

type Props = StepsProps & {
  steps: { title: string; content: React.ReactNode }[];
  current: number;
  onDraftPress?: () => void;
  submitText?: string;
  next?: () => void;
  nextText?: string;
  prev: () => void;
  prevText?: string;
  hideSubmitButton?: boolean;
  landing?: boolean;
  uploading?: boolean;
};

export function Steps(props: Props) {
  const {
    steps,
    current,
    onDraftPress,
    submitText,
    next,
    nextText,
    prev,
    prevText,
    hideSubmitButton = false,
    uploading,
    landing = false,
    className,
    ..._props
  } = props;

  const items: StepProps[] = steps?.map((item, index) => ({
    key: item.title,
    title: item.title,
    status:
      current === steps.length - 1 && index === current
        ? 'finish'
        : index === current
        ? 'process'
        : index < current
        ? 'process'
        : 'wait',
  }));

  return (
    <div
      className={`flex justify-between ${
        landing
          ? 'flex-col xs:flex-row xs:items-center xs:gap-0 gap-sm'
          : 'flex-row items-center'
      } ${className} ${
        className === 'company' && current === 1 && 'w-[calc(50%+300px)]'
      }`}
    >
      <StyledSteps
        {..._props}
        className={`flex flex-row p-none px-xs gap-sm bg-surface-primary border border-primary rounded-md w-auto ${
          landing ? 'landing' : ''
        }`}
        current={current}
        items={items}
        type="navigation"
      />
      {!hideSubmitButton && (
        <div
          className={`flex flex-row gap-sm ${landing ? 'hidden xs:flex' : ''}`}
        >
          {current > 0 && (
            <Button className="px-md " onClick={() => prev()}>
              {prevText || '戻る'}
            </Button>
          )}
          {current < items?.length - 1 && (
            <div className="flex flex-row gap-sm ">
              {onDraftPress && (
                <Button
                  disabled={uploading}
                  loading={uploading}
                  className="px-md"
                  onClick={() => onDraftPress()}
                >
                  下書き
                </Button>
              )}
              {next ? (
                <Button
                  disabled={uploading}
                  loading={uploading}
                  type="primary"
                  className="px-md "
                  onClick={next}
                >
                  {nextText || 'プレビュー'}
                </Button>
              ) : (
                <Button
                  disabled={uploading}
                  loading={uploading}
                  type="primary"
                  className="px-md "
                  htmlType="submit"
                >
                  {nextText || 'プレビュー'}
                </Button>
              )}
            </div>
          )}
          {current === items.length - 1 && (
            <Button type="primary" className="px-md " htmlType="submit">
              {submitText || '投稿'}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
