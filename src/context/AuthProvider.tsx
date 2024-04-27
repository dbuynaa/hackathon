'use client';
import React, { createContext } from 'react';
import { useMeAuthQuery } from '@/graphql/generated';
import { useSession } from 'next-auth/react';

const AuthContext = createContext(null);

export const AuthProvider = (props: React.PropsWithChildren) => {
  const { data: session, update } = useSession();

  useMeAuthQuery({
    fetchPolicy: 'no-cache',
    onCompleted: ({ meAuth: userData }) => {
      if (userData) {
        const { email, name, image, publishName, furigana } = userData;
        update({
          ...session,
          user: {
            email,
            name,
            image,
            furigana,
            publishName,
          },
        });
      }
    },
    onError: (error) => console.log(error),
  });
  return (
    <AuthContext.Provider value={null}>{props.children}</AuthContext.Provider>
  );
};
