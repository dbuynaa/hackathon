'use client';
import { styled } from 'styled-components';

import ReactCodeInput from 'react-verification-code-input';

interface ConfirmCodeInputProps {
  type?: 'text' | 'number';
  onChange?: (val: string) => void;
  onComplete?: (val: string) => void;
  fields?: number;
  loading?: boolean;
  title?: string;
  fieldWidth?: number;
  fieldHeight?: number;
  autoFocus?: boolean;
  className?: string;
  values?: string[];
  disabled?: boolean;
  required?: boolean;
  placeholder?: string[];
}

const StyledConfirmCode = styled(ReactCodeInput)`
  &.onfill {
    .styles_react-code-input__CRulA {
      input {
        border: 1px solid #00b1e1 !important;
        background-color: #fff;
        color: #1f2937 !important;
        font-weight: 500 !important;
      }
    }
  }

  .styles_react-code-input__CRulA {
    display: flex;
    column-gap: 12px;
    max-width: 354px !important;

    //outline: solid;
    input {
      height: 46px !important;
      width: 49px !important;
      background-color: #f1f2f6;
      border-radius: 14px !important;
      border: none !important;
      font-size: 16px !important;
      color: #9ca3af !important;
      font-weight: 400;
    }

    input:focus {
      border: 1px solid #00b1e1 !important;
      background-color: #fff;
      color: #1f2937 !important;
      font-weight: 500 !important;
    }

    > input:first-child {
      border-radius: 14px;
    }
  }
`;
export const ConfirmCodeInput = ({
  onComplete,
  ...props
}: ConfirmCodeInputProps) => {
  return <StyledConfirmCode {...props} onComplete={onComplete} />;
};
