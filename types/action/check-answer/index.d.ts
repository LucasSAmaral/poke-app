type CheckAnswerResponse = {
  gameOver: boolean;
  isAnswerCorrect?: boolean;
  correctAnswer?: string;
  wrongAnswer?: string;
  score?: number;
};
