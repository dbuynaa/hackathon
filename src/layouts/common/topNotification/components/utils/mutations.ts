import { gql } from '@apollo/client';

export const NOTIFICATION_RECEIVER_UPDATE_READ = gql`
  mutation notificationReceiverUpdateRead($id: String!) {
    notificationReceiverUpdateRead(id: $id) {
      id
    }
  }
`;
