"use client";

import { ApolloLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { errorLink } from "./onError";
import { splitLink } from "./splitLink";
import { getSession } from "next-auth/react";
import { config } from "@/config";
import { setContext } from "@apollo/client/link/context";

function makeClient() {
  const authLink = setContext(async (operation, { headers }) => {
    const session = await getSession();

    let accessType = "web-landing";
    if (window.location.pathname?.startsWith("/admin"))
      accessType = "web-admin";

    return {
      headers: {
        ...headers,
        ["access-type"]: accessType,
        ["access-client"]: "ApolloClient",
        [config.ACCESS_TOKEN_KEY]: session?.accessToken,
        [config.REFRESH_TOKEN_KEY]: session?.refreshToken,
      },
    };
  });
  const link = ApolloLink.from([authLink, errorLink, splitLink()]);

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            authLink.concat(link),
          ])
        : authLink.concat(link),
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
