import { render, screen } from '@testing-library/react';
import { ResultsGrid } from './ResultsGrid';
import searchResultsJSON from '../../test-utils/fixtures/searchResults.json';
import type { Character } from '@interfaces/shared/types';

describe('ResultsGrid Component Tests', () => {
  describe('Rendering Tests', () => {
    it('Renders correct number of items when data is provided', () => {
      const searchResults = searchResultsJSON as Character[];
      render(<ResultsGrid searchResults={searchResults} />);
      const items = screen.getAllByTestId('character-card');
      expect(items).toHaveLength(searchResults.length);
    });

    it('Displays "no results" message when data array is empty', () => {
      render(<ResultsGrid searchResults={[]} />);
      const noResultsText = screen.getByText('Empty results');
      expect(noResultsText).toBeInTheDocument();
    });
  });
});
