// import { render, screen, waitFor } from '@testing-library/react';
// import { Search } from './Search';
// vi.mock('@api/data.service', () => ({
//   getCharacters: vi.fn(),
// }));
// import searchResultsJSON from '../../test-utils/fixtures/searchResults.json';
// import userEvent from '@testing-library/user-event';
// import { SEARCH_QUERY_KEY } from '../../constants/storage';
// import { getCharacters } from '@api/data.service';
// import { MemoryRouter, Route, Routes } from 'react-router';
// import { useGlobalStore } from '../../stores/useGlobalStore';

describe('Search Component Tests', () => {
  it('Handles page change when pagination button is clicked', async () => {});
});

// const emptyResponse = {
//   info: {
//     count: 0,
//     pages: 0,
//     next: null,
//     prev: null,
//   },
//   results: [],
// };

// describe('Search Component Tests', () => {
//   describe('LocalStorage Integration', () => {
//     beforeEach(() => {
//       vi.clearAllMocks();
//       window.localStorage.clear();
//     });

//     afterEach(() => {
//       vi.restoreAllMocks();
//       window.localStorage.clear();
//     });

//     it('Retrieves saved search term on component mount', async () => {
//       vi.mocked(getCharacters).mockResolvedValue(emptyResponse);

//       const text = 'Rick';
//       window.localStorage.setItem(SEARCH_QUERY_KEY, JSON.stringify(text));

//       render(
//         <MemoryRouter initialEntries={['/?page=1']}>
//           <Routes>
//             <Route path="/" element={<Search />} />
//           </Routes>
//         </MemoryRouter>
//       );

//       const input = await screen.findByPlaceholderText(/Search/i);
//       expect(input).toHaveValue(text);
//       await waitFor(() => {
//         expect(getCharacters).toHaveBeenCalled();
//       });
//     });

//     it('Overwrites existing localStorage value when new search is performed', async () => {
//       vi.mocked(getCharacters).mockResolvedValue(emptyResponse);

//       const user = userEvent.setup();
//       const text = 'Morty';

//       render(
//         <MemoryRouter initialEntries={['/?page=1']}>
//           <Routes>
//             <Route path="/" element={<Search />} />
//           </Routes>
//         </MemoryRouter>
//       );

//       const input = screen.getByPlaceholderText(/Search/i);
//       const button = screen.getByRole('button', { name: 'Search' });
//       await user.type(input, text);
//       await user.click(button);

//       const savedQueryRaw = window.localStorage.getItem(SEARCH_QUERY_KEY);
//       const savedQuery = savedQueryRaw ? JSON.parse(savedQueryRaw) : null;
//       expect(savedQuery).toBe(text.trim());
//     });
//   });

//   describe('API Integration Tests', () => {
//     beforeEach(() => {
//       vi.clearAllMocks();
//       window.localStorage.clear();
//     });

//     afterEach(() => {
//       vi.restoreAllMocks();
//     });

//     it('Handles API error responses', async () => {
//       const errorMsg = 'Server is down';
//       vi.mocked(getCharacters).mockRejectedValue(new Error(errorMsg));

//       render(
//         <MemoryRouter initialEntries={['/?page=1']}>
//           <Routes>
//             <Route path="/" element={<Search />} />
//           </Routes>
//         </MemoryRouter>
//       );

//       expect(
//         await screen.findByText(new RegExp(errorMsg, 'i'))
//       ).toBeInTheDocument();
//     });

//     it('Handles successful API responses', async () => {
//       vi.mocked(getCharacters).mockResolvedValue(searchResultsJSON);

//       render(
//         <MemoryRouter initialEntries={['/?page=1']}>
//           <Routes>
//             <Route path="/" element={<Search />} />
//           </Routes>
//         </MemoryRouter>
//       );

//       const items = await screen.findAllByTestId('character-card');
//       expect(items).toHaveLength(searchResultsJSON.results.length);
//     });

//     it('Calls API with correct parameters', async () => {
//       vi.mocked(getCharacters).mockResolvedValue(emptyResponse);
//       const text = 'Rick';
//       window.localStorage.setItem(SEARCH_QUERY_KEY, JSON.stringify(text));

//       render(
//         <MemoryRouter initialEntries={['/?page=1']}>
//           <Routes>
//             <Route path="/" element={<Search />} />
//           </Routes>
//         </MemoryRouter>
//       );

//       await waitFor(
//         () => {
//           expect(getCharacters).toHaveBeenCalledWith(
//             1,
//             text,
//             expect.any(AbortSignal)
//           );
//         },
//         { timeout: 2000 }
//       );
//     });

