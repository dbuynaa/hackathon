import { Tag, Typography, Avatar } from '@/components';
import { IoTimeOutline } from 'react-icons/io5';
import { Notification } from '@/graphql/generated';
import dayjs from 'dayjs';

interface Props {
  newsItem?: Notification;
  onClick: () => void;
}
export const NotificationPublicItem = ({ newsItem, onClick }: Props) => {
  return (
    <div
      className="flex flex-col items-center gap-xxs cursor-pointer w-full"
      onClick={() => {
        onClick();
      }}
    >
      <div className=" flex items-center w-full">
        <Avatar
          src="/assets/images/studioSora.svg"
          className="bg-primary-600 w-[48px] h-[48px] p-xxs "
        />

        <div className="flex gap-xxs items-center justify-between w-full ml-xs2">
          <div className="flex flex-col w-full gap-xxs">
            <Typography weight="bold" base="Body" className="text-primary">
              {newsItem?.createdUser?.name || ''}
            </Typography>
            <Typography
              base="Caption"
              className="flex items-center gap-xxs text-secondary"
            >
              <IoTimeOutline className="text-subtitle2" />
              {dayjs(newsItem?.createdAt).format('YYYY.MM.DD') ||
                newsItem?.createdAt}
            </Typography>
          </div>
          {dayjs(newsItem?.createdAt).diff(dayjs(), 'days') >= -3 && (
            <Tag color={'mint'} size={'mini'} className="bg-primary text-white">
              NEW
            </Tag>
          )}
        </div>
      </div>
      <Typography
        base="Body"
        weight={
          dayjs(newsItem?.createdAt).diff(dayjs(), 'days') >= -3
            ? 'bold'
            : 'regular'
        }
        className="max-w-[342px]"
      >
        {newsItem?.title}
      </Typography>
    </div>
  );
};
