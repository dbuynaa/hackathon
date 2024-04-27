'use client';

import { styled } from 'styled-components';
import { Pagination as AntPagination, PaginationProps } from 'antd';
import locale from 'antd/locale/ja_JP';

const StyledPagination = styled(AntPagination)`
  display: flex !important;
  position: relative;
  justify-content: end;

  .ant-pagination-next {
    .ant-pagination-item-link {
      border: 1px solid #dedede !important;
      border-radius: ${(props) => props.theme.borderRadius.md} !important;
    }
  }
  .ant-select-selection-search {
    display: none;
  }
  .ant-pagination-prev {
    .ant-pagination-item-link {
      border: 1px solid #dedede !important;
      border-radius: ${(props) => props.theme.borderRadius.md} !important;
    }
  }
  & > .ant-pagination-item {
    border: 1px solid #dedede !important;
    border-radius: ${(props) => props.theme.borderRadius.md} !important;
  }
  & > .ant-pagination-item-active {
    border: 1px solid #00b1e1;
    background-color: #00b1e1 !important;
    & > a {
      color: ${(props) => props.theme.colors.white} !important;
    }
  }
  & > .ant-pagination-options {
    position: absolute;
    left: 0;
    margin-left: 0 !important;
    .ant-select-selector {
      border-radius: ${(props) => props.theme.borderRadius.md} !important;
    }
    @media (max-width: 639px) {
      display: inline-block !important;
      position: absolute;
      margin-top: -56px !important;
    }
  }
  @media (max-width: 639px) {
    display: flex !important;
    margin-top: 56px !important;
    justify-content: start;
    gap: 8px !important;
  }
`;

type Props = PaginationProps & {
  total?: number;
  current?: number;
};

export function Pagination({ className, defaultPageSize, ...props }: Props) {
  return (
    <StyledPagination
      {...props}
      className={className}
      showSizeChanger
      defaultPageSize={defaultPageSize || 10}
      locale={locale.Pagination}
      responsive
    />
  );
}
