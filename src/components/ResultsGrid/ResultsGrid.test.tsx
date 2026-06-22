import { render, screen } from '@testing-library/react';
import { ResultsGrid } from './ResultsGrid';
import searchResultsJSON from '../../test-utils/fixtures/searchResults.json';
import { Character } from '@/types/shared/types';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), refresh: vi.fn() }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock('@/i18n/routing', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), refresh: vi.fn() }),
}));

vi.mock('./ResultsGridItem', () => ({
  ResultsGridItem: ({ item }: { item: Character }) => (
    <div data-testid="character-card">{item.name}</div>
  ),
}));

describe('ResultsGrid Component Tests', () => {
  describe('Rendering Tests', () => {
    it('Renders correct number of items when data is provided', () => {
      const searchResults = searchResultsJSON.results as Character[];
      render(
        <ResultsGrid
          searchResults={searchResults}
          currentPage={0}
          searchQuery={''}
        />
      );
      const items = screen.getAllByTestId('character-card');
      expect(items).toHaveLength(searchResults.length);
    });

    it('Displays "no results" message when data array is empty', () => {
      render(
        <ResultsGrid searchResults={[]} currentPage={0} searchQuery={''} />
      );
      const noResultsText = screen.getByText('Empty results');
      expect(noResultsText).toBeInTheDocument();
    });
  });
});
