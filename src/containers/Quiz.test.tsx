import React from 'react';
import {render} from '@testing-library/react';
import {Quiz, chooseAnswerFactory, getButtonLabel, resetQuestionFactory} from './Quiz';
import {KanaProvider} from '../data/context';
import {AnswerType, KanaCharacter, QuizQuestion} from '../data/types';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Quiz', () => {
  it('renders', () => {
    render(
      <KanaProvider>
        <Quiz />
      </KanaProvider>
    );
  });
});

describe('getButtonLabel', () => {
  it('should return the correct type for unanswered', () => {
    const label = getButtonLabel({answerType: 'unanswered', quizQuestion: undefined});
    expect(label).toBe('Please choose an option');
  });
  it('should return the correct type for correct', () => {
    const label = getButtonLabel({answerType: 'correct', quizQuestion: undefined});
    expect(label).toBe('Correct! Next question');
  });
  it('should return the correct type for wrong', () => {
    const label = getButtonLabel({
      answerType: 'wrong',
      quizQuestion: {answer: {reading: 'foo'} as KanaCharacter} as QuizQuestion,
    });
    expect(label).toBe('The correct answer is : foo... Next question');
  });
});

describe('chooseAnswerFactory', () => {
  const quizQuestion = {
    answer: {id: 'k_0', row: 0, kana: 'ア', reading: 'a', type: 'k', column: 0},
    questions: [
      {id: 'k_0', row: 0, kana: 'ア', reading: 'a', type: 'k', column: 0},
      {id: 'h_0', row: 0, kana: 'あ', reading: 'a', type: 'h', column: 0},
    ],
  } as QuizQuestion;
  let chosenId: string | null = null;
  let answerType: AnswerType = 'unanswered';
  let correctQuestion = 0;
  const chooseAnswer = chooseAnswerFactory({
    setChosenId: (x) => {
      chosenId = x as string | null;
    },
    quizQuestion,
    setAnswerType: (x) => {
      answerType = x as AnswerType;
    },
    incrementCorrectQuestion: () => {
      correctQuestion += 1;
    },
  });

  it('should choose the right answer', () => {
    chooseAnswer(quizQuestion.questions[0]);
    expect(chosenId).toBe('k_0');
    expect(answerType).toBe('correct');
    expect(correctQuestion).toBe(1);
  });

  it('should choose the wrong answer', () => {
    chooseAnswer(quizQuestion.questions[1]);
    expect(chosenId).toBe('h_0');
    expect(answerType).toBe('wrong');
    expect(correctQuestion).toBe(1);
  });
});

describe('resetQuestionFactory', () => {
  it('should prep the next question', () => {
    let chosenId: string | null = 'foo';
    let quizQuestion = 0;
    let answerType: AnswerType = 'wrong';
    const resetQuestion = resetQuestionFactory({
      setChosenId: (x) => {
        chosenId = x as string | null;
      },
      incrementQuizQuestion: () => {
        quizQuestion += 1;
      },
      setAnswerType: (x) => {
        answerType = x as AnswerType;
      },
    });
    resetQuestion();
    expect(chosenId).toBe(null);
    expect(quizQuestion).toBe(1);
    expect(answerType).toBe('unanswered');
  });
});
