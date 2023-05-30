import React from 'react';
import {render} from '@testing-library/react';
import {KanaChart} from './KanaChart';

describe('KanaChart', () => {
  it('renders', () => {
    render(<KanaChart />);
  });
});
