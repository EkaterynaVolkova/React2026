import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import { SearchContainer } from '@components/SearchContainer';

describe('Main App Component Tests', () => {
  describe('ErrorBoundary', () => {
    it('Displays fallback UI when error occurs', () => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const renderSpy = vi
        .spyOn(SearchContainer.prototype, 'render')
        .mockImplementation(() => {
          throw new Error('Test Crash');
        });

      render(<App />);

      const errorText = screen.getByText(/Something went wrong/i);
      expect(errorText).toBeInTheDocument();
      const reloadButton = screen.getByRole('button', { name: 'Reload' });
      expect(reloadButton).toBeInTheDocument();

      renderSpy.mockRestore();
      spy.mockRestore();
    });

    it('Error Button throws error when test button is clicked', async () => {
      const user = userEvent.setup();
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
      render(<App />);

      const errorButton = await screen.findByRole('button', { name: '!' });
      await user.click(errorButton);

      const errorText = await screen.findByText(/Something went wrong/i);
      expect(errorText).toBeInTheDocument();

      spy.mockRestore();
    });

    it('Recovers from error when Reload button is clicked', async () => {
      const user = userEvent.setup();
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
      render(<App />);

      const errorButton = await screen.findByRole('button', { name: '!' });
      await user.click(errorButton);

      const reloadButton = screen.getByRole('button', { name: 'Reload' });
      expect(reloadButton).toBeInTheDocument();

      await user.click(reloadButton);

      const errorText = screen.queryByText(/Something went wrong/i);
      expect(errorText).not.toBeInTheDocument();

      spy.mockRestore();
    });

    it('Logs error to console', () => {
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      vi.spyOn(SearchContainer.prototype, 'render').mockImplementation(() => {
        throw new Error('Test Crash');
      });

      render(<App />);

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
});
