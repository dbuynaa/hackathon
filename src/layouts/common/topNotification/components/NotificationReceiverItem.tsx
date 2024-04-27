import { Tag, Typography, Avatar } from '@/components';
import { IoTimeOutline, IoNotifications } from 'react-icons/io5';
import { NotificationReceiver } from '@/graphql/generated';
import dayjs from 'dayjs';

interface Props {
  newsItem?: NotificationReceiver;
  onClick: () => void;
}
export const NotificationReceiverItem = ({ newsItem, onClick }: Props) => {
  return (
    <div
      className="flex flex-col items-center gap-xxs cursor-pointer w-full"
      onClick={() => {
        onClick();
      }}
    >
      <div className=" flex items-center w-full">
        <Avatar
          icon={<IoNotifications className="text-[#22c55e] text-[26px]" />}
          className="bg-success-100 w-[48px] h-[48px] p-xxs flex items-center justify-center"
        />

        <div className="flex gap-xxs items-center justify-between w-full ml-xs2">
          <div className="flex flex-col w-full gap-xxs">
            <Typography weight="bold" base="Body" className="text-primary">
              {newsItem?.notification?.createdUser?.name || ''}
            </Typography>
            <Typography
              base="Caption"
              className="flex items-center gap-xxs text-secondary"
            >
              <IoTimeOutline className="text-subtitle2" />
              {dayjs(newsItem?.notification?.createdAt).format('YYYY.MM.DD')}
            </Typography>
          </div>
          {!newsItem?.readAt ||
          dayjs(newsItem?.notification?.createdAt).diff(dayjs(), 'days') >=
            -3 ? (
            <Tag color={'mint'} size={'mini'} className="bg-primary text-white">
              NEW
            </Tag>
          ) : null}
        </div>
      </div>
      <Typography
        base="Body"
        weight={
          dayjs(newsItem?.notification?.createdAt).diff(dayjs(), 'days') >= -3
            ? 'bold'
            : 'regular'
        }
        className="max-w-[342px]"
      >
        {newsItem?.notification?.title}
      </Typography>
    </div>
  );
};
