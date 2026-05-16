import { render, screen } from '@testing-library/react';
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
