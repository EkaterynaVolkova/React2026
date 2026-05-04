import type { Character } from '@interfaces/shared/types';
import { Component } from 'react';
import { ResultsGridItem } from './ResultsGridItem';
import './ResultsGrid.css';

export class ResultsGrid extends Component<{ searchResults: Character[] }> {
  render() {
    const { searchResults } = this.props;

    const hasResults = searchResults.length > 0;

    if (!hasResults) return <div className="results-grid">Empty results</div>;

    return (
      <div className="results-grid-wrapper">
        {searchResults.map((item) => (
          <ResultsGridItem key={item.id} item={item} />
        ))}
      </div>
    );
  }
}
