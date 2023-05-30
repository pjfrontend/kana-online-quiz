import React from 'react';
import {render} from '@testing-library/react';
import {MainMenu, navigateFactory} from './MainMenu';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('MainMenu', () => {
  it('renders', () => {
    render(<MainMenu />);
  });
});

describe('navigateFactory', () => {
  it('should return a function that goes to an address', () => {
    const navigate = jest.fn();
    const toQuiz = navigateFactory({where: 'quiz', navigate, kana: 'h'});
    toQuiz();
    expect(navigate).toBeCalledWith('/quiz/h');
  });
});
