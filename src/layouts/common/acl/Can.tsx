'use client';

import { AbilityContext } from '@/lib/casl/AbilityProvider';
import { createContextualCan } from '@casl/react';

export const Can = createContextualCan(AbilityContext.Consumer);
