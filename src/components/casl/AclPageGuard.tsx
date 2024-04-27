'use client';

import { ReactNode, useContext } from 'react';

import { Action, Subject } from '@/lib/casl/acl';
import { Spin } from 'antd';
import { useRouter, usePathname } from 'next/navigation';
import { Routes } from '@/config/routes';
import { AbilityContext } from '@/lib/casl/AbilityProvider';
import { useSession } from 'next-auth/react';

interface AclGuardProps {
  children: ReactNode;
  authGuard?: boolean;
  guestGuard?: boolean;
  aclAbilities?: {
    action?: string;
    subject?: string;
  };
}

const AclPageGuard = (props: AclGuardProps) => {
  const {
    children,
    aclAbilities,
    guestGuard = false,
    authGuard = true,
  } = props;

  const router = useRouter();

  const { data: session } = useSession();
  const pathname = usePathname();

  const ability = useContext(AbilityContext);

  // If guest guard or no guard is true or any error page
  if (guestGuard || pathname === '/404' || pathname === '/500' || !authGuard) {
    // If user is not logged in (render pages like login, register etc..)
    return <>{children}</>;
  }

  // Check the access of current user and render pages
  if (
    ability &&
    session?.user &&
    ability.can(
      aclAbilities?.action as Action,
      aclAbilities?.subject as Subject,
    )
  ) {
    return <>{children}</>;
  }

  router.push(Routes.Landing_Home.Index.route);
  return <Spin className="layout-loading" />;
};

export default AclPageGuard;
