'use client';

import { styled } from 'styled-components';
import { Form, Checkbox } from 'antd';
import { Rule } from 'antd/es/form';
import { CheckboxGroupProps } from 'antd/lib/checkbox';

const StyledFormItem = styled(Form.Item)`
  margin-bottom: 0 !important;
  .ant-form-item-control {
    .ant-form-item-control-input {
      min-height: fit-content !important;
    }
  }
`;
const StyledCheckboxGroup = styled(Checkbox.Group)`
  .ant-checkbox-wrapper {
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
        border-radius: ${(props) => props.theme.borderRadius.xxs} !important;
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
  }

  span {
    padding: 0 !important;
    color: ${(props) => props.theme.textColor.primary} !important;
    align-self: center;
  }
`;
interface Props extends CheckboxGroupProps {
  field?: string;
  rules?: Rule[];
  items: { label?: string; value: string | number; disabled?: boolean }[];
}

export function CheckboxGroupInput({ field, rules, items, ..._props }: Props) {
  return (
    <StyledFormItem name={field} rules={rules}>
      <StyledCheckboxGroup {..._props}>
        {items.map((checkbox) => (
          <Checkbox
            key={checkbox.value}
            value={checkbox.value}
            disabled={checkbox.disabled}
          >
            {checkbox.label || ''}
          </Checkbox>
        ))}
      </StyledCheckboxGroup>
    </StyledFormItem>
  );
}
