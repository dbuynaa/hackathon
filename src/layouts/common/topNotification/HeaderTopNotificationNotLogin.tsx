/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { Badge, Popover } from 'antd';
import { Button, ButtonIcon, Typography } from '@/components';
import { IoArrowBack, IoNotificationsOutline } from 'react-icons/io5';
import {
  NotificationDescription,
  NotificationPublicList,
  NotificationPublicDataType,
  NotificationPublicType,
  NotificationDetailType,
} from './components';

import {
  Notification,
  useNotificationsPublicLazyQuery,
  SenderTypeEnum,
} from '@/graphql/generated';
import { groupBy } from 'lodash';
import dayjs from 'dayjs';

export function HeaderTopNotificationNotLogin() {
  const [getNotification, setNotification] = useState<
    NotificationDetailType | undefined
  >(undefined);
  const [state, setState] = useState<NotificationPublicType>({
    list: [],
    finished: false,
    current: 1,
  });

  const [onNotificationLazyQuery, { loading }] =
    useNotificationsPublicLazyQuery({
      fetchPolicy: 'no-cache',
      onCompleted: async (data) => {
        messageListToGroup(data.notificationsPublic?.data as Notification[]);
      },
    });

  useEffect(() => {
    onNotificationLazyQuery({
      variables: { skip: state.current, take: 10 },
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
    onNotificationLazyQuery({
      variables: { skip: state.current + 1, take: 10 },
    });
    setState({
      ...state,
      current: state.current + 1,
    });
  };

  return (
    <Popover
      placement="bottom"
      className="block"
      overlayClassName="[&_.ant-popover-content]:w-[320px] tiny:[&_.ant-popover-content]:w-full tiny:[&_.ant-popover-content]:min-w-[320px]"
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
        <div className="py-xxs px-xs ">
          {!getNotification ? (
            <NotificationPublicList
              setNotification={setNotification}
              data={state.list}
              finished={state.finished}
              loading={loading}
              onLoadMore={onLoadMore}
            />
          ) : (
            <NotificationDescription
              senderType={SenderTypeEnum.ADMIN}
              data={getNotification}
            />
          )}
        </div>
      }
      trigger={['click']}
    >
      <Badge dot={false}>
        <ButtonIcon className="rounded-md" icon={<IoNotificationsOutline />} />
      </Badge>
    </Popover>
  );
}
