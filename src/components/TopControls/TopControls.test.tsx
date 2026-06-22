import { render, screen } from '@testing-library/react';
import { TopControls } from './TopControls';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';

const mockMessages = {
  controls: {
    search: 'Search',
  },
};

const renderComponent = () => {
  return render(
    <NextIntlClientProvider locale="en" messages={mockMessages}>
      <TopControls onSearch={vi.fn()} />
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
