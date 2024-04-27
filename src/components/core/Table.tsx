'use client';

import React from 'react';
import { styled } from 'styled-components';

import { Table as AntTable, TablePaginationConfig, TableProps } from 'antd';
import { AnyObject } from 'yup';
import { useSearchArray } from '@/utils/useSearchQuery';
import { useSearchParams } from 'next/navigation';
import { isObject } from 'lodash';

export const StyledTable = styled(AntTable)`
  line-height: 0 !important;

  .ant-table-content {
    .ant-table-thead {
      tr {
        .ant-table-cell {
          font-size: ${(props) => props.theme.fontSize.body};
          font-weight: 600;
          text-align: center;
          background-color: ${(props) =>
            props.theme.colors.neutral[100]} !important;
        }
        th:first-child {
          border-start-start-radius: ${(props) =>
            props.theme.borderRadius.sm} !important;
          border-end-start-radius: ${(props) =>
            props.theme.borderRadius.sm} !important;
        }
        th:first-child::before {
          border-right-width: 1px !important;
          border-right-color: ${(props) =>
            props.theme.borderColor.dark} !important;
          padding-top: 6px !important;
          padding-bottom: 6px !important;
        }
        th:last-child {
          border-start-end-radius: ${(props) =>
            props.theme.borderRadius.sm} !important;
          border-end-end-radius: ${(props) =>
            props.theme.borderRadius.sm} !important;
        }
      }
    }
    .ant-table-tbody {
      tr {
        &.ant-table-row-selected {
          .ant-table-selection-column {
            border-left: 1px solid #00b1e1;
            border-top: 1px solid #00b1e1;
            border-top-left-radius: 6px;
            border-bottom-left-radius: 6px;
            border-bottom: 1px solid #00b1e1;
          }
          .ant-table-cell {
            background-color: ${(props) => props.theme.colors.white};
            border-top: 1px solid #00b1e1;
            border-bottom: 1px solid #00b1e1;
          }

          .action-column {
            border-right: 1px solid #00b1e1;
            border-top: 1px solid #00b1e1;
            border-top-right-radius: 6px;
            border-bottom-right-radius: 6px;
            border-bottom: 1px solid #00b1e1;
          }
        }
        .ant-table-cell {
          font-size: ${(props) => props.theme.fontSize.body};
          font-weight: 400 !important;
          padding: 12px 0px !important;
          text-align: center;
        }
        td:first-child > div {
          border-right-width: 1px !important;
          border-right-color: ${(props) =>
            props.theme.borderColor.dark} !important;
          line-height: 24px;
        }
        td:last-child > div {
          border-left-width: 1px !important;
          border-left-color: ${(props) =>
            props.theme.borderColor.brand} !important;
          line-height: 36px;
        }
      }
    }
  }
  .ant-pagination {
    display: flex;
    gap: ${(props) => props.theme.spacing.xs};
    li {
      border-radius: ${(props) => props.theme.borderRadius.sm};
      border-width: 1px;
      border-color: ${(props) => props.theme.borderColor.dark} !important;
    }
    li:last-child {
      border-width: 0px;
    }
    .ant-pagination-item-active {
      border-color: ${(props) => props.theme.borderColor.brand} !important;
    }
    .ant-pagination-options > .ant-select > .ant-select-selector {
      border-radius: ${(props) => props.theme.borderRadius.sm} !important;
      border-width: 1px !important;
      border-color: ${(props) => props.theme.borderColor.dark} !important;
      padding-left: 16px !important;
      padding-right: 16px !important;
    }
    .ant-select-selection-search {
      display: none;
    }
  }
`;

export function Table(props: TableProps<AnyObject>) {
  const searchParams = useSearchParams();
  const onSearch = useSearchArray();

  const skip = searchParams.get('skip');
  const take = searchParams.get('take');

  const { pagination, onChange, ..._props } = props;

  const { defaultPageSize, defaultCurrent } =
    pagination as TablePaginationConfig;

  return (
    <StyledTable
      {..._props}
      size="small"
      dataSource={props.dataSource}
      columns={props.columns}
      onChange={(_pagination, _filters, sorter, _extra) => {
        if (onChange) {
          onChange(_pagination, _filters, sorter, _extra);
        } else {
          if (isObject(sorter)) {
            const { columnKey, order } = sorter as {
              columnKey: string;
              order: 'descend' | 'ascend' | null;
            };
            if (order) onSearch({ order: `${columnKey}_${order}` });
            else onSearch({ order: null });
          }
        }
      }}
      pagination={{
        ...pagination,

        defaultPageSize: take ? parseInt(take) : defaultPageSize || 20,
        defaultCurrent: skip ? parseInt(skip) : defaultCurrent || 1,
        onShowSizeChange: (current, size) => {
          if (pagination && pagination.onShowSizeChange) {
            pagination.onShowSizeChange(current, size);
          } else {
            onSearch({ skip: current, take: size });
          }
        },
        onChange: (page, size) => {
          if (pagination && pagination.onChange) {
            pagination.onChange(page, size);
          } else {
            onSearch({ skip: page, take: size });
          }
        },
      }}
    />
  );
}
