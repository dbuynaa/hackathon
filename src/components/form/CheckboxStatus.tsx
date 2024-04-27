'use client';

import { styled } from 'styled-components';
import { Button, Tooltip } from 'antd';
import { Typography } from '..';
import { CheckBoxInput, CheckboxInputProps } from '.';
import { Rule } from 'antd/es/form';
import { MdCheckCircleOutline } from 'react-icons/md';

interface Props extends CheckboxInputProps {
  field?: string;
  required?: boolean;
  rules?: Rule[];
  type?: 'text' | 'icon';
  orientation?: 'vertical' | 'horizontal';
  noIcon?: boolean;
}
const StyledButton = styled(Button)`
  padding: ${(props) => props.theme.spacing.xs2} !important;
  box-shadow: 0px 4px 20px 0px rgba(0, 177, 225, 0.1) !important;
  border-radius: ${(props) => props.theme.borderRadius.md} !important;
  height: fit-content !important;
  /* overflow: hidden !important; */
  &.vertical {
    display: flex;
    max-width: 183px;

    flex-direction: column;
    justify-content: center;
    align-items: center;
    .checkbox {
      position: absolute;
      left: -80px;
      top: -70px;
    }
    .ant-typography {
      padding-top: ${(props) => props.theme.spacing.xs} !important;
    }
  }
  &.horizontal {
    display: flex;
    gap: ${(props) => props.theme.spacing.xs} !important;
    width: fit-content;
    /* justify-content: center; */
    /* .checkbox {
      margin-left: ${(props) => props.theme.spacing.xs};
    } */
    align-items: center;
    .ant-typography {
      padding-right: ${(props) => props.theme.spacing.xs} !important;
    }
    div {
      display: flex;
      gap: ${(props) => props.theme.spacing.xs} !important;
      align-items: center;
    }
    @media (max-width: 768px) {
      gap: ${(props) => props.theme.spacing.xxs} !important;
    }
  }
  &.noIcon {
    display: flex;
    gap: ${(props) => props.theme.spacing.xxs} !important;
    width: fit-content;
    height: 44px !important;
  }
`;
export function CheckboxStatus({
  field,
  children,
  className,
  rules,
  type,
  orientation,
  noIcon,
  ..._props
}: Props) {
  if (type) className = className + ` ${type}`;
  if (orientation) className = className + ` ${orientation}`;
  if (noIcon) className = className + ` noIcon`;
  return (
    <StyledButton
      className={className}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {!noIcon && (
        <div>
          <div className="flex h-[42px] w-[42px] justify-center items-center rounded-[100%] bg-primary-100 text-brand text-[22px]">
            <MdCheckCircleOutline />
          </div>
          <Typography weight="medium" className="text-primary">
            {children}
          </Typography>
        </div>
      )}

      <CheckBoxInput
        {..._props}
        field={field}
        rules={rules}
        className="checkbox"
      />
      {noIcon && (
        <div className="w-[calc(80%)] overflow-hidden">
          <Tooltip
            placement="bottom"
            title={children}
            className="block xs:hidden"
          >
            <Typography weight="medium" className="text-primary ">
              {children}
            </Typography>
          </Tooltip>
          <Typography weight="medium" className="text-primary hidden xs:block">
            {children}
          </Typography>
        </div>
      )}
    </StyledButton>
  );
}
