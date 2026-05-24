import userEvent from '@testing-library/user-event';
import { useSelectionStore } from '../../stores/selectionStore';
import type { Character } from '@interfaces/shared/types';
import { FlyoutPanel } from './FlyoutPanel';
import { render, screen, waitFor } from '@testing-library/react';

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
  useSelectionStore.getState().reset();
  window.URL.createObjectURL = vi.fn();
  window.URL.revokeObjectURL = vi.fn();
});

it('Generates CSV and sets download attributes', async () => {
  const user = userEvent.setup();

  mockCharacters.forEach((char) =>
    useSelectionStore.getState().toggleItem(char)
  );

  render(<FlyoutPanel />);

  const downloadButton = screen.getByRole('button', { name: /Download/i });
  await user.click(downloadButton);
  const downloadLink = screen.getByTestId('csv-download-link');

  await waitFor(() => {
    expect(downloadLink.getAttribute('download')).toBe('2_items.csv');
  });
});
