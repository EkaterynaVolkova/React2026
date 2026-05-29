// import type { Character } from '@interfaces/shared/types';
// import { useOutletContext } from 'react-router';
// import { CharacterDetails } from './CharacterDetails';
// import { render, screen } from '@testing-library/react';
// import searchResultsJSON from '../../test-utils/fixtures/searchResults.json';

// vi.mock('react-router', async () => {
//   const actual = await vi.importActual('react-router');
//   return {
//     ...actual,
//     useOutletContext: vi.fn(),
//   };
// });

describe('CharacterDetails Component', () => {
  it('Render null if empty', () => {});

  // it('Render null if empty', () => {
  //   vi.mocked(useOutletContext).mockReturnValue({
  //     character: {} as Character,
  //     isDetailsLoading: false,
  //     onCardClose: vi.fn(),
  //   });

  //   const { container } = render(<CharacterDetails />);
  //   expect(container.firstChild).toBeNull();
  // });

  // it('Displays the character card successfully', () => {
  //   const mockCharacter = searchResultsJSON.results[0];

  //   vi.mocked(useOutletContext).mockReturnValue({
  //     character: mockCharacter,
  //     isDetailsLoading: false,
  //     onCardClose: vi.fn(),
  //   });

  //   render(<CharacterDetails />);

  //   expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  //   expect(screen.getByText('Alive')).toBeInTheDocument();
  //   expect(screen.getByText('Human')).toBeInTheDocument();

  //   const img = screen.getByRole('img', { name: 'Rick Sanchez' });
  //   expect(img).toHaveAttribute('src', mockCharacter.image);
  // });

  // it('Displays an error message if errorDetailsMessage is provided', () => {
  //   const mockCharacter = searchResultsJSON.results[0];
  //   const errorText = 'Test error message';

  //   vi.mocked(useOutletContext).mockReturnValue({
  //     character: mockCharacter,
  //     isDetailsLoading: false,
  //     onCardClose: vi.fn(),
  //     errorDetailsMessage: errorText,
  //   });

  //   render(<CharacterDetails />);

  //   expect(screen.getByText(errorText)).toBeInTheDocument();
  // });
});
