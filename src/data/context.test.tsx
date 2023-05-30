import {
  incrementCorrectQuestionFactory,
  incrementQuizQuestionFactory,
  resetQuizFactory,
} from './context';

describe('incrementQuizQuestionFactory', () => {
  it('should return a function that increments the quiz index', () => {
    let quizIndex = 0;
    const incrementQuizQuestion = incrementQuizQuestionFactory((x) => {
      quizIndex = (x as any)(quizIndex);
    });
    incrementQuizQuestion();
    expect(quizIndex).toBe(1);
    incrementQuizQuestion();
    expect(quizIndex).toBe(2);
  });
});

describe('incrementCorrectQuestionFactory', () => {
  it('should return a function that increments the number of correct questions', () => {
    let correctAnswers = 0;
    const incrementCorrectQuestion = incrementCorrectQuestionFactory((x) => {
      correctAnswers = (x as any)(correctAnswers);
    });
    incrementCorrectQuestion();
    expect(correctAnswers).toBe(1);
    incrementCorrectQuestion();
    expect(correctAnswers).toBe(2);
  });
});

describe('resetQuizFactory', () => {
  it('should return a function that resets all quiz values back to zero', () => {
    let quizIndex = 2;
    let correctAnswers = 1;
    const resetQuiz = resetQuizFactory({
      setCorrectAnswersCount: (x) => {
        correctAnswers = x as number;
      },
      setQuizIndex: (x) => {
        quizIndex = x as number;
      },
    });
    resetQuiz();
    expect(quizIndex).toBe(0);
    expect(correctAnswers).toBe(0);
  });
});
