import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Component } from 'react';

interface TopControlsProps {
  onSearchInput: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export class TopControls extends Component<TopControlsProps> {
  render() {
    const { onSearchInput } = this.props;
    return (
      <form className="top-controls">
        <Input className="search-input" type="text" placeholder="Search ..." />
        <Button className="search-button" onClick={onSearchInput}>
          Search
        </Button>
      </form>
    );
  }
}
