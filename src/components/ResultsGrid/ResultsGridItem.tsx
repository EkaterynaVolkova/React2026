import { Character } from '@/types/shared/types';
import { toggleItem, useSelectionItems } from '../../stores/useGlobalStore';
import Image from 'next/image';

interface ResultsGridItemProps {
  item: Character;
}

export const ResultsGridItem = (props: ResultsGridItemProps) => {
  const { item } = props;
  const statusClass =
    item.status === 'Alive'
      ? 'status-alive'
      : item.status === 'Dead'
        ? 'status-dead'
        : 'status-unknown';

  const isChecked = Boolean(
    useSelectionItems().find((val) => val.id === item.id)
  );

  const onCheckboxClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const onCheckboxChange = () => {
    toggleItem(item);
  };

  return (
    <div className="card" data-testid="character-card">
      <input
        type="checkbox"
        className="card-checkbox"
        onClick={onCheckboxClick}
        onChange={onCheckboxChange}
        checked={isChecked}
      ></input>
      <Image
        src={item.image}
        alt={item.name}
        className="card-image"
        style={{ position: 'relative' }}
        width={200}
        height={200}
      />
      <div className="card-content">
        <h3 className="card-title">{item.name}</h3>
        <p className="card-desc">
          {item.species} — <span className={statusClass}>{item.status}</span>
        </p>
      </div>
    </div>
  );
};
