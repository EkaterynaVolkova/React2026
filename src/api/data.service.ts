import type { Character } from '@interfaces/shared/types';

class DataService {
  private baseUrl: string = 'https://rickandmortyapi.com';

  public async getCharacters(name: string = ''): Promise<Character[]> {
    const url = `${this.baseUrl}/api/character/?name=${name}`;
    const response = await fetch(url);

    if (!response.ok) return [];

    const data = await response.json();
    return data.results;
  }
}

export const dataService = new DataService();
