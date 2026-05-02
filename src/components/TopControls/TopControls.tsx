import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Component } from 'react';

export class TopControls extends Component {
  render() {
    return (
      <div className="top-controls">
        <Input className="search-input" type="text" placeholder="Search ..." />
        <Button className="search-button">Search</Button>
      </div>
    );
  }
}
