import { gql } from '@apollo/client';

export const ME_AUTH = gql`
  query meAuth {
    meAuth {
      id
      image
      name
      role
    }
  }
`;
