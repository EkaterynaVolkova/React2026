import { Button } from '@components/Button';
import { SearchInput } from '@components/SearchInput';
import { Component } from 'react';

export class TopControls extends Component {
  render() {
    return (
      <div className="top-controls">
        <SearchInput />
        <Button />
      </div>
    );
  }
}
