import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import IdCardRequestInput from './IdCardRequestInput';

describe('<IdCardRequestInput />', () => {
  test('it should mount', () => {
    render(<IdCardRequestInput  />);
    
    const idCardRequestInput = screen.getByTestId('IdCardRequestInput');

    expect(idCardRequestInput).toBeInTheDocument();
  });
});