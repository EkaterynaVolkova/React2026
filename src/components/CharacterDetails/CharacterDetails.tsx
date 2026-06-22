'use client';

import { Button } from '@/components/Button';
import { Character } from '@/types/shared/types';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import Link from 'next/link';
import Image from 'next/image';
import { useTransition } from 'react';
import './CharacterDetail.css';

type CharacterDetailsProps = {
  character: Character | null;
  closeUrl: string;
};

export const CharacterDetails = ({
  character,
  closeUrl,
}: CharacterDetailsProps) => {
  const t = useTranslations('character');
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  if (!character) return null;

  const onRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div className="details-column">
      <div className="details-controls">
        <Link href={closeUrl} className="button close-btn">
          {t('close')}
        </Link>

        <Button className="primary-button" onClick={onRefresh}>
          {isPending ? t('process') : t('refresh')}
        </Button>
      </div>

      <div className="details-card">
        <Image
          src={character.image}
          alt={character.name}
          className="details-image"
          style={{ position: 'relative' }}
          width={500}
          height={500}
          priority
        />
        <div className="details-content">
          <h3>{character.name}</h3>
          <p>
            <strong>{t('status_label')}:</strong> {character.status}
          </p>
          <p>
            <strong>{t('species_label')}:</strong> {character.species}
          </p>
          <p>
            <strong>{t('gender_label')}:</strong> {character.gender}
          </p>
        </div>
      </div>
    </div>
  );
};
