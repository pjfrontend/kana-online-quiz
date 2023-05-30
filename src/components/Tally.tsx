import {Box, Typography} from '@mui/material';
import React from 'react';
import {useKanaContext} from '../data/context';

export const Tally: React.FC = () => {
  const {correctAnswersCount, shuffledKanaIds, quizIndex} = useKanaContext();

  return (
    <Box border="1px solid black" padding={1}>
      <Typography variant="h5">
        Current: {quizIndex + 1} / Correct: {correctAnswersCount} / Total:{' '}
        {shuffledKanaIds.length}
      </Typography>
    </Box>
  );
};
