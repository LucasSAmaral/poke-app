import { Injectable } from '@nestjs/common';

@Injectable()
export class ActionService {
  checkAnswer(payload: WhoIsThatPokemonActionPayload): CheckAnswerResponse {
    const { correctAnswer, currentPoints, selectedAnswer } = payload;

    if (correctAnswer === selectedAnswer) {
      const score = currentPoints + 1;

      return {
        isAnswerCorrect: true,
        correctAnswer: selectedAnswer,
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
      wrongAnswer: selectedAnswer,
      gameOver: false,
    };
  }
}
