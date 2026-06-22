'use client';

import { Button } from '@/components/Button';
import { useTranslations } from 'next-intl';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  const t = useTranslations('error');

  return (
    <div className="container">
      <div className="boundary-error-wrap">
        <h1>{t('header')}</h1>
        <p className="error error-msg">{error.message || t('placeholder')}</p>
        <Button className="primary-button" onClick={() => reset()}>
          {t('reload')}
        </Button>
      </div>
    </div>
  );
}
