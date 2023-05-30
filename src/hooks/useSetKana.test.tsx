import React from 'react';
import {renderHook} from '@testing-library/react';
import {KanaProvider, useKanaContext} from '../data/context';
import {useSetKana} from './useSetKana';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({kana: 'k'}),
}));

describe('useSetKana', () => {
  it('should set the kana type on the context', () => {
    const wrapper = ({children}: {children: any}) => (
      <KanaProvider>{children}</KanaProvider>
    );
    const {result} = renderHook(() => useSetKana(), {wrapper});
    expect(result.current).toBe('k');
  });
});
