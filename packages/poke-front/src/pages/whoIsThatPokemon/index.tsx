import styled from 'styled-components';
import { useBffPage } from '../../hooks/useBffPage';
import { PageTitle, PageWrapper } from '../../style/commons.style';

const WhoIsThatPokemon = () => {
  const { queryResponse, pageStatus } =
    useBffPage<WhoIsThatPokemonPageResponse>('WHO_IS_THAT_POKEMON', {
      limit: '151',
    });

  switch (pageStatus) {
    case 'error':
      return (
        <WhoIsThatPokemonWrapper>
          <WhoIsThatPokemonPageTitle>
            Erro ao carregar página
          </WhoIsThatPokemonPageTitle>
        </WhoIsThatPokemonWrapper>
      );
    case 'loading':
    case 'idle':
      return <WhoIsThatPokemonPageTitle>loading...</WhoIsThatPokemonPageTitle>;
    case 'success': {
      if (!queryResponse) return null;

      const { pokemonOptions, pokemonImageUrl, correctAnswer } = queryResponse;
      return (
        <WhoIsThatPokemonWrapper>
          <WhoIsThatPokemonPageTitle>
            Who is that Pokémon?
          </WhoIsThatPokemonPageTitle>

          <img src={pokemonImageUrl} draggable={false} />

          {pokemonOptions.map((pokemonOption, index) => (
            <button key={index}>{pokemonOption}</button>
          ))}
        </WhoIsThatPokemonWrapper>
      );
    }
  }
};

const WhoIsThatPokemonWrapper = styled(PageWrapper)``;

const WhoIsThatPokemonPageTitle = styled(PageTitle)``;

export default WhoIsThatPokemon;
