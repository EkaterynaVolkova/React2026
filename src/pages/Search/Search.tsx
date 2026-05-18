import { getCharacters, getSingleCharacter } from '@api/data.service';
import { Button } from '@components/Button';
import { ErrorMessage } from '@components/ErrorMessage';
import { ResultsGrid } from '@components/ResultsGrid';
import { TopControls } from '@components/TopControls';
import type { Character, ResponseInfo } from '@interfaces/shared/types';
import { useCallback, useEffect, useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { SEARCH_QUERY_KEY } from '../../constants/storage';
import { APP_TITLE, DEFAULT_ERROR_MSG } from '../../constants/global';
import { Outlet, useSearchParams } from 'react-router';
import { Pagination } from '@components/Pagination';
import './Search.css';

const TEST_CRASH_APP_ERROR = 'I crashed!';

export const Search = () => {
  const [tasks, setTasks] = useState([] as Character[]);
  const [infoData, setInfoData] = useState({} as ResponseInfo);
  const [character, setCharacter] = useState({} as Character);
  const [isLoading, setIsLoading] = useState(false);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [shouldCrash, setShouldCrash] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorDetailsMessage, setErrorDetailsMessage] = useState('');
  const [storedQuery, setStoredQuery] = useLocalStorage(SEARCH_QUERY_KEY);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const characterId = Number(searchParams.get('id')) || null;
  const searchQuery = storedQuery || '';
  const hasPageParam = searchParams.has('page');

  useEffect(() => {
    if (!hasPageParam) {
      const nextParams = new URLSearchParams(window.location.search);
      nextParams.set('page', '1');
      setSearchParams(nextParams, { replace: true });
    }
  }, [hasPageParam, setSearchParams]);

  const loadData = useCallback(
    async (page: number, query: string, signal?: AbortSignal) => {
      setIsLoading(true);

      try {
        const tasks = await getCharacters(page, query, signal);
        if (signal?.aborted) return;

        setTasks(tasks.results);
        setInfoData(tasks.info);
        setErrorMessage('');
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : DEFAULT_ERROR_MSG;
        setErrorMessage(message);
        setTasks([]);
        setInfoData({} as ResponseInfo);
      } finally {
        if (!signal?.aborted) setIsLoading(false);
      }
    },
    []
  );

  const loadSingleCharacter = useCallback(
    async (id: number | null, signal?: AbortSignal) => {
      setIsDetailsLoading(true);

      if (!id) {
        setCharacter({} as Character);
        return;
      }

      try {
        const data = await getSingleCharacter(id, signal);
        if (signal?.aborted) return;

        setCharacter(data);
        setErrorDetailsMessage('');
      } catch (error: unknown) {
        setCharacter({} as Character);
        const message =
          error instanceof Error ? error.message : DEFAULT_ERROR_MSG;
        setErrorDetailsMessage(message);
      } finally {
        if (!signal?.aborted) setIsDetailsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      await loadData(currentPage, searchQuery, controller.signal);
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [currentPage, loadData, searchQuery]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCharacter = async () => {
      await loadSingleCharacter(characterId, controller.signal);
    };

    fetchCharacter();

    return () => {
      controller.abort();
    };
  }, [characterId, loadSingleCharacter]);

  const onSearch = async (query: string) => {
    const newQuery = query.trim();
    if (newQuery !== searchQuery) {
      setStoredQuery(newQuery);
      const nextParams = new URLSearchParams(searchParams);
      nextParams.set('page', '1');
      setSearchParams(nextParams);
    }
  };

  const onError = () => {
    setShouldCrash(true);
  };

  const onPageChange = (page: number) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('page', String(page));
    setSearchParams(nextParams);
  };

  const onCardClick = (id: number) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('id', String(id));
    setSearchParams(nextParams);
  };

  const onCardClose = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('id');
    setSearchParams(nextParams);
  };

  const onMainPanelClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const clickedCard = (e.target as HTMLElement).closest('.card');
    const clickedPagination = (e.target as HTMLElement).closest('.pagination');

    if (!clickedCard && !clickedPagination) {
      onCardClose();
    }
  };

  if (shouldCrash) {
    throw new Error(TEST_CRASH_APP_ERROR);
  }

  return (
    <>
      <h1>{APP_TITLE}</h1>

      <TopControls onSearch={onSearch} initialValue={searchQuery} />

      <div className="content-columns">
        <div className="main-column" onClick={onMainPanelClick}>
          {errorMessage && (
            <ErrorMessage className="error-message">
              {errorMessage}
            </ErrorMessage>
          )}

          {isLoading ? (
            <div className="spinner"></div>
          ) : (
            <ResultsGrid searchResults={tasks} onCardClick={onCardClick} />
          )}

          {!isLoading && (
            <Pagination
              infoData={infoData}
              onPageChange={onPageChange}
              currentPage={currentPage}
            />
          )}
        </div>

        <Outlet
          context={{
            character,
            isDetailsLoading,
            onCardClose,
            errorDetailsMessage,
          }}
        />
      </div>

      <Button className="error-button" onClick={onError}>
        !
      </Button>
    </>
  );
};
