import { render, screen, waitFor } from '@testing-library/react';
import { SearchContainer } from './SearchContainer';
vi.mock('@api/data.service', () => ({
  dataService: {
    getCharacters: vi.fn(),
  },
}));
import searchResultsJSON from '../../test-utils/fixtures/searchResults.json';
import userEvent from '@testing-library/user-event';
import { dataService } from '@api/data.service';
import { SEARCH_QUERY_KEY } from '../../constants/storage';

describe('SearchContainer Component Tests', () => {
  describe('LocalStorage Integration', () => {
    beforeEach(() => {
      vi.clearAllMocks();
      window.localStorage.clear();
    });

    afterEach(() => {
      vi.restoreAllMocks();
      window.localStorage.clear();
    });

    it('Retrieves saved search term on component mount', () => {
      vi.mocked(dataService.getCharacters).mockResolvedValue([]);

      const text = 'Rick';
      window.localStorage.setItem(SEARCH_QUERY_KEY, JSON.stringify(text));
      render(<SearchContainer />);
      const input = screen.getByPlaceholderText(/Search/i);
      expect(input).toHaveValue(text);
    });

    it('Overwrites existing localStorage value when new search is performed', async () => {
      vi.mocked(dataService.getCharacters).mockResolvedValue([]);

      const user = userEvent.setup();
      const text = 'Morty';

      render(<SearchContainer />);

      const input = screen.getByPlaceholderText(/Search/i);
      const button = screen.getByRole('button', { name: 'Search' });
      await user.type(input, text);
      await user.click(button);

      const savedQueryRaw = window.localStorage.getItem(SEARCH_QUERY_KEY);
      const savedQuery = savedQueryRaw ? JSON.parse(savedQueryRaw) : null;
      expect(savedQuery).toBe(text.trim());
    });
  });

  describe('API Integration Tests', () => {
    beforeEach(() => {
      vi.clearAllMocks();
      window.localStorage.clear();
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('Handles API error responses', async () => {
      const errorMsg = 'Server is down';
      vi.mocked(dataService.getCharacters).mockRejectedValue(
        new Error(errorMsg)
      );

      render(<SearchContainer />);

      expect(
        await screen.findByText(new RegExp(errorMsg, 'i'))
      ).toBeInTheDocument();
    });

    it('Handles successful API responses', async () => {
      vi.mocked(dataService.getCharacters).mockResolvedValue(searchResultsJSON);

      render(<SearchContainer />);

      const items = await screen.findAllByTestId('character-card');
      expect(items).toHaveLength(searchResultsJSON.length);
    });

    it('Calls API with correct parameters', async () => {
      vi.mocked(dataService.getCharacters).mockResolvedValue([]);
      const text = 'Rick';
      window.localStorage.setItem(SEARCH_QUERY_KEY, JSON.stringify(text));

      render(<SearchContainer />);

      await waitFor(
        () => {
          expect(dataService.getCharacters).toHaveBeenCalledWith(text);
        },
        { timeout: 2000 }
      );
    });

    it('Calls API only once if search text is not changed', async () => {
      vi.mocked(dataService.getCharacters).mockResolvedValue([]);
      const text = 'Rick';
      const user = userEvent.setup();

      render(<SearchContainer />);

      await waitFor(
        () => {
          expect(dataService.getCharacters).toHaveBeenCalledTimes(1);
        },
        { timeout: 2000 }
      );

      const input = screen.getByPlaceholderText(/Search/i);
      const button = screen.getByRole('button', { name: 'Search' });
      await user.type(input, text);
      await user.click(button);
      await user.click(button);
      await user.click(button);

      await waitFor(
        () => {
          expect(dataService.getCharacters).toHaveBeenCalledTimes(2);
        },
        { timeout: 2000 }
      );
    });

    it('Handles unexpected error types', async () => {
      vi.mocked(dataService.getCharacters).mockRejectedValue(null);
      render(<SearchContainer />);
      const errorText = await screen.findByText(/something went wrong/i);
      expect(errorText).toBeInTheDocument();
    });
  });
});
