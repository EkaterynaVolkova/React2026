import { Button } from '@components/Button';
import { ResultsGrid } from '@components/ResultsGrid';
import { TopControls } from '@components/TopControls';
import { Component } from 'react';

export class SearchContainer extends Component {
  render() {
    return (
      <div className="container">
        <h1>Rick and Morty</h1>
        {/* Top controls */}
        <TopControls />

        {/* Results */}
        <ResultsGrid />

        {/* Error Button */}
        <Button className="error-button">!</Button>
      </div>
    );
  }
}
