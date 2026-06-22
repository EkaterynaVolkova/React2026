'use client';

import { Character } from '@/types/shared/types';
import { ResultsGridItem } from './ResultsGridItem';
import { Link } from '@/i18n/routing';
import './ResultsGrid.css';

interface ResultsGridProps {
  searchResults: Character[];
  currentPage: number;
  searchQuery: string;
}

export const ResultsGrid = ({
  searchResults,
  currentPage,
  searchQuery,
}: ResultsGridProps) => {
  if (searchResults.length === 0)
    return <div className="results-grid">Empty results</div>;

  return (
    <div className="results-grid-wrapper">
      {searchResults.map((item) => {
        const href = `/?page=${currentPage}${searchQuery ? `&query=${searchQuery}` : ''}&id=${item.id}`;

        return (
          <Link key={item.id} href={href} className="card-link-wrapper">
            <ResultsGridItem item={item} />
          </Link>
        );
      })}
    </div>
  );
};
