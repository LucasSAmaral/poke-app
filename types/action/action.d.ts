type ActionType = 'CHECK_ANSWER';

type WhoIsThatPokemonActionPayload = {
  selectedAnswer: string;
  correctAnswer: string;
  currentPoints: number;
};

type ActionPayload = WhoIsThatPokemonActionPayload;

type ActionDto = {
  type: ActionType;
  payload: ActionPayload;
};
