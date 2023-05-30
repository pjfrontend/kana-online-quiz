import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {QuizQuestionButton} from './QuizQuestionButton';
import {KanaCharacter} from '../data/types';

// describe('QuizQuestionButton', () => {
//   it('', () => {});
// });

describe('QuizQuestionButton', () => {
  it('renders', () => {
    const question: KanaCharacter = {
      id: 'k_4',
      row: 0,
      kana: 'オ',
      reading: 'o',
      type: 'k',
      column: 4,
    };
    const chooseAnswer = jest.fn();
    render(
      <QuizQuestionButton
        answerType="unanswered"
        question={question}
        chooseAnswer={chooseAnswer}
      />
    );
    const button = screen.getByTestId('quiz-btn');
    fireEvent.click(button);
    expect(chooseAnswer).toBeCalledWith({
      column: 4,
      id: 'k_4',
      kana: 'オ',
      reading: 'o',
      row: 0,
      type: 'k',
    });
  });
});
