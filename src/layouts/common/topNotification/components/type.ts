import { Notification, NotificationReceiver } from '@/graphql/generated';

export interface NotificationPublicDataType {
  key?: Date | string;
  data?: Notification[];
}

export interface NotificationPublicType {
  current: number;
  list: NotificationPublicDataType[];
  finished: boolean;
}

export interface NotificationReceiverDataType {
  key?: Date | string;
  data?: NotificationReceiver[];
}

export interface NotificationReceiverType {
  current: number;
  list: NotificationReceiverDataType[];
  finished: boolean;
}

export interface NotificationDetailType {
  name: string;
  notifyDate: string;
  createdAt: string;
  title: string;
  text: string;
}
