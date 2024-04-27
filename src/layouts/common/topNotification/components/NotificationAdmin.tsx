'use client';

// eslint-disable-next-line import/no-named-as-default
import styled from 'styled-components';
import { useState } from 'react';
import { Tabs } from '@/components';
import {
  NotificaitonReceiverList,
  NotificationPublicList,
  NotificationDescription,
  NotificationPublicType,
  NotificationReceiverType,
  NotificationDetailType,
} from '.';
import { SenderTypeEnum, NotificationReceiver } from '@/graphql/generated';

const NotificationTabs = styled(Tabs)`
  .ant-tabs-nav {
    .ant-tabs-tab {
      &.ant-tabs-tab-active {
        .count {
          color: #1f2937;
          background-color: white;
        }
      }
      .count {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 18px;
        height: 18px;
        color: white;
        background-color: #ff4949;
        border-radius: 14px;
      }
    }
  }
  .ant-tabs-content-holder {
    width: 100%;
  }
`;

interface Props {
  getNotification?: NotificationDetailType | undefined;
  setNotification?: (_e: NotificationDetailType) => void;
  unReadCount: number;
  state: NotificationPublicType;
  stateReceiver: NotificationReceiverType;
  loading: boolean;
  notificationReceiverLoading: boolean;
  onLoadMore?: () => void;
  onLoadMoreReceiver?: () => void;
  onRead?: (_e: NotificationReceiver) => void;
}

export const NotificationAdmin = ({
  getNotification,
  setNotification,
  unReadCount,
  state,
  stateReceiver,
  onLoadMore,
  onLoadMoreReceiver,
  notificationReceiverLoading,
  loading,
  onRead,
}: Props) => {
  const [active, setActive] = useState('1');

  const changeTab = (activeKey: string) => {
    setActive(activeKey);
  };

  return (
    <div className="py-md px-xs border-t border-secondary ">
      {!getNotification ? (
        <NotificationTabs
          defaultActiveKey="1"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          items={[
            {
              key: '1',
              label: (
                <div className="flex items-center gap-xxs text-caption">
                  運営からのお知らせ
                  {/* <div className="count">•</div> */}
                </div>
              ),
              children: (
                <NotificationPublicList
                  setNotification={setNotification}
                  data={state.list}
                  finished={state.finished}
                  loading={loading}
                  onLoadMore={onLoadMore}
                />
              ),
            },
            {
              key: '2',
              label: (
                <div className="flex items-center gap-xxs text-caption">
                  施設からのお知らせ
                  <div className="count">{unReadCount || 0}</div>
                </div>
              ),
              children: (
                <NotificaitonReceiverList
                  setNotification={setNotification}
                  data={stateReceiver.list}
                  finished={stateReceiver.finished}
                  loading={notificationReceiverLoading}
                  onLoadMore={onLoadMoreReceiver}
                  onRead={onRead}
                />
              ),
            },
          ]}
          onChange={changeTab}
          activeKey={active}
        />
      ) : (
        <NotificationDescription
          senderType={
            active === '1' ? SenderTypeEnum.ADMIN : SenderTypeEnum.COMPANY
          }
          data={getNotification}
        />
      )}
    </div>
  );
};
