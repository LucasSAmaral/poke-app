import { Injectable } from '@nestjs/common';
import { WhoIsThatPokemonActionPayload } from './dto/action.dto';

type CheckAnswerResponse = {
  correctAnswer?: string;
  wrongAnswer?: string;
  score?: number;
  gameOver?: boolean;
};

@Injectable()
export class ActionService {
  checkAnswer(payload: WhoIsThatPokemonActionPayload): CheckAnswerResponse {
    const { correctAnswer, currentPoints, selectedAnswer } = payload;

    if (correctAnswer === selectedAnswer) {
      const score = currentPoints + 1;

      return {
        correctAnswer,
        score,
      };
    }

    const score = currentPoints - 1;

    if (score <= 0) {
      return { gameOver: true };
    }

    return {
      score,
      correctAnswer,
      wrongAnswer: selectedAnswer,
    };
  }
}
