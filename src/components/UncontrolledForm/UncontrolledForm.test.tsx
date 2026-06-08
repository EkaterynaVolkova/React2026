import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useGlobalStore } from '../../store/useGlobalStore';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UncontrolledForm } from './UncontrolledForm';

const initialStoreState = useGlobalStore.getState();

describe('Controlled Form Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
    window.localStorage.clear();
    useGlobalStore.setState(initialStoreState, true);
  });

  describe('Rendering & Initial State', () => {
    const onSubmit = vi.fn();
    it('Renders all required input fields and submit button', () => {
      render(<UncontrolledForm onSubmit={onSubmit} />);
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/profile picture/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/woman/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getAllByLabelText(/password/i)).toHaveLength(2);
      expect(
        screen.getByLabelText(/accept terms & conditions/i)
      ).toBeInTheDocument();
    });

    it('Displays default empty values on initial mount', () => {
      render(<UncontrolledForm onSubmit={onSubmit} />);
      expect(screen.getByLabelText(/name/i)).toHaveValue('');
      expect(screen.getByLabelText(/email/i)).toHaveValue('');
      expect(screen.getByLabelText(/age/i)).toHaveValue(null);
      expect(screen.getByLabelText(/country/i)).toHaveValue('');
      expect(screen.getByLabelText(/email/i)).toHaveValue('');
      expect(
        screen.getByLabelText(/accept terms & conditions/i)
      ).not.toBeChecked();
    });
  });

  describe('Validation Tests', () => {
    const onSubmit = vi.fn();
    it('Shows error message when Name field is empty on blur/submit', async () => {
      const user = userEvent.setup();
      render(<UncontrolledForm onSubmit={onSubmit} />);
      const submitButton = screen.getByRole('button', { name: /submit/i });
      await user.click(submitButton);
      const errorMsg = await screen.findByText(/name cannot be empty/i);
      expect(errorMsg).toBeInTheDocument();
    });

    it('Shows error message if Name does not start with an uppercase letter', async () => {
      const user = userEvent.setup();
      render(<UncontrolledForm onSubmit={onSubmit} />);

      const nameInput = screen.getByLabelText(/name/i);
      const submitButton = screen.getByRole('button', { name: /submit/i });

      await user.type(nameInput, 'alex');
      await user.click(submitButton);

      const errorMsg = await screen.findByText(
        /first letter must be uppercase/i
      );
      expect(errorMsg).toBeInTheDocument();
    });

    it('Shows validation error when Terms checkbox is not checked', async () => {
      const user = userEvent.setup();
      render(<UncontrolledForm onSubmit={vi.fn()} />);
      const termsCheckbox = screen.getByLabelText(/accept terms & conditions/i);
      expect(termsCheckbox).not.toBeChecked();
      const submitButton = screen.getByRole('button', { name: /submit/i });
      await user.click(submitButton);
      const errorMsg = await screen.findByText(/you must accept the terms/i);
      expect(errorMsg).toBeInTheDocument();
    });
  });
});
