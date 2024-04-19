// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import {
  UserRoleEnum,
} from '@/graphql/generated';
import { DefaultSession, DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';


declare module 'next-auth' {
  interface Session {
    accessToken?: string | null;
    refreshToken?: string | null;
    user: {
      name?: string | null;
      image?: string | null;

      id: string;
      role: UserRoleEnum;
    } & DefaultSession;
  }

  interface User extends DefaultUser {
    id: string;
    name?: string | null;
    image?: string | null;

    role: RoleEnum;
    accessToken?: string | null;
    refreshToken?: string | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    role: RoleEnum;
    image: string?;

    accessToken?: string | null;
    refreshToken?: string | null;
  }
}
