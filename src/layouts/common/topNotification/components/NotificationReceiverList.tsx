import { Divider, Skeleton } from 'antd';
import {
  NotificationReceiverItem,
  NotificationReceiverDataType,
  NotificationDetailType,
} from '.';

import { Button } from '@/components';

import { NotificationReceiver } from '@/graphql/generated';

interface Props {
  setNotification?: (_e: NotificationDetailType) => void;
  onLoadMore?: () => void;
  onRead?: (_e: NotificationReceiver) => void;
  data: NotificationReceiverDataType[];
  loading: boolean;
  finished: boolean;
}

export const NotificaitonReceiverList = ({
  setNotification,
  data,
  loading,
  finished,
  onLoadMore,
  onRead,
}: Props) => {
  return (
    <div
      className="flex flex-col gap-md mt-md  w-full sm:w-[342px]"
      style={{
        maxHeight: 'calc(100vh - 250px)',
        overflowY: 'auto',
      }}
    >
      {data.map((item, index: number) => (
        <div key={index} className="flex flex-col gap-sm w-full">
          <Divider
            orientation="left"
            className="m-[0] before:w-[0] [&>span.ant-divider-inner-text]:text-body [&>span.ant-divider-inner-text]:font-bold [&>span.ant-divider-inner-text]:text-primary [&>span.ant-divider-inner-text]:p-[0] after:ml-md after:border-primary "
          >
            {String(item.key)}
          </Divider>

          {item?.data?.map((notificationReceiverItem, index) => (
            <div key={index} className="flex flex-col gap-sm w-full">
              {index > 0 && <Divider className="m-[0] border-primary" />}

              <NotificationReceiverItem
                newsItem={notificationReceiverItem}
                onClick={() => {
                  if (!notificationReceiverItem.readAt) {
                    onRead?.(notificationReceiverItem);
                  }
                  setNotification &&
                    setNotification({
                      name: (
                        notificationReceiverItem.notification?.createdUser
                          ?.name || ''
                      ).toString(),
                      notifyDate:
                        notificationReceiverItem.notification?.notifyDate,
                      title: (
                        notificationReceiverItem.notification?.title || ''
                      ).toString(),
                      text: (
                        notificationReceiverItem.notification?.text || ''
                      ).toString(),
                      createdAt:
                        notificationReceiverItem.notification?.createdAt,
                    });
                }}
              />
            </div>
          ))}
        </div>
      ))}
      {loading && <Skeleton />}
      {data?.length >= 10 && !finished && !loading ? (
        <div className="flex flex-col">
          <Button onClick={onLoadMore}>loading more</Button>
        </div>
      ) : null}
    </div>
  );
};
