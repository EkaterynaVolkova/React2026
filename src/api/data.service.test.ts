import searchResultsJSON from '../test-utils/fixtures/searchResults.json';
import { getCharacters } from './data.service';

describe('DataService Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Returns characters on successful fetch', async () => {
    const mockCharacters = [searchResultsJSON.results[0]];

    const fetchSpy = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ results: mockCharacters }),
    });

    vi.stubGlobal('fetch', fetchSpy);

    const results = await getCharacters(1, 'Rick');

    expect(fetchSpy).toHaveBeenCalledWith(expect.stringContaining('Rick'));
    expect(results.results).toEqual(mockCharacters);
  });

  it('Throws an error when response is not ok', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      })
    );

    await expect(getCharacters(1, 'Unknown')).rejects.toThrow();
  });

  it('Uses empty string as default name parameter', async () => {
    const fetchSpy = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ results: [] }),
    });

    vi.stubGlobal('fetch', fetchSpy);

    await getCharacters();

    expect(fetchSpy).toHaveBeenCalledWith(expect.stringContaining('name='));
  });
});
