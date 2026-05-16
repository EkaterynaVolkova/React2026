import { dataService } from '@api/data.service';
import { Button } from '@components/Button';
import { ErrorMessage } from '@components/ErrorMessage';
import { ResultsGrid } from '@components/ResultsGrid';
import { TopControls } from '@components/TopControls';
import type { Character } from '@interfaces/shared/types';
import { useCallback, useEffect, useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { SEARCH_QUERY_KEY } from '../../constants/storage';
import { APP_TITLE, DEFAULT_ERROR_MSG } from '../../constants/global';
import { Outlet } from 'react-router';

const TEST_CRASH_APP_ERROR = 'I crashed!';

export const SearchContainer = () => {
  const [tasks, setTasks] = useState([] as Character[]);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldCrash, setShouldCrash] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchQuery, setSearchQuery] = useLocalStorage(SEARCH_QUERY_KEY);

  const loadData = useCallback(async () => {
    setIsLoading(true);

    try {
      const tasks = await dataService.getCharacters(searchQuery);
      setTasks(tasks);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : DEFAULT_ERROR_MSG;
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);

  const onSearch = async (query: string) => {
    const newQuery = query.trim();
    if (newQuery !== searchQuery) {
      setSearchQuery(newQuery);
    }
  };

  const onError = () => {
    setShouldCrash(true);
  };

  useEffect(() => {
    const runLoad = async () => {
      return await loadData();
    };

    runLoad();
  }, [loadData]);

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
