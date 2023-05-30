import {Typography, Button, Box} from '@mui/material';
import React from 'react';
import {NavigateFunction, useNavigate} from 'react-router-dom';
import {KanaChoice} from '../components/KanaChoice';
import {useKanaContext} from '../data/context';
import {KanaType} from '../data/types';

export const navigateFactory = ({
  navigate,
  where,
  kana,
}: {
  navigate: NavigateFunction;
  kana: KanaType;
  where: string;
}) => {
  return () => navigate(`/${where}/${kana}`);
};

export const MainMenu: React.FC = () => {
  const navigate = useNavigate();
  const {kana, kanaLabel} = useKanaContext();
  const toQuiz = navigateFactory({where: 'quiz', navigate, kana});
  const toReview = navigateFactory({where: 'review', navigate, kana});

  return (
    <Box display="flex" justifyContent="center" flexDirection="column">
      <Typography variant="h3">{kanaLabel} Quiz</Typography>
      <KanaChoice />
      <Button variant="outlined" onClick={toQuiz}>
        New {kanaLabel} Quiz
      </Button>
      <Button variant="outlined" onClick={toReview}>
        {kanaLabel} Review
      </Button>
    </Box>
  );
};
