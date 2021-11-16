import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import IDNumberGenerator from './IDNumberGenerator';

describe('<IDNumberGenerator />', () => {
  test('it should mount', () => {
    render(<IDNumberGenerator request={''} />);
    
    const idNumberGenerator = screen.getByTestId('IDNumberGenerator');

    expect(idNumberGenerator).toBeInTheDocument();
  });
});