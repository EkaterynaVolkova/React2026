'use client';

import { useQueryClient } from '@tanstack/react-query';

import { Button } from '@/components/Button';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Spinner } from '@/components/Spinner';

import './CharacterDetail.css';
import { useCharacterQuery } from '@/hooks/useCharacterQuery';
import { useCallback } from 'react';
import { useTranslations } from 'next-intl';

import Image from 'next/image';

type CharacterDetailsProps = {
  characterId: number;
  onCardClose: () => void;
};

export const CharacterDetails = ({
  characterId,
  onCardClose,
}: CharacterDetailsProps) => {
  const queryClient = useQueryClient();
  const t = useTranslations('character');

  const {
    data: character,
    error,
    isFetching,
    isSuccess,
    isError,
  } = useCharacterQuery(characterId);

  const onRefresh = useCallback(async () => {
    await queryClient.invalidateQueries({
      queryKey: ['character', characterId],
    });
  }, [queryClient, characterId]);

  if (!characterId) return null;

  const showContent = isSuccess && character;

  return (
    <div className="details-column">
      <div className="details-controls">
        <Button className="button close-btn" onClick={onCardClose}>
          {t('close')}
        </Button>
        <Button className="primary-button" onClick={onRefresh}>
          {isFetching ? t('process') : t('refresh')}
        </Button>
      </div>

      {isError && (
        <ErrorMessage className="error-message">{error.message}</ErrorMessage>
      )}

      {isFetching && <Spinner />}

      {showContent && (
        <div className="details-card">
          <Image
            src={character.image}
            alt={character.name}
            className="details-image"
            style={{ position: 'relative' }}
            width={500}
            height={500}
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
      )}
    </div>
  );
};
