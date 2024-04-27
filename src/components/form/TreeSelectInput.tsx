'use client';

import { styled } from 'styled-components';
import { Typography } from '../core';
import { TreeSelect as AntTreeSelect, Form, TreeSelectProps } from 'antd';
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

const StyledTreeSelect = styled(AntTreeSelect)`
  /* height: 46px; */
`;

interface Props extends TreeSelectProps {
  field?: string;

  label?: string;
  required?: boolean;

  rules?: Rule[];

  help?: string;
  initialValue?: unknown;
}

export function TreeSelectInput({
  field,
  label,
  required = false,
  rules,
  help,
  treeData,
  initialValue,
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
        required={required}
        name={field}
        rules={rules}
        initialValue={initialValue}
      >
        <StyledTreeSelect
          {..._props}
          suffixIcon={<MdArrowDropDown size={24} className="text-primary" />}
          treeData={treeData}
          className={`${className || ''} [&>.ant-select-selector]:rounded-md`}
          popupClassName="darkhan [&_.ant-select-tree-switcher]:leading-8 [&_.ant-select-tree-checkbox]:self-center [&_.ant-select-tree-checkbox]:mt-none"
        />
      </StyledFormItem>

      {help && (
        <Typography className="text-secondary" weight="regular" base="Caption">
          {help}
        </Typography>
      )}
    </div>
  );
}
