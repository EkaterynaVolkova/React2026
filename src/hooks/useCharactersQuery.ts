import { getCharacters } from '@api/data.service';
import { useQuery } from '@tanstack/react-query';
import { CACHE_TTL } from '../constants/global';

export const useCharactersQuery = (
  page: number,
  query: string,
  signal?: AbortSignal
) => {
  return useQuery({
    queryKey: ['characters', page, query],
    queryFn: async () => getCharacters(page, query, signal),
    staleTime: CACHE_TTL,
    gcTime: CACHE_TTL * 2,
  });
};
