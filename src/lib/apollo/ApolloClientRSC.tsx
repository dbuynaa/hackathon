import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';

import { errorLink } from './onError';
import { splitLink } from './splitLink';

import { cookies } from 'next/dist/client/components/headers';
import { config } from '@/config';

const authLink = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const cookiesStore = cookies();

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      [config.ACCESS_TOKEN_KEY]:
        cookiesStore.get(config.ACCESS_TOKEN_KEY)?.value || '',
      [config.REFRESH_TOKEN_KEY]:
        cookiesStore.get(config.REFRESH_TOKEN_KEY)?.value || '',
      ['access-type']: cookiesStore.get('access-type')?.value || '',
      ['access-client']: 'ApolloClientRSC',
    },
  }));

  return forward(operation);
});

export const { getClient } = registerApolloClient(() => {
  const link = ApolloLink.from([authLink, errorLink, splitLink()]);
  const apolloClient = new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link:
      typeof window !== 'undefined'
        ? ApolloLink.from([authLink, errorLink, splitLink()])
        : authLink.concat(link),
    cache: new InMemoryCache(),
  });

  return apolloClient;
});
