'use client';

import React, { useState } from 'react';
import {
  Button,
  ButtonIcon,
  CardHorizontal,
  Typography,
  alertModal,
  message,
} from '@/components';
import {
  FacebookShareButton,
  TwitterShareButton,
  LineShareButton,
} from 'next-share';
import { Image, Dropdown } from 'antd';
import {
  IoBookmarkSharp,
  IoBookmarkOutline,
  IoDownloadOutline,
  IoCreate,
  IoTrash,
} from 'react-icons/io5';
import Link from 'next/link';

import { PostDetailImage } from './PostDetailImage';
import { PostDetailVideo } from './PostDetailVideo';
import { Post, usePostDeleteMutation } from '@/graphql/generated';
import { useSession } from 'next-auth/react';
import { sourceFile } from '@/utils/file/sourceFile';
import { CollectionModal } from '@/app/collection/components';
import { Can } from '@/layouts/common';
import { usePathname, useRouter } from 'next/navigation';
import { Routes } from '@/config/routes';

type Props = {
  post: Post;
  specialPosts?: Post[];
  ranking?: Post[];
};

export function PostDetail({ post, specialPosts, ranking }: Props) {
  const { data: session } = useSession();
  const [isCollectionModal, setCollectionModal] = useState(false);
  const category = post?.categories?.find(
    (item) => !item?.order?.includes('/'),
  );
  const isPublisher = session?.user?.id === post?.author?.id;
  const pathName = usePathname();
  const customFiles = (post?.files || [])?.map((item) => {
    return {
      key: item.id?.toString(),
      label: (
        <div className="flex flex-row justify-between border-b-2 border-brand">
          <Link
            key={item.id}
            href={
              sourceFile({
                fileKey: `post/file/${item.id}.pdf`,
                type: 'FILE',
              })?.url || '/'
            }
            download={false}
            rel="noopener noreferrer"
            target="_blank"
          >
            {item?.name || ''}
          </Link>
        </div>
      ),
    };
  });

  const filesProps = {
    items: customFiles,
  };
  const router = useRouter();
  const [onDeletePost] = usePostDeleteMutation({
    onCompleted: () => {
      message.success('あなたのコンテンツが削除されました！');
      router.back();
    },
    onError: (error) => {
      message.error(error.message);
      console.log('onError', error);
    },
  });
  return (
    <div className="flex flex-col gap-lg ">
      <div className="grid grid-cols-12 overflow-auto gap-lg md:gap-lg lg:gap-md xl:gap-xl ">
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-md xl:gap-lg lg:border-r lg:border-primary  lg:pr-md xl:pr-xl">
          {post?.type === 'VIDEO' ? (
            <PostDetailVideo
              post={post}
              paid={category ? category?.isPaid : true}
            />
          ) : (
            <PostDetailImage
              post={post}
              paid={category ? category?.isPaid : true}
            />
          )}

          <div className="grid grid-cols-12 gap-md pt-md border-t border-primary">
            <div className="col-span-12 flex tiny:flex-row gap-sm lg:hidden">
              {!isPublisher && (
                <Can I="create" a="Landing_Collection">
                  <Button
                    icon={
                      post.collections?.length ? (
                        <IoBookmarkSharp />
                      ) : (
                        <IoBookmarkOutline />
                      )
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCollectionModal(true);
                    }}
                  >
                    保存
                  </Button>
                </Can>
              )}
              {isPublisher && !pathName.startsWith('/admin') && (
                <div className="flex gap-sm w-full">
                  <Button
                    icon={
                      <IoCreate className="w-[18px] h-[18px] mt-[5px] ml-[9px] " />
                    }
                    className="w-full [&_.ant-btn-icon]:w-[32px] [&_.ant-btn-icon]:h-[32px] [&_.ant-btn-icon]:rounded-xl [&_.ant-btn-icon]:bg-primary-100"
                    href={`${
                      Routes.Landing_Post?.Update?.path
                        ? Routes.Landing_Post?.Update?.path({ id: post.id })
                        : undefined
                    }?type=${post.type}`}
                  >
                    編集
                  </Button>
                  <Button
                    icon={
                      <IoTrash className="w-[18px] h-[18px] mt-[6px] ml-[7px] text-error" />
                    }
                    className="w-full [&_.ant-btn-icon]:w-[32px] [&_.ant-btn-icon]:h-[32px] [&_.ant-btn-icon]:rounded-xl [&_.ant-btn-icon]:bg-error-100"
                    onClick={() => {
                      if (post.id) {
                        alertModal.confirm({
                          base: 'warning',
                          title: `投稿を削除しますか？`,
                          okText: '削除',
                          onOk: () => {
                            onDeletePost({
                              variables: {
                                where: {
                                  id: post.id,
                                },
                              },
                            });
                          },
                          cancelText: 'キャンセル',
                        });
                      }
                    }}
                  >
                    削除
                  </Button>
                </div>
              )}
            </div>
            <div className="col-span-12 xl:col-span-7 flex flex-col xs:flex-row gap-sm">
              {!isPublisher && (
                <Can I="create" a="Landing_Collection">
                  <Button
                    icon={
                      post.collections?.length ? (
                        <IoBookmarkSharp />
                      ) : (
                        <IoBookmarkOutline />
                      )
                    }
                    className="w-full xl:w-fit"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCollectionModal(true);
                    }}
                  >
                    保存
                  </Button>
                </Can>
              )}

              {category?.isPaid ? (
                session?.user.id && customFiles?.length > 0 ? (
                  <Dropdown key={1} menu={filesProps}>
                    <Button
                      icon={<IoDownloadOutline className="text-white" />}
                      className="bg-warning border-none w-full xl:w-fit"
                    >
                      <span className="text-white">参考資料をダウンロード</span>
                    </Button>
                  </Dropdown>
                ) : null
              ) : customFiles?.length > 0 ? (
                <Dropdown key={2} menu={filesProps}>
                  <Button
                    icon={<IoDownloadOutline className="text-white" />}
                    className="bg-warning border-none w-full xl:w-fit"
                  >
                    <span className="text-white">参考資料をダウンロード</span>
                  </Button>
                </Dropdown>
              ) : null}
            </div>
            <div className="col-span-12 xl:col-span-5 flex gap-sm items-center justify-between xl:justify-end">
              <Typography base="Subtitle2" weight="medium">
                共有する：
              </Typography>
              <div className="flex gap-sm">
                <FacebookShareButton
                  url={`${process.env.NEXT_PUBLIC_DOMAIN}/post/${post.id}`}
                  quote={post?.title}
                >
                  <ButtonIcon
                    icon={
                      <Image
                        src="/assets/images/logos/facebook-f.svg"
                        alt={''}
                        preview={false}
                        className=" w-[24px] h-[24px]"
                      />
                    }
                    type="primary"
                    className="rounded-md bg-[#1877F2] hover:bg-info-400 border-none"
                  />
                </FacebookShareButton>
                <TwitterShareButton
                  url={`${process.env.NEXT_PUBLIC_DOMAIN}/post/${post.id}`}
                  title={post?.title}
                >
                  <ButtonIcon
                    icon={
                      <Image
                        src="/assets/images/logos/twitter.svg"
                        alt={''}
                        preview={false}
                        className=" w-[28px] h-[28px]"
                      />
                    }
                    type="primary"
                    className="rounded-md bg-[#000] hover:bg-neutral-900 border-none"
                  />
                </TwitterShareButton>
                <LineShareButton
                  url={`${process.env.NEXT_PUBLIC_DOMAIN}/post/${post.id}`}
                  title={post?.title}
                >
                  <ButtonIcon
                    icon={
                      <Image
                        src="/assets/images/logos/line.svg"
                        alt={''}
                        preview={false}
                      />
                    }
                    className="rounded-md border-none"
                  />
                </LineShareButton>
              </div>
            </div>
          </div>
        </div>
        {/* <Divider className="w-0 m-[0] h-full" type="vertical" /> */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-md xl:gap-lg ">
          {/* 特集記事 */}
          <div className="hidden lg:flex lg:flex-col lg:gap-sm ">
            {!isPublisher && (
              <Can I="create" a="Landing_Collection">
                <Button
                  icon={
                    post.collections?.length ? (
                      <IoBookmarkSharp />
                    ) : (
                      <IoBookmarkOutline />
                    )
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCollectionModal(true);
                  }}
                >
                  保存
                </Button>
              </Can>
            )}
            {isPublisher && !pathName.startsWith('/admin') && (
              <div className="flex gap-sm w-full">
                <Button
                  icon={
                    <IoCreate className="w-[18px] h-[18px] mt-[5px] ml-[9px] " />
                  }
                  className="w-full [&_.ant-btn-icon]:w-[32px] [&_.ant-btn-icon]:h-[32px] [&_.ant-btn-icon]:rounded-xl [&_.ant-btn-icon]:bg-primary-100"
                  href={`${
                    Routes.Landing_Post?.Update?.path
                      ? Routes.Landing_Post?.Update?.path({ id: post.id })
                      : undefined
                  }?type=${post.type}`}
                >
                  編集
                </Button>
                <Button
                  icon={
                    <IoTrash className="w-[18px] h-[18px] mt-[6px] ml-[7px] text-error" />
                  }
                  className="w-full [&_.ant-btn-icon]:w-[32px] [&_.ant-btn-icon]:h-[32px] [&_.ant-btn-icon]:rounded-xl [&_.ant-btn-icon]:bg-error-100"
                  onClick={() => {
                    if (post.id) {
                      alertModal.confirm({
                        base: 'warning',
                        title: `投稿を削除しますか？`,
                        okText: '削除',
                        onOk: () => {
                          onDeletePost({
                            variables: {
                              where: {
                                id: post.id,
                              },
                            },
                          });
                        },
                        cancelText: 'キャンセル',
                      });
                    }
                  }}
                >
                  削除
                </Button>
              </div>
            )}
            {category?.isPaid ? (
              session?.user.id && customFiles?.length > 0 ? (
                <Dropdown key={3} menu={filesProps}>
                  <Button
                    icon={<IoDownloadOutline className="text-white" />}
                    className="bg-warning border-none  [&>span]:text-white"
                  >
                    参考資料をダウンロード
                  </Button>
                </Dropdown>
              ) : null
            ) : customFiles?.length > 0 ? (
              <Dropdown key={4} menu={filesProps}>
                <Button
                  icon={<IoDownloadOutline className="text-white" />}
                  className="bg-warning border-none hover:bg-warning-400  [&>span]:text-white"
                >
                  参考資料をダウンロード
                </Button>
              </Dropdown>
            ) : null}

            <div className="flex gap-sm items-center justify-end">
              <Typography base="Subtitle2" weight="medium">
                共有する：
              </Typography>
              <FacebookShareButton
                url={`${process.env.NEXT_PUBLIC_DOMAIN}/post/${post.id}`}
                quote={post?.title}
              >
                <ButtonIcon
                  type="primary"
                  icon={
                    <Image
                      src="/assets/images/logos/facebook-f.svg"
                      alt={''}
                      preview={false}
                      className=" w-[24px] h-[24px]"
                    />
                  }
                  className="rounded-md bg-[#1877F2] hover:bg-info-400 border-none"
                />
              </FacebookShareButton>
              <TwitterShareButton
                url={`${process.env.NEXT_PUBLIC_DOMAIN}/post/${post.id}`}
                title={post?.title}
              >
                <ButtonIcon
                  icon={
                    <Image
                      src="/assets/images/logos/twitter.svg"
                      alt={''}
                      preview={false}
                      className=" w-[28px] h-[28px]"
                    />
                  }
                  type="primary"
                  className="rounded-md bg-[#000] hover:bg-neutral-900 border-none"
                />
              </TwitterShareButton>
              <LineShareButton
                url={`${process.env.NEXT_PUBLIC_DOMAIN}/post/${post.id}`}
                title={post?.title}
              >
                <ButtonIcon
                  icon={
                    <Image
                      src="/assets/images/logos/line.svg"
                      alt={''}
                      preview={false}
                    />
                  }
                  className="rounded-md border-none"
                />
              </LineShareButton>
            </div>
          </div>
          <div>
            <div className="flex flex-row justify-between  mb-sm pb-xs2 border-b-2 border-brand">
              <Typography
                base="Subtitle"
                weight="bold"
                className="text-primary"
              >
                特集記事
              </Typography>
            </div>
            <div className="grid grid-cols-12 gap-sm w-full">
              {(specialPosts || [])?.map((item, index) => (
                <CardHorizontal
                  key={index}
                  className="col-span-12 sm:col-span-6 lg:col-span-12"
                  rank="special"
                  content={item.type || undefined}
                  data={item}
                  collectionCount={item?.collections?.length}
                />
              ))}
            </div>
          </div>
          {/* ランキング */}
          <div>
            <div className="flex flex-row justify-between  mb-sm pb-xs2 border-b-2 border-brand">
              <Typography
                base="Subtitle"
                weight="bold"
                className="text-primary"
              >
                ランキング
              </Typography>
            </div>
            <div className="grid grid-cols-12 gap-sm w-full">
              {(ranking || [])?.map((item, index) => (
                <CardHorizontal
                  key={index}
                  className="col-span-12 sm:col-span-6 lg:col-span-12"
                  content={item.type || undefined}
                  rank={
                    index === 0
                      ? 'gold'
                      : index === 1
                      ? 'silver'
                      : index === 2
                      ? 'bronze'
                      : index === 3
                      ? 'other'
                      : undefined
                  }
                  data={item}
                  collectionCount={item?.collections?.length}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {isCollectionModal ? (
        <CollectionModal
          getCollectionModal={isCollectionModal}
          setCollectionModal={setCollectionModal}
          post={post as Post}
        />
      ) : null}
    </div>
  );
}
