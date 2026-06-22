import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { LangSwitcher } from '../LangSwitcher';

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
      <LangSwitcher />
    </nav>
  );
}
