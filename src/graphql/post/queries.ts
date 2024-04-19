import { gql } from '@apollo/client';

export const POSTS = gql`
  query Posts($take: Int!, $skip: Int!) {
    posts(take: $take, skip: $skip) {
      data {
        title
      }
    }
  }
`;
