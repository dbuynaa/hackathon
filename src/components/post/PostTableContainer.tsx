'use client';

import { Post } from '@/graphql/generated';
import { Table } from '..';
import { PostColumns } from './PostColumns';
import { PostProps } from '@/app/admin/article/components';
type Props = {
  data: Post[];
  count: number;
  current?: number;
  pageSize?: number;
  onPageChange?: ((page: number, pageSize: number) => void) | undefined;
  isSelectable?: boolean;
  isSortable?: boolean;
  isDetailed?: boolean;
  isDeleteable?: boolean;
  selectedPosts?: Post[];
  setSelectedPosts?: (values: PostProps[]) => void;
  loading?: boolean;
};

export function PostTableContainer({
  data,
  pageSize,
  current,
  count,
  isSelectable,
  isSortable,
  selectedPosts,
  setSelectedPosts,
  isDeleteable,
  isDetailed,
  onPageChange,
  loading,
}: Props) {
  return isSelectable ? (
    <Table
      key={1}
      columns={PostColumns(isSortable, isDeleteable, isDetailed)}
      dataSource={data || []}
      className="w-full"
      pagination={{
        total: count || 0,
        showSizeChanger: true,
        current: current,
        pageSize: pageSize || 5,
        defaultPageSize: 5,
      }}
      loading={loading}
      rowSelection={{
        type: 'checkbox',
        onSelect: (record, selected) => {
          if (!setSelectedPosts) return;
          if (selected) {
            setSelectedPosts([...(selectedPosts || []), record as Post]);
          } else {
            setSelectedPosts(
              (selectedPosts || []).filter((item) => item.id !== record.id),
            );
          }
        },
        selectedRowKeys: selectedPosts?.map((item) => item.id),
      }}
      rowKey={'id'}
    />
  ) : (
    <Table
      key={2}
      columns={PostColumns(isSortable, isDeleteable, isDetailed)}
      dataSource={data || []}
      className="w-full"
      pagination={{
        total: count || 0,
        showSizeChanger: true,
        pageSize: pageSize || 5,
        current: current,
        defaultPageSize: 5,
        onChange: onPageChange,
        onShowSizeChange: (current, size) => {
          console.log('onShowSizeChange', current, size);
        },
      }}
      rowKey={'id'}
    />
  );
}
