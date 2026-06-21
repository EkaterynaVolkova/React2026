import { ResultsGridItem } from './ResultsGridItem';
import './ResultsGrid.css';
import { Character } from '@/types/shared/types';

interface ResultsGridProps {
  searchResults: Character[];
  onCardClick: (id: number) => void;
}

export const ResultsGrid = (props: ResultsGridProps) => {
  const { searchResults, onCardClick } = props;

  const hasResults = searchResults.length > 0;

  if (!hasResults) return <div className="results-grid">Empty results</div>;

  return (
    <div className="results-grid-wrapper">
      {searchResults.map((item) => (
        <ResultsGridItem key={item.id} item={item} onCardClick={onCardClick} />
      ))}
    </div>
  );
};
