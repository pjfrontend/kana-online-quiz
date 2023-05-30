import {useParams} from 'react-router-dom';
import {useKanaContext} from '../data/context';
import {KanaType} from '../data/types';

export const useSetKana = () => {
  const {kana} = useParams();
  const {setKana} = useKanaContext();
  if (!kana) {
    return kana;
  }

  setKana(kana as KanaType);
  return kana;
};
