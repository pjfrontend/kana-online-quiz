import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from '@mui/material';
import React from 'react';
import {useKanaContext} from '../data/context';
import {KanaType} from '../data/types';

export const setKanaActionFactory = (
  setKana: React.Dispatch<React.SetStateAction<KanaType>>
): {
  setKatakana: () => void;
  setHiragana: () => void;
} => {
  return {
    setKatakana: () => {
      setKana('k');
    },
    setHiragana: () => {
      setKana('h');
    },
  };
};

export const KanaChoice: React.FC = () => {
  const {kana, setKana} = useKanaContext();
  const {setKatakana, setHiragana} = setKanaActionFactory(setKana);
  return (
    <FormControl>
      <FormLabel>Choose a Japanese script</FormLabel>
      <RadioGroup value={kana}>
        <FormControlLabel
          value="h"
          control={<Radio />}
          label="あいうえお"
          onChange={setHiragana}
        />
        <FormControlLabel
          value="k"
          control={<Radio />}
          label="アイウエオ"
          onChange={setKatakana}
        />
      </RadioGroup>
    </FormControl>
  );
};
