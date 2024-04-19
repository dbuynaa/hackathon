import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation LOGIN($input: LoginInput!) {
    login(input: $input) {
      user {
        id
        image
        name
        role
      }
      accessToken
      refreshToken
    }
  }
`;

export const REFRESH_ACCESS_TOKEN = gql`
  mutation refreshAccessToken {
    refreshAccessToken {
      accessToken
      refreshToken
    }
  }
`;
