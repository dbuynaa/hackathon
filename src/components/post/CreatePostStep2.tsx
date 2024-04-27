'use client';

import { Button, ButtonIcon, Typography } from '@/components';
import { Divider, Form } from 'antd';
import { IoDocumentText } from 'react-icons/io5';
import { MdNavigateNext } from 'react-icons/md';
import {
  Category,
  Post,
  PostAdminQuery,
  PostTypeEnum,
} from '@/graphql/generated';
import { enums } from '@/utils/enumUtils';
import { PostDetailImage, PostDetailVideo } from '.';
import dayjs from 'dayjs';

type Props = {
  prev: () => void;
  post: PostAdminQuery['post'] | null;
  submitText?: string;
  type?: PostTypeEnum;
  categories?: Category[];
  loading?: boolean;
};
export function CreatePostStep2({
  prev,
  post,
  categories,
  type,
  submitText,
  loading,
}: Props) {
  const form = Form.useFormInstance();

  return (
    <div className="flex flex-col gap-lg">
      {type === 'VIDEO' ? (
        <PostDetailVideo post={post as Post} paid={true} />
      ) : (
        <PostDetailImage post={post as Post} paid={true} />
      )}

      <div className="flex flex-row border-b-2 border-brand pb-xs2">
        <Typography base="Subtitle" weight="bold" className="text-primary">
          参考資料をダウンロード
        </Typography>
      </div>
      <div className="flex gap-sm">
        {post?.files?.map((file, index) => (
          <div
            key={index}
            className="flex gap-xs items-center p-xs border rounded-md border-primary"
          >
            <ButtonIcon
              icon={<IoDocumentText className="text-[28px]" />}
              className="rounded-xl bg-primary-100 border-none w-[48px] h-[48px]"
            />
            <div className="flex flex-col text-[#747688] w-full">
              <Typography
                base="Subtitle2"
                weight="bold"
                className="text-primary"
              >
                {file?.name}
              </Typography>
              {Math.round(parseInt(file?.fileSize.toString()) / 1024)} KB
            </div>
            <MdNavigateNext className="text-secondary" />
          </div>
        ))}
      </div>
      <div className="flex flex-row border-b-2 border-brand pb-xs2">
        <Typography base="Subtitle" weight="bold" className="text-primary">
          記事投稿設定
        </Typography>
      </div>
      <div className="flex flex-col gap-md">
        <div className="flex gap-sm overflow-x-auto">
          <Typography base="Subtitle2" className="text-primary w-[240px]">
            プライバシー設定
          </Typography>
          <Typography
            base="Subtitle2"
            weight="bold"
            className="text-primary w-full"
          >
            {post?.privacy && enums.postPrivacy.get(post?.privacy)}
          </Typography>
        </div>
        <Divider className="m-[0]" />
        <div className="flex gap-sm overflow-x-auto">
          <Typography base="Subtitle2" className="text-primary w-[240px] ">
            カテゴリー
          </Typography>
          <Typography
            base="Subtitle2"
            weight="bold"
            className="text-primary w-full"
          >
            {
              categories?.find((e) => e.code === form.getFieldValue('parent'))
                ?.name
            }
            {' > '}
            {
              categories
                ?.find((e) => e.code === form.getFieldValue('parent'))
                ?.children?.find(
                  (c) => c?.code === form.getFieldValue('children'),
                )?.name
            }
          </Typography>
        </div>
        <Divider className="m-[0]" />
        <div className="flex gap-sm overflow-x-auto">
          <Typography base="Subtitle2" className="text-primary w-[240px]">
            投稿時間
          </Typography>
          <Typography
            base="Subtitle2"
            weight="bold"
            className="text-primary w-full"
          >
            {post?.publishDate
              ? dayjs(post.publishDate).format('YYYY-MM-DD HH:mm')
              : ''}
          </Typography>
        </div>
        <div className="pt-md flex justify-end gap-sm">
          <Button
            className="px-md"
            disabled={loading}
            onClick={() => {
              prev();
            }}
          >
            戻る
          </Button>
          <Button
            type="primary"
            className=" px-md"
            htmlType="submit"
            disabled={loading}
            loading={loading}
          >
            {submitText || '投稿'}
          </Button>
        </div>
      </div>
    </div>
  );
}
