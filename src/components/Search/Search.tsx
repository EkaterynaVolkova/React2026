'use client';

import { SEARCH_QUERY_KEY } from '@/constants/storage';
import { useCharactersQuery } from '@/hooks/useCharactersQuery';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '../Button';
import { CharacterDetails } from '../CharacterDetails';
import { FlyoutPanel } from '../FlyoutPanel';
import { ResultsGrid } from '../ResultsGrid';
import { Spinner } from '../Spinner';
import { Pagination } from '../Pagination';
import { TopControls } from '../TopControls';
import { ErrorMessage } from '../ErrorMessage';
import { useTranslations } from 'next-intl';
import './Search.css';

export const Search = () => {
  const [shouldCrash, setShouldCrash] = useState(false);
  const [storedQuery, setStoredQuery] = useLocalStorage<string>(
    SEARCH_QUERY_KEY,
    ''
  );

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations('search');

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const currentPage = Number(searchParams.get('page')) || 1;
  const characterId = Number(searchParams.get('id')) || null;
  const searchQuery = storedQuery || '';
  const hasPageParam = searchParams.has('page');
  const queryClient = useQueryClient();

  const {
    data: charactersData,
    error,
    isFetching,
    isSuccess,
    isError,
  } = useCharactersQuery(currentPage, searchQuery);

  useEffect(() => {
    if (!hasPageParam) {
      router.push(pathname + '?' + createQueryString('page', '1'), {
        scroll: false,
      });
    }
  }, [hasPageParam, createQueryString, pathname, router]);

  const onSearch = useCallback(
    (query: string) => {
      const newQuery = query.trim();
      if (newQuery !== searchQuery) {
        setStoredQuery(newQuery);
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', '1');
        params.delete('id');
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      }
    },
    [searchQuery, searchParams, pathname, router, setStoredQuery]
  );

  const onError = useCallback(() => {
    setShouldCrash(true);
  }, []);

  const onPageChange = useCallback(
    (page: number) => {
      router.push(pathname + '?' + createQueryString('page', String(page)), {
        scroll: false,
      });
    },
    [createQueryString, pathname, router]
  );

  const onCardClick = useCallback(
    (id: number) => {
      router.push(pathname + '?' + createQueryString('id', String(id)), {
        scroll: false,
      });
    },
    [pathname, createQueryString, router]
  );

  const onCardClose = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('id');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  const onMainPanelClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const clickedCard = (e.target as HTMLElement).closest('.card');
      const clickedPagination = (e.target as HTMLElement).closest(
        '.pagination'
      );

      if (!clickedCard && !clickedPagination) {
        onCardClose();
      }
    },
    [onCardClose]
  );

  const onRefresh = useCallback(async () => {
    await queryClient.invalidateQueries({
      queryKey: ['characters', currentPage, searchQuery],
    });
  }, [queryClient, currentPage, searchQuery]);

  if (shouldCrash) {
    throw new Error(t('crashed'));
  }

  return (
    <>
      <h1>{t('app_name')}</h1>

      <TopControls onSearch={onSearch} initialValue={searchQuery} />
      <Button className="primary-button" onClick={onRefresh}>
        {isFetching ? t('process') : t('refresh')}
      </Button>

      <div className="content-columns">
        <div className="main-column" onClick={onMainPanelClick}>
          {isError && (
            <ErrorMessage className="error-message">
              {error.message}
            </ErrorMessage>
          )}
          {isFetching && <Spinner />}
          {isSuccess && !isFetching && (
            <ResultsGrid
              searchResults={charactersData?.results}
              onCardClick={onCardClick}
            />
          )}
          {isSuccess && !isFetching && (
            <Pagination
              infoData={charactersData?.info}
              onPageChange={onPageChange}
              currentPage={currentPage}
            />
          )}
        </div>

        <div className="details-panel-shell">
          {characterId ? (
            <CharacterDetails
              characterId={characterId}
              onCardClose={onCardClose}
            />
          ) : (
            <div className="details-empty-placeholder" />
          )}
        </div>
      </div>

      <FlyoutPanel />

      <Button className="error-button" onClick={onError}>
        !
      </Button>
    </>
  );
};
