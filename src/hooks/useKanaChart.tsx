import {useMemo} from 'react';
import {useKanaContext} from '../data/context';
import {kana_list} from '../data/kana_list';
import {KanaType} from '../data/types';

export const useKanaChart = () => {
  const {kana} = useKanaContext();

  const kanaChart = useMemo(() => kana_list.filter((x) => x.type === kana), [kana]);
  const columnMax = useMemo(
    () => kana_list.map((x) => x.column).reduce((a, c) => Math.max(a, c)),
    [kana]
  );
  const rowMax = useMemo(
    () => kana_list.map((x) => x.row).reduce((a, c) => Math.max(a, c)),
    [kana]
  );
  const getKanaByColumnRow = useMemo(
    () => (row: number, col: number) =>
      kana_list.find(
        (x) => (x.type as KanaType) === kana && x.column === col && x.row === row
      ),
    [kana]
  );

  return {kanaChart, columnMax, rowMax, getKanaByColumnRow};
};
