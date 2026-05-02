import { Component } from 'react';

interface ResultsGridProps {
  searchResults?: {
    id: number;
    image: string;
    name: string;
    species: string;
    status: string;
    type: string;
    gender: string;
    origin: {
      name: string;
      url: string;
    };
    location: {
      name: string;
      url: string;
    };
    episode: string[];
    url: string;
    created: string;
  }[];
}

export class ResultsGrid extends Component<ResultsGridProps> {
  render() {
    const { searchResults = [] } = this.props;

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
