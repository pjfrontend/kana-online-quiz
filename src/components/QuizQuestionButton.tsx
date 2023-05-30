import React from 'react';
import {FormControlLabel, Radio} from '@mui/material';
import {AnswerType, KanaCharacter} from '../data/types';

export interface QuizQuestionButtonProps {
  question: KanaCharacter;
  answerType: AnswerType;
  chooseAnswer: (question: KanaCharacter) => void;
}

export const QuizQuestionButton: React.FC<QuizQuestionButtonProps> = ({
  question,
  answerType,
  chooseAnswer,
}) => {
  return (
    <FormControlLabel
      data-testid="quiz-btn"
      value={question.id}
      control={<Radio />}
      label={question.reading}
      disabled={answerType !== 'unanswered'}
      onChange={() => chooseAnswer(question)}
    />
  );
};
