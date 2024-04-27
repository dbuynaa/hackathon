'use client';

import { styled } from 'styled-components';
import { Typography } from '../core';
import { Form, InputProps } from 'antd';
import { Rule, RuleObject } from 'antd/es/form';

const StyledFormItem = styled(Form.Item)`
  margin: 0 !important;
  .ant-form-item-explain-error {
    margin-top: ${(props) => props.theme.spacing.tiny} !important;
    font-size: ${(props) => props.theme.fontSize.caption} !important;
  }
  .ant-input-affix-wrapper {
    &.ant-input-affix-wrapper-disabled {
      border: 1px solid #dedede !important;
      background-color: #f1f2f6;
      .ant-input-prefix {
        color: #9ca3af;
      }
    }
  }
`;

interface Props extends InputProps {
  field?: string | (string | number)[];
  label?: string;
  required?: boolean;
  rules?: Rule[] | RuleObject[];
  help?: string;
  initialValue?: unknown;
}

export function FormItem({
  field,
  label,
  required = false,
  rules,
  help,
  initialValue,
  children,
}: Props) {
  return (
    <div className="flex flex-col gap-tiny w-full">
      {label && (
        <Typography className="text-primary" weight="medium">
          {label}
          {required && (
            <Typography className="text-[#ff4949] " weight="medium">
              {' *'}
            </Typography>
          )}
        </Typography>
      )}
      <StyledFormItem
        required={required}
        name={field}
        rules={rules}
        initialValue={initialValue}
      >
        {children}
      </StyledFormItem>
      {help && (
        <Typography className="text-secondary" weight="medium" base="Caption">
          {`${help}`}
        </Typography>
      )}
    </div>
  );
}
