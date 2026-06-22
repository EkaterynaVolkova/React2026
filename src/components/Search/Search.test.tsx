import { render, screen } from '@testing-library/react';
import { Search } from './Search';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useGlobalStore } from '@/stores/useGlobalStore';
import { useCharactersQuery } from '@/hooks/useCharactersQuery';
import { SEARCH_QUERY_KEY } from '@/constants/storage';
import userEvent from '@testing-library/user-event';
import { getCharacters } from '@/api/data.service';
import searchResultsJSON from '../../test-utils/fixtures/searchResults.json';
import mockRouter from 'next-router-mock';
import { NextIntlClientProvider } from 'next-intl';

vi.mock('@/api/data.service', () => ({
  getCharacters: vi.fn(),
}));

vi.mock('../../hooks/useCharactersQuery', () => ({
  useCharactersQuery: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
  usePathname: () => mockRouter.pathname,
  useSearchParams: () => new URLSearchParams(mockRouter.asPath.split('?')[1]),
}));

const emptyResponse = {
  info: { count: 0, pages: 3, next: null, prev: null },
  results: [],
};

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const mockMessages = {
  csv: {
    number: 'Number of Selected Items',
    unselect: 'Unselect all',
    download: 'Download',
  },
  search: {
    app_name: 'Rick and Morty',
    crashed: 'I crashed',
    process: 'Refreshing...',
    refresh: 'Refresh',
  },
  controls: {
    search: 'Search',
  },
  error: {
    header: 'Something went wrong. Try refreshing the page',
    placeholder: 'An unexpected error occurred',
    reload: 'Reload',
  },
};

const renderComponent = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <NextIntlClientProvider locale="en" messages={mockMessages}>
        <Search />
      </NextIntlClientProvider>
    </QueryClientProvider>
  );
};

