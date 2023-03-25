import styled from 'styled-components';
import LoadingPokemonComponent from './loadingPokemonComponent';

type PokemonImageComponentProps = {
  loading: boolean;
  shouldShowPokemonImage: boolean;
  pokemonImageUrl: string;
};

const PokemonImageComponent: React.FC<PokemonImageComponentProps> = ({
  loading,
  pokemonImageUrl,
  shouldShowPokemonImage,
}) => {
  return (
    <WhoIsThatPokemonImageContainer>
      {loading ? (
        <LoadingPokemonComponent />
      ) : (
        <WhoIsThatPokemonImage
          data-cy="pokemon-image"
          style={{
            transition: shouldShowPokemonImage ? 'ease-in 1s' : '',
          }}
          className={shouldShowPokemonImage ? '' : 'cover'}
          src={pokemonImageUrl}
          loading="lazy"
          draggable={false}
        />
      )}
    </WhoIsThatPokemonImageContainer>
  );
};

const WhoIsThatPokemonImageContainer = styled.div`
  height: 300px;
  img {
    filter: brightness(1) drop-shadow(2px 4px 4px black);
    &.cover {
      filter: brightness(0) drop-shadow(2px 4px 4px black);
    }
  }
`;

const WhoIsThatPokemonImage = styled.img`
  max-width: 300px;
  height: 300px;
`;

export default PokemonImageComponent;
