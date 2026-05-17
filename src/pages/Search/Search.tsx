import { getCharacters } from '@api/data.service';
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

const TEST_CRASH_APP_ERROR = 'I crashed!';

export const Search = () => {
  const [tasks, setTasks] = useState([] as Character[]);
  const [infoData, setInfoData] = useState({} as ResponseInfo);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldCrash, setShouldCrash] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [storedQuery, setStoredQuery] = useLocalStorage(SEARCH_QUERY_KEY);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const searchQuery = searchParams.get('query') || storedQuery || '';

  useEffect(() => {
    if (!searchParams.has('page')) {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.set('page', '1');
      setSearchParams(nextParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const loadData = useCallback(async (page: number, query: string) => {
    setIsLoading(true);

    try {
      const tasks = await getCharacters(page, query);
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
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await loadData(currentPage, searchQuery);
    };

    fetchData();
  }, [currentPage, loadData, searchQuery]);

  const onSearch = async (query: string) => {
    const newQuery = query.trim();
    console.log(newQuery);
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

  if (shouldCrash) {
    throw new Error(TEST_CRASH_APP_ERROR);
  }

  return (
    <>
      <div className="main-column">
        <h1>{APP_TITLE}</h1>

        <TopControls onSearch={onSearch} initialValue={searchQuery} />

        {errorMessage && (
          <ErrorMessage className="error-message">{errorMessage}</ErrorMessage>
        )}

        {isLoading ? (
          <div id="spinner" className="spinner"></div>
        ) : (
          <ResultsGrid searchResults={tasks} />
        )}

        {isLoading || (
          <Pagination
            infoData={infoData}
            onPageChange={onPageChange}
            currentPage={currentPage}
          />
        )}

        <Button className="error-button" onClick={onError}>
          !
        </Button>
      </div>
      <div className="details-column">
        <Outlet />
      </div>
    </>
  );
};
