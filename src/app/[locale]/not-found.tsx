import { useTranslations } from 'next-intl';
import Link from 'next/link';
import '@/app/variables.css';
import '@/app/globals.css';

export default function NotFound() {
  const t = useTranslations('not_found');

  return (
    <div className="not-found-wrapper">
      <h1 className="error">404</h1>
      <h2>{t('title')}</h2>
      <p>{t('description')}</p>

      <Link href="/" className="primary-button">
        {t('go_home')}
      </Link>
    </div>
  );
}
