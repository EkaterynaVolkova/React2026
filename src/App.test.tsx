import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import { ErrorBoundary } from '@components/ErrorBoundary';

function ThrowError({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error('Component error!');
  }
  return <div>Component working fine</div>;
}

describe('Main App Component Tests', () => {
  describe('ErrorBoundary', () => {
    it('Displays fallback UI when error occurs', async () => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.queryByText(/Something went wrong/i)).toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: 'Reload' })
      ).toBeInTheDocument();

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

      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
});
