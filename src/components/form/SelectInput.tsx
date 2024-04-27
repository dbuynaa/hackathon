'use client';

import { styled } from 'styled-components';
import { Typography } from '../core';
import { Select as AntSelect, Form, SelectProps } from 'antd';
import { Rule } from 'antd/es/form';
import { MdArrowDropDown } from 'react-icons/md';

const StyledFormItem = styled(Form.Item)`
  margin: 0 !important;

  .ant-form-item-explain-error {
    margin-top: ${(props) => props.theme.spacing.tiny} !important;
    font-size: ${(props) => props.theme.fontSize.caption} !important;
  }
  .ant-form-item-control-input {
    min-height: 36px !important;
  }
`;

const StyledSelect = styled(AntSelect)`
  /* height: 46px; */
`;

interface Props extends SelectProps {
  field?: string;

  label?: string;
  required?: boolean;

  rules?: Rule[];

  help?: string;
  initialValue?: unknown;
}

export function SelectInput({
  field,
  required = false,
  rules,
  initialValue,

  children,
  label,
  help,
  options,
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

      <StyledFormItem
        name={field}
        required={required}
        rules={rules}
        initialValue={initialValue}
      >
        <StyledSelect
          {..._props}
          suffixIcon={<MdArrowDropDown size={24} className="text-primary" />}
          options={options}
          className={`${className || ''} [&>.ant-select-selector]:rounded-md`}
        >
          {children}
        </StyledSelect>
      </StyledFormItem>

      {help && (
        <Typography className="text-secondary" weight="regular" base="Caption">
          {help}
        </Typography>
      )}
    </div>
  );
}
