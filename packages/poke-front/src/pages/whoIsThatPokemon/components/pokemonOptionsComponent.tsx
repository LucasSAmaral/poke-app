import { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import {
  checkCssAnswer,
  loadingSkeleton,
} from 'packages/poke-front/src/services/css.service';
import { UseMutateFunction } from 'react-query';
import styled from 'styled-components';

type CheckAnswer = UseMutateFunction<
  AxiosResponse<CheckAnswerResponse, WhoIsThatPokemonActionPayload>,
  any,
  WhoIsThatPokemonActionPayload,
  any
>;

type ActionResponse = AxiosResponse<
  CheckAnswerResponse,
  WhoIsThatPokemonActionPayload
>;

type PokemonOptionsComponentProps = {
  loading: boolean;
  pokemonOptions: string[];
  correctAnswer: string;
  checkAnswer: CheckAnswer;
  actionResponse?: ActionResponse;
};

const PokemonOptionsComponent: React.FC<PokemonOptionsComponentProps> = ({
  pokemonOptions,
  correctAnswer,
  loading,
  checkAnswer,
  actionResponse,
}) => {
  return (
    <WhoIsThatPokemonOptionsWrapper>
      {pokemonOptions.map((pokemonOption, index) => (
        <WhoIsThatPokemonButton
          key={index}
          data-cy={`option-${index}`}
          isAnswerCorrect={actionResponse?.data.correctAnswer === pokemonOption}
          isAnswerWrong={actionResponse?.data.wrongAnswer === pokemonOption}
          onClick={() => {
            checkAnswer({
              correctAnswer,
              currentPoints: Number(Cookies.get('score') ?? '0'),
              selectedAnswer: pokemonOption,
            });
          }}
          disabled={loading}
          loading={loading}
        >
          {pokemonOption}
        </WhoIsThatPokemonButton>
      ))}
    </WhoIsThatPokemonOptionsWrapper>
  );
};

const WhoIsThatPokemonOptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const WhoIsThatPokemonButton = styled.button<{
  loading: boolean;
  isAnswerCorrect?: boolean;
  isAnswerWrong?: boolean;
}>`
  cursor: pointer;
  min-width: 150px;
  height: 30px;
  font-size: 1rem;
  text-align: center;
  color: #ffcb05;
  text-decoration: none;
  border-radius: 9px;

  ${({ isAnswerCorrect, isAnswerWrong }) =>
    checkCssAnswer(isAnswerCorrect, isAnswerWrong)}

  ${({ loading }) => loadingSkeleton(loading)}
`;

export default PokemonOptionsComponent;
