import { useOutletContext } from 'react-router';
import { CharacterDetails } from './CharacterDetails';
import { render, screen } from '@testing-library/react';
import searchResultsJSON from '../../test-utils/fixtures/searchResults.json';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCharacterQuery } from '../../hooks/useCharacterQuery';
import userEvent from '@testing-library/user-event';

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useOutletContext: vi.fn(),
  };
});

vi.mock('../../hooks/useCharacterQuery', () => ({
  useCharacterQuery: vi.fn(),
}));

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const renderComponent = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <CharacterDetails />
    </QueryClientProvider>
  );
};

describe('CharacterDetails Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();

    vi.mocked(useCharacterQuery).mockReturnValue({
      data: undefined,
      error: null,
      isFetching: false,
      isSuccess: false,
      isError: false,
    } as ReturnType<typeof useCharacterQuery>);
  });

  it('Render null if empty', () => {
    vi.mocked(useOutletContext).mockReturnValue({
      characterId: null,
      onCardClose: vi.fn(),
    });

    const { container } = renderComponent();
    expect(container.firstChild).toBeNull();
  });

  it('Displays the character card successfully', async () => {
    const mockCharacter = searchResultsJSON.results[0];

    vi.mocked(useOutletContext).mockReturnValue({
      characterId: mockCharacter.id,
      onCardClose: vi.fn(),
    });

    vi.mocked(useCharacterQuery).mockReturnValue({
      data: mockCharacter,
      error: null,
      isFetching: false,
      isSuccess: true,
      isError: false,
    } as ReturnType<typeof useCharacterQuery>);

    renderComponent();

    expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument();
    expect(await screen.findByText(/Alive/i)).toBeInTheDocument();
    expect(await screen.findByText(/Human/i)).toBeInTheDocument();

    const img = screen.getByRole('img', { name: 'Rick Sanchez' });
    expect(img).toHaveAttribute('src', mockCharacter.image);
  });

  it('Displays a Spinner while fetching', () => {
    vi.mocked(useOutletContext).mockReturnValue({
      characterId: 1,
      onCardClose: vi.fn(),
    });

    vi.mocked(useCharacterQuery).mockReturnValue({
      data: undefined,
      error: null,
      isFetching: true,
      isSuccess: false,
      isError: false,
    } as ReturnType<typeof useCharacterQuery>);

    renderComponent();

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Refreshing...' })
    ).toBeInTheDocument();
  });

  it('Displays error message on failure', () => {
    vi.mocked(useOutletContext).mockReturnValue({
      characterId: 1,
      onCardClose: vi.fn(),
    });

    vi.mocked(useCharacterQuery).mockReturnValue({
      data: undefined,
      error: new Error('Too many requests'),
      isFetching: false,
      isSuccess: false,
      isError: true,
    } as ReturnType<typeof useCharacterQuery>);

    renderComponent();

    expect(screen.getByText('Too many requests')).toBeInTheDocument();
  });

  it('Triggers query invalidation on Refresh button click', async () => {
    const mockCharacter = searchResultsJSON.results[0];
    const user = userEvent.setup();
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

    vi.mocked(useOutletContext).mockReturnValue({
      characterId: mockCharacter.id,
      onCardClose: vi.fn(),
    });

    vi.mocked(useCharacterQuery).mockReturnValue({
      data: mockCharacter,
      error: null,
      isFetching: false,
      isSuccess: true,
      isError: false,
    } as ReturnType<typeof useCharacterQuery>);

    renderComponent();

    const refreshButton = screen.getByRole('button', { name: 'Refresh' });
    await user.click(refreshButton);

    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: ['character', mockCharacter.id],
    });
  });
});
