'use client';

import { Button } from '@/components/Button';
import { useLocale } from 'next-intl';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export const LangSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const toggleLang = () => {
    const nextLocale = locale === 'en' ? 'ru' : 'en';

    const segments = pathname.split('/');
    segments[1] = nextLocale;
    const newPathname = segments.join('/');

    const currentParams = searchParams.toString();
    const finalUrl = currentParams
      ? `${newPathname}?${currentParams}`
      : newPathname;

    router.push(finalUrl);
  };

  return (
    <div>
      <Button className="button" onClick={toggleLang}>
        <span aria-hidden="true">{locale === 'en' ? 'RU' : 'EN'}</span>
      </Button>
    </div>
  );
};
