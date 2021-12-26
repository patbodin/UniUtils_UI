import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ValidateIDCard from './ValidateIDCard';

describe('<ValidateIDCard />', () => {
  test('it should mount', () => {
    render(<ValidateIDCard />);
    
    const validateIdCard = screen.getByTestId('ValidateIDCard');

    expect(validateIdCard).toBeInTheDocument();
  });
});