describe('Search Component Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
    window.localStorage.clear();
    useGlobalStore.getState().reset();

    mockRouter.setCurrentUrl('/?page=1');

    vi.mocked(useCharactersQuery).mockReturnValue({
      data: emptyResponse,
      error: null,
      isFetching: false,
      isSuccess: true,
      isError: false,
    } as unknown as ReturnType<typeof useCharactersQuery>);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    window.localStorage.clear();
  });

  describe('LocalStorage Integration', () => {
    it('Retrieves saved search term on component mount', async () => {
      const text = 'Rick';
      window.localStorage.setItem(SEARCH_QUERY_KEY, JSON.stringify(text));

      vi.mocked(useCharactersQuery).mockReturnValue({
        data: emptyResponse,
        error: null,
        isFetching: false,
        isSuccess: true,
        isError: false,
      } as unknown as ReturnType<typeof useCharactersQuery>);

      renderComponent();

      const input = await screen.findByPlaceholderText(/Search/i);
      expect(input).toHaveValue(text);
      expect(useCharactersQuery).toHaveBeenCalled();
    });

    it('Overwrites existing localStorage value when new search is performed', async () => {
      const user = userEvent.setup();
      const text = 'Morty';

      renderComponent();

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
    it('Handles API error responses', async () => {
      const errorMsg = 'Server is down';
      vi.mocked(useCharactersQuery).mockReturnValue({
        data: undefined,
        error: new Error(errorMsg),
        isFetching: false,
        isSuccess: false,
        isError: true,
      } as unknown as ReturnType<typeof useCharactersQuery>);

      renderComponent();

      expect(
        await screen.findByText(new RegExp(errorMsg, 'i'))
      ).toBeInTheDocument();
    });

    it('Handles successful API responses', async () => {
      vi.mocked(useCharactersQuery).mockReturnValue({
        data: searchResultsJSON,
        error: null,
        isFetching: false,
        isSuccess: true,
        isError: false,
      } as unknown as ReturnType<typeof useCharactersQuery>);

      renderComponent();

      const items = await screen.findAllByTestId('character-card');
      expect(items).toHaveLength(searchResultsJSON.results.length);
    });

    it('Calls API with correct parameters', async () => {
      const text = 'Rick';
      window.localStorage.setItem(SEARCH_QUERY_KEY, JSON.stringify(text));

      renderComponent();

      expect(useCharactersQuery).toHaveBeenCalledWith(1, text);
    });

    it('Calls API only once if search text is not changed', async () => {
      vi.mocked(getCharacters).mockResolvedValue(emptyResponse);
      const text = 'Rick';
      const user = userEvent.setup();

      renderComponent();

      expect(useCharactersQuery).toHaveBeenCalledWith(1, '');

      const input = screen.getByPlaceholderText(/Search/i);
      const button = screen.getByRole('button', { name: 'Search' });
      await user.type(input, text);
      await user.click(button);
      await user.click(button);
      await user.click(button);

      expect(useCharactersQuery).toHaveBeenCalledWith(1, text);

      const calls = vi.mocked(useCharactersQuery).mock.calls;
      const uniqueCalls = calls.map(([page, query]) => `${page}-${query}`);
      const uniqueSets = new Set(uniqueCalls);
      expect(uniqueSets.size).toBe(2);
    });

    it('Handles unexpected error types', async () => {
      vi.mocked(useCharactersQuery).mockReturnValue({
        data: undefined,
        error: new Error('Something went wrong'),
        isFetching: false,
        isSuccess: false,
        isError: true,
      } as unknown as ReturnType<typeof useCharactersQuery>);

      renderComponent();

      const errorText = await screen.findByText(/something went wrong/i);
      expect(errorText).toBeInTheDocument();
    });
  });

  describe('Rendering Tests', () => {
    beforeEach(() => {
      vi.mocked(useCharactersQuery).mockReturnValue({
        data: searchResultsJSON,
        error: null,
        isFetching: false,
        isSuccess: true,
        isError: false,
      } as unknown as ReturnType<typeof useCharactersQuery>);
    });

    it('Handles page change when pagination button is clicked', async () => {
      const user = userEvent.setup();
      renderComponent();

      const page2Button = await screen.findByRole('button', { name: '2' });
      await user.click(page2Button);

      expect(mockRouter.query).toEqual(expect.objectContaining({ page: '2' }));
    });

    it('Handles last page change when » button is clicked', async () => {
      const user = userEvent.setup();
      renderComponent();

      const lastPageButton = await screen.findByRole('button', { name: '»' });
      await user.click(lastPageButton);

      expect(mockRouter.query).toEqual(
        expect.objectContaining({ page: String(searchResultsJSON.info.pages) })
      );
    });

    it('Handles previous page change when ‹ button is clicked', async () => {
      mockRouter.setCurrentUrl('/?page=3');

      const user = userEvent.setup();
      renderComponent();

      const prevPageButton = await screen.findByRole('button', { name: '‹' });
      await user.click(prevPageButton);

      expect(mockRouter.query).toEqual(expect.objectContaining({ page: '2' }));
    });

    it('FlyoutPanel component is visible when selected item', async () => {
      const user = userEvent.setup();

      renderComponent();

      const checkbox = await screen.findAllByRole('checkbox');
      await user.click(checkbox[0]);

      expect(
        await screen.findByText(/Number of Selected Items/i)
      ).toBeVisible();
    });

    it('FlyoutPanel component is not visible when no selected item', async () => {
      renderComponent();

      const flyoutText = screen.queryByText(/Number of Selected Items/i);
      expect(flyoutText).not.toBeInTheDocument();
    });
  });

  describe('Querying Coverage', () => {
    it('Displays a Spinner while querying characters data', () => {
      vi.mocked(useCharactersQuery).mockReturnValue({
        data: undefined,
        error: null,
        isFetching: true,
        isSuccess: false,
        isError: false,
      } as unknown as ReturnType<typeof useCharactersQuery>);

      renderComponent();

      expect(screen.getByTestId('spinner')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Refreshing...' })
      ).toBeInTheDocument();
    });

    it('Displays error message on failure', () => {
      const mockErrorText = 'Failed to fetch characters from server';

      vi.mocked(useCharactersQuery).mockReturnValue({
        data: undefined,
        error: new Error(mockErrorText),
        isFetching: false,
        isSuccess: false,
        isError: true,
      } as unknown as ReturnType<typeof useCharactersQuery>);

      renderComponent();

      expect(screen.getByText(mockErrorText)).toBeInTheDocument();
    });

    it('Triggers query invalidation on Refresh button click', async () => {
      const user = userEvent.setup();
      const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

      vi.mocked(useCharactersQuery).mockReturnValue({
        data: searchResultsJSON,
        error: null,
        isFetching: false,
        isSuccess: true,
        isError: false,
      } as unknown as ReturnType<typeof useCharactersQuery>);

      renderComponent();

      const refreshButton = screen.getByRole('button', { name: 'Refresh' });
      await user.click(refreshButton);

      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: ['characters', 1, ''],
      });
    });
  });
});
