import { Button } from '@components/Button';
import './FlyoutPanel.css';
import { useRef, useState } from 'react';
import { resetItems, useSelectionItems } from '../../stores/useGlobalStore';

export const FlyoutPanel = () => {
  const [downloadUrl, setDownloadUrl] = useState('');
  const linkEl = useRef<HTMLAnchorElement>(null);
  const selectedItems = useSelectionItems();

  const count = useSelectionItems().length;
  const isVisible = count > 0;

  const handleDownload = () => {
    if (selectedItems.length === 0) return;

    const csvHeader = ['ID', 'Name', 'Gender', 'Species', 'Status'];

    const csvRows = selectedItems.map((item) => [
      item.id,
      `"${item.name}"`,
      `"${item.gender}"`,
      `"${item.species}"`,
      `"${item.status}"`,
    ]);

    const csvContent = [csvHeader, ...csvRows]
      .map((row) => row.join(';'))
      .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = URL.createObjectURL(blob);
    setDownloadUrl(link);
    setTimeout(() => {
      if (linkEl.current) {
        linkEl.current.click();
        URL.revokeObjectURL(link);
        setDownloadUrl('');
      }
    }, 0);
  };

  if (!isVisible) return null;

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
          <Button className="primary-button" onClick={handleDownload}>
            Download
          </Button>
          <a
            ref={linkEl}
            data-testid="csv-download-link"
            download={`${count}_items.csv`}
            href={downloadUrl}
            style={{ display: 'none' }}
          >
            Download
          </a>
        </div>
      </div>
    </div>
  );
};
