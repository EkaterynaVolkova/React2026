import type { Character } from '@interfaces/shared/types';
import { useOutletContext } from 'react-router';
import './CharacterDetail.css';
import { ErrorMessage } from '@components/ErrorMessage';
import { Spinner } from '@components/Spinner';
import { Button } from '@components/Button';

type CharacterDetailsOutletContext = {
  character: Character;
  isDetailsLoading: boolean;
  onCardClose: () => void;
  errorDetailsMessage?: string;
};

export const CharacterDetails = () => {
  const { character, isDetailsLoading, onCardClose, errorDetailsMessage } =
    useOutletContext<CharacterDetailsOutletContext>();

  if (!character?.id && !errorDetailsMessage) return null;

  return (
    <div className="details-column">
      <Button className="button close-btn" onClick={onCardClose}>
        Close
      </Button>

      {errorDetailsMessage && (
        <ErrorMessage className="error-message">
          {errorDetailsMessage}
        </ErrorMessage>
      )}

      {isDetailsLoading ? (
        <Spinner />
      ) : (
        character?.id && (
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
        )
      )}
    </div>
  );
};
