'use client';

import { useEffect, useState } from 'react';

function useMediaQuery(query: string): boolean {
  const getMatches = (query: string): boolean => {
    // Prevents SSR issues
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState<boolean>(getMatches(query));

  function handleChange() {
    setMatches(getMatches(query));
  }

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    // Triggered at the first client-side load and if query changes
    handleChange();

    // Listen matchMedia
    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange);
    } else {
      matchMedia.addEventListener('change', handleChange);
    }

    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange);
      } else {
        matchMedia.removeEventListener('change', handleChange);
      }
    };
  }, [handleChange, query]);

  return matches;
}

export const useBreakPoint = () => {
  const queries = {
    xs: useMediaQuery('(min-width: 480px)'),
    sm: useMediaQuery('(min-width: 576px)'),
    md: useMediaQuery('(min-width: 640px)'),
    lg: useMediaQuery('(min-width: 768px)'),
    xl: useMediaQuery('(min-width: 1024px)'),
    '2xl': useMediaQuery('(min-width: 1280px)'),
  };

  return Object.entries(queries)
    .reverse()
    .find(([, val]) => val)?.[0];
};
