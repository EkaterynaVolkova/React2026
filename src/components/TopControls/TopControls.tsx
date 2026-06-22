'use client';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useLocale, useTranslations } from 'next-intl';
import './TopControls.css';
import { handleSearchAction } from '@/app/actions';

interface TopControlsProps {
  initialValue?: string;
}

export const TopControls = (props: TopControlsProps) => {
  const { initialValue } = props;
  const t = useTranslations('controls');
  const locale = useLocale();

  return (
    <form className="top-controls" action={handleSearchAction}>
      <Input type="hidden" name="locale" value={locale} />
      <Input
        className="search-input"
        name="search-input"
        type="text"
        placeholder={t('search')}
        value={initialValue}
      />
      <Button className="primary-button">{t('search')}</Button>
    </form>
  );
};
