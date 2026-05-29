import { getCharacters } from '@api/data.service';
import { useQuery } from '@tanstack/react-query';

export const useCharactersQuery = (
  page: number,
  query: string,
  signal?: AbortSignal
) => {
  return useQuery({
    queryKey: ['characters', page, query],
    queryFn: async () => getCharacters(page, query, signal),
  });
};
