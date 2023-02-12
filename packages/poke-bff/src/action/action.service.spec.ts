import { Test, TestingModule } from '@nestjs/testing';
import { ActionService } from './action.service';

describe('ActionService', () => {
  let service: ActionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActionService],
    }).compile();

    service = module.get<ActionService>(ActionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('checkAnswer method', () => {
    it('should return game over equals true', () => {
      const payload = {
        correctAnswer: 'pikachu',
        selectedAnswer: 'pinsir',
        currentPoints: 0,
      };

      const checkedAnswer = service.checkAnswer(payload);

      const expectedAnswer = { gameOver: true };

      expect(checkedAnswer).toEqual(expectedAnswer);
    });

    it('should return correct answer', () => {
      const payload = {
        correctAnswer: 'pikachu',
        selectedAnswer: 'pikachu',
        currentPoints: 0,
      };

      const checkedAnswer = service.checkAnswer(payload);

      const expectedAnswer = {
        isAnswerCorrect: true,
        correctAnswer: 'pikachu',
        score: 1,
        gameOver: false,
      };

      expect(checkedAnswer).toEqual(expectedAnswer);
    });

    it('should return wrong answer', () => {
      const payload = {
        correctAnswer: 'pikachu',
        selectedAnswer: 'Elephant',
        currentPoints: 10,
      };

      const checkedAnswer = service.checkAnswer(payload);

      const expectedAnswer = {
        wrongAnswer: 'Elephant',
        score: 9,
        gameOver: false,
      };

      expect(checkedAnswer).toEqual(expectedAnswer);
    });
  });
});
