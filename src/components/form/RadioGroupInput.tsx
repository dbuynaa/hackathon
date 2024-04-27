'use client';

import { styled } from 'styled-components';
import { Form, RadioGroupProps, Radio } from 'antd';
import { Rule } from 'antd/es/form';
import { Typography } from '../core';

const StyledFormItem = styled(Form.Item)`
  margin-bottom: 0 !important;
  .ant-form-item-control {
    .ant-form-item-control-input {
      min-height: fit-content !important;
    }
  }
`;
const StyledRadioGroup = styled(Radio.Group)`
  .ant-radio-wrapper {
    .ant-radio {
      margin-right: ${(props) => props.theme.spacing.xxs} !important;
      .ant-radio-inner {
        height: 20px !important;
        width: 20px !important;
        border: 3px solid #e5e7eb;
      }
    }

    .ant-radio-checked {
      .ant-radio-inner {
        border: 6px solid #00b1e1 !important;
      }
    }
    .ant-radio-disabled {
      .ant-radio-inner {
        border: 6px solid #d1d5db !important;
        background-color: #6b7280 !important;
      }
    }
  }

  span {
    padding: 0 !important;
    color: ${(props) => props.theme.textColor.primary} !important;
    align-self: center;
  }
`;
interface Props extends RadioGroupProps {
  field?: string;
  rules?: Rule[];
  initialValue?: string;
  required?: boolean;
  label?: string;
  items: { label?: string; value: string | number; disabled?: boolean }[];
}

export function RadioGroupInput({
  field,
  rules,
  initialValue,
  required,
  label,
  items,
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
        rules={rules}
        initialValue={initialValue}
        required={required}
      >
        <StyledRadioGroup {..._props}>
          {items.map((radio) => (
            <Radio
              key={radio.value}
              value={radio.value}
              disabled={radio.disabled}
            >
              {radio.label || ''}
            </Radio>
          ))}
        </StyledRadioGroup>
      </StyledFormItem>
    </div>
  );
}
