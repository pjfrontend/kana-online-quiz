import React from 'react';
import {render} from '@testing-library/react';
import {Review} from './Review';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Review', () => {
  it('renders', () => {
    render(<Review />);
  });
});
