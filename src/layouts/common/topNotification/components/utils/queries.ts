import { gql } from '@apollo/client';

export const NOTIFICATIONS_PUBLIC = gql`
  query notificationsPublic($take: Int!, $skip: Int!, $orderBy: String) {
    notificationsPublic(take: $take, skip: $skip, orderBy: $orderBy) {
      data {
        title
        text
        id
        notifyDate
        createdAt
        createdUser {
          image
          name
          id
          email
        }
        notificationReceivers {
          id
        }
      }
      count
    }
  }
`;

export const NOTIFICATIONS_RECEIVE = gql`
  query notificationsReceive($skip: Int!, $take: Int!) {
    notificationsReceive(skip: $skip, take: $take) {
      data {
        id
        viewAt
        readAt
        notification {
          title
          text
          id
          notifyDate
          createdAt
          createdUser {
            image
            name
            id
            email
          }
          notificationReceivers {
            id
          }
        }
        notificationId
      }
      count
      countUnRead
    }
  }
`;
