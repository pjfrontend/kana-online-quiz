import React from 'react';
import {render} from '@testing-library/react';
import {BackButton, backActionFactory} from './BackButton';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('BackButton', () => {
  it('renders', () => {
    render(<BackButton />);
  });
});

describe('backActionFactory', () => {
  it('should return a function that navigates back to home', () => {
    const resetQuiz = jest.fn();
    const navigate = jest.fn();
    const backFn = backActionFactory({resetQuiz, navigate});
    expect(navigate).not.toHaveBeenCalled();
    expect(resetQuiz).not.toHaveBeenCalled();
    backFn();
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(resetQuiz).toHaveBeenCalledTimes(1);
  });
});
