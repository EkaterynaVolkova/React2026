import { getCharacters } from '@api/data.service';
import { useQuery } from '@tanstack/react-query';

export const useCharactersQuery = (page: number, query: string) => {
  return useQuery({
    queryKey: ['characters', page, query],
    queryFn: async ({ signal }) => getCharacters(page, query, signal),
    enabled: Boolean(page),
  });
};
