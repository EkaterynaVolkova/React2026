'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '../Button';

export const ErrorButton = () => {
  const [shouldCrash, setShouldCrash] = useState(false);
  const t = useTranslations('search');

  if (shouldCrash) {
    throw new Error(t('crashed'));
  }

  return (
    <Button className="error-button" onClick={() => setShouldCrash(true)}>
      !
    </Button>
  );
};
