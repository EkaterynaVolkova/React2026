import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

export default async function AppNav() {
  const t = await getTranslations('nav');

  return (
    <nav>
      <Link href="/" className="button">
        {t('home')}
      </Link>
      <Link href="/about" className="button">
        {t('about')}
      </Link>
      <ThemeSwitcher />
    </nav>
  );
}
