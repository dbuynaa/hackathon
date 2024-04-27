'use client';

import { styled } from 'styled-components';
import { Input as AntInput, InputProps, Form } from 'antd';
import { IoLockClosedOutline } from 'react-icons/io5';
import { Rule } from 'antd/es/form';
import { Typography } from '@/components';
interface Props extends InputProps {
  field?: string;
  label?: string;
  required?: boolean;
  rules?: Rule[];
}

const StyledFormItem = styled(Form.Item)`
  margin-bottom: 0 !important;
  .ant-form-item-explain-error {
    margin-top: ${(props) => props.theme.spacing.tiny} !important;
    font-size: ${(props) => props.theme.fontSize.caption} !important;
  }
`;

const StyledInput = styled(AntInput.Password)`
  height: 46px;
  display: flex;
  border-radius: ${(props) => props.theme.borderRadius.md} !important;
  .ant-input-prefix {
    color: ${(props) => props.theme.textColor.brand} !important;
    font-size: ${(props) => props.theme.fontSize.h5} !important;
    margin-right: ${(props) => props.theme.spacing.xs} !important;
  }
  .ant-input {
    font-size: ${(props) => props.theme.fontSize.subtitle2} !important;
  }
  .ant-input-suffix {
    font-size: ${(props) => props.theme.fontSize.subtitle} !important;
    .anticon {
      color: #6b7280 !important;
    }
  }
`;

export function PasswordInput({
  children,
  field,
  label,
  required = false,
  rules,
  className,
  ..._props
}: Props) {
  return (
    <div className="flex flex-col gap-tiny">
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
      <StyledFormItem required={required} name={field} rules={rules}>
        <StyledInput
          {..._props}
          className={`${className} rounded-md`}
          prefix={<IoLockClosedOutline />}
        >
          {children}
        </StyledInput>
      </StyledFormItem>
    </div>
  );
}
