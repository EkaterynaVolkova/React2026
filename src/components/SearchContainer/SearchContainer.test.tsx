import { render, screen } from '@testing-library/react';
import { SEARCH_QUERY_KEY, SearchContainer } from './SearchContainer';
vi.mock('@api/data.service', () => ({
  dataService: {
    getCharacters: vi.fn(),
  },
}));
import userEvent from '@testing-library/user-event';
import { dataService } from '@api/data.service';

describe('SearchContainer Component Tests', () => {
  describe('LocalStorage Integration', () => {
    beforeEach(() => {
      window.localStorage.clear();
    });

    afterEach(() => {
      vi.restoreAllMocks();
      window.localStorage.clear();
    });

    it('Retrieves saved search term on component mount', () => {
      vi.mocked(dataService.getCharacters).mockResolvedValue([]);

      const text = 'Rick';
      window.localStorage.setItem(SEARCH_QUERY_KEY, text);
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

      const savedQuery = window.localStorage.getItem(SEARCH_QUERY_KEY);
      expect(savedQuery).toBe(text.trim());
    });
  });

  describe('API Integration Tests', () => {
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
  });
});
