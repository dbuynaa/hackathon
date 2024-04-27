'use client';
import { PostProps } from '@/app/admin/article/components';
import {
  Avatar,
  Button,
  ButtonIcon,
  Tag,
  Typography,
  AdminPostPublisher,
} from '@/components';
import { Post, PostTypeEnum, User } from '@/graphql/generated';
import { sourceFile } from '@/utils/file/sourceFile';
import { AnyObject } from 'antd/es/_util/type';
import { ColumnType } from 'antd/es/table';
import dayjs from 'dayjs';
import {
  IoArrowForwardCircleOutline,
  IoPersonOutline,
  IoPlayOutline,
} from 'react-icons/io5';

export const PostColumns = (
  isSortable?: boolean,
  isDetailed?: boolean,
  isDeleteable?: boolean,
  // isAuthor?: boolean,
) => {
  return [
    isSortable && {
      title: '#',
      key: 'sort',
      render: (_t: Post, _r: unknown, index: number) => (
        <div className="text-primary font-bold">{index + 1}</div>
      ),
    },
    {
      title: '投稿',
      key: 'post',
      render: (item: PostProps) => (
        <div className="flex items-center">
          <div
            className="bg-cover bg-center w-[90px] h-[60px] rounded-sm object-cover shadow-sm"
            style={{
              background: `url('${sourceFile({
                fileKey: item?.thumbnail ?? item?.cover,
              })?.url}'), lightgray 50% / cover no-repeat`,
            }}
          >
            {item.type == PostTypeEnum.VIDEO && (
              <Button
                className={` bg-neutral-800 flex justify-center rounded-tl-xxs rounded-br-xxs h-[17px] ml-[31px] border-none`}
                size="small"
                icon={<IoPlayOutline className="text-white" fontSize="13px" />}
              >
                <Typography weight="medium" base="Small" className="text-white">
                  {item?.seconds || '00:00'}
                </Typography>
              </Button>
            )}
          </div>
          <Typography weight="medium" className="text-primary">
            {item.title}
          </Typography>
        </div>
      ),
      // sorter: true,
    },
    {
      title: 'カテゴリー',
      key: 'category',
      render: (item: Post) => (
        <div className="w-fit">
          {item.categories ? (
            item.categories.map((category) => (
              <Tag key={category.id} color={'mint'} size={'small'}>
                {category.name}
              </Tag>
            ))
          ) : (
            <Tag color={'mint'} size={'small'}>
              {'育児・子育て'}
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: '投稿者',
      key: 'user',
      render: (item: Post) => (
        <div className="flex gap-xs pl-lg items-center">
          <Avatar
            shape="circle"
            size="small"
            src={
              sourceFile({
                fileKey: item?.author?.image,
              })?.url
            }
            icon={!item?.author?.image && <IoPersonOutline />}
            className="border-secondary"
          />
          <AdminPostPublisher publisher={item.author as User} />
        </div>
      ),
    },
    {
      title: '発行日',
      key: 'publishDate',
      render: (item: Post) => (
        <Typography className="text-primary mx-sm">
          {dayjs(item.publishDate).format('YYYY-MM-DD')}
        </Typography>
      ),
      sorter: true,
    },

    isDetailed && {
      title: '',
      key: 'action',
      render: () => (
        <div className=" pl-sm">
          <ButtonIcon
            size="small"
            className=" bg-brand text-white rounded-sm border-none"
            icon={<IoArrowForwardCircleOutline />}
          />
        </div>
      ),
    },
    isDeleteable && {
      title: '',
      key: 'action',
      render: () => (
        <div className=" pl-sm">
          <ButtonIcon
            size="small"
            className=" bg-brand text-white rounded-sm border-none"
            icon={<IoArrowForwardCircleOutline />}
          />
        </div>
      ),
    },
  ].filter(Boolean) as ColumnType<AnyObject>[];
};
