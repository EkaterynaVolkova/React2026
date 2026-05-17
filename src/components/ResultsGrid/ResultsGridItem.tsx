import type { Character } from '@interfaces/shared/types';

interface ResultsGridItemProps {
  item: Character;
  onCardClick: (id: number) => void;
}

export const ResultsGridItem = (props: ResultsGridItemProps) => {
  const { item, onCardClick } = props;
  const statusClass =
    item.status === 'Alive'
      ? 'status-alive'
      : item.status === 'Dead'
        ? 'status-dead'
        : 'status-unknown';

  return (
    <a
      className="card"
      data-testid="character-card"
      onClick={() => onCardClick(item.id)}
    >
      <img src={item.image} alt={item.name} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{item.name}</h3>
        <p className="card-desc">
          {item.species} — <span className={statusClass}>{item.status}</span>
        </p>
      </div>
    </a>
  );
};
