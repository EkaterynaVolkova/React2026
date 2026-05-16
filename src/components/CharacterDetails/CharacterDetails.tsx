import { useSearchParams } from 'react-router';

export const CharacterDetails = () => {
  const [searchParams] = useSearchParams();
  const characterId = searchParams.get('id');
  return <div>{characterId}</div>;
};
