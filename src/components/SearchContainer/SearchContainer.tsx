import { dataService } from '@api/data.service';
import { Button } from '@components/Button';
import { ErrorMessage } from '@components/ErrorMessage';
import { ResultsGrid } from '@components/ResultsGrid';
import { TopControls } from '@components/TopControls';
import type { Character } from '@interfaces/shared/types';
import { useCallback, useEffect, useState } from 'react';

export const SEARCH_QUERY_KEY = 'search_query';

export const SearchContainer = () => {
  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem(SEARCH_QUERY_KEY) ?? ''
  );
  const [tasks, setTasks] = useState([] as Character[]);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldCrash, setShouldCrash] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loadData = useCallback(async () => {
    setIsLoading(true);

    const timer = setTimeout(async () => {
      try {
        const tasks = await dataService.getCharacters(searchQuery);
        setTasks(tasks);
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : 'Something went wrong';
        setErrorMessage(message);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const onSearch = async (query: string) => {
    const newQuery = query.trim();
    if (newQuery !== searchQuery) {
      localStorage.setItem(SEARCH_QUERY_KEY, newQuery);
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
    throw new Error('I crashed!');
  }

  return (
    <div className="container">
      <h1>Rick and Morty</h1>

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
  );
};
