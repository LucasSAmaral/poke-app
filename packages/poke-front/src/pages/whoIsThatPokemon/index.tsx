import { useState } from 'react';
import styled from 'styled-components';
import ErrorComponent from '../../components/commons/errorComponent';
import LoadingComponent from '../../components/commons/loadingComponent';
import { useBffPage } from '../../hooks/useBffPage';
import { PageTitle, PageWrapper } from '../../style/commons.style';

const WhoIsThatPokemon: React.FC = () => {
  const { queryResponse, pageStatus } =
    useBffPage<WhoIsThatPokemonPageResponse>('WHO_IS_THAT_POKEMON', {
      limit: '151',
    });

  // TODO: retornar se pode mostrar a imagem do bff
  const [shouldShowPokemonImage, setShouldShowPokemonImage] =
    useState<boolean>(false);

  switch (pageStatus) {
    case 'error':
      return <ErrorComponent />;
    case 'loading':
    case 'idle':
      return <LoadingComponent />;
    case 'success': {
      if (!queryResponse) return null;

      const { pokemonOptions, pokemonImageUrl, correctAnswer } = queryResponse;
      return (
        <WhoIsThatPokemonWrapper>
          <WhoIsThatPokemonPageTitle>
            Who is that Pokémon?
          </WhoIsThatPokemonPageTitle>

          <WhoIsThatPokemonImageContainer>
            <WhoIsThatPokemonImage
              className={shouldShowPokemonImage ? '' : 'cover'}
              src={pokemonImageUrl}
              draggable={false}
            />
          </WhoIsThatPokemonImageContainer>

          <WhoIsThatPokemonOptionsWrapper>
            {pokemonOptions.map((pokemonOption, index) => (
              <WhoIsThatPokemonButton
                key={index}
                onClick={() => {
                  if (correctAnswer === pokemonOption) {
                    setShouldShowPokemonImage(true);
                  }
                }}
              >
                {pokemonOption}
              </WhoIsThatPokemonButton>
            ))}
          </WhoIsThatPokemonOptionsWrapper>
        </WhoIsThatPokemonWrapper>
      );
    }
  }
};

const WhoIsThatPokemonWrapper = styled(PageWrapper)`
  justify-content: start;
  gap: 50px;
`;

const WhoIsThatPokemonPageTitle = styled(PageTitle)`
  margin-bottom: 0;
`;

const WhoIsThatPokemonImageContainer = styled.div`
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
  transition: 1s;
`;

const WhoIsThatPokemonOptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const WhoIsThatPokemonButton = styled.button`
  cursor: pointer;
  min-width: 150px;
  height: 30px;
  font-size: 1rem;
  text-align: center;
  background-color: #010124;
  color: #ffcb05;
  text-decoration: none;
  background-image: linear-gradient(to bottom, #010124, #002c5f, #010124);
  border-radius: 9px;

  &:hover {
    background-image: linear-gradient(to bottom, #002c5f, #010124, #002c5f);
  }
`;

export default WhoIsThatPokemon;
