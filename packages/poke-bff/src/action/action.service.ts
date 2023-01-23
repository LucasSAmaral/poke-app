import { Injectable } from '@nestjs/common';
import { WhoIsThatPokemonActionPayload } from './dto/action.dto';

type CheckAnswerResponse = {
  gameOver: boolean;
  correctAnswer?: string;
  wrongAnswer?: string;
  score?: number;
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
        gameOver: false,
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
      gameOver: false,
    };
  }
}
