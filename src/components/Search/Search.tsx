import { Suspense } from 'react';
import { getCharacters, getSingleCharacter } from '@/api/data.service';
import { TopControls } from '@/components/TopControls';
import { ResultsGrid } from '@/components/ResultsGrid';
import { CharacterDetails } from '@/components/CharacterDetails';
import { Pagination } from '@/components/Pagination';
import { getTranslations } from 'next-intl/server';
import { Spinner } from '@/components/Spinner';
import { FlyoutPanel } from '@/components/FlyoutPanel';
import '@/components/Search/Search.css';
import { ErrorButton } from '@/components/ErrorButton';

interface SearchProps {
  searchParams: {
    page?: string;
    query?: string;
    q?: string;
    id?: string;
  };
}

export const Search = async ({ searchParams }: SearchProps) => {
  const currentPage = Number(searchParams.page) || 1;
  const searchQuery = searchParams.query || searchParams.q || '';
  const characterId = searchParams.id ? Number(searchParams.id) : null;

  const t = await getTranslations('search');

  let charactersData = null;
  let errorLoading = null;
  try {
    charactersData = await getCharacters(currentPage, searchQuery);
  } catch (err: unknown) {
    if (err instanceof Error) {
      errorLoading = err.message;
    } else {
      errorLoading = String(err);
    }
  }

  let selectedCharacter = null;
  if (characterId) {
    try {
      selectedCharacter = await getSingleCharacter(characterId);
    } catch (e) {
      console.error(e);
    }
  }

  const closeParams = new URLSearchParams();
  if (searchQuery) closeParams.set('query', searchQuery);
  closeParams.set('page', String(currentPage));
  const closeUrl = `/?${closeParams.toString()}`;

  return (
    <>
      <h1>{t('app_name')}</h1>

      <TopControls initialValue={searchQuery} />

      <div className="content-columns">
        <div className="main-column">
          {errorLoading && <div className="error-message">{errorLoading}</div>}

          <Suspense fallback={<Spinner />}>
            {charactersData?.results && (
              <ResultsGrid
                searchResults={charactersData.results}
                currentPage={currentPage}
                searchQuery={searchQuery}
              />
            )}
          </Suspense>

          {charactersData?.info && (
            <Pagination
              infoData={charactersData.info}
              currentPage={currentPage}
              searchParams={searchParams}
            />
          )}
        </div>

        <div className="details-panel-shell">
          {selectedCharacter ? (
            <CharacterDetails
              character={selectedCharacter}
              closeUrl={closeUrl}
            />
          ) : (
            <div className="details-empty-placeholder" />
          )}
        </div>

        <FlyoutPanel />
        <ErrorButton />
      </div>
    </>
  );
};
