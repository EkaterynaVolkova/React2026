import { getSingleCharacter } from '@api/data.service';
import { useQuery } from '@tanstack/react-query';

export const useCharacterQuery = (id: number | null, signal?: AbortSignal) => {
  return useQuery({
    queryKey: ['character', id],
    queryFn: async () => getSingleCharacter(id, signal),
  });
};
