import React from 'react';
import {renderHook} from '@testing-library/react';
import {KanaProvider, useKanaContext} from '../data/context';
import {useKanaChart} from './useKanaChart';

describe('useKanaChart', () => {
  it('should set the kana type on the context', () => {
    const wrapper = ({children}: {children: any}) => (
      <KanaProvider>{children}</KanaProvider>
    );
    const {result} = renderHook(() => useKanaChart(), {wrapper});
    expect(result.current.columnMax).toBe(8);
    expect(result.current.rowMax).toBe(14);
    expect(result.current.kanaChart[0]).toStrictEqual({
      column: 0,
      id: 'h_0',
      kana: 'あ',
      reading: 'a',
      row: 0,
      type: 'h',
    });
    expect(result.current.getKanaByColumnRow(3, 4)).toStrictEqual({
      column: 4,
      id: 'h_25',
      kana: 'と',
      reading: 'to',
      row: 3,
      type: 'h',
    });
  });
});
