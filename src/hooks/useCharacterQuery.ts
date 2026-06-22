import { getSingleCharacter } from '@/api/data.service';
import { useQuery } from '@tanstack/react-query';

export const useCharacterQuery = (id: number) => {
  return useQuery({
    queryKey: ['character', id],
    queryFn: async ({ signal }) => getSingleCharacter(id, signal),
    enabled: Boolean(id),
  });
};
