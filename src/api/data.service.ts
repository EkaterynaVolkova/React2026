import type { Character, ResponseData } from '@interfaces/shared/types';
import { BASE_API_URL } from '../constants/api';

export async function getCharacters(
  page: number = 1,
  name: string = ''
): Promise<ResponseData> {
  const url = `${BASE_API_URL}/api/character/?page=${page}&name=${name}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Response error: ${message}`);
  }
}

export async function getSingleCharacter(id: number): Promise<Character> {
  const url = `${BASE_API_URL}/api/character/${id}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Response error: ${message}`);
  }
}
