// ** React Imports
import { AbilityContext } from '@/lib/casl/AbilityProvider';
import { useContext } from 'react';
import { NavGroup, NavLink, NavSectionTitle } from '@/layouts/types';

// ** Component Imports

interface Props {
  navLink: NavLink | NavGroup | NavSectionTitle;
}

export const CanViewNavLink = (props: Props) => {
  // ** Props
  const navLink = props.navLink;
  // ** Hook
  const ability = useContext(AbilityContext);
  if (navLink && navLink?.auth === false) {
    return { ...navLink };
  } else {
    return ability &&
      navLink?.action &&
      navLink?.subject &&
      ability.can(navLink?.action, navLink?.subject)
      ? { ...navLink }
      : null;
  }
};
