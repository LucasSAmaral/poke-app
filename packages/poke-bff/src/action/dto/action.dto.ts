type ActionType = 'CHECK_ANSWER';

export type WhoIsThatPokemonActionPayload = {
  selectedAnswer: string;
  correctAnswer: string;
  currentPoints: number;
};

type ActionPayload = WhoIsThatPokemonActionPayload;

export type ActionDto = {
  type: ActionType;
  payload: ActionPayload;
};
