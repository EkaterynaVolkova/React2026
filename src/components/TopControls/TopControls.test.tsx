import { render, screen } from '@testing-library/react';
import { TopControls } from './TopControls';
import userEvent from '@testing-library/user-event';

describe('TopControls Search Component Tests', () => {
  describe('Rendering Tests', () => {
    it('Renders search input', () => {
      render(<TopControls onSearch={vi.fn()} />);
      const input = screen.getByPlaceholderText(/Search/i);
      expect(input).toBeInTheDocument();
    });

    it('Renders search button', () => {
      render(<TopControls onSearch={vi.fn()} />);
      const input = screen.getByRole('button', { name: 'Search' });
      expect(input).toBeInTheDocument();
    });
  });

  describe('User Interaction Tests', () => {
    it('Updates input value when user types', async () => {
      const user = userEvent.setup();

      render(<TopControls onSearch={vi.fn()} />);
      const input = screen.getByPlaceholderText(/Search/i);
      const text = 'Test search text';
      await user.type(input, text);
      expect(input).toHaveValue(text);
    });
  });
});
