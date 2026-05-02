import type { Character } from '@interfaces/shared/types';
import { Component } from 'react';

export class ResultsGrid extends Component<{ searchResults: Character[] }> {
  render() {
    const { searchResults } = this.props;

    const hasResults = searchResults.length > 0;

    if (!hasResults) return <div className="results-grid">Empty results</div>;

    return (
      <div className="results-grid">
        {searchResults.map((item) => {
          const statusClass =
            item.status === 'Alive'
              ? 'status-alive'
              : item.status === 'Dead'
                ? 'status-dead'
                : 'status-unknown';
          return (
            <div key={item.id} className="card">
              <img src={item.image} alt={item.name} className="card-image" />
              <div className="card-content">
                <h3 className="card-title">{item.name}</h3>
                <p className="card-desc">
                  {item.species} —{' '}
                  <span className={statusClass}>{item.status}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
