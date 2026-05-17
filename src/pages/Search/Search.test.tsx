import { render, screen, waitFor } from '@testing-library/react';
import { Search } from './Search';
vi.mock('@api/data.service', () => ({
  getCharacters: vi.fn(),
}));
import searchResultsJSON from '../../test-utils/fixtures/searchResults.json';
import userEvent from '@testing-library/user-event';
import { SEARCH_QUERY_KEY } from '../../constants/storage';
import { getCharacters } from '@api/data.service';
import { MemoryRouter, Route, Routes } from 'react-router';

const emptyResponse = {
  info: {
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  },
  results: [],
};

describe('Search Component Tests', () => {
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
      vi.mocked(getCharacters).mockResolvedValue(emptyResponse);

      const text = 'Rick';
      window.localStorage.setItem(SEARCH_QUERY_KEY, JSON.stringify(text));

      render(
        <MemoryRouter initialEntries={['/?page=1']}>
          <Routes>
            <Route path="/" element={<Search />} />
          </Routes>
        </MemoryRouter>
      );

      const input = screen.getByPlaceholderText(/Search/i);
      expect(input).toHaveValue(text);
    });

    it('Overwrites existing localStorage value when new search is performed', async () => {
      vi.mocked(getCharacters).mockResolvedValue(emptyResponse);

      const user = userEvent.setup();
      const text = 'Morty';

      render(
        <MemoryRouter initialEntries={['/?page=1']}>
          <Routes>
            <Route path="/" element={<Search />} />
          </Routes>
        </MemoryRouter>
      );

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
      vi.mocked(getCharacters).mockRejectedValue(new Error(errorMsg));

      render(
        <MemoryRouter initialEntries={['/?page=1']}>
          <Routes>
            <Route path="/" element={<Search />} />
          </Routes>
        </MemoryRouter>
      );

      expect(
        await screen.findByText(new RegExp(errorMsg, 'i'))
      ).toBeInTheDocument();
    });

    it('Handles successful API responses', async () => {
      vi.mocked(getCharacters).mockResolvedValue(searchResultsJSON);

      render(
        <MemoryRouter initialEntries={['/?page=1']}>
          <Routes>
            <Route path="/" element={<Search />} />
          </Routes>
        </MemoryRouter>
      );

      const items = await screen.findAllByTestId('character-card');
      expect(items).toHaveLength(searchResultsJSON.results.length);
    });

    it('Calls API with correct parameters', async () => {
      vi.mocked(getCharacters).mockResolvedValue(emptyResponse);
      const text = 'Rick';
      window.localStorage.setItem(SEARCH_QUERY_KEY, JSON.stringify(text));

      render(
        <MemoryRouter initialEntries={['/?page=1']}>
          <Routes>
            <Route path="/" element={<Search />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(
        () => {
          expect(getCharacters).toHaveBeenCalledWith(1, text);
        },
        { timeout: 2000 }
      );
    });

    it('Calls API only once if search text is not changed', async () => {
      vi.mocked(getCharacters).mockResolvedValue(emptyResponse);
      const text = 'Rick';
      const user = userEvent.setup();

      render(
        <MemoryRouter initialEntries={['/?page=1']}>
          <Routes>
            <Route path="/" element={<Search />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(
        () => {
          expect(getCharacters).toHaveBeenCalledTimes(1);
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
          expect(getCharacters).toHaveBeenCalledTimes(2);
        },
        { timeout: 2000 }
      );
    });

    it('Handles unexpected error types', async () => {
      vi.mocked(getCharacters).mockRejectedValue(null);
      render(
        <MemoryRouter initialEntries={['/?page=1']}>
          <Routes>
            <Route path="/" element={<Search />} />
          </Routes>
        </MemoryRouter>
      );
      const errorText = await screen.findByText(/something went wrong/i);
      expect(errorText).toBeInTheDocument();
    });
  });
});
