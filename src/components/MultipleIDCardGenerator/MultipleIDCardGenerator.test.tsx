import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MultipleIDCardGenerator from './MultipleIDCardGenerator';

describe('<MultipleIDCardGenerator />', () => {
  test('it should mount', () => {
    render(<MultipleIDCardGenerator request="" />);
    
    const multipleIdCardGenerator = screen.getByTestId('MultipleIDCardGenerator');

    expect(multipleIdCardGenerator).toBeInTheDocument();
  });
});