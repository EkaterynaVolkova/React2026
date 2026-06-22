import { render, screen } from '@testing-library/react';
import { TopControls } from './TopControls';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), refresh: vi.fn() }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock('@/i18n/routing', () => ({
  redirect: vi.fn(),
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), refresh: vi.fn() }),
  usePathname: () => '/',
}));

vi.mock('@/actions', () => ({
  handleSearchAction: vi.fn(),
}));

const mockMessages = {
  controls: {
    search: 'Search',
  },
};

const renderComponent = () => {
  return render(
    <NextIntlClientProvider locale="en" messages={mockMessages}>
      <TopControls />
    </NextIntlClientProvider>
  );
};

describe('TopControls Search Component Tests', () => {
  describe('Rendering Tests', () => {
    it('Renders search input', () => {
      renderComponent();
      const input = screen.getByPlaceholderText(/Search/i);
      expect(input).toBeInTheDocument();
    });

    it('Renders search button', () => {
      renderComponent();
      const button = screen.getByRole('button', { name: 'Search' });
      expect(button).toBeInTheDocument();
    });
  });

  describe('User Interaction Tests', () => {
    it('Updates input value when user types', async () => {
      const user = userEvent.setup();

      renderComponent();
      const input = screen.getByPlaceholderText(/Search/i);
      const text = 'Test search text';
      await user.type(input, text);
      expect(input).toHaveValue(text);
    });
  });
});
