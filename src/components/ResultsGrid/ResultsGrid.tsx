import type { Character } from '@interfaces/shared/types';
import { ResultsGridItem } from './ResultsGridItem';
import './ResultsGrid.css';

export const ResultsGrid = (props: { searchResults: Character[] }) => {
  const { searchResults } = props;

  const hasResults = searchResults.length > 0;

  if (!hasResults) return <div className="results-grid">Empty results</div>;

  return (
    <div className="results-grid-wrapper">
      {searchResults.map((item) => (
        <ResultsGridItem key={item.id} item={item} />
      ))}
    </div>
  );
};
