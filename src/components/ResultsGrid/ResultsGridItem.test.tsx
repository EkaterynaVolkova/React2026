import { render, screen } from '@testing-library/react';
import searchResultsJSON from '../../test-utils/fixtures/searchResults.json';
import type { Character } from '@interfaces/shared/types';
import { ResultsGridItem } from './ResultsGridItem';

describe('ResultsGridItem Component Tests', () => {
  describe('Rendering Tests', () => {
    it('Displays item name and description correctly', () => {
      const item = searchResultsJSON.results[0] as Character;
      render(
        <ResultsGridItem key={item.id} item={item} onCardClick={vi.fn()} />
      );
      const nameElement = screen.getByText(item.name);
      expect(nameElement).toBeInTheDocument();
      const statusElement = screen.getByText(item.status);
      expect(statusElement).toBeInTheDocument();
    });

    it('Displays item image correctly', () => {
      const item = searchResultsJSON.results[0] as Character;
      render(
        <ResultsGridItem key={item.id} item={item} onCardClick={vi.fn()} />
      );
      const imageElement = screen.getByRole('img');
      expect(imageElement).toHaveAttribute('src', item.image);
      expect(imageElement).toHaveAttribute('alt', item.name);
    });

    it('Applies "status-unknown" class for any other status', () => {
      const item = {
        ...searchResultsJSON.results[0],
        status: 'Unknown',
      } as Character;
      render(<ResultsGridItem item={item} onCardClick={vi.fn()} />);

      const statusSpan = screen.getByText(/Unknown/i);
      expect(statusSpan).toHaveClass('status-unknown');
    });
  });
});
