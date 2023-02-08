import { memo, useState } from 'react';
import styled, { css } from 'styled-components';
import ErrorComponent from '../../components/commons/errorComponent';
import LoadingComponent from '../../components/commons/loadingComponent';
import { useBffAction } from '../../hooks/useBffAction';
import { useBffPage } from '../../hooks/useBffPage';
import { PageTitle, PageWrapper } from '../../style/commons.style';
import { useQueryClient } from 'react-query';
// TODO: colocar essa função em outro arquivo
const checkCssAnswer = (isAnswerCorrect?: boolean, isAnswerWrong?: boolean) => {
  if (isAnswerCorrect) {
    return css`
      transition: 1s;
      background-color: green;
      background-image: none;
    `;
  }

  if (isAnswerWrong) {
    return css`
      transition: 1s;
      background-color: red;
      background-image: none;
    `;
  }

  return css``;
};

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

  const {
    mutate: checkAnswer,
    reset: resetAnswer,
    actionResponse,
  } = useBffAction<CheckAnswerResponse>('CHECK_ANSWER', {
    onSuccess: (actionResponse) => {
      if (actionResponse.data.isAnswerCorrect) {
        setShouldShowPokemonImage(true);
        setTimeout(() => {
          setLoading(true);
          queryClient.invalidateQueries('WHO_IS_THAT_POKEMON');
        }, 3000);
        return;
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

  const [loading, setLoading] = useState<boolean>(false);

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
            {/* TODO: criar loading para a imagem */}
            {loading ? (
              <div
                style={{
                  width: '300px',
                  height: '300px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '30px',
                }}
              >
                Loading...
              </div>
            ) : (
              <WhoIsThatPokemonImage
                style={{
                  transition: shouldShowPokemonImage ? 'ease-in 1s' : '',
                }}
                className={shouldShowPokemonImage ? '' : 'cover'}
                src={pokemonImageUrl}
                draggable={false}
              />
            )}
          </WhoIsThatPokemonImageContainer>

          <WhoIsThatPokemonOptionsWrapper>
            {pokemonOptions.map((pokemonOption, index) => (
              <WhoIsThatPokemonButton
                key={index}
                isAnswerCorrect={
                  actionResponse?.data.correctAnswer === pokemonOption
                }
                isAnswerWrong={
                  actionResponse?.data.wrongAnswer === pokemonOption
                }
                onClick={() => {
                  checkAnswer({
                    correctAnswer,
                    currentPoints: 10,
                    selectedAnswer: pokemonOption,
                  });
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
});

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
`;

const WhoIsThatPokemonOptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const WhoIsThatPokemonButton = styled.button<{
  isAnswerCorrect?: boolean;
  isAnswerWrong?: boolean;
}>`
  cursor: pointer;
  min-width: 150px;
  height: 30px;
  font-size: 1rem;
  text-align: center;
  background-color: #010124;
  color: #ffcb05;
  text-decoration: none;
  background-image: linear-gradient(to bottom, #010124, #002c5f, #010124);
  ${({ isAnswerCorrect, isAnswerWrong }) =>
    checkCssAnswer(isAnswerCorrect, isAnswerWrong)}

  border-radius: 9px;

  &:hover {
    background-image: linear-gradient(to bottom, #002c5f, #010124, #002c5f);
    ${({ isAnswerCorrect, isAnswerWrong }) =>
      checkCssAnswer(isAnswerCorrect, isAnswerWrong)}
  }
`;

export default WhoIsThatPokemon;
