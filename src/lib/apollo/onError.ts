import { config } from '@/config';
import { onError } from '@apollo/client/link/error';
import { signOut } from 'next-auth/react';

export const errorLink = onError(
  ({ graphQLErrors, networkError, operation, response, forward }) => {
    console.log(
      `Error occured on operation: ${operation.operationName} with response of ${response}`,
    );
    if (graphQLErrors) {
      for (const error of graphQLErrors) {
        if (!error.extensions.code) {
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Code: NoCode, Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
          );
        } else {
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Code: ${error.extensions.code}, Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
          );
        }
        switch (error.extensions.code) {
          case 'ACCESS_TOKEN_EXPIRED': {
            signOut({ callbackUrl: `${config.WEB_URL}/` });
            return forward(operation);
          }
          case 'ACCESS_TOKEN_INVALID': {
            if (operation.operationName === 'refreshAccessToken') return;
            console.log('ACCESS_TOKEN_INVALID', error.extensions.code);
            forward(operation);
            return window.location.reload();
          }
          case 'ACCESS_TOKEN_MISSING': {
            forward(operation);
            return window.location.reload();
          }
          case 'REFRESH_TOKEN_EXPIRED': {
            signOut({ callbackUrl: `${config.WEB_URL}/` });
            return forward(operation);
          }
          case 'REFRESH_TOKEN_INVALID': {
            forward(operation);
            return window.location.reload();
          }
          case 'REFRESH_TOKEN_MISSING': {
            forward(operation);
            return window.location.reload();
          }
          case 'NOT_AUTHENTICATED': {
            signOut({ callbackUrl: `${config.WEB_URL}/` });
            return forward(operation);
          }
          default:
            graphQLErrors.map(({ message, locations, path }) => {
              console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
              );
            });
        }
      }
    }
    if (networkError) console.log(`[Network error]: ${networkError}`);
  },
);
