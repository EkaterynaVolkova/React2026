import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Modal } from './Modal';
import userEvent from '@testing-library/user-event';

describe('Modal Component', () => {
  const handleCloseMock = vi.fn();

  beforeEach(() => {
    handleCloseMock.mockClear();
  });

  describe('Visibility Toggle', () => {
    it('Does not render modal content when isOpen is false', () => {
      render(<Modal isOpen={false} handleClose={handleCloseMock} />);
      const modal = screen.queryByTestId('modal');
      expect(modal).not.toBeInTheDocument();
    });

    it('Renders modal and overlays correctly when isOpen is true', () => {
      render(<Modal isOpen={true} handleClose={handleCloseMock} />);
      const modal = screen.getByTestId('modal');
      expect(modal).toBeInTheDocument();
    });

    it('Triggers onClose callback when close button or overlay is clicked', async () => {
      const handleCloseMock = vi.fn();
      const user = userEvent.setup();
      render(<Modal isOpen={true} handleClose={handleCloseMock} />);
      const overlay = screen.getByTestId('modal');
      await user.click(overlay);
      expect(handleCloseMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    const handleCloseMock = vi.fn();
    beforeEach(() => {
      handleCloseMock.mockClear();
    });

    it('Closes the modal when pressing the Escape key', async () => {
      const user = userEvent.setup();
      render(<Modal isOpen={true} handleClose={handleCloseMock} />);
      await user.keyboard('{Escape}');
      expect(handleCloseMock).toHaveBeenCalledTimes(1);
    });
  });
});
