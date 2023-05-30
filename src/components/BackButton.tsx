import {Button} from '@mui/material';
import React from 'react';
import {NavigateFunction, useNavigate} from 'react-router-dom';
import {useKanaContext} from '../data/context';

export const backActionFactory = ({
  resetQuiz,
  navigate,
}: {
  navigate: NavigateFunction;
  resetQuiz: () => void;
}) => {
  return () => {
    resetQuiz();
    navigate(`/`);
  };
};

export const BackButton: React.FC = () => {
  const navigate = useNavigate();
  const {resetQuiz} = useKanaContext();
  return (
    <Button variant="outlined" onClick={backActionFactory({resetQuiz, navigate})}>
      Back to main page
    </Button>
  );
};
