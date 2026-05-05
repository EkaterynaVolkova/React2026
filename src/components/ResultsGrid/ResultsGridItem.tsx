import type { Character } from '@interfaces/shared/types';
import { Component } from 'react';

interface Props {
  item: Character;
}

export class ResultsGridItem extends Component<Props> {
  render() {
    const { item } = this.props;

    const statusClass =
      item.status === 'Alive'
        ? 'status-alive'
        : item.status === 'Dead'
          ? 'status-dead'
          : 'status-unknown';

    return (
      <div className="card">
        <img src={item.image} alt={item.name} className="card-image" />
        <div className="card-content">
          <h3 className="card-title">{item.name}</h3>
          <p className="card-desc">
            {item.species} — <span className={statusClass}>{item.status}</span>
          </p>
        </div>
      </div>
    );
  }
}
