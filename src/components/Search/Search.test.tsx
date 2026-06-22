import { render, screen } from '@testing-library/react';
import { Search } from './Search';
import { useGlobalStore } from '@/stores/useGlobalStore';
import { getCharacters, getSingleCharacter } from '@/api/data.service';
import searchResultsJSON from '../../test-utils/fixtures/searchResults.json';
import { Character } from '@/types/shared/types';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), refresh: vi.fn() }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock('@/api/data.service', () => ({
  getCharacters: vi.fn(),
  getSingleCharacter: vi.fn(),
}));

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn().mockResolvedValue((key: string) => {
    const messages: Record<string, string> = {
      app_name: 'Rick and Morty',
    };
    return messages[key] || key;
  }),
}));

vi.mock('@/components/TopControls', () => ({
  TopControls: () => <div data-testid="top-controls" />,
}));
vi.mock('@/components/ResultsGrid', () => ({
  ResultsGrid: ({ searchResults }: { searchResults: Character[] }) => (
    <div data-testid="results-grid">
      {searchResults?.map((item) => (
        <div key={item.id} data-testid="character-card">
          {item.name}
        </div>
      ))}
    </div>
  ),
}));
vi.mock('@/components/Pagination', () => ({
  Pagination: () => <div data-testid="pagination" />,
}));
vi.mock('@/components/CharacterDetails', () => ({
  CharacterDetails: ({ character }: { character: Character }) => (
    <div data-testid="character-details">{character?.name}</div>
  ),
}));
vi.mock('../FlyoutPanel', () => ({
  FlyoutPanel: () => <div data-testid="flyout-panel" />,
}));
vi.mock('../ErrorButton', () => ({
  ErrorButton: () => <div data-testid="error-button" />,
}));

const emptyResponse = {
  info: { count: 0, pages: 3, next: null, prev: null },
  results: [],
};

const renderServerComponent = async (
  searchParams: {
    page?: string | undefined;
    query?: string | undefined;
    q?: string | undefined;
    id?: string | undefined;
  } = { page: '1' }
) => {
  const SearchResolved = await Search({ searchParams });
  return render(SearchResolved);
};

describe('Search Server Component Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
    window.localStorage.clear();
    useGlobalStore.getState().reset();

    vi.mocked(getCharacters).mockResolvedValue(emptyResponse);
    vi.mocked(getSingleCharacter).mockResolvedValue(
      searchResultsJSON.results[0]
    );
  });

  describe('Server-Side Fetching Integration', () => {
    it('Calls getCharacters with correct parameters from searchParams', async () => {
      await renderServerComponent({ page: '2', query: 'Rick' });

      expect(getCharacters).toHaveBeenCalledWith(2, 'Rick');
    });

    it('Renders the results grid when API returns successful response', async () => {
      vi.mocked(getCharacters).mockResolvedValue(searchResultsJSON);

      await renderServerComponent();

      const items = await screen.findAllByTestId('character-card');
      expect(items).toHaveLength(searchResultsJSON.results.length);
    });

    it('Displays an error message on server fetch failure', async () => {
      const errorMsg = 'Rick and Morty API is down';
      vi.mocked(getCharacters).mockRejectedValue(new Error(errorMsg));

      await renderServerComponent();

      expect(screen.getByText(errorMsg)).toBeInTheDocument();
    });

    it('Fetches single character data on server if id is provided', async () => {
      const mockCharacter = searchResultsJSON.results[0];
      vi.mocked(getSingleCharacter).mockResolvedValue(mockCharacter);

      await renderServerComponent({ page: '1', id: String(mockCharacter.id) });

      expect(getSingleCharacter).toHaveBeenCalledWith(mockCharacter.id);
    });

    it('Renders an empty details placeholder when no id is selected', async () => {
      const { container } = await renderServerComponent({ page: '1', id: '' });

      const placeholder = container.querySelector('.details-empty-placeholder');
      expect(placeholder).toBeInTheDocument();
    });
  });
});
