import { memo, useState } from 'react';
import styled from 'styled-components';
import ErrorComponent from '../../components/commons/errorComponent';
import LoadingPageComponent from '../../components/commons/loadingPageComponent';
import { useBffAction } from '../../hooks/useBffAction';
import { useBffPage } from '../../hooks/useBffPage';
import { PageTitle, PageWrapper } from '../../style/commons.style';
import { useQueryClient } from 'react-query';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import PokemonImageComponent from './components/pokemonImageComponent';
import PokemonOptionsComponent from './components/pokemonOptionsComponent';

const WhoIsThatPokemon: React.FC = memo(() => {
  const { queryResponse, pageStatus } =
    useBffPage<WhoIsThatPokemonPageResponse>(
      'WHO_IS_THAT_POKEMON',
      {
        limit: '151',
      },
      {
        onSuccess: () => {
          resetAnswer();
          setShouldShowPokemonImage(false);
          setLoading(false);
        },
      }
    );

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const {
    mutate: checkAnswer,
    reset: resetAnswer,
    actionResponse,
  } = useBffAction<CheckAnswerResponse>('CHECK_ANSWER', {
    onSuccess: ({ data: { gameOver, score, isAnswerCorrect } }) => {
      Cookies.set('score', score?.toLocaleString() ?? '0');

      if (isAnswerCorrect) {
        setShouldShowPokemonImage(true);
        setTimeout(() => {
          setLoading(true);
          queryClient.invalidateQueries('WHO_IS_THAT_POKEMON');
        }, 3000);
        return;
      }

      if (gameOver) {
        navigate('/game-over');
      }

      setTimeout(() => {
        setLoading(true);
        queryClient.invalidateQueries('WHO_IS_THAT_POKEMON');
      }, 3000);
      return;
    },
  });

  const [shouldShowPokemonImage, setShouldShowPokemonImage] =
    useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);

  switch (pageStatus) {
    case 'error':
      return <ErrorComponent />;
    case 'loading':
    case 'idle':
      return <LoadingPageComponent />;
    case 'success': {
      if (!queryResponse) return null;

      const { pokemonOptions, pokemonImageUrl, correctAnswer } = queryResponse;
      return (
        <WhoIsThatPokemonWrapper>
          <WhoIsThatPokemonPageTitle>
            Who is that Pokémon?
          </WhoIsThatPokemonPageTitle>

          <WhoIsThatPokemonScore>
            Score: <span data-cy="score">{Cookies.get('score') ?? '0'}</span>
          </WhoIsThatPokemonScore>

          <PokemonImageComponent
            loading={loading}
            shouldShowPokemonImage={shouldShowPokemonImage}
            pokemonImageUrl={pokemonImageUrl}
          />

          <PokemonOptionsComponent
            loading={loading}
            pokemonOptions={pokemonOptions}
            correctAnswer={correctAnswer}
            checkAnswer={checkAnswer}
            actionResponse={actionResponse}
          />
        </WhoIsThatPokemonWrapper>
      );
    }
  }
});

const WhoIsThatPokemonWrapper = styled(PageWrapper)`
  justify-content: start;
  gap: 50px;
`;

const WhoIsThatPokemonPageTitle = styled(PageTitle)`
  margin-bottom: 0;
`;

const WhoIsThatPokemonScore = styled.h3`
  font-size: 2.5rem;
`;

export default WhoIsThatPokemon;
