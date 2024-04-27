'use client';

// eslint-disable-next-line import/no-named-as-default
import styled from 'styled-components';
import { Typography } from '../core';
import { Form, FormItemProps, FormInstance } from 'antd';
import { Rule } from 'antd/es/form';
import { ReactQuillEditor } from '..';

const StyledFormItem = styled(Form.Item)`
  margin-bottom: 0 !important;
  .ant-form-item-row {
    height: 100% !important;
  }
  .ant-form-item-control {
    height: 100% !important;
    .ant-form-item-control-input {
      height: 100% !important;
      .ant-form-item-control-input-content {
        height: 100% !important;
        .ant-form-item {
          height: 100% !important;
        }
      }
    }
  }
  .ant-form-item-has-error {
    /* .quill {
      div {
        border-color: red !important;
        &.ql-toolbar {
          border-bottom-color: #dedede !important;
        }
      }
    } */
  }
  .ant-form-item-explain-error {
    @media (max-width: 1440px) {
      padding-top: ${(props) => props.theme.spacing.xs} !important;
    }
  }
`;

interface Props extends FormItemProps {
  form: FormInstance;
  field: string | (string | number)[];
  label?: string;
  required?: boolean;
  rules?: Rule[];
  placeholder?: string;
  help?: string;
}

export function TextAreaInput({
  form,
  field,
  label,
  required = false,
  rules,
  placeholder,
  help,
  ...props
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
      <StyledFormItem {...props} shouldUpdate>
        {({ getFieldValue }) => (
          <Form.Item name={field} required={required} rules={rules}>
            <ReactQuillEditor
              form={form}
              field={field}
              value={getFieldValue(field)}
              placeholder={placeholder}
            />
          </Form.Item>
        )}
      </StyledFormItem>

      {help && (
        <Typography className="text-secondary" weight="medium" base="Caption">
          {`${help}`}
        </Typography>
      )}
    </div>
  );
}