//     it('Calls API only once if search text is not changed', async () => {
//       vi.mocked(getCharacters).mockResolvedValue(emptyResponse);
//       const text = 'Rick';
//       const user = userEvent.setup();

//       render(
//         <MemoryRouter initialEntries={['/?page=1']}>
//           <Routes>
//             <Route path="/" element={<Search />} />
//           </Routes>
//         </MemoryRouter>
//       );

//       await waitFor(
//         () => {
//           expect(getCharacters).toHaveBeenCalledTimes(1);
//         },
//         { timeout: 2000 }
//       );

//       const input = screen.getByPlaceholderText(/Search/i);
//       const button = screen.getByRole('button', { name: 'Search' });
//       await user.type(input, text);
//       await user.click(button);
//       await user.click(button);
//       await user.click(button);

//       await waitFor(
//         () => {
//           expect(getCharacters).toHaveBeenCalledTimes(2);
//         },
//         { timeout: 2000 }
//       );
//     });

//     it('Handles unexpected error types', async () => {
//       vi.mocked(getCharacters).mockRejectedValue(null);
//       render(
//         <MemoryRouter initialEntries={['/?page=1']}>
//           <Routes>
//             <Route path="/" element={<Search />} />
//           </Routes>
//         </MemoryRouter>
//       );
//       const errorText = await screen.findByText(/something went wrong/i);
//       expect(errorText).toBeInTheDocument();
//     });
//   });

//   describe('Rendering Tests', () => {
//     beforeEach(() => {
//       vi.clearAllMocks();
//       window.localStorage.clear();
//       useGlobalStore.getState().reset();
//     });

//     it('Handles page change when pagination button is clicked', async () => {
//       vi.mocked(getCharacters).mockResolvedValue(searchResultsJSON);
//       const user = userEvent.setup();

//       render(
//         <MemoryRouter initialEntries={['/?page=1']}>
//           <Routes>
//             <Route path="/" element={<Search />} />
//           </Routes>
//         </MemoryRouter>
//       );

//       const page2Button = await screen.findByRole('button', { name: '2' });
//       await user.click(page2Button);
//       expect(getCharacters).toHaveBeenCalledWith(
//         2,
//         '',
//         expect.any(AbortSignal)
//       );
//     });

//     it('Handles last page change when » button is clicked', async () => {
//       vi.mocked(getCharacters).mockResolvedValue(searchResultsJSON);
//       const user = userEvent.setup();

//       render(
//         <MemoryRouter initialEntries={['/?page=1']}>
//           <Routes>
//             <Route path="/" element={<Search />} />
//           </Routes>
//         </MemoryRouter>
//       );

//       const lastPageButton = await screen.findByRole('button', { name: '»' });
//       await user.click(lastPageButton);

//       expect(getCharacters).toHaveBeenCalledWith(
//         searchResultsJSON.info.pages,
//         '',
//         expect.any(AbortSignal)
//       );
//     });

//     it('Handles previous page change when ‹ button is clicked', async () => {
//       vi.mocked(getCharacters).mockResolvedValue(searchResultsJSON);
//       const user = userEvent.setup();

//       render(
//         <MemoryRouter initialEntries={['/?page=3']}>
//           <Routes>
//             <Route path="/" element={<Search />} />
//           </Routes>
//         </MemoryRouter>
//       );

//       const prevPageButton = await screen.findByRole('button', { name: '‹' });
//       await user.click(prevPageButton);

//       expect(getCharacters).toHaveBeenCalledWith(
//         2,
//         '',
//         expect.any(AbortSignal)
//       );
//     });

//     it('FlyoutPanel component is visible when selected item', async () => {
//       vi.mocked(getCharacters).mockResolvedValue(searchResultsJSON);
//       const user = userEvent.setup();

//       render(
//         <MemoryRouter initialEntries={['/']}>
//           <Routes>
//             <Route path="/" element={<Search />} />
//           </Routes>
//         </MemoryRouter>
//       );

//       const checkbox = await screen.findAllByRole('checkbox');
//       await user.click(checkbox[0]);

//       expect(
//         await screen.findByText(/Number of Selected Items/i)
//       ).toBeVisible();
//     });

//     it('FlyoutPanel component is not visible when no selected item', async () => {
//       vi.mocked(getCharacters).mockResolvedValue(searchResultsJSON);

//       render(
//         <MemoryRouter initialEntries={['/']}>
//           <Routes>
//             <Route path="/" element={<Search />} />
//           </Routes>
//         </MemoryRouter>
//       );

//       const flyoutText = screen.queryByText(/Number of Selected Items/i);
//       expect(flyoutText).not.toBeInTheDocument();
//     });
//   });
// });
