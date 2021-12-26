import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GetLastDigit from './GetLastDigit';

describe('<GetLastDigit />', () => {
  test('it should mount', () => {
    render(<GetLastDigit />);
    
    const getLastDigit = screen.getByTestId('GetLastDigit');

    expect(getLastDigit).toBeInTheDocument();
  });
});