import React from 'react';
import {render} from '@testing-library/react';
import {KanaChoice, setKanaActionFactory} from './KanaChoice';

describe('KanaChoice', () => {
  it('renders', () => {
    render(<KanaChoice />);
  });
});

describe('setKanaActionFactory', () => {
  it('should return 2 functions that set the kana type', () => {
    const setState = jest.fn();
    const {setHiragana, setKatakana} = setKanaActionFactory(setState);
    expect(setState).not.toHaveBeenCalled();
    setHiragana();
    expect(setState).toHaveBeenCalledTimes(1);
    expect(setState).toHaveBeenCalledWith('h');
    setKatakana();
    expect(setState).toHaveBeenCalledTimes(2);
    expect(setState).toHaveBeenCalledWith('k');
  });
});
