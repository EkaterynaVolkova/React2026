import './CharacterDetail.css';
import { ErrorMessage } from '@components/ErrorMessage';
import { Spinner } from '@components/Spinner';
import { Button } from '@components/Button';
import { useCharacterQuery } from '../../hooks/useCharacterQuery';
import { useOutletContext } from 'react-router';

type CharacterDetailsOutletContext = {
  characterId: number;
  onCardClose: () => void;
};

export const CharacterDetails = () => {
  const { characterId, onCardClose } =
    useOutletContext<CharacterDetailsOutletContext>();

  const {
    data: character,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useCharacterQuery(characterId);

  if (!character?.id) return null;

  return (
    <div className="details-column">
      <Button className="button close-btn" onClick={onCardClose}>
        Close
      </Button>

      {isError && (
        <ErrorMessage className="error-message">{error.message}</ErrorMessage>
      )}

      {isLoading && <Spinner />}

      {isSuccess && (
        <div className="details-card">
          <img
            src={character.image}
            alt={character.name}
            className="details-image"
          />
          <div className="details-content">
            <h3>{character.name}</h3>
            <p>
              <strong>Status:</strong> {character.status}
            </p>
            <p>
              <strong>Species:</strong> {character.species}
            </p>
            <p>
              <strong>Gender:</strong> {character.gender}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
