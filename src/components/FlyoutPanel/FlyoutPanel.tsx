'use client';

import { Button } from '@/components/Button';
import './FlyoutPanel.css';
import { useActionState, useEffect, useRef } from 'react';
import { resetItems, useSelectionItems } from '../../stores/useGlobalStore';
import { useTranslations } from 'next-intl';
import { compileCsv } from '@/app/actions';

export const FlyoutPanel = () => {
  const linkEl = useRef<HTMLAnchorElement>(null);
  const selectedItems = useSelectionItems();
  const t = useTranslations('csv');

  const count = useSelectionItems().length;
  const isVisible = count > 0;

  const [csvContent, formAction] = useActionState(compileCsv, null);

  useEffect(() => {
    if (csvContent) {
      const blob = new Blob(['\uFEFF' + csvContent], {
        type: 'text/csv;charset=utf-8;',
      });
      const url = URL.createObjectURL(blob);

      if (linkEl.current) {
        linkEl.current.href = url;
        linkEl.current.click();
        URL.revokeObjectURL(url);
      }
    }
  }, [csvContent]);

  if (!isVisible) return null;

  return (
    <form
      action={formAction}
      className={`control-panel-container ${isVisible ? 'sticky' : 'hidden'}`}
    >
      <div className="control-panel container">
        <div className="counter">
          {t('number')}: <span>{count}</span>
        </div>
        <div className="controls">
          <Button className="primary-button" onClick={resetItems}>
            {t('unselect')}
          </Button>

          <Button className="primary-button">{t('download')}</Button>
          <input
            type="hidden"
            name="selectedItems"
            value={JSON.stringify(selectedItems)}
          />
          <a
            ref={linkEl}
            data-testid="csv-download-link"
            download={`${count}_items.csv`}
            style={{ display: 'none' }}
          >
            {t('download')}
          </a>
        </div>
      </div>
    </form>
  );
};
