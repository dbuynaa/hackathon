'use client';

import { styled } from 'styled-components';
import { Typography } from '../core';
import { Input as AntInput, Form, InputProps } from 'antd';
import { Rule, RuleObject } from 'antd/es/form';
import { FormItemProps } from 'antd/lib';

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

const StyledAntInput = styled(AntInput)`
  height: 46px;
  display: flex;
  border-radius: ${(props) => props.theme.borderRadius.md} !important;

  .ant-input-prefix {
    color: ${(props) => props.theme.textColor.primary} !important;
    font-size: ${(props) => props.theme.fontSize.h5} !important;
    margin-right: ${(props) => props.theme.spacing.xs} !important;
  }
  .ant-input {
    font-size: ${(props) => props.theme.fontSize.subtitle2} !important;
  }
  .ant-input-suffix {
    font-size: ${(props) => props.theme.fontSize.subtitle} !important;
    color: #6b7280;
  }
`;

interface Props extends InputProps {
  field?: string | (string | number)[];
  label?: string;
  required?: boolean;
  rules?: Rule[] | RuleObject[];
  help?: string;
  initialValue?: unknown;
  normalize?: FormItemProps['normalize'];
}

export function TextInput({
  field,
  label,
  required = false,
  rules,
  help,
  className,
  initialValue,
  normalize,
  ..._props
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
        normalize={normalize}
      >
        <StyledAntInput {..._props} className={`${className} rounded-md`} />
      </StyledFormItem>
      {help && (
        <Typography className="text-secondary" weight="medium" base="Caption">
          {`${help}`}
        </Typography>
      )}
    </div>
  );
}
