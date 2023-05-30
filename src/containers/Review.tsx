import {Box, Typography} from '@mui/material';
import React from 'react';
import {BackButton} from '../components/BackButton';
import {KanaChart} from '../components/KanaChart';
import {useKanaContext} from '../data/context';
import {useSetKana} from '../hooks/useSetKana';

export const Review: React.FC = () => {
  const {kanaLabel} = useKanaContext();
  useSetKana();

  return (
    <Box display="flex" justifyContent="center" flexDirection="column">
      <Typography variant="h3">{kanaLabel} Review</Typography>
      <KanaChart />
      <BackButton />
    </Box>
  );
};
