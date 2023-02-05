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
