import userEvent from '@testing-library/user-event';
import { FlyoutPanel } from './FlyoutPanel';
import { render, screen, waitFor } from '@testing-library/react';
import { useGlobalStore } from '../../stores/useGlobalStore';
import { Character } from '@/types/shared/types';
import { NextIntlClientProvider } from 'next-intl';

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

const mockMessages = {
  csv: {
    number: 'Number of Selected Items',
    unselect: 'Unselect all',
    download: 'Download',
  },
};

const mockCharacters = [
  {
    id: 1,
    name: 'Rick',
    gender: 'Male',
    species: 'Human',
    status: 'Alive',
  } as unknown as Character,
  {
    id: 2,
    name: 'Morty',
    gender: 'Male',
    species: 'Human',
    status: 'Alive',
  } as unknown as Character,
];

beforeEach(() => {
  localStorage.clear();
  useGlobalStore.getState().reset();
  window.URL.createObjectURL = vi.fn();
  window.URL.revokeObjectURL = vi.fn();
});

it('Generates CSV and sets download attributes', async () => {
  const user = userEvent.setup();

  mockCharacters.forEach((char) => useGlobalStore.getState().toggleItem(char));

  render(
    <NextIntlClientProvider locale="en" messages={mockMessages}>
      <FlyoutPanel />
    </NextIntlClientProvider>
  );

  const downloadButton = screen.getByRole('button', { name: /Download/i });
  await user.click(downloadButton);
  const downloadLink = screen.getByTestId('csv-download-link');

  await waitFor(() => {
    expect(downloadLink.getAttribute('download')).toBe('2_items.csv');
  });
});
