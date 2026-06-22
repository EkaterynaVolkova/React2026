import { render, screen } from '@testing-library/react';
import { CharacterDetails } from './CharacterDetails';
import searchResultsJSON from '../../test-utils/fixtures/searchResults.json';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import { vi } from 'vitest';
import { Character } from '@/types/shared/types';

const mockRefresh = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    refresh: mockRefresh,
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock('@/i18n/routing', () => ({
  useRouter: () => ({
    refresh: mockRefresh,
  }),
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

const mockMessages = {
  character: {
    status_label: 'Status',
    species_label: 'Species',
    gender_label: 'Gender',
    close: 'Close',
    process: 'Refreshing...',
    refresh: 'Refresh',
  },
};

const mockCharacter = searchResultsJSON.results[0];

const renderComponent = (characterProp: Character = mockCharacter) => {
  return render(
    <NextIntlClientProvider locale="en" messages={mockMessages}>
      <CharacterDetails character={characterProp} closeUrl="/?page=1" />
    </NextIntlClientProvider>
  );
};

describe('CharacterDetails Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Displays the character card successfully with correct data', async () => {
    renderComponent();

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText(/Alive/i)).toBeInTheDocument();
    expect(screen.getByText(/Human/i)).toBeInTheDocument();
    expect(screen.getByText(/Male/i)).toBeInTheDocument();

    const img = screen.getByRole('img', { name: 'Rick Sanchez' });
    expect(img).toHaveAttribute('src', mockCharacter.image);
  });

  it('Triggers router refresh on Refresh button click', async () => {
    const user = userEvent.setup();
    renderComponent();

    const refreshButton = screen.getByRole('button', { name: 'Refresh' });
    await user.click(refreshButton);

    expect(mockRefresh).toHaveBeenCalledTimes(1);
  });

  it('Renders close link with correct href', () => {
    renderComponent();

    const closeLink = screen.getByRole('link', { name: 'Close' });
    expect(closeLink).toBeInTheDocument();
    expect(closeLink).toHaveAttribute('href', '/?page=1');
  });
});
