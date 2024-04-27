import { Divider, Skeleton } from 'antd';
import {
  NotificationPublicDataType,
  NotificationPublicItem,
  NotificationDetailType,
} from '.';

import { Button } from '@/components';

interface Props {
  setNotification?: (_e: NotificationDetailType) => void;
  onLoadMore?: () => void;
  data: NotificationPublicDataType[];
  loading: boolean;
  finished: boolean;
}

export const NotificationPublicList = ({
  setNotification,
  data,
  loading,
  finished,
  onLoadMore,
}: Props) => {
  return (
    <div
      className="flex flex-col gap-md mt-md w-full sm:w-[342px]"
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

          {item?.data?.map((notification, index) => (
            <div key={index} className="flex flex-col gap-sm w-full">
              {index > 0 && <Divider className="m-[0] border-primary" />}

              <NotificationPublicItem
                newsItem={notification}
                onClick={() => {
                  setNotification &&
                    setNotification({
                      name: (notification.createdUser?.name || '').toString(),
                      notifyDate: notification.notifyDate,
                      title: notification.title,
                      text: notification.text,
                      createdAt: notification.createdAt,
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
