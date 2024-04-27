'use client';

import { styled } from 'styled-components';
import { Form, Switch, SwitchProps } from 'antd';
import { Typography } from '..';
import { Rule } from 'antd/es/form';

const StyledFormItem = styled(Form.Item)`
  margin-bottom: 0 !important;
  .ant-form-item-control {
    .ant-form-item-control-input {
      min-height: fit-content !important;
    }
  }
`;
const StyledSwitch = styled(Switch)`
  display: flex;
  gap: ${(props) => props.theme.spacing.xxs} !important;
  background: #d1d5db !important;

  &.ant-switch-checked {
    background: #00b1e1 !important;
  }

  span {
    padding: 0;
    color: ${(props) => props.theme.textColor.primary} !important;
    align-self: center;
  }
`;
interface Props extends SwitchProps {
  field?: string;
  rules?: Rule[];
  labelLeft?: string;
  labelRight?: string;
}

export function SwitchInput({
  field,
  rules,
  labelLeft,
  labelRight,
  ..._props
}: Props) {
  return (
    <div className="flex gap-xxs">
      {labelLeft && (
        <Typography
          className="text-primary"
          weight="medium"
        >{`${labelLeft}`}</Typography>
      )}
      <StyledFormItem name={field} rules={rules} valuePropName="checked">
        <StyledSwitch {..._props} />
      </StyledFormItem>
      {labelRight && (
        <Typography
          className="text-primary"
          weight="medium"
        >{`${labelRight}`}</Typography>
      )}
    </div>
  );
}
