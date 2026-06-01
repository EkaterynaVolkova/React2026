import type { Character, ResponseData } from '@interfaces/shared/types';
import { BASE_API_URL } from '../constants/api';

const API_RATE_LIMIT_ERROR =
  'API rate limit exceeded or network issue. Please try using a VPN or wait a little.';

export async function getCharacters(
  page: number = 1,
  name: string = '',
  signal?: AbortSignal
): Promise<ResponseData> {
  const url = `${BASE_API_URL}/api/character/?page=${page}&name=${name}`;

  try {
    const response = await fetch(url, { signal });
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (!response.ok) {
      const errorText = await response.json();
      throw new Error(errorText.error || response.statusText);
    }

    const result = await response.json();
    return result;
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      error.message.toLowerCase().includes('failed to fetch')
    ) {
      throw new Error(API_RATE_LIMIT_ERROR);
    }
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Response error: ${message}`);
  }
}

export async function getSingleCharacter(
  id: number | null,
  signal?: AbortSignal
): Promise<Character> {
  const url = `${BASE_API_URL}/api/character/${id}`;

  try {
    const response = await fetch(url, { signal });
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (!response.ok) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const errorText = await response.json();
      throw new Error(errorText.error || response.statusText);
    }

    const result = await response.json();
    return result;
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      error.message.toLowerCase().includes('failed to fetch')
    ) {
      throw new Error(API_RATE_LIMIT_ERROR);
    }
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Response error: ${message}`);
  }
}
