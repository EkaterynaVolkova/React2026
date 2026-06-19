import { getTranslations } from 'next-intl/server';
import './index.css';

export default async function Page() {
  const t = await getTranslations('about');

  return (
    <div className="about__container">
      <h1 className="title">{t('title')}</h1>
      <h2 className="subtitle">{t('subtitle')}</h2>
      <div className="info">
        <p>
          <strong>{t('role_name')}:</strong>
          {t('role_initials')}
        </p>
        <p>
          <strong>{t('role')}:</strong> {t('role_title')}
        </p>
        <p>
          <strong>GitHub:</strong>
          <a
            href="https://github.com/EkaterynaVolkova"
            target="_blank"
            rel="noopener noreferrer"
            className="button about-link"
          >
            @EkaterynaVolkova
          </a>
        </p>
      </div>

      <div className="course-info">
        <p className="desc">{t('desc')}:</p>
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noopener noreferrer"
          className="button about-link"
        >
          {t('course')}
        </a>
      </div>
    </div>
  );
}
