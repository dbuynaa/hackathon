'use client';

import { styled } from 'styled-components';
import { Popconfirm as AntPopconfirm, PopconfirmProps } from 'antd';

const StyledPopconfirm = styled(AntPopconfirm)`
  /* padding: ${(props) => props.theme.borderRadius.md} !important; */
`;

interface CustomPopconfirmProps extends PopconfirmProps {}

export function Popconfirm({ children, ...props }: CustomPopconfirmProps) {
  return (
    <StyledPopconfirm
      {...props}
      cancelButtonProps={{
        className: ' h-[26px] rounded-md leading-none text-caption font-bold',
        size: 'small',
      }}
      okButtonProps={{
        className:
          ' h-[26px] rounded-md bg-surface-dark leading-none text-caption font-bold',
        size: 'small',
      }}
    >
      {children}
    </StyledPopconfirm>
  );
}
