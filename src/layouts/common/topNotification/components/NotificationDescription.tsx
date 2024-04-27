import { Avatar, Tag, Typography } from '@/components';
import { IoNotifications, IoTimeOutline } from 'react-icons/io5';
import { SenderTypeEnum } from '@/graphql/generated';
import dayjs from 'dayjs';
import { NotificationDetailType } from '.';

interface Props {
  senderType?: SenderTypeEnum;
  data?: NotificationDetailType;
}

export const NotificationDescription = ({ senderType, data }: Props) => {
  return (
    <div
      className="max-w-[342px] flex flex-col gap-md w-[342px]"
      style={{ maxHeight: 'calc(100vh - 250px)', overflowY: 'auto' }}
    >
      <div className=" flex items-center w-full">
        {senderType === SenderTypeEnum.ADMIN ? (
          <Avatar
            src="/assets/images/studioSora.svg"
            className="bg-primary-600 w-[48px] h-[48px] p-xxs "
          />
        ) : (
          <Avatar
            icon={<IoNotifications className="text-[#22c55e] text-[26px]" />}
            className="bg-success-100 w-[48px] h-[48px] p-xxs flex items-center justify-center"
          />
        )}

        <div className="flex gap-xxs items-center justify-between w-full ml-xs2">
          <div className="flex flex-col w-full gap-xxs">
            <Typography weight="bold" base="Body" className="text-primary">
              {data?.name || ''}
            </Typography>
            <Typography
              base="Caption"
              className="flex items-center gap-xxs text-secondary"
            >
              <IoTimeOutline className="text-subtitle2" />
              {dayjs(data?.createdAt).format('YYYY.MM.DD')}
            </Typography>
          </div>
          {dayjs(data?.createdAt).diff(dayjs(), 'days') >= -3 && (
            <Tag
              color={'mint'}
              size={'mini'}
              className="bg-primary text-white"
              style={{ maxHeight: 'calc(100vh - 250px)', marginRight: '10px' }}
            >
              NEW
            </Tag>
          )}
        </div>
      </div>
      <Typography
        base="Body"
        weight={
          dayjs(data?.createdAt).diff(dayjs(), 'days') >= -3
            ? 'bold'
            : 'regular'
        }
        className="max-w-[342px]"
      >
        {data?.title || ''}
      </Typography>

      <Typography base="Body" className="text-secondary">
        {data?.text || ''}
      </Typography>
    </div>
  );
};
