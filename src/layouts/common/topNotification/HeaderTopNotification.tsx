'use client';

import React, { useState, useEffect } from 'react';
import { Badge, Popover } from 'antd';
import { Button, ButtonIcon, Typography } from '@/components';
import { IoNotificationsOutline, IoArrowBack } from 'react-icons/io5';
import {
  NotificationAdmin,
  NotificationPublicDataType,
  NotificationPublicType,
  NotificationReceiverDataType,
  NotificationReceiverType,
  NotificationDetailType,
} from './components';

import {
  Notification,
  useNotificationsPublicLazyQuery,
  useNotificationsReceiveLazyQuery,
  NotificationReceiver,
  useNotificationReceiverUpdateReadMutation,
} from '@/graphql/generated';

import { groupBy } from 'lodash';
import dayjs from 'dayjs';

export const HeaderTopNotification = () => {
  const [getNotification, setNotification] = useState<
    NotificationDetailType | undefined
  >(undefined);

  const [unReadCount, setUnReadCount] = useState<number>(0);

  const [state, setState] = useState<NotificationPublicType>({
    list: [],
    finished: false,
    current: 1,
  });

  const [stateReceiver, setStateReceiver] = useState<NotificationReceiverType>({
    list: [],
    finished: false,
    current: 1,
  });

  const [onNotificationsPublics, { loading }] = useNotificationsPublicLazyQuery(
    {
      fetchPolicy: 'no-cache',
      onCompleted: async (data) => {
        messageListToGroup(data.notificationsPublic?.data as Notification[]);
      },
    },
  );
  const [onNotificationsReceive, { loading: notificationReceiverLoading }] =
    useNotificationsReceiveLazyQuery({
      fetchPolicy: 'no-cache',
      onCompleted: async (data) => {
        messageListToGroupReceiver(
          data.notificationsReceive?.data as NotificationReceiver[],
        );
        setUnReadCount(
          data.notificationsReceive?.countUnRead
            ? +data.notificationsReceive?.countUnRead
            : 0,
        );
      },
    });

  const [onUpdateRead] = useNotificationReceiverUpdateReadMutation({
    fetchPolicy: 'no-cache',
    onCompleted: async (data) => {
      const newReceiverList = [...stateReceiver.list];
      for (let index = 0; index < newReceiverList.length; index += 1) {
        const values = newReceiverList[index].data;
        if (values) {
          for (let idx = 0; idx < (values || []).length; idx++) {
            const element = values[idx];
            if (element.id === data.notificationReceiverUpdateRead?.id) {
              element.readAt = dayjs();
            }
          }
        }
      }
      setStateReceiver({ ...stateReceiver, list: newReceiverList });
      setUnReadCount(unReadCount - 1);
    },
  });

  useEffect(() => {
    onNotificationsPublics({
      variables: { skip: state.current, take: 10 },
    });
    onNotificationsReceive({
      variables: {
        skip: state.current,
        take: 10,
      },
    });
  }, []);

  const messageListToGroup = (message_list: Notification[]) => {
    const sortedlist = [];
    const list = [...message_list];
    const headers: NotificationPublicDataType[] = [];
    if (list.length > 0) {
      for (let index = 0; index < list.length; index += 1) {
        const value = list[index];
        value.createdAt = value?.notifyDate;
        value.notifyDate = dayjs(value?.notifyDate).format('YYYY.MM.DD');
        sortedlist.push(value);
      }
    }
    const grouped = groupBy(sortedlist, 'notifyDate');
    Object.keys(grouped).forEach((key) => {
      headers.push({ key, data: grouped[key] });
    });

    messageSetList(headers, list.length);
  };

  const messageSetList = (
    list: NotificationPublicDataType[],
    length: number,
  ) => {
    const _messageList = state.list;
    if (state.current !== 1) {
      const _list = list;
      if (_messageList[0].key && _list && _list.length > 0) {
        if (_messageList[0].key === _list[0].key) {
          _messageList[0].data = [
            ...(_list?.[0]?.data || []),
            ...(_messageList?.[0]?.data || []),
          ];
          _list.shift();
        }
        setState({
          current: state.current + 1,
          finished: length < 10,
          list: [..._messageList, ..._list],
        });
        return;
      }
    }
    setState({
      current: state.current + 1,
      finished: length < 10,
      list: list && list.length > 0 ? list : _messageList,
    });
  };

  const onLoadMore = () => {
    onNotificationsPublics({
      variables: { skip: state.current + 1, take: 10 },
    });
    setState({
      ...state,
      current: state.current + 1,
    });
  };

  const messageListToGroupReceiver = (message_list: NotificationReceiver[]) => {
    const sortedlist = [];
    const list = [...message_list];
    const headers: NotificationReceiverDataType[] = [];
    if (list.length > 0) {
      for (let index = 0; index < list.length; index += 1) {
        const value = list[index];
        if (value.notification)
          value.notification = {
            ...value.notification,
            notifyDate:
              dayjs(value?.notification?.notifyDate).format('YYYY.MM.DD') || '',
          };
        sortedlist.push(value);
      }
    }
    const grouped = groupBy(sortedlist, 'notification.notifyDate');
    Object.keys(grouped).forEach((key) => {
      headers.push({ key, data: grouped[key] });
    });

    messageSetListReceiver(headers, list.length);
  };

  const messageSetListReceiver = (
    list: NotificationReceiverDataType[],
    length: number,
  ) => {
    const _messageList = stateReceiver.list;
    if (stateReceiver.current !== 1) {
      const _list = list;
      if (_messageList[0].key && _list && _list.length > 0) {
        if (_messageList[0].key === _list[0].key) {
          _messageList[0].data = [
            ...(_list?.[0]?.data || []),
            ...(_messageList?.[0]?.data || []),
          ];
          _list.shift();
        }
        setStateReceiver({
          current: stateReceiver.current + 1,
          finished: length < 10,
          list: [..._messageList, ..._list],
        });
        return;
      }
    }
    setStateReceiver({
      current: stateReceiver.current + 1,
      finished: length < 10,
      list: list && list.length > 0 ? list : _messageList,
    });
  };

  const onLoadMoreReceiver = () => {
    onNotificationsReceive({
      variables: {
        skip: stateReceiver.current + 1,
        take: 10,
      },
    });
    setStateReceiver({
      ...stateReceiver,
      current: stateReceiver.current + 1,
    });
  };

  const onRead = (data: NotificationReceiver) => {
    onUpdateRead({
      variables: {
        id: data?.id,
      },
    });
  };

  return (
    <Popover
      placement="bottom"
      className="block"
      overlayClassName="[&_.ant-popover-content]:w-[320px] tiny:[&_.ant-popover-content]:w-full"
      title={
        <div
          className={
            'flex mx-[2px] mb-xs ' +
            `${getNotification ? 'justify-between' : 'justify-center'}`
          }
        >
          {getNotification && (
            <Button
              icon={<IoArrowBack />}
              size="small"
              className="border-none bg-neutral-100 [&>span.ant-btn-icon]:text-primary"
              onClick={() => setNotification(undefined)}
            />
          )}
          <Typography weight="bold" base="Subtitle" className="text-primary">
            お知らせ
          </Typography>
          {getNotification && <div className="text-white w-[38px]">k</div>}
        </div>
      }
      content={
        <NotificationAdmin
          getNotification={getNotification}
          setNotification={setNotification}
          unReadCount={unReadCount}
          state={state}
          stateReceiver={stateReceiver}
          loading={loading}
          notificationReceiverLoading={notificationReceiverLoading}
          onLoadMore={onLoadMore}
          onLoadMoreReceiver={onLoadMoreReceiver}
          onRead={onRead}
        />
      }
      trigger={['click']}
    >
      <Badge count={unReadCount || 0}>
        <ButtonIcon icon={<IoNotificationsOutline />} />
      </Badge>
    </Popover>
  );
};
