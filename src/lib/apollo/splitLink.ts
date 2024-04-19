import { config } from '@/config';
import { HttpLink, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

export const httpLink = new HttpLink({
  uri: `${config.BACKEND_URL}/api/graphql`,
  // credentials: 'include',
  fetchOptions: { caches: 'no-store' },
});

export const splitLink = () => {
  const wsLink = new GraphQLWsLink(
    createClient({
      url: `${config.BACKEND_WS_URL}/api/graphql`,
    }),
  );

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

  return splitLink;
};
