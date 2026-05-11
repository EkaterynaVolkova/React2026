import { dataService } from './data.service';
import searchResultsJSON from '../test-utils/fixtures/searchResults.json';

describe('DataService Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Returns characters on successful fetch', async () => {
    const mockCharacters = [searchResultsJSON[0]];

    const fetchSpy = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ results: mockCharacters }),
    });

    vi.stubGlobal('fetch', fetchSpy);

    const results = await dataService.getCharacters('Rick');

    expect(fetchSpy).toHaveBeenCalledWith(expect.stringContaining('Rick'));
    expect(results).toEqual(mockCharacters);
  });

  it('Returns an empty array when response is not ok', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
      })
    );

    const results = await dataService.getCharacters('Unknown');

    expect(results).toEqual([]);
  });

  it('Uses empty string as default name parameter', async () => {
    const fetchSpy = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ results: [] }),
    });

    vi.stubGlobal('fetch', fetchSpy);

    await dataService.getCharacters();

    expect(fetchSpy).toHaveBeenCalledWith(expect.stringContaining('name='));
  });
});
