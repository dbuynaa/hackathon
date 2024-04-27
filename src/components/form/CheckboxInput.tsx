'use client';

import { styled } from 'styled-components';
import { Form, CheckboxProps, Checkbox } from 'antd';
import { Rule } from 'antd/es/form';

const StyledFormItem = styled(Form.Item)`
  margin-bottom: 0 !important;
  .ant-form-item-control {
    .ant-form-item-control-input {
      min-height: fit-content !important;
    }
  }
`;
const StyledCheckbox = styled(Checkbox)`
  .ant-checkbox-input {
    width: 20px !important;
    height: 20px !important;
  }
  .ant-checkbox {
    margin-right: ${(props) => props.theme.spacing.xxs} !important;
    .ant-checkbox-inner {
      border-radius: ${(props) => props.theme.borderRadius.xxs} !important;
      border-width: 2px !important;
      width: 20px !important;
      height: 20px !important;
    }
  }
  .ant-checkbox-checked {
    .ant-checkbox-inner {
      border-radius: 6px;
      background-color: #00b1e1 !important;
    }
    .ant-checkbox-inner::after {
      margin-left: -1px !important;
      margin-top: -1px !important;
    }
    &.ant-checkbox-disabled {
      .ant-checkbox-inner {
        background-color: #00b1e1 !important;
        border-color: ${(props) => props.theme.borderColor.brand} !important;
      }
      .ant-checkbox-inner::after {
        border-color: #fff !important;
      }
    }
  }

  span {
    padding: 0;
    color: ${(props) => props.theme.textColor.primary} !important;
    align-self: center;
  }
`;
export interface CheckboxInputProps extends CheckboxProps {
  field?: string;
  rules?: Rule[];
}

export function CheckBoxInput({
  field,
  children,
  rules,
  ..._props
}: CheckboxInputProps) {
  return (
    <StyledFormItem name={field} rules={rules} valuePropName="checked">
      <StyledCheckbox {..._props}>{children}</StyledCheckbox>
    </StyledFormItem>
  );
}
