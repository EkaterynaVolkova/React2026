import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useGlobalStore } from '../../store/useGlobalStore';
import { ReactHookForm } from './ReactHookForm';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
      render(<ReactHookForm onSubmit={onSubmit} />);
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
      render(<ReactHookForm onSubmit={onSubmit} />);
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
      render(<ReactHookForm onSubmit={onSubmit} />);
      const nameInput = screen.getByLabelText(/name/i);
      await user.type(nameInput, 'test');
      await user.clear(nameInput);
      const errorMsg = await screen.findByText(/name cannot be empty/i);
      expect(errorMsg).toBeInTheDocument();
    });

    it('Shows error message if Name does not start with an uppercase letter', async () => {
      const user = userEvent.setup();
      render(<ReactHookForm onSubmit={onSubmit} />);

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
      render(<ReactHookForm onSubmit={vi.fn()} />);
      const termsCheckbox = screen.getByLabelText(/accept terms & conditions/i);
      expect(termsCheckbox).not.toBeChecked();
      await user.click(termsCheckbox);
      await user.click(termsCheckbox);
      const errorMsg = await screen.findByText(/you must accept the terms/i);
      expect(errorMsg).toBeInTheDocument();
    });
  });
});

describe('Successful Submission', () => {
  it('Submits valid form data and updates store', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = vi.fn();

    render(<ReactHookForm onSubmit={mockOnSubmit} />);

    const nameInput = screen.getByLabelText(/name/i);
    const ageInput = screen.getByLabelText(/age/i);
    const emailInput = screen.getByLabelText(/email/i);
    const countrySelect = screen.getByLabelText(/country/i);
    const passwordInput = screen.getByLabelText(/^password/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const genderRadio = screen.getByLabelText(/woman/i);
    const termsCheckbox = screen.getByLabelText(/accept terms & conditions/i);
    const fileInput = screen.getByLabelText(/profile picture/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    const mockFile = new File(['avatar-data'], 'avatar.png', {
      type: 'image/png',
    });

    await user.type(nameInput, 'Alex');
    await user.type(ageInput, '25');
    await user.type(emailInput, 'alex@test.com');
    await user.type(countrySelect, 'Poland');
    await user.click(genderRadio);
    await user.type(passwordInput, 'ValidPassword123!');
    await user.type(confirmPasswordInput, 'ValidPassword123!');
    await user.click(termsCheckbox);
    await user.upload(fileInput, mockFile);

    await user.click(submitButton);

    await vi.waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });

    const storeState = useGlobalStore.getState();
    expect(storeState.submissions.length).toBeGreaterThan(0);
    expect(storeState.submissions[0].name).toBe('Alex');
  });
});
