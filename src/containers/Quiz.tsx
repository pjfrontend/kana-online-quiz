import {Box, Button, FormControl, RadioGroup, Typography} from '@mui/material';
import React, {useMemo, useState} from 'react';
import {BackButton} from '../components/BackButton';
import {Tally} from '../components/Tally';
import {useKanaContext} from '../data/context';
import {AnswerType, KanaCharacter, QuizQuestion} from '../data/types';
import {useSetKana} from '../hooks/useSetKana';
import {QuizQuestionButton} from '../components/QuizQuestionButton';

export const getButtonLabel = ({
  answerType,
  quizQuestion,
}: {
  answerType: AnswerType;
  quizQuestion: QuizQuestion | undefined;
}) => {
  if (answerType === 'unanswered') {
    return 'Please choose an option';
  }

  if (answerType === 'correct') {
    return 'Correct! Next question';
  }

  return `The correct answer is : ${quizQuestion?.answer.reading}... Next question`;
};

export const chooseAnswerFactory = ({
  setChosenId,
  quizQuestion,
  setAnswerType,
  incrementCorrectQuestion,
}: {
  setChosenId: React.Dispatch<React.SetStateAction<string | null>>;
  quizQuestion: QuizQuestion | undefined;
  setAnswerType: React.Dispatch<React.SetStateAction<AnswerType>>;
  incrementCorrectQuestion: (isCorrectAnswer?: boolean | undefined) => void;
}) => {
  return (question: KanaCharacter) => {
    setChosenId(question.id);
    const thisAnswerType: AnswerType =
      question.id === quizQuestion?.answer.id ? 'correct' : 'wrong';
    setAnswerType(thisAnswerType);
    if (thisAnswerType === 'correct') {
      incrementCorrectQuestion();
    }
  };
};

export const resetQuestionFactory = ({
  setChosenId,
  incrementQuizQuestion,
  setAnswerType,
}: {
  incrementQuizQuestion: () => void;
  setChosenId: React.Dispatch<React.SetStateAction<string | null>>;
  setAnswerType: React.Dispatch<React.SetStateAction<AnswerType>>;
}) => {
  return () => {
    setChosenId(null);
    setAnswerType('unanswered');
    incrementQuizQuestion();
  };
};

export const Quiz: React.FC = () => {
  const {
    kanaLabel,
    quizQuestion,
    incrementQuizQuestion,
    isLastQuizIndex,
    incrementCorrectQuestion,
  } = useKanaContext();
  const [chosenId, setChosenId] = useState<string | null>(null);
  const [answerType, setAnswerType] = useState<AnswerType>('unanswered');
  const buttonLabel = useMemo(
    () => getButtonLabel({answerType, quizQuestion}),
    [answerType, quizQuestion?.answer.reading]
  );
  const chooseAnswer = chooseAnswerFactory({
    setChosenId,
    quizQuestion,
    setAnswerType,
    incrementCorrectQuestion,
  });
  const resetQuestion = resetQuestionFactory({
    setChosenId,
    incrementQuizQuestion,
    setAnswerType,
  });
  useSetKana();

  return (
    <Box display="flex" justifyContent="center" flexDirection="column">
      <Typography variant="h3">{kanaLabel} Quiz</Typography>
      <Tally />
      <Typography variant="h1" ml="auto" mr="auto">
        {quizQuestion?.answer.kana}
      </Typography>
      <FormControl>
        <RadioGroup
          value={chosenId}
          style={{display: 'flex', flexDirection: 'row'}}
          key={quizQuestion?.answer.id}
        >
          {quizQuestion?.questions.map((question) => (
            <QuizQuestionButton
              key={question.id}
              question={question}
              answerType={answerType}
              chooseAnswer={chooseAnswer}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Box>
        <Button
          variant="contained"
          disabled={answerType === 'unanswered' || isLastQuizIndex}
          onClick={resetQuestion}
        >
          {buttonLabel}
        </Button>
      </Box>
      <Box>
        <BackButton />
      </Box>
    </Box>
  );
};
