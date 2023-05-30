import React from 'react';
import {render} from '@testing-library/react';
import {Tally} from './Tally';
import {KanaProvider} from '../data/context';

describe('Tally', () => {
  it('renders', () => {
    render(
      <KanaProvider>
        <Tally />
      </KanaProvider>
    );
  });
});
