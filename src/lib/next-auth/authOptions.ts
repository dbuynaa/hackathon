import { LoginDocument, LoginMutation } from '@/graphql/generated';
import { getClient } from '@/lib/apollo/ApolloClientRSC';
import type { NextAuthOptions } from 'next-auth';
// eslint-disable-next-line import/no-named-as-default
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          type: 'text',
        },
        password: {
          type: 'password',
        },
      },
      async authorize(credentials) {
        // This is where you need to retrieve user data
        // to verify with credentials
        // Docs: https://next-auth.js.org/configuration/providers/credentials

        const { data } = await getClient().mutate<LoginMutation>({
          mutation: LoginDocument,
          variables: {
            input: {
              email: credentials?.email,
              password: credentials?.password,
            },
          },
        });

        const user = data?.login?.user;

        if (user?.id && user?.role) {
          return {
            id: user.id,
            name: user.name,
            role: user.role,
            image: user.image,

            accessToken: data?.login?.accessToken,
            refreshToken: data?.login?.refreshToken,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
    async jwt({ token, trigger, session, user }) {
      if (user) token.id = user.id;
      if (user) token.role = user.role;

      if (user) token.image = user.image || null;

      if (user) token.accessToken = user.accessToken;
      if (user) token.refreshToken = user.refreshToken;
      if (trigger === 'update' && session) {
        // session is the data sent from the client in the update() function above
        // Note, that `session` can be any arbitrary object, remember to validate it!
        if (typeof session.user.name === 'string') {
          token.name = session.user.name || '';
        }
        if (typeof session.user.email === 'string') {
          token.email = session.user.email || '';
        }
        if (
          session.user.image === null ||
          typeof session.user.image === 'string'
        ) {
          token.image = session.user.image;
        }
      }
      return token;
    },

    // If you want to use the role in client components
    async session({ session, token }) {
      if (session.user) session.user.id = token.id;
      if (session.user) session.user.role = token.role;
      if (session.user) session.user.image = token.image;
      if (session) session.accessToken = token.accessToken;
      if (session) session.refreshToken = token.refreshToken;

      return session;
    },
  },
};
