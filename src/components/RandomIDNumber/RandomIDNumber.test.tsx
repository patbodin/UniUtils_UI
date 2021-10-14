import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RandomIDNumber from './RandomIDNumber';

describe('<RandomIDNumber />', () => {
  test('it should mount', () => {
    render(<RandomIDNumber />);
    
    const randomIdNumber = screen.getByTestId('RandomIDNumber');

    expect(randomIdNumber).toBeInTheDocument();
  });
});