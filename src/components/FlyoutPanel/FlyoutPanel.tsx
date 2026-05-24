import { Button } from '@components/Button';
import { resetItems, useSelectionIds } from '../../stores/selectionStore';
import './FlyoutPanel.css';

export const FlyoutPanel = () => {
  const count = useSelectionIds().length;
  const isVisible = count > 0;

  return (
    <div
      className={`control-panel-container ${isVisible ? 'sticky' : 'hidden'}`}
    >
      <div className="control-panel container">
        <div className="counter">
          Number of Selected Items: <span>{count}</span>
        </div>
        <div className="controls">
          <Button className="primary-button" onClick={resetItems}>
            Unselect all
          </Button>
          <Button className="primary-button">Download</Button>
        </div>
      </div>
    </div>
  );
};
